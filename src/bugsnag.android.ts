import { BREADCRUMB_MAX_LENGTH, BaseNative, ClientBase, clog, createGetter, createSetter, cwarn } from './bugsnag.common';
import { knownFolders } from 'tns-core-modules/file-system';
import * as application from 'tns-core-modules/application';
import { ConfigurationOptions, NativePropertyOptions, NotifyOptions } from './bugsnag';
// const appPath = knownFolders.currentApp().path + '/';

export enum BreadcrumbType {
    ERROR = 'ERROR',
    LOG = 'LOG',
    MANUAL = 'MANUAL',
    NAVIGATION = 'NAVIGATION',
    PROCESS = 'PROCESS',
    REQUEST = 'REQUEST',
    STATE = 'STATE',
    USER = 'USER'
}

function nativePropertyGenerator(target: Object, key: string, options?: NativePropertyOptions) {
    // clog('mapPropertyGenerator', key, Object.keys(options));
    Object.defineProperty(target, key, {
        get: createGetter(key, options),
        set: createSetter(key, options),
        enumerable: true,
        configurable: true
    });
}

export function nativeProperty(target: any, k?, desc?: PropertyDescriptor): any;
export function nativeProperty(options: NativePropertyOptions): (target: any, k?, desc?: PropertyDescriptor) => any;
export function nativeProperty(...args) {
    // clog('test deco', typeof args[0], Object.keys(args[0]), args[1], typeof args[1]);
    if (args.length === 1) {
        // this must be a factory
        return function(target: any, key?: string, descriptor?: PropertyDescriptor) {
            return nativePropertyGenerator(target, key, args[0] || {});
        };
    } else {
        const options = typeof args[1] === 'string' ? undefined : args[0];
        const startIndex = !!options ? 1 : 0;
        return nativePropertyGenerator(args[startIndex], args[startIndex + 1], options || {});
    }
}

function getBreadcrumbType(value: string | com.bugsnag.android.BreadcrumbType) {
    if (typeof value === 'string') {
        return com.bugsnag.android.BreadcrumbType.valueOf(value);
    }
    return value;
}
function getNativeHashMap(obj: { [k: string]: string }) {
    if (!obj) {
        return null;
    }
    const map = new java.util.HashMap<string, string>();
    Object.keys(obj).forEach(k => {
        map.put(k, obj[k]);
    });
    return map;
}

let JavaScriptException: JavaScriptException;

interface JavaScriptException extends com.bugsnag.android.BugsnagException {
    // tslint:disable-next-line: no-misused-new
    new (name, message, rawStacktrace): JavaScriptException;
    name;
    rawStacktrace;
}
function initJavaScriptException() {
    if (JavaScriptException) {
        return;
    }

    const stackTraceRegex = /at\s*?([^\(]*)?\s*\(?(?:file:\/\/|\/webpack:)([^:\n]*)(?::([0-9]+))?(?::([0-9]+))?\)?/g;
    const lineColRe = /:\d+:\d+$/;
    const nsFilePathRe = /(file|webpack):\/\/\/.*?\/files\/app\//g;
    const hermesStacktraceFormatRe = /[\s\t]*at .* \(.*\d+:\d+\)\s.*/gs;

    function serialiseJsCoreFrame(writer: com.bugsnag.android.JsonStream, frame: string) {
        // expected format is as follows:
        //   release:
        //     "$method@$filename:$lineNumber:$columnNumber"
        //   dev:
        //     "$method@?uri:$lineNumber:$columnNumber"

        console.log('serialiseJsCoreFrame', frame);
        writer.beginObject();
        const methodComponents = frame.split('@', 2);
        let fragment = methodComponents[0];
        if (methodComponents.length === 2) {
            writer.name('method').value(methodComponents[0]);
            fragment = methodComponents[1];
        }

        const columnIndex = fragment.lastIndexOf(':');
        if (columnIndex !== -1) {
            const columnString = fragment.substring(columnIndex + 1);
            const columnNumber = parseInt(columnString, 10);

            if (columnNumber != null) {
                writer.name('columnNumber').value(columnNumber);
            }
            fragment = fragment.substring(0, columnIndex);
        }

        const lineNumberIndex = fragment.lastIndexOf(':');
        if (lineNumberIndex !== -1) {
            const lineNumberString = fragment.substring(lineNumberIndex + 1);
            const lineNumber = parseInt(lineNumberString, 10);

            if (lineNumber != null) {
                writer.name('lineNumber').value(lineNumber);
            }
            fragment = fragment.substring(0, lineNumberIndex);
        }

        writer.name('file').value(fragment.replace(nsFilePathRe, ''));
        writer.endObject();
    }

    function serialiseHermesFrame(writer: com.bugsnag.android.JsonStream, frame: string) {
        // expected format is as follows:
        //   release
        //     "at $method (address at $filename:$lineNumber:$columnNumber)"
        //   dev
        //     "at $method ($filename:$lineNumber:$columnNumber)"

        const srcInfoStart = Math.max(frame.lastIndexOf(' '), frame.lastIndexOf('('));
        const srcInfoEnd = frame.lastIndexOf(')') >= 0 ? frame.lastIndexOf(')') : frame.length;
        const hasSrcInfo = srcInfoStart > -1 && srcInfoStart < srcInfoEnd;

        const isFrame = frame.indexOf('at ') >= 0;
        if (!isFrame) {
            return;
        }
        const methodStart = frame.indexOf('at ') !== -1 ? 'at '.length : 0;
        const methodEnd = frame.indexOf(' (');
        const hasMethodInfo = methodStart < methodEnd;

        // serialise srcInfo
        if (hasSrcInfo || hasMethodInfo) {
            writer.beginObject();
            if (hasMethodInfo) {
                writer.name('method').value(frame.substring(methodStart, methodEnd));
            }
            if (hasSrcInfo) {
                const srcInfo = frame.substring(srcInfoStart + 1, srcInfoEnd);
                // matches `:123:34` at the end of a string such as "index.android.bundle:123:34"
                // so that we can extract just the filename portion "index.android.bundle"
                const file = srcInfo.replace(lineColRe, '').replace(nsFilePathRe, './');

                writer.name('file').value(file);

                const chunks = srcInfo.split(':');
                if (chunks.length >= 2) {
                    const lineNumber = parseInt(chunks[chunks.length - 2], 10);
                    const columnNumber = parseInt(chunks[chunks.length - 1], 10);

                    if (lineNumber != null) {
                        writer.name('lineNumber').value(lineNumber);
                    }
                    if (columnNumber != null) {
                        writer.name('columnNumber').value(columnNumber);
                    }
                    // clog('frame test', frame.substring(methodStart, methodEnd), lineNumber, columnNumber, srcInfo, file);
                }
            }
            writer.endObject();
        }
    }

    // @JavaProxy('com.nativescript.bugsnag.JavascriptException')
    @Interfaces([com.bugsnag.android.JsonStream.Streamable])
    class JavaScriptExceptionImpl extends com.bugsnag.android.BugsnagException implements com.bugsnag.android.JsonStream.Streamable {
        private EXCEPTION_TYPE = 'browserjs';
        private serialVersionUID = 1175784680140218622;
        // name: string;
        rawStacktrace: string;
        // type:string;

        constructor(name, message, rawStacktrace) {
            super(name, message, Array.create(java.lang.StackTraceElement, 0)); // stacktrace set later on
            // this.name = name;
            this.rawStacktrace = rawStacktrace;
            // this.ty
            // super.setType(this.EXCEPTION_TYPE);
            // clog('JavaScriptExceptionImpl', name, message, rawStacktrace);
        }

        toStream(writer: com.bugsnag.android.JsonStream) {
            writer.beginObject();
            // console.log('toStream', this.getName(), this.getLocalizedMessage(), this.EXCEPTION_TYPE);
            writer.name('errorClass').value(this.getName());
            writer.name('message').value(this.getLocalizedMessage());
            writer.name('type').value(this.EXCEPTION_TYPE);
            if (this.rawStacktrace) {
                writer.name('stacktrace');
                writer.beginArray();
                const isHermes = this.rawStacktrace.match(hermesStacktraceFormatRe);
                this.rawStacktrace.split('\n').forEach(frame => {
                    // if (isHermes) {
                    serialiseHermesFrame(writer, frame.trim());
                    // } else {
                    // serialiseJsCoreFrame(writer, frame.trim());
                    // }
                });

                // let match = stackTraceRegex.exec(this.rawStacktrace);
                // clog('toStream', 'rawStacktrace', this.rawStacktrace, match);
                // while (match != null) {
                //     writer.beginObject();
                //     if (match[1]) {
                //         writer.name('method').value(match[1]);
                //     }
                //     writer.name('columnNumber').value(parseInt(match[4], 10));
                //     writer.name('lineNumber').value(parseInt(match[3], 10));
                //     if (match[2]) {
                //         writer.name('file').value(match[2].replace(appPath, ''));
                //     }
                //     writer.endObject();
                //     // matched text: match[0]
                //     // match start: match.index
                //     // capturing group n: match[n]
                //     // clog('adding stacktrace:');
                //     // clog('   method:', match[1]);
                //     // clog('   columnNumber:', match[4], parseInt(match[4], 10));
                //     // clog('   lineNumber:', match[3], parseInt(match[3], 10));
                //     // clog('   file:', match[2], match[2].replace(appPath, ''));
                //     match = stackTraceRegex.exec(this.rawStacktrace);
                // }
                writer.endArray();
            }
            writer.endObject();
        }
    }
    JavaScriptException = JavaScriptExceptionImpl as any;
}

let DiagnosticsCallback: DiagnosticsCallback;

type DiagnosticsCallback = new (libraryVersion, bugsnagAndroidVersion, payload) => com.bugsnag.android.Callback;
function initDiagnosticsCallback() {
    if (DiagnosticsCallback) {
        return;
    }
    @Interfaces([com.bugsnag.android.Callback])
    class DiagnosticsCallbackImpl extends java.lang.Object implements com.bugsnag.android.Callback {
        static NOTIFIER_NAME = 'Bugsnag for NativeScript';
        static NOTIFIER_URL = 'https://github.com/Akylas/nativescript-bugsnag';

        private severity;
        private context;
        private groupingHash;
        private metadata;

        constructor(private libraryVersion, private bugsnagAndroidVersion, private payload) {
            super();
            this.severity = this.parseSeverity(payload.severity);
            this.metadata = payload.metadata;
            this.context = payload.context || null;
            this.groupingHash = payload.groupingHash || null;
        }

        parseSeverity(value) {
            switch (value) {
                case 'error':
                    return com.bugsnag.android.Severity.ERROR;
                case 'info':
                    return com.bugsnag.android.Severity.INFO;
                case 'warning':
                default:
                    return com.bugsnag.android.Severity.WARNING;
            }
        }

        beforeNotify(report: com.bugsnag.android.Report) {
            report.getNotifier().setName(DiagnosticsCallbackImpl.NOTIFIER_NAME);
            report.getNotifier().setURL(DiagnosticsCallbackImpl.NOTIFIER_URL);
            report.getNotifier().setVersion(`${this.libraryVersion} (Android ${this.bugsnagAndroidVersion})`);

            if (this.groupingHash && this.groupingHash.length > 0) report.getError().setGroupingHash(this.groupingHash);
            if (this.context && this.context.length > 0) report.getError().setContext(this.context);
            if (this.metadata) {
                const reportMetadata = report.getError().getMetaData();
                Object.keys(this.metadata).forEach(tab => {
                    const values = this.metadata[tab];
                    if (typeof values === 'object') {
                        Object.keys(values).forEach(key => {
                            reportMetadata.addToTab(tab, key, values[key]);
                        });
                    }
                });
            }
        }
    }
    DiagnosticsCallback = DiagnosticsCallbackImpl as any;
}
export class Report {
    constructor(private report: com.bugsnag.android.Error) {}
    public addToTab(tab: string, name: string, value: any) {
        this.report.addToTab(tab, name, value);
    }
}
export class Client extends ClientBase {
    _client: com.bugsnag.android.Client;
    libraryVersion;
    bugsnagAndroidVersion;

    getBreadcrumbType(str: string) {
        return getBreadcrumbType(str);
    }
    runInit() {
        const currentContext = application.android.context as android.content.Context;
        // clog('Bugnsag', 'runInit1', currentContext);
        if (currentContext) {
            this._client = com.bugsnag.android.Bugsnag.init(currentContext, this.config.getNative());

            // const array = Array.create('java.lang.String', 1);
            // array[0] = 'com.nativescript.bugsnag.JavascriptException';
            // this._client.setIgnoreClasses(array);
            // clog('client setIgnoreClasses');
            this.libraryVersion = require('./package.json').version;
            this.bugsnagAndroidVersion = (this._client as any) // java.lang.Object
                .getClass()
                .getPackage()
                .getSpecificationVersion();
            // clog('Bugnsag', 'did init', this.libraryVersion, this.bugsnagAndroidVersion);
        }
    }
    init(conf: Configuration | ConfigurationOptions | string): Promise<any> {
        // clog('Bugnsag', 'init', conf, !!this._client, knownFolders.currentApp().path, application.launchEvent);
        if (!this._client) {
            this.config = conf instanceof Configuration ? conf : new Configuration(typeof conf === 'object' ? conf : { apiKey: conf });
            return new Promise((resolve, reject) => {
                const onLaunched = () => {
                    try {
                        // clog('Bugnsag', 'onLaunched');
                        application.off(application.launchEvent, onLaunched);
                        this.runInit();
                        resolve(this._client);
                    } catch (ex) {
                        clog('Error in Bugsnag.init: ' + ex);
                        reject(ex);
                    }
                };
                // clog('Bugnsag', 'will init', !!application.android.nativeApp, !!application.android.context, !!application.android.startActivity);

                if (application.android.nativeApp) {
                    onLaunched();
                } else {
                    // console.log('Bugnsag', 'will init on launchEvent');
                    application.on(application.launchEvent, onLaunched);
                }
            });
        }
        return Promise.resolve(this._client);
        // return !!this._client;
    }
    leaveBreadcrumb(message: string, type?: any, metaData?: { [k: string]: string }) {
        if (this._client) {
            if (message.length > BREADCRUMB_MAX_LENGTH) {
                cwarn(`Breadcrumb name exceeds ${BREADCRUMB_MAX_LENGTH} characters (it has ${message.length}): ${name}. It will be truncated.`);
            }
            if (type || metaData) {
                this._client.leaveBreadcrumb(message, getBreadcrumbType(type), getNativeHashMap(metaData));
            } else {
                this._client.leaveBreadcrumb(message);
            }
        }
    }
    setUser(id: string, email: string, name: string) {
        if (this._client) {
            this._client.setUser(id, email, name);
        }
    }
    setUserId(id: string) {
        if (this._client) {
            this._client.setUserId(id);
        }
    }
    setUserEmail(email: string) {
        if (this._client) {
            this._client.setUserEmail(email);
        }
    }
    setUserName(name: string) {
        if (this._client) {
            this._client.setUserName(name);
        }
    }
    startSession() {
        if (this._client) {
            this._client.startSession();
        }
    }
    stopSession() {
        if (this._client) {
            this._client.stopSession();
        }
    }
    resumeSession() {
        if (this._client) {
            this._client.resumeSession();
        }
    }
    /**
     * clear custom user data and reset to the default device identifier
     */
    clearUser() {
        if (this._client) {
            this._client.clearUser();
        }
    }

    clearTab(name: string) {
        com.bugsnag.android.Bugsnag.clearTab(name);
    }
    addToTab(tab: string, name: string, value: any) {
        com.bugsnag.android.Bugsnag.addToTab(tab, name, value);
    }
    // leaveBreadcrumb(name: string, type: BreadcrumbType, metaData?: { [k: string]: string }) {
    //     if (this._client) {
    //         clog('about to leaveBreadcrumb client', message);
    //         this._client.leaveBreadcrumb(message);
    //     }
    // }
    handleNotify(options) {
        if (this._client) {
            const errorClass = options.errorClass;
            const errorMessage = options.errorMessage;
            const rawStacktrace = options.stacktrace;
            initJavaScriptException();
            const exc = new JavaScriptException(errorClass, errorMessage, rawStacktrace);
            // exc.name = errorClass;
            // exc.rawStacktrace = rawStacktrace;
            // clog('handleNotify', exc);

            initDiagnosticsCallback();
            const handler = new DiagnosticsCallback(this.libraryVersion, this.bugsnagAndroidVersion, options);

            const map = new java.util.HashMap();
            map.put('severity', options.severity);
            map.put('severityReason', options.severityReason);
            com.bugsnag.android.Bugsnag.internalClientNotify(exc, map, !!options.blocking, handler);
            return Promise.resolve(true);
        }
        return Promise.reject('not_initialized');
    }
}

export class Configuration extends BaseNative<com.bugsnag.android.Configuration, ConfigurationOptions> {
    apiKey: string;
    autoNotify: boolean = true;
    notifyReleaseStages: string[];
    @nativeProperty sendThreads: boolean;
    @nativeProperty({
        nativeGetterName: 'setAutoCaptureSessions',
        nativeSetterName: 'getAutoCaptureSessions'
    })
    autoTrackSessions: boolean;
    @nativeProperty detectAnrs: boolean;
    @nativeProperty enableExceptionHandler: boolean;
    @nativeProperty appVersion: string;
    @nativeProperty buildUUID: string;
    @nativeProperty sessionEndpoint: string;
    @nativeProperty endpoint: string;
    @nativeProperty codeBundleId: string;
    @nativeProperty releaseStage: string;
    @nativeProperty context: string;
    @nativeProperty anrThresholdMs: number;
    @nativeProperty launchCrashThresholdMs: number;
    @nativeProperty maxBreadcrumbs: number;
    @nativeProperty notifierType: string;
    @nativeProperty persistUserBetweenSessions: boolean;
    @nativeProperty({
        nativeSetterName: 'shouldIgnoreClass'
    })
    ignoreClasses: boolean;
    @nativeProperty({
        nativeSetterName: 'shouldNotifyForReleaseStage'
    })
    notifyForReleaseStage: boolean;
    @nativeProperty({
        nativeGetterName: 'isAutomaticallyCollectingBreadcrumbs'
    })
    automaticallyCollectBreadcrumbs: boolean;

    createNative(options?: ConfigurationOptions) {
        clog('Configuration', 'createNative', options);
        const result = new com.bugsnag.android.Configuration(options.apiKey);
        // result.beforeNotify(
        //     new com.bugsnag.android.BeforeNotify({
        //         run: (error: com.bugsnag.android.Error) => {
        //             return true;
        //         }
        //     })
        // );
        return result;
    }

    set beforeSend(callback: (report: Report) => boolean) {
        this.getNative().beforeSend(
            new com.bugsnag.android.BeforeSend({
                run(report) {
                    return callback(new Report(report.getError()));
                }
            })
        );
    }
    /**
     * whether reports should be sent to Bugsnag, based on the release stage
     * configuration
     */
    shouldNotify() {
        return !this.options.releaseStage || !this.options.notifyReleaseStages || this.options.notifyReleaseStages.indexOf(this.options.releaseStage) !== -1;
    }
    // public getMetaData(): com.bugsnag.android.MetaData;
    // public setMetaData(param0: com.bugsnag.android.MetaData): void;
    // public inProject(param0: string): boolean;
    // public beforeSend(param0: com.bugsnag.android.BeforeSend): void;
    // public getBeforeSendTasks(): java.util.Collection<com.bugsnag.android.BeforeSend>;
    // public beforeNotify(param0: com.bugsnag.android.BeforeNotify): void;
    // public update(param0: java.util.Observable, param1: any): void;
    // public setDelivery(param0: com.bugsnag.android.Delivery): void;
    // public getNotifyReleaseStages(): native.Array<string>;
    // public getProjectPackages(): native.Array<string>;
    // public getIgnoreClasses(): native.Array<string>;
    // public setProjectPackages(param0: native.Array<string>): void;
    // public getBeforeRecordBreadcrumbTasks(): java.util.Collection<com.bugsnag.android.BeforeRecordBreadcrumb>;
    // public getDelivery(): com.bugsnag.android.Delivery;
    // public getMaxBreadcrumbs(): number;
    // public setFilters(param0: native.Array<string>): void;
    // public setEndpoints(param0: string, param1: string): void;
    // public getFilters(): native.Array<string>;
    // public getBeforeNotifyTasks(): java.util.Collection<com.bugsnag.android.BeforeNotify>;
    // public setIgnoreClasses(param0: native.Array<string>): void;
    // public setNotifyReleaseStages(param0: native.Array<string>): void;
    // public getErrorApiHeaders(): java.util.Map<string, string>;
    // public getSessionApiHeaders(): java.util.Map<string, string>;
    // public beforeRecordBreadcrumb(param0: com.bugsnag.android.BeforeRecordBreadcrumb): void;
}
