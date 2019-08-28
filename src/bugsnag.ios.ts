import { BaseNative, BREADCRUMB_MAX_LENGTH, cerror, ClientBase, clog, createGetter, createSetter, cwarn } from './bugsnag.common';
import { ConfigurationOptions, NativePropertyOptions } from './bugsnag';

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
        /// this must be a factory
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
        if (prop !== undefined) {
            if (typeof prop === 'object') {
                dict.setObjectForKey(getNativeMap(prop), p);
            } else {
                dict.setObjectForKey(prop, p);
            }
        }
    }
    return dict;
}
function getNativeStackTrace(error: Error) {
    if (!error || !error.stack) {
        return null;
    }
    const stack = error.stack.split('\n');
    const array = Array.create(java.lang.StackTraceElement, stack.length);
    stack.forEach((s, i) => {
        array[i] = s;
    });

    return array;
}

const lineColRe = /:\d+:\d+$/;
const nsFilePathRe = /(file|webpack):\/\/\/.*?app\//g;
const hermesStacktraceFormatRe = /[\s\t]*at\s+.*?\s*?\(.*?(\d+:\d+)?\)/gs;

function serialiseJsCoreFrame(frame: string) {
    const writer = NSMutableDictionary.new();
    // expected format is as follows:
    //   release:
    //     "$method@$filename:$lineNumber:$columnNumber"
    //   dev:
    //     "$method@?uri:$lineNumber:$columnNumber"

    const methodComponents = frame.split('@', 2);
    let fragment = methodComponents[0];
    if (methodComponents.length === 2) {
        writer.setObjectForKey(methodComponents[0], 'method');
        fragment = methodComponents[1];
    }

    const columnIndex = fragment.lastIndexOf(':');
    if (columnIndex !== -1) {
        const columnString = fragment.substring(columnIndex + 1);
        const columnNumber = parseInt(columnString, 10);

        if (columnNumber != null) {
            writer.setObjectForKey(columnNumber, 'columnNumber');
        }
        fragment = fragment.substring(0, columnIndex);
    }

    const lineNumberIndex = fragment.lastIndexOf(':');
    if (lineNumberIndex !== -1) {
        const lineNumberString = fragment.substring(lineNumberIndex + 1);
        const lineNumber = parseInt(lineNumberString, 10);

        if (lineNumber != null) {
            writer.setObjectForKey(lineNumber, 'lineNumber');
        }
        fragment = fragment.substring(0, lineNumberIndex);
    }

    writer.setObjectForKey('file', fragment.replace(nsFilePathRe, ''));

    return writer;
}

function serialiseHermesFrame(frame: string) {
    // expected format is as follows:
    //   release
    //     "at $method (address at $filename:$lineNumber:$columnNumber)"
    //   dev
    //     "at $method ($filename:$lineNumber:$columnNumber)"
    const writer = NSMutableDictionary.new();

    const srcInfoStart = Math.max(frame.lastIndexOf(' '), frame.lastIndexOf('('));
    const srcInfoEnd = frame.lastIndexOf(')');
    const hasSrcInfo = srcInfoStart > -1 && srcInfoStart < srcInfoEnd;

    const methodStart = frame.indexOf('at ') !== -1 ? 'at '.length : 0;
    const methodEnd = frame.indexOf('(');
    const hasMethodInfo = methodStart < methodEnd;

    // serialise srcInfo
    if (hasSrcInfo || hasMethodInfo) {
        writer.setObjectForKey(frame.substring(methodStart, methodEnd), 'method');
        if (hasSrcInfo) {
            const srcInfo = frame.substring(srcInfoStart + 1, srcInfoEnd);
            // matches `:123:34` at the end of a string such as "index.android.bundle:123:34"
            // so that we can extract just the filename portion "index.android.bundle"
            const file = srcInfo.startsWith('[') ? srcInfo : srcInfo.replace(lineColRe, '').replace(nsFilePathRe, '');

            writer.setObjectForKey(file, 'file');

            const chunks = srcInfo.split(':');
            if (chunks.length >= 2) {
                const lineNumber = parseInt(chunks[chunks.length - 2], 10);
                const columnNumber = parseInt(chunks[chunks.length - 1], 10);

                if (lineNumber != null) {
                    writer.setObjectForKey(lineNumber, 'lineNumber');
                }
                if (columnNumber != null) {
                    writer.setObjectForKey(columnNumber, 'columnNumber');
                }
                // clog('frame test', frame, frame.substring(methodStart, methodEnd), lineNumber, columnNumber, srcInfo, file);
            }
        }
    }
    return writer;
}
// function BSGParseJavaScriptStacktrace(stacktrace: string) {
//     if (!stacktrace) {
//         return null;
//     }
//     const frames = NSMutableArray.new();
//     let match = stackTraceRegex.exec(stacktrace);
//     // const bundleURL = NSBundle.mainBundle.bundleURL;
//     while (match != null) {
//         const frame = NSMutableDictionary.new();
//         if (!!match[1]) {
//             frame.setObjectForKey(match[1], 'method');
//         }
//         if (!!match[2]) {
//             frame.setObjectForKey(parseInt(match[4], 10), 'columnNumber');
//             frame.setObjectForKey(parseInt(match[3], 10), 'lineNumber');
//             frame.setObjectForKey(match[2].replace(nsFilePathRe, ''), 'file');
//             console.log('stack frame', stacktrace, parseInt(match[4], 10), parseInt(match[3], 10), match[2].replace(nsFilePathRe, ''));
//         } else {
//             // native code ignore line/column
//             frame.setObjectForKey(0, 'columnNumber');
//             frame.setObjectForKey(0, 'lineNumber');
//             frame.setObjectForKey(match[5].replace(nsFilePathRe, ''), 'file');
//         }

//         frames.addObject(frame);
//         match = stackTraceRegex.exec(stacktrace);
//     }
//     // const methodSeparator = '@';
//     // const locationSeparator = ':';
//     // const lines = stacktrace.split('\n');
//     // const frames = NSMutableArray.alloc().initWithCapacity(lines.length);
//     // lines.forEach(line => {
//     //     const frame = NSMutableDictionary.new();
//     //     let location = line;
//     //     let index = location.indexOf(methodSeparator);
//     //     if (index !== -1) {
//     //         frame.setObjectForKey(location.substring(index), 'method');
//     //     }
//     //     index = location.lastIndexOf(locationSeparator);
//     //     if (index !== -1) {
//     //         frame.setObjectForKey(location.substring(index), 'columnNumber');
//     //         location = location.substring(0, index);
//     //     }
//     //     index = location.lastIndexOf(locationSeparator);
//     //     if (index !== -1) {
//     //         frame.setObjectForKey(location.substring(index), 'lineNumber');
//     //         location = location.substring(0, index);
//     //     }
//     //     const bundleURL = NSBundle.mainBundle.bundleURL;
//     //     index = location.indexOf(bundleURL.absoluteString);
//     //     if (index !== -1) {
//     //         location = bundleURL.absoluteString;
//     //     } else {
//     //         index = location.indexOf(bundleURL.path);
//     //         if (index !== -1) {
//     //             location = bundleURL.path;
//     //         }
//     //     }
//     //     frame.setObjectForKey(location, 'file');
//     //     frames.addObject(frame);
//     // });
//     // for (NSString *line in lines) {
//     //     NSMutableDictionary *frame = [NSMutableDictionary new];
//     //     NSString *location = line;
//     //     NSRange methodRange = [line rangeOfCharacterFromSet:methodSeparator];
//     //     if (methodRange.location != NSNotFound) {
//     //         frame[@"method"] = [line substringToIndex:methodRange.location];
//     //         location = [line substringFromIndex:methodRange.location + 1];
//     //     }
//     //     NSRange search = [location rangeOfCharacterFromSet:locationSeparator options:NSBackwardsSearch];
//     //     if (search.location != NSNotFound) {
//     //         NSRange matchRange = NSMakeRange(search.location + 1, location.length - search.location - 1);
//     //         NSNumber *value = [formatter numberFromString:[location substringWithRange:matchRange]];
//     //         if (value) {
//     //             frame[@"columnNumber"] = value;
//     //             location = [location substringToIndex:search.location];
//     //         }
//     //     }
//     //     search = [location rangeOfCharacterFromSet:locationSeparator options:NSBackwardsSearch];
//     //     if (search.location != NSNotFound) {
//     //         NSRange matchRange = NSMakeRange(search.location + 1, location.length - search.location - 1);
//     //         NSNumber *value = [formatter numberFromString:[location substringWithRange:matchRange]];
//     //         if (value) {
//     //             frame[@"lineNumber"] = value;
//     //             location = [location substringToIndex:search.location];
//     //         }
//     //     }
//     //     NSURL *bundleURL = [[NSBundle mainBundle] bundleURL];
//     //     search = [location rangeOfString:[bundleURL absoluteString]];
//     //     if (search.location != NSNotFound) {
//     //         location = [location substringFromIndex:search.location + search.length];
//     //     } else {
//     //         search = [location rangeOfString:[bundleURL path]];
//     //         if (search.location != NSNotFound)
//     //             location = [location substringFromIndex:search.location + search.length + 1];
//     //     }
//     //     frame[@"file"] = location;
//     //     [frames addObject:frame];
//     // }
//     return frames;
// }

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
    /**
     * Clear custom user data and reset to the default device identifier
     */
    clearUser() {
        if (this._initialized) {
            Bugsnag.configuration().setUserWithNameAndEmail(null, null, null);
        }
    }

    handleNotify(options) {
        // clog('handleNotify', options, this._initialized);
        if (this._initialized) {
            return new Promise(resolve => {
                const exception = NSException.exceptionWithNameReasonUserInfo(options.errorClass || 'JavascriptError', options.errorMessage, null);
                Bugsnag.internalClientNotifyWithDataBlock(exception, getNativeMap(options), (report: BugsnagCrashReport) => {
                    if (options.stacktrace) {
                        const isHermes = options.stacktrace.match(hermesStacktraceFormatRe);
                        const frames = NSMutableArray.new();
                        options.stacktrace.split('\n').forEach(frame => {
                            if (isHermes) {
                                frames.addObject(serialiseHermesFrame(frame.trim()));
                            } else {
                                frames.addObject(serialiseJsCoreFrame(frame.trim()));
                            }
                        });
                        report.attachCustomStacktraceWithType(frames, 'browserJs');
                        // report.attachCustomStacktraceWithType(BSGParseJavaScriptStacktrace(options.stacktrace), 'browserJs');
                    }
                    if (options.context) {
                        report.context = options.context;
                    }
                    if (options.groupingHash) {
                        report.context = options.groupingHash;
                    }
                    if (options.metadata) {
                        report.metaData = getNativeMap(options);
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
    autoNotify: boolean = true;
    notifyReleaseStages: string[];
    @nativeProperty({
        nativeKey: 'shouldAutoCaptureSessions'
    })
    autoCaptureSessions: boolean;
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
     * Whether reports should be sent to Bugsnag, based on the release stage
     * configuration
     */
    shouldNotify() {
        return !this.options.releaseStage || !this.options.notifyReleaseStages || this.options.notifyReleaseStages.indexOf(this.options.releaseStage) !== -1;
    }

    set beforeSend(callback) {
        this.getNative().addBeforeSendBlock(function(rawData, report) {
            return callback(report);
        });
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
