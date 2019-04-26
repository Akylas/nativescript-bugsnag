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

const stackTraceRegex = /(.*)@(?:(.*):([0-9]+):([0-9]+)|(\[.*\]))/g;

function BSGParseJavaScriptStacktrace(stacktrace: string) {
    if (!stacktrace) {
        return null;
    }
    const frames = NSMutableArray.new();
    let match = stackTraceRegex.exec(stacktrace);
    const bundleURL = NSBundle.mainBundle.bundleURL;

    while (match != null) {
        const frame = NSMutableDictionary.new();
        frame.setObjectForKey(match[1], 'method');
        if (!!match[2]) {
            frame.setObjectForKey(parseInt(match[4], 10), 'columnNumber');
            frame.setObjectForKey(parseInt(match[3], 10), 'lineNumber');
            frame.setObjectForKey(
                match[2]
                    .replace('file:///', '')
                    .replace(bundleURL.absoluteString, '')
                    .replace(bundleURL.path, ''),
                'file'
            );
        } else {
            // native code ignore line/column
            frame.setObjectForKey(0, 'columnNumber');
            frame.setObjectForKey(0, 'lineNumber');
            frame.setObjectForKey(match[5], 'file');
        }

        frames.addObject(frame);
        match = stackTraceRegex.exec(stacktrace);
    }
    // const methodSeparator = '@';
    // const locationSeparator = ':';
    // const lines = stacktrace.split('\n');
    // const frames = NSMutableArray.alloc().initWithCapacity(lines.length);
    // lines.forEach(line => {
    //     const frame = NSMutableDictionary.new();
    //     let location = line;
    //     let index = location.indexOf(methodSeparator);
    //     if (index !== -1) {
    //         frame.setObjectForKey(location.substring(index), 'method');
    //     }
    //     index = location.lastIndexOf(locationSeparator);
    //     if (index !== -1) {
    //         frame.setObjectForKey(location.substring(index), 'columnNumber');
    //         location = location.substring(0, index);
    //     }
    //     index = location.lastIndexOf(locationSeparator);
    //     if (index !== -1) {
    //         frame.setObjectForKey(location.substring(index), 'lineNumber');
    //         location = location.substring(0, index);
    //     }
    //     const bundleURL = NSBundle.mainBundle.bundleURL;
    //     index = location.indexOf(bundleURL.absoluteString);
    //     if (index !== -1) {
    //         location = bundleURL.absoluteString;
    //     } else {
    //         index = location.indexOf(bundleURL.path);
    //         if (index !== -1) {
    //             location = bundleURL.path;
    //         }
    //     }
    //     frame.setObjectForKey(location, 'file');
    //     frames.addObject(frame);
    // });
    // for (NSString *line in lines) {
    //     NSMutableDictionary *frame = [NSMutableDictionary new];
    //     NSString *location = line;
    //     NSRange methodRange = [line rangeOfCharacterFromSet:methodSeparator];
    //     if (methodRange.location != NSNotFound) {
    //         frame[@"method"] = [line substringToIndex:methodRange.location];
    //         location = [line substringFromIndex:methodRange.location + 1];
    //     }
    //     NSRange search = [location rangeOfCharacterFromSet:locationSeparator options:NSBackwardsSearch];
    //     if (search.location != NSNotFound) {
    //         NSRange matchRange = NSMakeRange(search.location + 1, location.length - search.location - 1);
    //         NSNumber *value = [formatter numberFromString:[location substringWithRange:matchRange]];
    //         if (value) {
    //             frame[@"columnNumber"] = value;
    //             location = [location substringToIndex:search.location];
    //         }
    //     }
    //     search = [location rangeOfCharacterFromSet:locationSeparator options:NSBackwardsSearch];
    //     if (search.location != NSNotFound) {
    //         NSRange matchRange = NSMakeRange(search.location + 1, location.length - search.location - 1);
    //         NSNumber *value = [formatter numberFromString:[location substringWithRange:matchRange]];
    //         if (value) {
    //             frame[@"lineNumber"] = value;
    //             location = [location substringToIndex:search.location];
    //         }
    //     }
    //     NSURL *bundleURL = [[NSBundle mainBundle] bundleURL];
    //     search = [location rangeOfString:[bundleURL absoluteString]];
    //     if (search.location != NSNotFound) {
    //         location = [location substringFromIndex:search.location + search.length];
    //     } else {
    //         search = [location rangeOfString:[bundleURL path]];
    //         if (search.location != NSNotFound)
    //             location = [location substringFromIndex:search.location + search.length + 1];
    //     }
    //     frame[@"file"] = location;
    //     [frames addObject:frame];
    // }
    return frames;
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
        if (this._initialized) {
            return new Promise(resolve => {
                const exception = NSException.exceptionWithNameReasonUserInfo(options.errorClass || 'JavascriptError', options.errorMessage, null);
                Bugsnag.internalClientNotifyWithDataBlock(exception, getNativeMap(options), (report: BugsnagCrashReport) => {
                    if (options.stacktrace) {
                        report.attachCustomStacktraceWithType(BSGParseJavaScriptStacktrace(options.stacktrace), 'JS');
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
    clog('onBeforeSendReport', report);
    return true;
}
export class Configuration extends BaseNative<BugsnagConfiguration, ConfigurationOptions> {
    @nativeProperty apiKey: string;
    autoNotify: boolean = true;
    notifyReleaseStages: string[];
    @nativeProperty sendThreads: boolean;
    @nativeProperty autoCaptureSessions: boolean;
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
    @nativeProperty notifierType: number;
    @nativeProperty persistUserBetweenSessions: boolean;
    @nativeProperty ignoreClasses: boolean;
    @nativeProperty notifyForReleaseStage: boolean;
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
