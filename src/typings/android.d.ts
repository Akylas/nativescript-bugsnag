declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class AnrDetailsCollector extends java.lang.Object {
                public static class: java.lang.Class<AnrDetailsCollector>;
                // public static Companion: AnrDetailsCollector.Companion;
                public addErrorStateInfo$bugsnag_plugin_android_anr_release(param0: Error, param1: globalAndroid.app.ActivityManager.ProcessErrorStateInfo): void;
                public collectAnrDetails(param0: globalAndroid.content.Context): globalAndroid.app.ActivityManager.ProcessErrorStateInfo;
                public captureProcessErrorState$bugsnag_plugin_android_anr_release(param0: globalAndroid.app.ActivityManager, param1: number): globalAndroid.app.ActivityManager.ProcessErrorStateInfo;
                public collectAnrErrorDetails$bugsnag_plugin_android_anr_release(param0: Client, param1: Error): void;
                public constructor();
            }
            export namespace AnrDetailsCollector {
                export class Companion extends java.lang.Object {
                    public static class: java.lang.Class<Companion>;
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class AnrPlugin extends java.lang.Object {
                public static class: java.lang.Class<AnrPlugin>;
                // public static Companion: AnrPlugin.Companion;
                public setLoaded(param0: boolean): void;
                public getLoaded(): boolean;
                public loadPlugin(param0: Client): void;
                public unloadPlugin(): void;
                public constructor();
            }
            export namespace AnrPlugin {
                export class Companion extends java.lang.Object {
                    public static class: java.lang.Class<Companion>;
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class AppNotRespondingMonitor extends java.lang.Object {
                public static class: java.lang.Class<AppNotRespondingMonitor>;
            }
            export namespace AppNotRespondingMonitor {
                export class Delegate extends java.lang.Object {
                    public static class: java.lang.Class<Delegate>;
                    /**
                     * Constructs a new instance of the AppNotRespondingMonitor$Delegate interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                     */
                    public constructor(implementation: { onAppNotResponding(param0: java.lang.Thread): void });
                    public constructor();
                    public onAppNotResponding(param0: java.lang.Thread): void;
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export namespace anr {
                export class BuildConfig extends java.lang.Object {
                    public static class: java.lang.Class<BuildConfig>;
                    public static DEBUG: boolean;
                    public static APPLICATION_ID: string;
                    public static BUILD_TYPE: string;
                    public static FLAVOR: string;
                    public static VERSION_CODE: number;
                    public static VERSION_NAME: string;
                    public constructor();
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class AppData extends java.lang.Object {
                public static class: java.lang.Class<AppData>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Async extends java.lang.Object {
                public static class: java.lang.Class<Async>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class BadResponseException extends java.lang.Exception {
                public static class: java.lang.Class<BadResponseException>;
                public constructor(param0: string, param1: number);
                public constructor(param0: string, param1: java.lang.Throwable);
                public constructor(param0: java.lang.Throwable);
                public constructor(param0: string);
                public constructor();
                public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class BeforeNotify extends java.lang.Object {
                public static class: java.lang.Class<BeforeNotify>;
                /**
                 * Constructs a new instance of the BeforeNotify interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { run(param0: Error): boolean });
                public constructor();
                public run(param0: Error): boolean;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class BeforeRecordBreadcrumb extends java.lang.Object {
                public static class: java.lang.Class<BeforeRecordBreadcrumb>;
                /**
                 * Constructs a new instance of the BeforeRecordBreadcrumb interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { shouldRecord(param0: Breadcrumb): boolean });
                public constructor();
                public shouldRecord(param0: Breadcrumb): boolean;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class BeforeSend extends java.lang.Object {
                public static class: java.lang.Class<BeforeSend>;
                /**
                 * Constructs a new instance of the BeforeSend interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { run(param0: Report): boolean });
                public run(param0: Report): boolean;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class BeforeSendSession extends java.lang.Object {
                public static class: java.lang.Class<BeforeSendSession>;
                /**
                 * Constructs a new instance of the BeforeSendSession interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation?: { beforeSendSession(param0: SessionTrackingPayload): void });
                public beforeSendSession(param0: SessionTrackingPayload): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Breadcrumb extends java.lang.Object implements JsonStream.Streamable {
                public static class: java.lang.Class<Breadcrumb>;
                public getMetadata(): java.util.Map<string, string>;
                public getTimestamp(): string;
                public getName(): string;
                public getType(): BreadcrumbType;
                public toStream(param0: JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class BreadcrumbType {
                public static class: java.lang.Class<BreadcrumbType>;
                public static ERROR: BreadcrumbType;
                public static LOG: BreadcrumbType;
                public static MANUAL: BreadcrumbType;
                public static NAVIGATION: BreadcrumbType;
                public static PROCESS: BreadcrumbType;
                public static REQUEST: BreadcrumbType;
                public static STATE: BreadcrumbType;
                public static USER: BreadcrumbType;
                public static values(): native.Array<BreadcrumbType>;
                public static valueOf(param0: string): BreadcrumbType;
                public toString(): string;
                public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Breadcrumbs extends java.util.Observable implements JsonStream.Streamable {
                public static class: java.lang.Class<Breadcrumbs>;
                public toStream(param0: JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Bugsnag extends java.lang.Object {
                public static class: java.lang.Class<Bugsnag>;
                /** @deprecated */
                public static setProjectPackages(param0: native.Array<string>): void;
                /** @deprecated */
                public static setMaxBreadcrumbs(param0: number): void;
                /** @deprecated */
                public static notify(param0: java.lang.Throwable, param1: MetaData): void;
                public static beforeNotify(param0: BeforeNotify): void;
                public static disableExceptionHandler(): void;
                public static resumeSession(): boolean;
                public static setAppVersion(param0: string): void;
                public static getClient(): Client;
                public static setMetaData(param0: MetaData): void;
                public static getMetaData(): MetaData;
                public static setUserEmail(param0: string): void;
                public static setReleaseStage(param0: string): void;
                public static setSendThreads(param0: boolean): void;
                public static startSession(): void;
                public static setLoggingEnabled(param0: boolean): void;
                public static clearUser(): void;
                public static getContext(): string;
                public static setContext(param0: string): void;
                public static notify(param0: java.lang.Throwable, param1: Callback): void;
                public static setAutoCaptureSessions(param0: boolean): void;
                /** @deprecated */
                public static notify(
                    param0: string,
                    param1: string,
                    param2: string,
                    param3: native.Array<java.lang.StackTraceElement>,
                    param4: Severity,
                    param5: MetaData
                ): void;
                public static setBuildUUID(param0: string): void;
                /** @deprecated */
                public static setErrorReportApiClient(param0: ErrorReportApiClient): void;
                public static setIgnoreClasses(param0: native.Array<string>): void;
                public static clearTab(param0: string): void;
                public static setFilters(param0: native.Array<string>): void;
                public static enableExceptionHandler(): void;
                public static stopSession(): void;
                public static addToTab(param0: string, param1: string, param2: any): void;
                /** @deprecated */
                public static setSessionTrackingApiClient(param0: SessionTrackingApiClient): void;
                public static clearBreadcrumbs(): void;
                public static init(param0: globalAndroid.content.Context, param1: string, param2: boolean): Client;
                public static leaveBreadcrumb(param0: string): void;
                public static setNotifyReleaseStages(param0: native.Array<string>): void;
                public static init(param0: globalAndroid.content.Context): Client;
                public static init(param0: globalAndroid.content.Context, param1: Configuration): Client;
                public static internalClientNotify(param0: java.lang.Throwable, param1: java.util.Map<string, any>, param2: boolean, param3: Callback): void;
                public static leaveBreadcrumb(param0: string, param1: BreadcrumbType, param2: java.util.Map<string, string>): void;
                public notify(): void;
                public static notify(param0: java.lang.Throwable): void;
                public static init(param0: globalAndroid.content.Context, param1: string): Client;
                /** @deprecated */
                public static notify(param0: java.lang.Throwable, param1: Severity, param2: MetaData): void;
                public static beforeRecordBreadcrumb(param0: BeforeRecordBreadcrumb): void;
                public static setUserName(param0: string): void;
                /** @deprecated */
                public static notify(
                    param0: string,
                    param1: string,
                    param2: native.Array<java.lang.StackTraceElement>,
                    param3: Severity,
                    param4: MetaData
                ): void;
                public static setUser(param0: string, param1: string, param2: string): void;
                public static notify(param0: java.lang.Throwable, param1: Severity): void;
                /** @deprecated */
                public static setEndpoint(param0: string): void;
                public static notify(param0: string, param1: string, param2: native.Array<java.lang.StackTraceElement>, param3: Callback): void;
                public static setUserId(param0: string): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class BugsnagException extends java.lang.Throwable implements JsonStream.Streamable {
                public static class: java.lang.Class<BugsnagException>;
                public setName(param0: string): void;
                public constructor(param0: string, param1: string, param2: native.Array<java.lang.StackTraceElement>);
                public constructor(param0: string, param1: java.lang.Throwable);
                public getName(): string;
                public setMessage(param0: string): void;
                public getMessage(): string;
                public constructor(param0: java.lang.Throwable);
                public constructor(param0: string);
                public constructor();
                public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
                public toStream(param0: JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class BugsnagPlugin extends java.lang.Object {
                public static class: java.lang.Class<BugsnagPlugin>;
                /**
                 * Constructs a new instance of the BugsnagPlugin interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { loadPlugin(param0: Client): void; unloadPlugin(): void; getLoaded(): boolean; setLoaded(param0: boolean): void });
                public constructor();
                public setLoaded(param0: boolean): void;
                public getLoaded(): boolean;
                public loadPlugin(param0: Client): void;
                public unloadPlugin(): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class BugsnagPluginInterface extends java.lang.Object {
                public static class: java.lang.Class<BugsnagPluginInterface>;
                public static INSTANCE: BugsnagPluginInterface;
                public unloadPlugin(param0: java.lang.Class<any>): void;
                public loadPlugin(param0: Client, param1: java.lang.Class<any>): void;
                public registerPlugin(param0: java.lang.Class<any>): void;
                public loadRegisteredPlugins(param0: Client): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class CachedThread extends java.lang.Object implements JsonStream.Streamable {
                public static class: java.lang.Class<CachedThread>;
                public toStream(param0: JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Callback extends java.lang.Object {
                public static class: java.lang.Class<Callback>;
                /**
                 * Constructs a new instance of the Callback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { beforeNotify(param0: Report): void });
                public constructor();
                public beforeNotify(param0: Report): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Client extends java.util.Observable implements java.util.Observer {
                public static class: java.lang.Class<Client>;
                public config: Configuration;
                public deviceData: DeviceData;
                public appData: AppData;
                public errorStore: ErrorStore;
                public notifyBlocking(param0: java.lang.Throwable): void;
                public setSendThreads(param0: boolean): void;
                public setUserId(param0: string): void;
                public getMetaData(): MetaData;
                public notify(param0: java.lang.Throwable, param1: Severity): void;
                public setMetaData(param0: MetaData): void;
                public getLaunchTimeMs(): number;
                public internalClientNotify(param0: java.lang.Throwable, param1: java.util.Map<string, any>, param2: boolean, param3: Callback): void;
                public constructor();
                public notifyBlocking(param0: string, param1: string, param2: native.Array<java.lang.StackTraceElement>, param3: Callback): void;
                public setUserName(param0: string): void;
                public setUserEmail(param0: string): void;
                public notify(param0: java.lang.Throwable): void;
                public startSession(): void;
                public notifyBlocking(param0: java.lang.Throwable, param1: Severity): void;
                public setUser(param0: string, param1: string, param2: string): void;
                public enableExceptionHandler(): void;
                public setAppVersion(param0: string): void;
                public beforeNotify(param0: BeforeNotify): void;
                public getConfig(): Configuration;
                /** @deprecated */
                public notify(param0: java.lang.Throwable, param1: Severity, param2: MetaData): void;
                public leaveBreadcrumb(param0: string): void;
                public clearBreadcrumbs(): void;
                public stopSession(): void;
                public getDeviceData(): DeviceData;
                public addToTab(param0: string, param1: string, param2: any): void;
                public disableExceptionHandler(): void;
                public setAutoCaptureSessions(param0: boolean): void;
                public update(param0: java.util.Observable, param1: any): void;
                /** @deprecated */
                public setEndpoint(param0: string): void;
                /** @deprecated */
                public notify(param0: string, param1: string, param2: native.Array<java.lang.StackTraceElement>, param3: Severity, param4: MetaData): void;
                public getAppData(): AppData;
                public resumeSession(): boolean;
                /** @deprecated */
                public setMaxBreadcrumbs(param0: number): void;
                /** @deprecated */
                public notifyBlocking(
                    param0: string,
                    param1: string,
                    param2: string,
                    param3: native.Array<java.lang.StackTraceElement>,
                    param4: Severity,
                    param5: MetaData
                ): void;
                public clearUser(): void;
                public notify(param0: java.lang.Throwable, param1: Callback): void;
                /** @deprecated */
                public notify(
                    param0: string,
                    param1: string,
                    param2: string,
                    param3: native.Array<java.lang.StackTraceElement>,
                    param4: Severity,
                    param5: MetaData
                ): void;
                public constructor(param0: globalAndroid.content.Context, param1: string);
                public notifyBlocking(param0: java.lang.Throwable, param1: Callback): void;
                /** @deprecated */
                public notify(param0: java.lang.Throwable, param1: MetaData): void;
                /** @deprecated */
                public notifyBlocking(param0: java.lang.Throwable, param1: Severity, param2: MetaData): void;
                public finalize(): void;
                /** @deprecated */
                public notifyBlocking(
                    param0: string,
                    param1: string,
                    param2: native.Array<java.lang.StackTraceElement>,
                    param3: Severity,
                    param4: MetaData
                ): void;
                public constructor(param0: globalAndroid.content.Context, param1: Configuration);
                public leaveBreadcrumb(param0: string, param1: BreadcrumbType, param2: java.util.Map<string, string>): void;
                public constructor(param0: globalAndroid.content.Context);
                public getBreadcrumbs(): java.util.Collection<Breadcrumb>;
                public setFilters(param0: native.Array<string>): void;
                public notify(): void;
                public setBuildUUID(param0: string): void;
                /** @deprecated */
                public notifyBlocking(param0: java.lang.Throwable, param1: MetaData): void;
                public getUser(): User;
                public setContext(param0: string): void;
                public notify(param0: string, param1: string, param2: native.Array<java.lang.StackTraceElement>, param3: Callback): void;
                public constructor(param0: globalAndroid.content.Context, param1: string, param2: boolean);
                public setReleaseStage(param0: string): void;
                public clearTab(param0: string): void;
                public setLoggingEnabled(param0: boolean): void;
                /** @deprecated */
                public setProjectPackages(param0: native.Array<string>): void;
                public setIgnoreClasses(param0: native.Array<string>): void;
                public startFirstSession(param0: globalAndroid.app.Activity): void;
                public setNotifyReleaseStages(param0: native.Array<string>): void;
                public beforeRecordBreadcrumb(param0: BeforeRecordBreadcrumb): void;
                public getContext(): string;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ClientConfigObserver extends java.lang.Object implements java.util.Observer {
                public static class: java.lang.Class<ClientConfigObserver>;
                public update(param0: java.util.Observable, param1: any): void;
                public constructor(param0: Client, param1: Configuration);
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ConfigFactory extends java.lang.Object {
                public static class: java.lang.Class<ConfigFactory>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Configuration extends java.util.Observable implements java.util.Observer {
                public static class: java.lang.Class<Configuration>;
                public getSendThreads(): boolean;
                public setSendThreads(param0: boolean): void;
                public getMetaData(): MetaData;
                public setDetectNdkCrashes(param0: boolean): void;
                public setMetaData(param0: MetaData): void;
                public beforeSend(param0: BeforeSend): void;
                public constructor();
                public setMaxBreadcrumbs(param0: number): void;
                public getBeforeSendTasks(): java.util.Collection<BeforeSend>;
                public setAppVersion(param0: string): void;
                public setLaunchCrashThresholdMs(param0: number): void;
                public beforeNotify(param0: BeforeNotify): void;
                /** @deprecated */
                public setSessionEndpoint(param0: string): void;
                public getDetectAnrs(): boolean;
                public setAutoCaptureSessions(param0: boolean): void;
                public update(param0: java.util.Observable, param1: any): void;
                /** @deprecated */
                public inProject(param0: string): boolean;
                /** @deprecated */
                public setEndpoint(param0: string): void;
                public setEnableExceptionHandler(param0: boolean): void;
                public getCodeBundleId(): string;
                public setDelivery(param0: Delivery): void;
                public getNotifyReleaseStages(): native.Array<string>;
                public getNotifierType(): string;
                public setVersionCode(param0: java.lang.Integer): void;
                public getBuildUUID(): string;
                public getProjectPackages(): native.Array<string>;
                public setDetectAnrs(param0: boolean): void;
                public getDetectNdkCrashes(): boolean;
                /** @deprecated */
                public setAnrThresholdMs(param0: number): void;
                public getIgnoreClasses(): native.Array<string>;
                public setProjectPackages(param0: native.Array<string>): void;
                public constructor(param0: string);
                public getBeforeRecordBreadcrumbTasks(): java.util.Collection<BeforeRecordBreadcrumb>;
                public shouldNotifyForReleaseStage(param0: string): boolean;
                public getLaunchCrashThresholdMs(): number;
                public getReleaseStage(): string;
                public isAutomaticallyCollectingBreadcrumbs(): boolean;
                public getPersistUserBetweenSessions(): boolean;
                public getDelivery(): Delivery;
                public getApiKey(): string;
                public getMaxBreadcrumbs(): number;
                public setFilters(param0: native.Array<string>): void;
                public getAutoCaptureSessions(): boolean;
                public setBuildUUID(param0: string): void;
                public setEndpoints(param0: string, param1: string): void;
                public setContext(param0: string): void;
                /** @deprecated */
                public getAnrThresholdMs(): number;
                /** @deprecated */
                public shouldAutoCaptureSessions(): boolean;
                public shouldIgnoreClass(param0: string): boolean;
                public setCodeBundleId(param0: string): void;
                public getFilters(): native.Array<string>;
                public getBeforeNotifyTasks(): java.util.Collection<BeforeNotify>;
                public setReleaseStage(param0: string): void;
                public setAutomaticallyCollectBreadcrumbs(param0: boolean): void;
                public getEndpoint(): string;
                public setPersistUserBetweenSessions(param0: boolean): void;
                public getVersionCode(): java.lang.Integer;
                public getSessionEndpoint(): string;
                public getAppVersion(): string;
                public getEnableExceptionHandler(): boolean;
                public setNotifierType(param0: string): void;
                public setIgnoreClasses(param0: native.Array<string>): void;
                public setNotifyReleaseStages(param0: native.Array<string>): void;
                public getErrorApiHeaders(): java.util.Map<string, string>;
                public getSessionApiHeaders(): java.util.Map<string, string>;
                public beforeRecordBreadcrumb(param0: BeforeRecordBreadcrumb): void;
                public getContext(): string;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Connectivity extends java.lang.Object {
                public static class: java.lang.Class<Connectivity>;
                /**
                 * Constructs a new instance of the Connectivity interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { registerForNetworkChanges(): void; unregisterForNetworkChanges(): void; hasNetworkConnection(): boolean; retrieveNetworkAccessState(): string });
                public constructor();
                public unregisterForNetworkChanges(): void;
                public retrieveNetworkAccessState(): string;
                public registerForNetworkChanges(): void;
                public hasNetworkConnection(): boolean;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ConnectivityApi24 extends java.lang.Object implements Connectivity {
                public static class: java.lang.Class<ConnectivityApi24>;
                public activeNetwork: globalAndroid.net.Network;
                public unregisterForNetworkChanges(): void;
                public retrieveNetworkAccessState(): string;
                public constructor(param0: globalAndroid.net.ConnectivityManager, param1: any);
                public registerForNetworkChanges(): void;
                public hasNetworkConnection(): boolean;
            }
            export namespace ConnectivityApi24 {
                export class ConnectivityTrackerCallback extends globalAndroid.net.ConnectivityManager.NetworkCallback {
                    public static class: java.lang.Class<ConnectivityTrackerCallback>;
                    public constructor(param0: any);
                    public onAvailable(param0: globalAndroid.net.Network): void;
                    public constructor();
                    public onUnavailable(): void;
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ConnectivityCompat extends java.lang.Object implements Connectivity {
                public static class: java.lang.Class<ConnectivityCompat>;
                public unregisterForNetworkChanges(): void;
                public retrieveNetworkAccessState(): string;
                public registerForNetworkChanges(): void;
                public constructor(param0: globalAndroid.content.Context, param1: any);
                public hasNetworkConnection(): boolean;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ConnectivityCompatKt extends java.lang.Object {
                public static class: java.lang.Class<ConnectivityCompatKt>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ConnectivityLegacy extends java.lang.Object implements Connectivity {
                public static class: java.lang.Class<ConnectivityLegacy>;
                public unregisterForNetworkChanges(): void;
                public retrieveNetworkAccessState(): string;
                public registerForNetworkChanges(): void;
                public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.net.ConnectivityManager, param2: any);
                public hasNetworkConnection(): boolean;
            }
            export namespace ConnectivityLegacy {
                export class ConnectivityChangeReceiver extends globalAndroid.content.BroadcastReceiver {
                    public static class: java.lang.Class<ConnectivityChangeReceiver>;
                    public constructor(param0: any);
                    public constructor();
                    public onReceive(param0: globalAndroid.content.Context, param1: globalAndroid.content.Intent): void;
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class DateUtils extends java.lang.Object {
                public static class: java.lang.Class<DateUtils>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class DefaultDelivery extends java.lang.Object implements Delivery {
                public static class: java.lang.Class<DefaultDelivery>;
                public deliver(param0: SessionTrackingPayload, param1: Configuration): void;
                public deliver(param0: Report, param1: Configuration): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Delivery extends java.lang.Object {
                public static class: java.lang.Class<Delivery>;
                /**
                 * Constructs a new instance of the Delivery interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: {
                    deliver(param0: SessionTrackingPayload, param1: Configuration): void;
                    deliver(param0: Report, param1: Configuration): void;
                });
                public constructor();
                public deliver(param0: SessionTrackingPayload, param1: Configuration): void;
                public deliver(param0: Report, param1: Configuration): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class DeliveryCompat extends java.lang.Object implements Delivery {
                public static class: java.lang.Class<DeliveryCompat>;
                public deliver(param0: SessionTrackingPayload, param1: Configuration): void;
                public deliver(param0: Report, param1: Configuration): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class DeliveryFailureException extends java.lang.Exception {
                public static class: java.lang.Class<DeliveryFailureException>;
                public constructor(param0: string, param1: java.lang.Throwable);
                public constructor(param0: java.lang.Throwable);
                public constructor(param0: string);
                public constructor();
                public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class DeliveryStyle {
                public static class: java.lang.Class<DeliveryStyle>;
                public static SAME_THREAD: DeliveryStyle;
                public static ASYNC: DeliveryStyle;
                public static ASYNC_WITH_CACHE: DeliveryStyle;
                public static NO_CACHE: DeliveryStyle;
                public static values(): native.Array<DeliveryStyle>;
                public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
                public static valueOf(param0: string): DeliveryStyle;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class DeviceData extends java.lang.Object {
                public static class: java.lang.Class<DeviceData>;
            }
            export namespace DeviceData {
                export class Abi2Wrapper extends java.lang.Object {
                    public static class: java.lang.Class<Abi2Wrapper>;
                }
                export class SupportedAbiWrapper extends java.lang.Object {
                    public static class: java.lang.Class<SupportedAbiWrapper>;
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Error extends java.lang.Object implements JsonStream.Streamable {
                public static class: java.lang.Class<Error>;
                public getUser(): User;
                public setContext(param0: string): void;
                public setUserId(param0: string): void;
                public getMetaData(): MetaData;
                public setDeviceId(param0: string): void;
                public setMetaData(param0: MetaData): void;
                public getGroupingHash(): string;
                public addToTab(param0: string, param1: string, param2: any): void;
                public getHandledState(): HandledState;
                public clearTab(param0: string): void;
                public getExceptionMessage(): string;
                public toStream(param0: JsonStream): void;
                public setGroupingHash(param0: string): void;
                public getSeverity(): Severity;
                public setUserName(param0: string): void;
                public setExceptionMessage(param0: string): void;
                public getException(): java.lang.Throwable;
                public getExceptionName(): string;
                public setSeverity(param0: Severity): void;
                public setUserEmail(param0: string): void;
                public setExceptionName(param0: string): void;
                public getContext(): string;
                public setUser(param0: string, param1: string, param2: string): void;
                public getDeviceData(): java.util.Map<string, any>;
            }
            export namespace Error {
                export class Builder extends java.lang.Object {
                    public static class: java.lang.Class<Builder>;
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ErrorReader extends java.lang.Object {
                public static class: java.lang.Class<ErrorReader>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ErrorReportApiClient extends java.lang.Object {
                public static class: java.lang.Class<ErrorReportApiClient>;
                /**
                 * Constructs a new instance of the ErrorReportApiClient interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { postReport(param0: string, param1: Report, param2: java.util.Map<string, string>): void });
                public constructor();
                public postReport(param0: string, param1: Report, param2: java.util.Map<string, string>): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ErrorStore extends FileStore<Error> {
                public static class: java.lang.Class<ErrorStore>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class EventReceiver extends globalAndroid.content.BroadcastReceiver {
                public static class: java.lang.Class<EventReceiver>;
                public static getIntentFilter(): globalAndroid.content.IntentFilter;
                public onReceive(param0: globalAndroid.content.Context, param1: globalAndroid.content.Intent): void;
                public constructor(param0: Client);
                public constructor();
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ExceptionHandler extends java.lang.Object implements java.lang.Thread.UncaughtExceptionHandler {
                public static class: java.lang.Class<ExceptionHandler>;
                public uncaughtException(param0: java.lang.Thread, param1: java.lang.Throwable): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Exceptions extends java.lang.Object implements JsonStream.Streamable {
                public static class: java.lang.Class<Exceptions>;
                public toStream(param0: JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export abstract class FileStore<T> extends java.lang.Object {
                public static class: java.lang.Class<FileStore<any>>;
                public config: Configuration;
                public delegate: FileStore.Delegate;
            }
            export namespace FileStore {
                export class Delegate extends java.lang.Object {
                    public static class: java.lang.Class<Delegate>;
                    /**
                     * Constructs a new instance of the FileStore$Delegate interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                     */
                    public constructor(implementation: { onErrorIOFailure(param0: java.lang.Exception, param1: java.io.File, param2: string): void });
                    public constructor();
                    public onErrorIOFailure(param0: java.lang.Exception, param1: java.io.File, param2: string): void;
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ForegroundDetector extends java.lang.Object {
                public static class: java.lang.Class<ForegroundDetector>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class HandledState extends java.lang.Object implements JsonStream.Streamable {
                public static class: java.lang.Class<HandledState>;
                public isUnhandled(): boolean;
                public toStream(param0: JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class IOUtils extends java.lang.Object {
                public static class: java.lang.Class<IOUtils>;
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
            export class InternalApi extends java.lang.Object implements java.lang.annotation.Annotation {
                public static class: java.lang.Class<InternalApi>;
                /**
                 * Constructs a new instance of the InternalApi interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { equals(param0: any): boolean; hashCode(): number; toString(): string; annotationType(): java.lang.Class<any> });
                public constructor();
                public hashCode(): number;
                public equals(param0: any): boolean;
                public annotationType(): java.lang.Class<any>;
                public toString(): string;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Intrinsics extends java.lang.Object {
                public static class: java.lang.Class<Intrinsics>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class JsonScope extends java.lang.Object {
                public static class: java.lang.Class<JsonScope>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class JsonStream extends JsonWriter {
                public static class: java.lang.Class<JsonStream>;
                public value(param0: java.io.File): void;
                public close(): void;
                public value(param0: number): JsonWriter;
                public value(param0: boolean): JsonWriter;
                public value(param0: boolean): JsonWriter;
                public value(param0: string): JsonWriter;
                public flush(): void;
                public name(param0: string): JsonWriter;
                public value(param0: any): void;
                public name(param0: string): JsonStream;
                public value(param0: number): JsonWriter;
                public constructor(param0: java.io.Writer);
                public value(param0: JsonStream.Streamable): void;
            }
            export namespace JsonStream {
                export class Streamable extends java.lang.Object {
                    public static class: java.lang.Class<Streamable>;
                    /**
                     * Constructs a new instance of the JsonStream$Streamable interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                     */
                    public constructor(implementation: { toStream(param0: JsonStream): void });
                    public constructor();
                    public toStream(param0: JsonStream): void;
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class JsonWriter extends java.lang.Object implements java.io.Closeable, java.io.Flushable {
                public static class: java.lang.Class<JsonWriter>;
                public nullValue(): JsonWriter;
                public close(): void;
                public value(param0: number): JsonWriter;
                public beginArray(): JsonWriter;
                public beginObject(): JsonWriter;
                public value(param0: boolean): JsonWriter;
                public value(param0: boolean): JsonWriter;
                public value(param0: string): JsonWriter;
                public jsonValue(param0: string): JsonWriter;
                public flush(): void;
                public setIndent(param0: string): void;
                public setLenient(param0: boolean): void;
                public name(param0: string): JsonWriter;
                public isLenient(): boolean;
                public setHtmlSafe(param0: boolean): void;
                public value(param0: number): JsonWriter;
                public endArray(): JsonWriter;
                public getSerializeNulls(): boolean;
                public endObject(): JsonWriter;
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
            export class Logger extends java.lang.Object {
                public static class: java.lang.Class<Logger>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class MapUtils extends java.lang.Object {
                public static class: java.lang.Class<MapUtils>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class MetaData extends java.util.Observable implements JsonStream.Streamable {
                public static class: java.lang.Class<MetaData>;
                public constructor(param0: java.util.Map<string, any>);
                public addToTab(param0: string, param1: string, param2: any): void;
                public clearTab(param0: string): void;
                public constructor();
                public toStream(param0: JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class NativeInterface extends java.lang.Object {
                public static class: java.lang.Class<NativeInterface>;
                public static enableUncaughtJavaExceptionReporting(): void;
                /** @deprecated */
                public static configureClientObservers(param0: Client): void;
                public static getMetaData(): java.util.Map<string, any>;
                public static getLoggingEnabled(): boolean;
                public static getNativeReportPath(): string;
                public static deliverReport(param0: native.Array<number>, param1: native.Array<number>): void;
                public static setAppVersion(param0: string): void;
                public static enableNdkCrashReporting(): void;
                public constructor();
                public static getUserData(): java.util.Map<string, string>;
                public static getAppData(): java.util.Map<string, any>;
                public static setNotifyReleaseStages(param0: native.Array<string>): void;
                public static getSessionEndpoint(): string;
                public static disableUncaughtJavaExceptionReporting(): void;
                public static setUser(param0: native.Array<number>, param1: native.Array<number>, param2: native.Array<number>): void;
                public static notify(param0: native.Array<number>, param1: native.Array<number>, param2: Severity, param3: native.Array<java.lang.StackTraceElement>): void;
                public static setReleaseStage(param0: string): void;
                public static disableAnrReporting(): void;
                public static setBinaryArch(param0: string): void;
                public static disableNdkCrashReporting(): void;
                public static registerSession(param0: number, param1: string, param2: number, param3: number): void;
                public notify(): void;
                public static getReleaseStage(): string;
                public static getContext(): string;
                public static setContext(param0: string): void;
                public static enableAnrReporting(): void;
                public static leaveBreadcrumb(param0: string, param1: BreadcrumbType): void;
                public static setUser(param0: string, param1: string, param2: string): void;
                public static getEndpoint(): string;
                public static getBreadcrumbs(): java.util.List<Breadcrumb>;
                public static getAppVersion(): string;
                public static leaveBreadcrumb(param0: native.Array<number>, param1: BreadcrumbType): void;
                public static setClient(param0: Client): void;
                public static setSessionEndpoint(param0: string): void;
                public static clearTab(param0: string): void;
                public static getCpuAbi(): native.Array<string>;
                public static leaveBreadcrumb(param0: string, param1: string, param2: java.util.Map<string, string>): void;
                public static notify(param0: string, param1: string, param2: Severity, param3: native.Array<java.lang.StackTraceElement>): void;
                public static addToTab(param0: string, param1: string, param2: any): void;
                public static getNotifyReleaseStages(): native.Array<string>;
                public static setEndpoint(param0: string): void;
                public static getDeviceData(): java.util.Map<string, any>;
            }
            export namespace NativeInterface {
                export class Message extends java.lang.Object {
                    public static class: java.lang.Class<Message>;
                    public type: MessageType;
                    public value: any;
                    public constructor(param0: MessageType, param1: any);
                }
                export class MessageType {
                    public static class: java.lang.Class<MessageType>;
                    public static ADD_BREADCRUMB: MessageType;
                    public static ADD_METADATA: MessageType;
                    public static CLEAR_BREADCRUMBS: MessageType;
                    public static CLEAR_METADATA_TAB: MessageType;
                    public static DELIVER_PENDING: MessageType;
                    public static INSTALL: MessageType;
                    public static ENABLE_NATIVE_CRASH_REPORTING: MessageType;
                    public static DISABLE_NATIVE_CRASH_REPORTING: MessageType;
                    public static NOTIFY_HANDLED: MessageType;
                    public static NOTIFY_UNHANDLED: MessageType;
                    public static REMOVE_METADATA: MessageType;
                    public static START_SESSION: MessageType;
                    public static STOP_SESSION: MessageType;
                    public static UPDATE_APP_VERSION: MessageType;
                    public static UPDATE_BUILD_UUID: MessageType;
                    public static UPDATE_CONTEXT: MessageType;
                    public static UPDATE_IN_FOREGROUND: MessageType;
                    public static UPDATE_LOW_MEMORY: MessageType;
                    public static UPDATE_METADATA: MessageType;
                    public static UPDATE_ORIENTATION: MessageType;
                    public static UPDATE_NOTIFY_RELEASE_STAGES: MessageType;
                    public static UPDATE_RELEASE_STAGE: MessageType;
                    public static UPDATE_USER_EMAIL: MessageType;
                    public static UPDATE_USER_NAME: MessageType;
                    public static UPDATE_USER_ID: MessageType;
                    public static values(): native.Array<MessageType>;
                    public static valueOf(param0: string): MessageType;
                    public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
                }
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class NetworkException extends java.io.IOException {
                public static class: java.lang.Class<NetworkException>;
                public constructor(param0: string, param1: java.lang.Throwable);
                public constructor(param0: java.lang.Throwable);
                public constructor(param0: string);
                public constructor();
                public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Notifier extends java.lang.Object implements JsonStream.Streamable {
                public static class: java.lang.Class<Notifier>;
                public getURL(): string;
                public setName(param0: string): void;
                public getVersion(): string;
                public static getInstance(): Notifier;
                public setURL(param0: string): void;
                public getName(): string;
                public setVersion(param0: string): void;
                public constructor();
                public toStream(param0: JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class NotifyType {
                public static class: java.lang.Class<NotifyType>;
                public static ALL: NotifyType;
                public static USER: NotifyType;
                public static APP: NotifyType;
                public static DEVICE: NotifyType;
                public static CONTEXT: NotifyType;
                public static RELEASE_STAGES: NotifyType;
                public static FILTERS: NotifyType;
                public static BREADCRUMB: NotifyType;
                public static META: NotifyType;
                public static fromInt(param0: java.lang.Integer): NotifyType;
                public getValue(): java.lang.Integer;
                public static values(): native.Array<NotifyType>;
                public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
                public static valueOf(param0: string): NotifyType;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ObjectJsonStreamer extends java.lang.Object {
                public static class: java.lang.Class<ObjectJsonStreamer>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Report extends java.lang.Object implements JsonStream.Streamable {
                public static class: java.lang.Class<Report>;
                /** @deprecated */
                public setNotifierVersion(param0: string): void;
                public setApiKey(param0: string): void;
                /** @deprecated */
                public setNotifierName(param0: string): void;
                /** @deprecated */
                public setNotifierURL(param0: string): void;
                public getApiKey(): string;
                public getNotifier(): Notifier;
                public getError(): Error;
                public toStream(param0: JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Session extends java.lang.Object implements JsonStream.Streamable {
                public static class: java.lang.Class<Session>;
                public constructor(param0: string, param1: java.util.Date, param2: User, param3: boolean);
                public toStream(param0: JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class SessionStore extends FileStore<Session> {
                public static class: java.lang.Class<SessionStore>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class SessionTracker extends java.util.Observable implements globalAndroid.app.Application.ActivityLifecycleCallbacks {
                public static class: java.lang.Class<SessionTracker>;
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
            export class SessionTrackingApiClient extends java.lang.Object {
                public static class: java.lang.Class<SessionTrackingApiClient>;
                /**
                 * Constructs a new instance of the SessionTrackingApiClient interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { postSessionTrackingPayload(param0: string, param1: SessionTrackingPayload, param2: java.util.Map<string, string>): void });
                public constructor();
                public postSessionTrackingPayload(param0: string, param1: SessionTrackingPayload, param2: java.util.Map<string, string>): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class SessionTrackingPayload extends java.lang.Object implements JsonStream.Streamable {
                public static class: java.lang.Class<SessionTrackingPayload>;
                public toStream(param0: JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Severity extends JsonStream.Streamable {
                public static class: java.lang.Class<Severity>;
                public static ERROR: Severity;
                public static WARNING: Severity;
                public static INFO: Severity;
                public static valueOf(param0: string): Severity;
                public static values(): native.Array<Severity>;
                public getName(): string;
                public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
                public toStream(param0: JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class Stacktrace extends java.lang.Object implements JsonStream.Streamable {
                public static class: java.lang.Class<Stacktrace>;
                public toStream(param0: JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class StrictModeHandler extends java.lang.Object {
                public static class: java.lang.Class<StrictModeHandler>;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ThreadSafe extends java.lang.Object implements java.lang.annotation.Annotation {
                public static class: java.lang.Class<ThreadSafe>;
                /**
                 * Constructs a new instance of the ThreadSafe interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { equals(param0: any): boolean; hashCode(): number; toString(): string; annotationType(): java.lang.Class<any> });
                public constructor();
                public hashCode(): number;
                public equals(param0: any): boolean;
                public annotationType(): java.lang.Class<any>;
                public toString(): string;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class ThreadState extends java.lang.Object implements JsonStream.Streamable {
                public static class: java.lang.Class<ThreadState>;
                public constructor(
                    param0: Configuration,
                    param1: java.lang.Thread,
                    param2: java.util.Map<java.lang.Thread, native.Array<java.lang.StackTraceElement>>,
                    param3: java.lang.Throwable
                );
                public toStream(param0: JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export class User extends java.util.Observable implements JsonStream.Streamable {
                public static class: java.lang.Class<User>;
                public setName(param0: string): void;
                public getId(): string;
                public getEmail(): string;
                public setId(param0: string): void;
                public setEmail(param0: string): void;
                public getName(): string;
                public toStream(param0: JsonStream): void;
            }
        }
    }
}

declare namespace com {
    export namespace bugsnag {
        export namespace android {
            export namespace core {
                export class BuildConfig extends java.lang.Object {
                    public static class: java.lang.Class<BuildConfig>;
                    public static DEBUG: boolean;
                    public static APPLICATION_ID: string;
                    public static BUILD_TYPE: string;
                    public static FLAVOR: string;
                    public static VERSION_CODE: number;
                    public static VERSION_NAME: string;
                    public constructor();
                }
            }
        }
    }
}
