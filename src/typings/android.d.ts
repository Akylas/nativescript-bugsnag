declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class AppData {
                public static class: java.lang.Class<com.bugsnag.android.AppData>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Async {
                public static class: java.lang.Class<com.bugsnag.android.Async>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class BadResponseException {
                public static class: java.lang.Class<com.bugsnag.android.BadResponseException>;
                public constructor(param0: string, param1: number);
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class BeforeNotify {
                public static class: java.lang.Class<com.bugsnag.android.BeforeNotify>;
                /**
                 * Constructs a new instance of the com.bugsnag.android.BeforeNotify interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { run(param0: com.bugsnag.android.Error): boolean });
                public constructor();
                public run(param0: com.bugsnag.android.Error): boolean;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class BeforeRecordBreadcrumb {
                public static class: java.lang.Class<com.bugsnag.android.BeforeRecordBreadcrumb>;
                /**
                 * Constructs a new instance of the com.bugsnag.android.BeforeRecordBreadcrumb interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { shouldRecord(param0: com.bugsnag.android.Breadcrumb): boolean });
                public constructor();
                public shouldRecord(param0: com.bugsnag.android.Breadcrumb): boolean;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class BeforeSend {
                public static class: java.lang.Class<com.bugsnag.android.BeforeSend>;
                /**
                 * Constructs a new instance of the com.bugsnag.android.BeforeSend interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { run(param0: com.bugsnag.android.Report): boolean });
                public constructor();
                public run(param0: com.bugsnag.android.Report): boolean;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class BlockedThreadDetector {
                public static class: java.lang.Class<com.bugsnag.android.BlockedThreadDetector>;
            }
            export namespace BlockedThreadDetector {
                export class Delegate {
                    public static class: java.lang.Class<com.bugsnag.android.BlockedThreadDetector.Delegate>;
                    /**
                     * Constructs a new instance of the com.bugsnag.android.BlockedThreadDetector$Delegate interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                     */
                    public constructor(implementation: { onThreadBlocked(param0: java.lang.Thread): void });
                    public constructor();
                    public onThreadBlocked(param0: java.lang.Thread): void;
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Breadcrumb extends com.bugsnag.android.JsonStream.Streamable {
                public static class: java.lang.Class<com.bugsnag.android.Breadcrumb>;
                public getMetadata(): java.util.Map<string, string>;
                public getTimestamp(): string;
                public getName(): string;
                public getType(): com.bugsnag.android.BreadcrumbType;
                public toStream(param0: com.bugsnag.android.JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class BreadcrumbType {
                public static class: java.lang.Class<com.bugsnag.android.BreadcrumbType>;
                public static ERROR: com.bugsnag.android.BreadcrumbType;
                public static LOG: com.bugsnag.android.BreadcrumbType;
                public static MANUAL: com.bugsnag.android.BreadcrumbType;
                public static NAVIGATION: com.bugsnag.android.BreadcrumbType;
                public static PROCESS: com.bugsnag.android.BreadcrumbType;
                public static REQUEST: com.bugsnag.android.BreadcrumbType;
                public static STATE: com.bugsnag.android.BreadcrumbType;
                public static USER: com.bugsnag.android.BreadcrumbType;
                public static values(): native.Array<com.bugsnag.android.BreadcrumbType>;
                public static valueOf(param0: string): com.bugsnag.android.BreadcrumbType;
                public toString(): string;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Breadcrumbs implements com.bugsnag.android.JsonStream.Streamable {
                public static class: java.lang.Class<com.bugsnag.android.Breadcrumbs>;
                public toStream(param0: com.bugsnag.android.JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Bugsnag {
                public static class: java.lang.Class<com.bugsnag.android.Bugsnag>;
                public static beforeNotify(param0: com.bugsnag.android.BeforeNotify): void;
                public static disableExceptionHandler(): void;
                public static resumeSession(): boolean;
                public static setAppVersion(param0: string): void;
                public static setMaxBreadcrumbs(param0: number): void;
                public static getClient(): com.bugsnag.android.Client;
                public static setMetaData(param0: com.bugsnag.android.MetaData): void;
                public static getMetaData(): com.bugsnag.android.MetaData;
                public static setUserEmail(param0: string): void;
                public static setReleaseStage(param0: string): void;
                public static setSendThreads(param0: boolean): void;
                public static startSession(): void;
                public static setLoggingEnabled(param0: boolean): void;
                public static notify(param0: java.lang.Throwable, param1: com.bugsnag.android.MetaData): void;
                public static clearUser(): void;
                public static getContext(): string;
                public static setContext(param0: string): void;
                public static notify(param0: java.lang.Throwable, param1: com.bugsnag.android.Callback): void;
                public static setAutoCaptureSessions(param0: boolean): void;
                public static setBuildUUID(param0: string): void;
                public static setSessionTrackingApiClient(param0: com.bugsnag.android.SessionTrackingApiClient): void;
                public static setIgnoreClasses(param0: native.Array<string>): void;
                public static setProjectPackages(param0: native.Array<string>): void;
                public static clearTab(param0: string): void;
                public static setFilters(param0: native.Array<string>): void;
                public static enableExceptionHandler(): void;
                public static stopSession(): void;
                public static setErrorReportApiClient(param0: com.bugsnag.android.ErrorReportApiClient): void;
                public static addToTab(param0: string, param1: string, param2: any): void;
                public static setEndpoint(param0: string): void;
                public static clearBreadcrumbs(): void;
                public static init(param0: globalAndroid.content.Context, param1: string, param2: boolean): com.bugsnag.android.Client;
                public static leaveBreadcrumb(param0: string): void;
                public static notify(
                    param0: string,
                    param1: string,
                    param2: string,
                    param3: native.Array<java.lang.StackTraceElement>,
                    param4: com.bugsnag.android.Severity,
                    param5: com.bugsnag.android.MetaData
                ): void;
                public static setNotifyReleaseStages(param0: native.Array<string>): void;
                public static notify(param0: java.lang.Throwable, param1: com.bugsnag.android.Severity, param2: com.bugsnag.android.MetaData): void;
                public static notify(
                    param0: string,
                    param1: string,
                    param2: native.Array<java.lang.StackTraceElement>,
                    param3: com.bugsnag.android.Severity,
                    param4: com.bugsnag.android.MetaData
                ): void;
                public static init(param0: globalAndroid.content.Context): com.bugsnag.android.Client;
                public static init(param0: globalAndroid.content.Context, param1: com.bugsnag.android.Configuration): com.bugsnag.android.Client;
                public static internalClientNotify(param0: java.lang.Throwable, param1: java.util.Map<string, any>, param2: boolean, param3: com.bugsnag.android.Callback): void;
                public static leaveBreadcrumb(param0: string, param1: com.bugsnag.android.BreadcrumbType, param2: java.util.Map<string, string>): void;
                public static notify(param0: java.lang.Throwable): void;
                public static init(param0: globalAndroid.content.Context, param1: string): com.bugsnag.android.Client;
                public static beforeRecordBreadcrumb(param0: com.bugsnag.android.BeforeRecordBreadcrumb): void;
                public static setUserName(param0: string): void;
                public static setUser(param0: string, param1: string, param2: string): void;
                public static notify(param0: java.lang.Throwable, param1: com.bugsnag.android.Severity): void;
                public static notify(param0: string, param1: string, param2: native.Array<java.lang.StackTraceElement>, param3: com.bugsnag.android.Callback): void;
                public static setUserId(param0: string): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class BugsnagException {
                public static class: java.lang.Class<com.bugsnag.android.BugsnagException>;
                public constructor(param0: string, param1: string, param2: native.Array<java.lang.StackTraceElement>);
                public getName(): string;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class CachedThread extends com.bugsnag.android.JsonStream.Streamable {
                public static class: java.lang.Class<com.bugsnag.android.CachedThread>;
                public toStream(param0: com.bugsnag.android.JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Callback {
                public static class: java.lang.Class<com.bugsnag.android.Callback>;
                /**
                 * Constructs a new instance of the com.bugsnag.android.Callback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { beforeNotify(param0: com.bugsnag.android.Report): void });
                public constructor();
                public beforeNotify(param0: com.bugsnag.android.Report): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Client {
                public static class: java.lang.Class<com.bugsnag.android.Client>;
                public config: com.bugsnag.android.Configuration;
                public deviceData: com.bugsnag.android.DeviceData;
                public appData: com.bugsnag.android.AppData;
                public errorStore: com.bugsnag.android.ErrorStore;
                public notifyBlocking(param0: java.lang.Throwable): void;
                public setSendThreads(param0: boolean): void;
                public setUserId(param0: string): void;
                public getMetaData(): com.bugsnag.android.MetaData;
                public notify(param0: java.lang.Throwable, param1: com.bugsnag.android.Severity): void;
                public setMetaData(param0: com.bugsnag.android.MetaData): void;
                public getLaunchTimeMs(): number;
                public internalClientNotify(param0: java.lang.Throwable, param1: java.util.Map<string, any>, param2: boolean, param3: com.bugsnag.android.Callback): void;
                public notify(param0: java.lang.Throwable, param1: com.bugsnag.android.MetaData): void;
                public setMaxBreadcrumbs(param0: number): void;
                public notify(
                    param0: string,
                    param1: string,
                    param2: string,
                    param3: native.Array<java.lang.StackTraceElement>,
                    param4: com.bugsnag.android.Severity,
                    param5: com.bugsnag.android.MetaData
                ): void;
                public notifyBlocking(param0: string, param1: string, param2: native.Array<java.lang.StackTraceElement>, param3: com.bugsnag.android.Callback): void;
                public setUserName(param0: string): void;
                public setUserEmail(param0: string): void;
                public notify(param0: java.lang.Throwable): void;
                public startSession(): void;
                public notifyBlocking(param0: java.lang.Throwable, param1: com.bugsnag.android.Severity): void;
                public setUser(param0: string, param1: string, param2: string): void;
                public enableExceptionHandler(): void;
                public setAppVersion(param0: string): void;
                public beforeNotify(param0: com.bugsnag.android.BeforeNotify): void;
                public getConfig(): com.bugsnag.android.Configuration;
                public leaveBreadcrumb(param0: string): void;
                public clearBreadcrumbs(): void;
                public stopSession(): void;
                public getDeviceData(): com.bugsnag.android.DeviceData;
                public addToTab(param0: string, param1: string, param2: any): void;
                public disableExceptionHandler(): void;
                public notifyBlocking(
                    param0: string,
                    param1: string,
                    param2: native.Array<java.lang.StackTraceElement>,
                    param3: com.bugsnag.android.Severity,
                    param4: com.bugsnag.android.MetaData
                ): void;
                public setAutoCaptureSessions(param0: boolean): void;
                public update(param0: java.util.Observable, param1: any): void;
                public getAppData(): com.bugsnag.android.AppData;
                public resumeSession(): boolean;
                public notifyBlocking(
                    param0: string,
                    param1: string,
                    param2: string,
                    param3: native.Array<java.lang.StackTraceElement>,
                    param4: com.bugsnag.android.Severity,
                    param5: com.bugsnag.android.MetaData
                ): void;
                public clearUser(): void;
                public notify(param0: java.lang.Throwable, param1: com.bugsnag.android.Callback): void;
                public constructor(param0: globalAndroid.content.Context, param1: string);
                public notifyBlocking(param0: java.lang.Throwable, param1: com.bugsnag.android.Callback): void;
                public finalize(): void;
                public setProjectPackages(param0: native.Array<string>): void;
                public constructor(param0: globalAndroid.content.Context, param1: com.bugsnag.android.Configuration);
                public leaveBreadcrumb(param0: string, param1: com.bugsnag.android.BreadcrumbType, param2: java.util.Map<string, string>): void;
                public notify(param0: java.lang.Throwable, param1: com.bugsnag.android.Severity, param2: com.bugsnag.android.MetaData): void;
                public constructor(param0: globalAndroid.content.Context);
                public getBreadcrumbs(): java.util.Collection<com.bugsnag.android.Breadcrumb>;
                public setFilters(param0: native.Array<string>): void;
                public setBuildUUID(param0: string): void;
                public getUser(): com.bugsnag.android.User;
                public setContext(param0: string): void;
                public notify(param0: string, param1: string, param2: native.Array<java.lang.StackTraceElement>, param3: com.bugsnag.android.Callback): void;
                public constructor(param0: globalAndroid.content.Context, param1: string, param2: boolean);
                public setEndpoint(param0: string): void;
                public setReleaseStage(param0: string): void;
                public clearTab(param0: string): void;
                public notify(param0: string, param1: string, param2: native.Array<java.lang.StackTraceElement>, param3: com.bugsnag.android.Severity, param4: com.bugsnag.android.MetaData): void;
                public setLoggingEnabled(param0: boolean): void;
                public notifyBlocking(param0: java.lang.Throwable, param1: com.bugsnag.android.Severity, param2: com.bugsnag.android.MetaData): void;
                public setIgnoreClasses(param0: native.Array<string>): void;
                public startFirstSession(param0: globalAndroid.app.Activity): void;
                public setNotifyReleaseStages(param0: native.Array<string>): void;
                public beforeRecordBreadcrumb(param0: com.bugsnag.android.BeforeRecordBreadcrumb): void;
                public getContext(): string;
                public notifyBlocking(param0: java.lang.Throwable, param1: com.bugsnag.android.MetaData): void;
            }
            export namespace Client {
                export class ConnectivityChangeReceiver {
                    public static class: java.lang.Class<com.bugsnag.android.Client.ConnectivityChangeReceiver>;
                    public onReceive(param0: globalAndroid.content.Context, param1: globalAndroid.content.Intent): void;
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ConfigFactory {
                public static class: java.lang.Class<com.bugsnag.android.ConfigFactory>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Configuration {
                public static class: java.lang.Class<com.bugsnag.android.Configuration>;
                public getSendThreads(): boolean;
                public setSendThreads(param0: boolean): void;
                public getMetaData(): com.bugsnag.android.MetaData;
                public setMetaData(param0: com.bugsnag.android.MetaData): void;
                public inProject(param0: string): boolean;
                public setSessionEndpoint(param0: string): void;
                public beforeSend(param0: com.bugsnag.android.BeforeSend): void;
                public setMaxBreadcrumbs(param0: number): void;
                public shouldAutoCaptureSessions(): boolean;
                public getBeforeSendTasks(): java.util.Collection<com.bugsnag.android.BeforeSend>;
                public setAppVersion(param0: string): void;
                public setLaunchCrashThresholdMs(param0: number): void;
                public beforeNotify(param0: com.bugsnag.android.BeforeNotify): void;
                public getDetectAnrs(): boolean;
                public setAutoCaptureSessions(param0: boolean): void;
                public update(param0: java.util.Observable, param1: any): void;
                public setEnableExceptionHandler(param0: boolean): void;
                public getCodeBundleId(): string;
                public setDelivery(param0: com.bugsnag.android.Delivery): void;
                public getNotifyReleaseStages(): native.Array<string>;
                public getNotifierType(): string;
                public getBuildUUID(): string;
                public getProjectPackages(): native.Array<string>;
                public setDetectAnrs(param0: boolean): void;
                public getIgnoreClasses(): native.Array<string>;
                public setProjectPackages(param0: native.Array<string>): void;
                public constructor(param0: string);
                public getBeforeRecordBreadcrumbTasks(): java.util.Collection<com.bugsnag.android.BeforeRecordBreadcrumb>;
                public shouldNotifyForReleaseStage(param0: string): boolean;
                public getLaunchCrashThresholdMs(): number;
                public getReleaseStage(): string;
                public isAutomaticallyCollectingBreadcrumbs(): boolean;
                public getPersistUserBetweenSessions(): boolean;
                public getDelivery(): com.bugsnag.android.Delivery;
                public getApiKey(): string;
                public getMaxBreadcrumbs(): number;
                public setFilters(param0: native.Array<string>): void;
                public getAutoCaptureSessions(): boolean;
                public setBuildUUID(param0: string): void;
                public setAnrThresholdMs(param0: number): void;
                public setEndpoints(param0: string, param1: string): void;
                public setContext(param0: string): void;
                public shouldIgnoreClass(param0: string): boolean;
                public setCodeBundleId(param0: string): void;
                public setEndpoint(param0: string): void;
                public getFilters(): native.Array<string>;
                public getBeforeNotifyTasks(): java.util.Collection<com.bugsnag.android.BeforeNotify>;
                public setReleaseStage(param0: string): void;
                public setAutomaticallyCollectBreadcrumbs(param0: boolean): void;
                public getEndpoint(): string;
                public setPersistUserBetweenSessions(param0: boolean): void;
                public getSessionEndpoint(): string;
                public getAppVersion(): string;
                public getEnableExceptionHandler(): boolean;
                public setNotifierType(param0: string): void;
                public getAnrThresholdMs(): number;
                public setIgnoreClasses(param0: native.Array<string>): void;
                public setNotifyReleaseStages(param0: native.Array<string>): void;
                public getErrorApiHeaders(): java.util.Map<string, string>;
                public getSessionApiHeaders(): java.util.Map<string, string>;
                public beforeRecordBreadcrumb(param0: com.bugsnag.android.BeforeRecordBreadcrumb): void;
                public getContext(): string;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class DateUtils {
                public static class: java.lang.Class<com.bugsnag.android.DateUtils>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class DefaultDelivery extends com.bugsnag.android.Delivery {
                public static class: java.lang.Class<com.bugsnag.android.DefaultDelivery>;
                public deliver(param0: com.bugsnag.android.SessionTrackingPayload, param1: com.bugsnag.android.Configuration): void;
                public deliver(param0: com.bugsnag.android.Report, param1: com.bugsnag.android.Configuration): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Delivery {
                public static class: java.lang.Class<com.bugsnag.android.Delivery>;
                /**
                 * Constructs a new instance of the com.bugsnag.android.Delivery interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: {
                    deliver(param0: com.bugsnag.android.SessionTrackingPayload, param1: com.bugsnag.android.Configuration): void;
                    deliver(param0: com.bugsnag.android.Report, param1: com.bugsnag.android.Configuration): void;
                });
                public constructor();
                public deliver(param0: com.bugsnag.android.SessionTrackingPayload, param1: com.bugsnag.android.Configuration): void;
                public deliver(param0: com.bugsnag.android.Report, param1: com.bugsnag.android.Configuration): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class DeliveryCompat extends com.bugsnag.android.Delivery {
                public static class: java.lang.Class<com.bugsnag.android.DeliveryCompat>;
                public deliver(param0: com.bugsnag.android.SessionTrackingPayload, param1: com.bugsnag.android.Configuration): void;
                public deliver(param0: com.bugsnag.android.Report, param1: com.bugsnag.android.Configuration): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class DeliveryFailureException {
                public static class: java.lang.Class<com.bugsnag.android.DeliveryFailureException>;
                public constructor(param0: string, param1: java.lang.Throwable);
                public constructor(param0: string);
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class DeliveryStyle {
                public static class: java.lang.Class<com.bugsnag.android.DeliveryStyle>;
                public static SAME_THREAD: com.bugsnag.android.DeliveryStyle;
                public static ASYNC: com.bugsnag.android.DeliveryStyle;
                public static ASYNC_WITH_CACHE: com.bugsnag.android.DeliveryStyle;
                public static values(): native.Array<com.bugsnag.android.DeliveryStyle>;
                public static valueOf(param0: string): com.bugsnag.android.DeliveryStyle;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class DeviceData {
                public static class: java.lang.Class<com.bugsnag.android.DeviceData>;
            }
            export namespace DeviceData {
                export class Abi2Wrapper {
                    public static class: java.lang.Class<com.bugsnag.android.DeviceData.Abi2Wrapper>;
                }
                export class SupportedAbiWrapper {
                    public static class: java.lang.Class<com.bugsnag.android.DeviceData.SupportedAbiWrapper>;
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Error extends com.bugsnag.android.JsonStream.Streamable {
                public static class: java.lang.Class<com.bugsnag.android.Error>;
                public getUser(): com.bugsnag.android.User;
                public setContext(param0: string): void;
                public setUserId(param0: string): void;
                public getMetaData(): com.bugsnag.android.MetaData;
                public setDeviceId(param0: string): void;
                public setMetaData(param0: com.bugsnag.android.MetaData): void;
                public getGroupingHash(): string;
                public addToTab(param0: string, param1: string, param2: any): void;
                public clearTab(param0: string): void;
                public getExceptionMessage(): string;
                public toStream(param0: com.bugsnag.android.JsonStream): void;
                public setGroupingHash(param0: string): void;
                public getSeverity(): com.bugsnag.android.Severity;
                public setUserName(param0: string): void;
                public getException(): java.lang.Throwable;
                public getExceptionName(): string;
                public setSeverity(param0: com.bugsnag.android.Severity): void;
                public setUserEmail(param0: string): void;
                public getContext(): string;
                public setUser(param0: string, param1: string, param2: string): void;
                public getDeviceData(): java.util.Map<string, any>;
            }
            export namespace Error {
                export class Builder {
                    public static class: java.lang.Class<com.bugsnag.android.Error.Builder>;
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ErrorReader {
                public static class: java.lang.Class<com.bugsnag.android.ErrorReader>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ErrorReportApiClient {
                public static class: java.lang.Class<com.bugsnag.android.ErrorReportApiClient>;
                /**
                 * Constructs a new instance of the com.bugsnag.android.ErrorReportApiClient interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { postReport(param0: string, param1: com.bugsnag.android.Report, param2: java.util.Map<string, string>): void });
                public constructor();
                public postReport(param0: string, param1: com.bugsnag.android.Report, param2: java.util.Map<string, string>): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ErrorStore extends com.bugsnag.android.FileStore<com.bugsnag.android.Error> {
                public static class: java.lang.Class<com.bugsnag.android.ErrorStore>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class EventReceiver {
                public static class: java.lang.Class<com.bugsnag.android.EventReceiver>;
                public static getIntentFilter(): globalAndroid.content.IntentFilter;
                public onReceive(param0: globalAndroid.content.Context, param1: globalAndroid.content.Intent): void;
                public constructor(param0: com.bugsnag.android.Client);
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ExceptionHandler {
                public static class: java.lang.Class<com.bugsnag.android.ExceptionHandler>;
                public uncaughtException(param0: java.lang.Thread, param1: java.lang.Throwable): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Exceptions extends com.bugsnag.android.JsonStream.Streamable {
                public static class: java.lang.Class<com.bugsnag.android.Exceptions>;
                public toStream(param0: com.bugsnag.android.JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export abstract class FileStore<T> extends java.lang.Object {
                public static class: java.lang.Class<com.bugsnag.android.FileStore<any>>;
                public config: com.bugsnag.android.Configuration;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class HandledState extends com.bugsnag.android.JsonStream.Streamable {
                public static class: java.lang.Class<com.bugsnag.android.HandledState>;
                public toStream(param0: com.bugsnag.android.JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class IOUtils {
                public static class: java.lang.Class<com.bugsnag.android.IOUtils>;
                public static closeQuietly(param0: java.io.Closeable): void;
                public static copy(param0: java.io.Reader, param1: java.io.Writer): number;
                public static close(param0: java.net.URLConnection): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class InternalApi {
                public static class: java.lang.Class<com.bugsnag.android.InternalApi>;
                /**
                 * Constructs a new instance of the com.bugsnag.android.InternalApi interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: {});
                public constructor();
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class JsonScope {
                public static class: java.lang.Class<com.bugsnag.android.JsonScope>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class JsonStream extends com.bugsnag.android.JsonWriter {
                public static class: java.lang.Class<com.bugsnag.android.JsonStream>;
                public value(param0: java.io.File): void;
                public name(param0: string): com.bugsnag.android.JsonWriter;
                public value(param0: number): com.bugsnag.android.JsonWriter;
                public value(param0: any): void;
                public name(param0: string): com.bugsnag.android.JsonStream;
                public value(param0: java.lang.Number): com.bugsnag.android.JsonWriter;
                public value(param0: boolean): com.bugsnag.android.JsonWriter;
                public value(param0: java.lang.Boolean): com.bugsnag.android.JsonWriter;
                public constructor(param0: java.io.Writer);
                public value(param0: string): com.bugsnag.android.JsonWriter;
                public value(param0: com.bugsnag.android.JsonStream.Streamable): void;
            }
            export namespace JsonStream {
                export class Streamable {
                    public static class: java.lang.Class<com.bugsnag.android.JsonStream.Streamable>;
                    /**
                     * Constructs a new instance of the com.bugsnag.android.JsonStream$Streamable interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                     */
                    public constructor(implementation: { toStream(param0: com.bugsnag.android.JsonStream): void });
                    public constructor();
                    public toStream(param0: com.bugsnag.android.JsonStream): void;
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class JsonWriter {
                public static class: java.lang.Class<com.bugsnag.android.JsonWriter>;
                public nullValue(): com.bugsnag.android.JsonWriter;
                public close(): void;
                public value(param0: number): com.bugsnag.android.JsonWriter;
                public beginArray(): com.bugsnag.android.JsonWriter;
                public beginObject(): com.bugsnag.android.JsonWriter;
                public value(param0: boolean): com.bugsnag.android.JsonWriter;
                public value(param0: java.lang.Boolean): com.bugsnag.android.JsonWriter;
                public value(param0: string): com.bugsnag.android.JsonWriter;
                public jsonValue(param0: string): com.bugsnag.android.JsonWriter;
                public flush(): void;
                public setIndent(param0: string): void;
                public setLenient(param0: boolean): void;
                public name(param0: string): com.bugsnag.android.JsonWriter;
                public isLenient(): boolean;
                public setHtmlSafe(param0: boolean): void;
                public value(param0: java.lang.Number): com.bugsnag.android.JsonWriter;
                public endArray(): com.bugsnag.android.JsonWriter;
                public getSerializeNulls(): boolean;
                public endObject(): com.bugsnag.android.JsonWriter;
                public constructor(param0: java.io.Writer);
                public isHtmlSafe(): boolean;
                public setSerializeNulls(param0: boolean): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Logger {
                public static class: java.lang.Class<com.bugsnag.android.Logger>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class MapUtils {
                public static class: java.lang.Class<com.bugsnag.android.MapUtils>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class MetaData implements com.bugsnag.android.JsonStream.Streamable {
                public static class: java.lang.Class<com.bugsnag.android.MetaData>;
                public constructor(param0: java.util.Map<string, any>);
                public addToTab(param0: string, param1: string, param2: any): void;
                public clearTab(param0: string): void;
                public constructor();
                public toStream(param0: com.bugsnag.android.JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class NativeInterface {
                public static class: java.lang.Class<com.bugsnag.android.NativeInterface>;
                public static configureClientObservers(param0: com.bugsnag.android.Client): void;
                public static getMetaData(): java.util.Map<string, any>;
                public static getLoggingEnabled(): boolean;
                public static getNativeReportPath(): string;
                public static setAppVersion(param0: string): void;
                public static deliverReport(param0: string, param1: string): void;
                public constructor();
                public static getUserData(): java.util.Map<string, string>;
                public static getAppData(): java.util.Map<string, any>;
                public static setNotifyReleaseStages(param0: native.Array<string>): void;
                public static getSessionEndpoint(): string;
                public static setReleaseStage(param0: string): void;
                public static setBinaryArch(param0: string): void;
                public static registerSession(param0: number, param1: string, param2: number, param3: number): void;
                public static getReleaseStage(): string;
                public static getContext(): string;
                public static setContext(param0: string): void;
                public static leaveBreadcrumb(param0: string, param1: com.bugsnag.android.BreadcrumbType): void;
                public static setUser(param0: string, param1: string, param2: string): void;
                public static getEndpoint(): string;
                public static getBreadcrumbs(): java.util.List<com.bugsnag.android.Breadcrumb>;
                public static getAppVersion(): string;
                public static setClient(param0: com.bugsnag.android.Client): void;
                public static setSessionEndpoint(param0: string): void;
                public static getCpuAbi(): native.Array<string>;
                public static leaveBreadcrumb(param0: string, param1: string, param2: java.util.Map<string, string>): void;
                public static notify(param0: string, param1: string, param2: com.bugsnag.android.Severity, param3: native.Array<java.lang.StackTraceElement>): void;
                public static addToTab(param0: string, param1: string, param2: any): void;
                public static getNotifyReleaseStages(): native.Array<string>;
                public static setEndpoint(param0: string): void;
                public static getDeviceData(): java.util.Map<string, any>;
            }
            export namespace NativeInterface {
                export class Message {
                    public static class: java.lang.Class<com.bugsnag.android.NativeInterface.Message>;
                    public type: com.bugsnag.android.NativeInterface.MessageType;
                    public value: any;
                    public constructor(param0: com.bugsnag.android.NativeInterface.MessageType, param1: any);
                }
                export class MessageType {
                    public static class: java.lang.Class<com.bugsnag.android.NativeInterface.MessageType>;
                    public static ADD_BREADCRUMB: com.bugsnag.android.NativeInterface.MessageType;
                    public static ADD_METADATA: com.bugsnag.android.NativeInterface.MessageType;
                    public static CLEAR_BREADCRUMBS: com.bugsnag.android.NativeInterface.MessageType;
                    public static CLEAR_METADATA_TAB: com.bugsnag.android.NativeInterface.MessageType;
                    public static DELIVER_PENDING: com.bugsnag.android.NativeInterface.MessageType;
                    public static INSTALL: com.bugsnag.android.NativeInterface.MessageType;
                    public static NOTIFY_HANDLED: com.bugsnag.android.NativeInterface.MessageType;
                    public static NOTIFY_UNHANDLED: com.bugsnag.android.NativeInterface.MessageType;
                    public static REMOVE_METADATA: com.bugsnag.android.NativeInterface.MessageType;
                    public static START_SESSION: com.bugsnag.android.NativeInterface.MessageType;
                    public static STOP_SESSION: com.bugsnag.android.NativeInterface.MessageType;
                    public static UPDATE_APP_VERSION: com.bugsnag.android.NativeInterface.MessageType;
                    public static UPDATE_BUILD_UUID: com.bugsnag.android.NativeInterface.MessageType;
                    public static UPDATE_CONTEXT: com.bugsnag.android.NativeInterface.MessageType;
                    public static UPDATE_IN_FOREGROUND: com.bugsnag.android.NativeInterface.MessageType;
                    public static UPDATE_LOW_MEMORY: com.bugsnag.android.NativeInterface.MessageType;
                    public static UPDATE_METADATA: com.bugsnag.android.NativeInterface.MessageType;
                    public static UPDATE_ORIENTATION: com.bugsnag.android.NativeInterface.MessageType;
                    public static UPDATE_RELEASE_STAGE: com.bugsnag.android.NativeInterface.MessageType;
                    public static UPDATE_USER_EMAIL: com.bugsnag.android.NativeInterface.MessageType;
                    public static UPDATE_USER_NAME: com.bugsnag.android.NativeInterface.MessageType;
                    public static UPDATE_USER_ID: com.bugsnag.android.NativeInterface.MessageType;
                    public static values(): native.Array<com.bugsnag.android.NativeInterface.MessageType>;
                    public static valueOf(param0: string): com.bugsnag.android.NativeInterface.MessageType;
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class NetworkException {
                public static class: java.lang.Class<com.bugsnag.android.NetworkException>;
                public constructor(param0: string, param1: java.lang.Throwable);
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Notifier extends com.bugsnag.android.JsonStream.Streamable {
                public static class: java.lang.Class<com.bugsnag.android.Notifier>;
                public getURL(): string;
                public setName(param0: string): void;
                public getVersion(): string;
                public static getInstance(): com.bugsnag.android.Notifier;
                public setURL(param0: string): void;
                public getName(): string;
                public setVersion(param0: string): void;
                public constructor();
                public toStream(param0: com.bugsnag.android.JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class NotifyType {
                public static class: java.lang.Class<com.bugsnag.android.NotifyType>;
                public static ALL: com.bugsnag.android.NotifyType;
                public static USER: com.bugsnag.android.NotifyType;
                public static APP: com.bugsnag.android.NotifyType;
                public static DEVICE: com.bugsnag.android.NotifyType;
                public static CONTEXT: com.bugsnag.android.NotifyType;
                public static RELEASE_STAGES: com.bugsnag.android.NotifyType;
                public static FILTERS: com.bugsnag.android.NotifyType;
                public static BREADCRUMB: com.bugsnag.android.NotifyType;
                public static META: com.bugsnag.android.NotifyType;
                public static fromInt(param0: java.lang.Integer): com.bugsnag.android.NotifyType;
                public getValue(): java.lang.Integer;
                public static values(): native.Array<com.bugsnag.android.NotifyType>;
                public static valueOf(param0: string): com.bugsnag.android.NotifyType;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ObjectJsonStreamer {
                public static class: java.lang.Class<com.bugsnag.android.ObjectJsonStreamer>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Report extends com.bugsnag.android.JsonStream.Streamable {
                public static class: java.lang.Class<com.bugsnag.android.Report>;
                public setNotifierURL(param0: string): void;
                public setNotifierVersion(param0: string): void;
                public setApiKey(param0: string): void;
                public getApiKey(): string;
                public getNotifier(): com.bugsnag.android.Notifier;
                public setNotifierName(param0: string): void;
                public getError(): com.bugsnag.android.Error;
                public toStream(param0: com.bugsnag.android.JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Session extends com.bugsnag.android.JsonStream.Streamable {
                public static class: java.lang.Class<com.bugsnag.android.Session>;
                public constructor(param0: string, param1: java.util.Date, param2: com.bugsnag.android.User, param3: boolean);
                public toStream(param0: com.bugsnag.android.JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class SessionStore extends com.bugsnag.android.FileStore<com.bugsnag.android.Session> {
                public static class: java.lang.Class<com.bugsnag.android.SessionStore>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class SessionTracker {
                public static class: java.lang.Class<com.bugsnag.android.SessionTracker>;
                public onActivityCreated(param0: globalAndroid.app.Activity, param1: globalAndroid.os.Bundle): void;
                public onActivityResumed(param0: globalAndroid.app.Activity): void;
                public onActivityDestroyed(param0: globalAndroid.app.Activity): void;
                public onActivityStarted(param0: globalAndroid.app.Activity): void;
                public onActivitySaveInstanceState(param0: globalAndroid.app.Activity, param1: globalAndroid.os.Bundle): void;
                public onActivityStopped(param0: globalAndroid.app.Activity): void;
                public onActivityPaused(param0: globalAndroid.app.Activity): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class SessionTrackingApiClient {
                public static class: java.lang.Class<com.bugsnag.android.SessionTrackingApiClient>;
                /**
                 * Constructs a new instance of the com.bugsnag.android.SessionTrackingApiClient interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { postSessionTrackingPayload(param0: string, param1: com.bugsnag.android.SessionTrackingPayload, param2: java.util.Map<string, string>): void });
                public constructor();
                public postSessionTrackingPayload(param0: string, param1: com.bugsnag.android.SessionTrackingPayload, param2: java.util.Map<string, string>): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class SessionTrackingPayload extends com.bugsnag.android.JsonStream.Streamable {
                public static class: java.lang.Class<com.bugsnag.android.SessionTrackingPayload>;
                public toStream(param0: com.bugsnag.android.JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Severity extends com.bugsnag.android.JsonStream.Streamable {
                public static class: java.lang.Class<com.bugsnag.android.Severity>;
                public static ERROR: com.bugsnag.android.Severity;
                public static WARNING: com.bugsnag.android.Severity;
                public static INFO: com.bugsnag.android.Severity;
                public static valueOf(param0: string): com.bugsnag.android.Severity;
                public static values(): native.Array<com.bugsnag.android.Severity>;
                public getName(): string;
                public toStream(param0: com.bugsnag.android.JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Stacktrace extends com.bugsnag.android.JsonStream.Streamable {
                public static class: java.lang.Class<com.bugsnag.android.Stacktrace>;
                public toStream(param0: com.bugsnag.android.JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class StrictModeHandler {
                public static class: java.lang.Class<com.bugsnag.android.StrictModeHandler>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ThreadSafe {
                public static class: java.lang.Class<com.bugsnag.android.ThreadSafe>;
                /**
                 * Constructs a new instance of the com.bugsnag.android.ThreadSafe interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: {});
                public constructor();
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ThreadState extends com.bugsnag.android.JsonStream.Streamable {
                public static class: java.lang.Class<com.bugsnag.android.ThreadState>;
                public constructor(
                    param0: com.bugsnag.android.Configuration,
                    param1: java.lang.Thread,
                    param2: java.util.Map<java.lang.Thread, native.Array<java.lang.StackTraceElement>>,
                    param3: java.lang.Throwable
                );
                public toStream(param0: com.bugsnag.android.JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class User implements com.bugsnag.android.JsonStream.Streamable {
                public static class: java.lang.Class<com.bugsnag.android.User>;
                public setName(param0: string): void;
                public getId(): string;
                public getEmail(): string;
                public setId(param0: string): void;
                public setEmail(param0: string): void;
                public getName(): string;
                public toStream(param0: com.bugsnag.android.JsonStream): void;
            }
        }
    }
}

// Generics information:
// com.bugsnag.android.FileStore:1
