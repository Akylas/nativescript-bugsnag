import { BREADCRUMB_MAX_LENGTH, BaseNative, ClientBase, cerror, clog, createGetter, createSetter, cwarn } from './bugsnag.common';
import { ConfigurationOptions, NativePropertyOptions, NotifyOptions } from './bugsnag';

function nativePropertyGenerator(target: Object, key: string, options?: NativePropertyOptions) {
    // clog('mapPropertyGenerator', key, Object.keys(options));
    Object.defineProperty(target, key, {
        get: createGetter(key, options),
        set: createSetter(key, options),
        enumerable: true,
        configurable: true
    });
}

function NSDicttoJSON(obj: NSDictionary<any, any> | NSMutableDictionary<any, any>) {
    const result = {};
    obj.enumerateKeysAndObjectsUsingBlock((key, value) => {
        result[key] = value;
    });
    return result;
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

function getNativeMap(obj: { [k: string]: string }) {
    if (!obj) {
        return null;
    }
    const dict = NSMutableDictionary.new();
    for (const p in obj) {
        const prop = obj[p];
        if (prop !== undefined && prop !== null) {
            if (typeof prop === 'object') {
                const res = getNativeMap(prop);
                if (res !== undefined && res !== null) {
                    dict.setObjectForKey(res, p);
                }
            } else {
                dict.setObjectForKey(prop, p);
            }
        }
    }
    return dict;
}
// function getNativeStackTrace(error: Error) {
//     if (!error || !error.stack) {
//         return null;
//     }
//     const stack = error.stack.split('\n');
//     const array = Array.create(java.lang.StackTraceElement, stack.length);
//     stack.forEach((s, i) => {
//         array[i] = s;
//     });

//     return array;
// }

const lineColRe = /:\d+:\d+$/;
const nsFilePathRe = /(file|webpack):\/\/\/.*?app\//g;

// const hermesStacktraceFormatRe = /[\s\t]*at\s+.*?\s*?\(.*?(\d+:\d+)?\)/gs;

// function serialiseJsCoreFrame(frame: string) {
//     const writer = NSMutableDictionary.new();
//     // expected format is as follows:
//     //   release:
//     //     "$method@$filename:$lineNumber:$columnNumber"
//     //   dev:
//     //     "$method@?uri:$lineNumber:$columnNumber"

//     const methodComponents = frame.split('@', 2);
//     let fragment = methodComponents[0];
//     if (methodComponents.length === 2) {
//         if (fragment) {
//             writer.setObjectForKey(fragment, 'method');
//         }
//         fragment = methodComponents[1];
//     }

//     const columnIndex = fragment.lastIndexOf(':');
//     if (columnIndex !== -1) {
//         const columnString = fragment.substring(columnIndex + 1);
//         const columnNumber = parseInt(columnString, 10);

//         if (columnNumber != null) {
//             writer.setObjectForKey(columnNumber, 'columnNumber');
//         }
//         fragment = fragment.substring(0, columnIndex);
//     }

//     const lineNumberIndex = fragment.lastIndexOf(':');
//     if (lineNumberIndex !== -1) {
//         const lineNumberString = fragment.substring(lineNumberIndex + 1);
//         const lineNumber = parseInt(lineNumberString, 10);

//         if (lineNumber != null) {
//             writer.setObjectForKey(lineNumber, 'lineNumber');
//         }
//         fragment = fragment.substring(0, lineNumberIndex);
//     }
//     if (nsFilePathRe) {
//         writer.setObjectForKey('file', fragment.replace(nsFilePathRe, ''));
//     }

//     return writer;
// }

function serialiseHermesFrame(frame: string) {
    const writer = {};

    // const srcInfoStart = Math.max(frame.lastIndexOf(' '), frame.lastIndexOf('('));
    let srcInfoStart = frame.lastIndexOf('(');
    let srcInfoEnd = frame.lastIndexOf(')');
    let hasSrcInfo = srcInfoStart > -1 && srcInfoStart < srcInfoEnd;
    const atStartIndex = frame.indexOf('at ');

    const methodStart = atStartIndex !== -1 ? 'at '.length : 0;
    const methodEnd = frame.indexOf('(');
    let hasMethodInfo = methodStart < methodEnd;

    if (!hasSrcInfo && atStartIndex === 0) {
        srcInfoStart = 2;
        srcInfoEnd = frame.length;
        hasSrcInfo = true;
        hasMethodInfo = false;
    }
    // serialise srcInfo
    if (hasSrcInfo || hasMethodInfo) {
        const method = frame.substring(methodStart, methodEnd);
        if (hasMethodInfo && method) {
            writer['method'] = method;
            // writer.setObjectForKey(method, 'method');
        }
        if (hasSrcInfo) {
            const srcInfo = frame.substring(srcInfoStart + 1, srcInfoEnd);
            // matches `:123:34` at the end of a string such as "index.android.bundle:123:34"
            // so that we can extract just the filename portion "index.android.bundle"
            // clog('serialiseHermesFrame', frame, hasSrcInfo, hasMethodInfo, methodStart, methodEnd, srcInfoStart, srcInfoEnd, srcInfo);
            const file = srcInfo.startsWith('[') ? srcInfo : srcInfo.replace(lineColRe, '').replace(nsFilePathRe, './');
            if (file) {
                // writer.setObjectForKey(file, 'file');
                writer['file'] = file;
            }

            const chunks = srcInfo.split(':');
            if (chunks.length >= 2) {
                const lineNumber = parseInt(chunks[chunks.length - 2], 10);
                const columnNumber = parseInt(chunks[chunks.length - 1], 10);

                if (lineNumber != null) {
                    // writer.setObjectForKey(lineNumber, 'lineNumber');
                    writer['lineNumber'] = lineNumber;
                }
                if (columnNumber != null) {
                    // writer.setObjectForKey(columnNumber, 'columnNumber');
                    writer['columnNumber'] = columnNumber;
                }
            }
        }
    }
    return writer;
}

export enum BreadcrumbType {
    ERROR = BSGBreadcrumbType.Error,
    LOG = BSGBreadcrumbType.Log,
    MANUAL = BSGBreadcrumbType.Manual,
    NAVIGATION = BSGBreadcrumbType.Navigation,
    PROCESS = BSGBreadcrumbType.Process,
    REQUEST = BSGBreadcrumbType.Request,
    STATE = BSGBreadcrumbType.State,
    USER = BSGBreadcrumbType.User
}

export class Report {
    constructor(private report: BugsnagCrashReport) {}
    public addToTab(tab: string, name: string, value: any) {
        this.report.addAttributeWithValueToTabWithName(name, value, tab);
    }
}
export class Client extends ClientBase {
    config: Configuration;
    // _client: com.bugsnag.android.Client;
    runInit() {
        // application.off(application.launchEvent, this.runInit, this);
        // const currentContext = application.android.context as android.content.Context;
        // if (currentContext) {
        //     if (this.conf) {
        //         this._client = com.bugsnag.android.Bugsnag.init(currentContext, this.conf.getNative());
        //     } else {
        //         this._client = com.bugsnag.android.Bugsnag.init(currentContext);
        //     }
        // }
    }
    _initialized = false;
    getBreadcrumbType(str: string) {
        return BreadcrumbType[str];
    }
    init(conf: Configuration | ConfigurationOptions | string): Promise<any> {
        if (!this._initialized) {
            this.config = conf instanceof Configuration ? conf : new Configuration(typeof conf === 'object' ? conf : { apiKey: conf });
            return new Promise((resolve, reject) => {
                const nConfig = this.config.getNative();
                Bugsnag.startBugsnagWithConfiguration(nConfig);
                this._initialized = true;
                resolve(this._initialized);
            });
        }
        return Promise.resolve(this._initialized);
    }
    leaveBreadcrumb(message: string, bType?: any, metaData?: { [k: string]: string }) {
        if (this._initialized) {
            if (message.length > BREADCRUMB_MAX_LENGTH) {
                cwarn(`Breadcrumb name exceeds ${BREADCRUMB_MAX_LENGTH} characters (it has ${message.length}): ${name}. It will be truncated.`);
            }
            if (bType || metaData) {
                Bugsnag.leaveBreadcrumbWithBlock((report: BugsnagBreadcrumb) => {
                    report.metadata = getNativeMap(metaData);
                    report.name = message;
                    report.type = bType as number;
                });
            } else {
                Bugsnag.leaveBreadcrumbWithMessage(message);
            }
        }
    }
    setUser(id: string, email: string, name: string) {
        if (this._initialized) {
            Bugsnag.configuration().setUserWithNameAndEmail(id, name, email);
        }
    }
    setUserId(id: string) {
        cerror('not implemented on iOS');
    }
    setUserEmail(email: string) {
        cerror('not implemented on iOS');
    }
    setUserName(name: string) {
        cerror('not implemented on iOS');
    }
    startSession() {
        if (this._initialized) {
            Bugsnag.startSession();
        }
    }
    stopSession() {
        if (this._initialized) {
            Bugsnag.stopSession();
        }
    }
    resumeSession() {
        if (this._initialized) {
            Bugsnag.resumeSession();
        }
    }

    clearTab(name: string) {
        Bugsnag.clearTabWithName(name);
    }
    public addToTab(tab: string, name: string, value: any) {
        Bugsnag.addAttributeWithValueToTabWithName(name, value, tab);
    }

    /**
     * clear custom user data and reset to the default device identifier
     */
    clearUser() {
        if (this._initialized) {
            Bugsnag.configuration().setUserWithNameAndEmail(null, null, null);
        }
    }

    handleNotify(options) {
        if (this._initialized) {
            return new Promise(resolve => {
                const exception = NSException.exceptionWithNameReasonUserInfo(options.errorClass || 'JavascriptError', options.errorMessage, null);
                Bugsnag.internalClientNotifyWithDataBlock(exception, getNativeMap(options), (report: BugsnagCrashReport) => {
                    if (options.stacktrace) {
                        // const isHermes = options.stacktrace.match(hermesStacktraceFormatRe);
                        const frames = [];
                        options.stacktrace.split('\n').forEach(frame => {
                            // if (isHermes) {
                            const result = serialiseHermesFrame(frame.trim());
                            if (result) {
                                frames.push(result);
                            }

                            // } else {
                            // frames.addObject(serialiseJsCoreFrame(frame.trim()));
                            // }
                        });
                        report.attachCustomStacktraceWithType(frames, 'browserjs');
                    }
                    if (options.context) {
                        report.context = options.context;
                    }
                    if (options.groupingHash) {
                        report.context = options.groupingHash;
                    }
                    if (options.metadata) {
                        report.metaData = getNativeMap(options.metadata);
                    }
                    resolve();
                });
            });
        }
        return Promise.reject('not_initialized');
    }
}
function onBeforeSendReport(rawData, report: BugsnagCrashReport) {
    // clog('onBeforeSendReport', report, report.errorMessage, report.errorClass, report.error);
    return true;
}
export class Configuration extends BaseNative<BugsnagConfiguration, ConfigurationOptions> {
    @nativeProperty apiKey: string;
    // @nativeProperty({
    //     nativeGetterName: 'autoDetectErrors',
    //     nativeSetterName: 'autoDetectErrors'
    // })
    autoNotify: boolean = true;
    notifyReleaseStages: string[];
    @nativeProperty({
        nativeGetterName: 'reportOOMs',
        nativeSetterName: 'reportOOMs'
    })
    @nativeProperty detectAnrs: boolean;

    @nativeProperty autoTrackSessions: boolean;
    @nativeProperty appVersion: string;
    @nativeProperty buildUUID: string;
    @nativeProperty sessionEndpoint: string;
    @nativeProperty endpoint: string;
    @nativeProperty codeBundleId: string;
    @nativeProperty releaseStage: string;
    @nativeProperty context: string;
    @nativeProperty notifierType: string;
    @nativeProperty automaticallyCollectBreadcrumbs: boolean;

    createNative(options?: ConfigurationOptions) {
        const result = BugsnagConfiguration.new();
        result.addBeforeSendBlock(onBeforeSendReport);
        return result;
    }
    /**
     * whether reports should be sent to Bugsnag, based on the release stage
     * configuration
     */
    shouldNotify() {
        return !this.options.releaseStage || !this.options.notifyReleaseStages || this.options.notifyReleaseStages.indexOf(this.options.releaseStage) !== -1;
    }

    set beforeSend(callback: (report: Report) => boolean) {
        this.getNative().addBeforeSendBlock(function(rawData, report) {
            return callback(new Report(report));
        });
    }
}
