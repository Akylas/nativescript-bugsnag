
export abstract class BaseNative<T, U extends {}> {
    options?: U;
    native: T;
    constructor(options?: U, native?: T);
    initNativeView(native: T, options: U): void;
    getNative(): T;
    createNative();
}

export interface NativePropertyOptions {
    converter?: {
        fromNative: Function;
        toNative: Function;
    };
    defaultValue?: any;
    nativeGetterName?: string;
    nativeSetterName?: string;
    getConverter?: Function;
    ios?: {
        nativeGetterName?: string;
        nativeSetterName?: string;
    };
    android?: {
        nativeGetterName?: string;
        nativeSetterName?: string;
    };
}

export interface ConfigurationOptions {
    autoNotify?: boolean;
    sendThreads?: boolean;
    autoCaptureSessions?: boolean;
    detectAnrs?: boolean;
    enableExceptionHandler?: boolean;
    appVersion?: string;
    apiKey: string;
    buildUUID?: string;
    sessionEndpoint?: string;
    endpoint?: string;
    codeBundleId?: string;
    releaseStage?: string;
    context?: string;
    anrThresholdMs?: number;
    launchCrashThresholdMs?: number;
    maxBreadcrumbs?: number;
    notifierType?: number;
    persistUserBetweenSessions?: boolean;
    ignoreClasses?: boolean;
    notifyForReleaseStage?: boolean;
    automaticallyCollectBreadcrumbs?: boolean;
    notifyReleaseStages?: string[];
}

export enum BreadcrumbType {
    ERROR,
    LOG,
    MANUAL,
    NAVIGATION ,
    PROCESS,
    REQUEST,
    STATE,
    USER
}

export class Configuration extends BaseNative<any, ConfigurationOptions> {
    apiKey: string;
    autoNotify: boolean;
    sendThreads: boolean;
    autoCaptureSessions: boolean;
    detectAnrs: boolean;
    enableExceptionHandler: boolean;
    appVersion: string;
    buildUUID: string;
    sessionEndpoint: string;
    endpoint: string;
    codeBundleId: string;
    releaseStage: string;
    context: string;
    anrThresholdMs: number;
    launchCrashThresholdMs: number;
    maxBreadcrumbs: number;
    notifierType: number;
    persistUserBetweenSessions: boolean;
    ignoreClasses: boolean;
    notifyForReleaseStage: boolean;
    automaticallyCollectBreadcrumbs: boolean;
    notifyReleaseStages: string[];
    shouldNotify(): boolean;
    beforeSendCallbacks?
}
export class Client {
    conf: Configuration;
    init(conf: Configuration | ConfigurationOptions | string): Promise<any>;
    /**
     * Leaves a 'breadcrumb' log message. The most recent breadcrumbs
     * are attached to subsequent error reports.
     */
    leaveBreadcrumb(message: string);
    leaveBreadcrumb(name: string, type: BreadcrumbType, metaData?: { [k: string]: string });

    /**
     * Registers a global error handler which sends any uncaught error to
     * Bugsnag before invoking the previous handler, if any.
     */
    handleUncaughtErrors();

    /**
     * Sends an error report to Bugsnag
     * @param error               The error instance to report
     * @param beforeSendCallback  A callback invoked before the report is sent
     *                            so additional information can be added
     * @param postSendCallback    Callback invoked after request is queued
     */
    notify(error: Error | string, beforeSendCallback?, postSendCallback?);
    /**
     * Starts tracking a new session. You should disable automatic session tracking via
     * `autoCaptureSessions` if you call this method.
     *
     * You should call this at the appropriate time in your application when you wish to start a
     * session. Any subsequent errors which occur in your application will be reported to
     * Bugsnag and will count towards your application's
     * [stability score](https://docs.bugsnag.com/product/releases/releases-dashboard/#stability-score).
     * This will start a new session even if there is already an existing
     * session; you should call `resumeSession()` if you only want to start a session
     * when one doesn't already exist.
     *
     * @see `resumeSession()`
     * @see `stopSession()`
     * @see `autoCaptureSessions`
     */
    startSession();
    /**
     * Stops tracking a session. You should disable automatic session tracking via
     * `autoCaptureSessions` if you call this method.
     *
     * You should call this at the appropriate time in your application when you wish to stop a
     * session. Any subsequent errors which occur in your application will still be reported to
     * Bugsnag but will not count towards your application's
     * [stability score](https://docs.bugsnag.com/product/releases/releases-dashboard/#stability-score).
     * This can be advantageous if, for example, you do not wish the
     * stability score to include crashes in a background service.
     *
     * @see `startSession()`
     * @see `resumeSession()`
     * @see `autoCaptureSessions`
     */
    stopSession();
    /**
     * Resumes a session which has previously been stopped, or starts a new session if none exists.
     * If a session has already been resumed or started and has not been stopped, calling this
     * method will have no effect. You should disable automatic session tracking via
     * `autoCaptureSessions` if you call this method.
     *
     * It's important to note that sessions are stored in memory for the lifetime of the
     * application process and are not persisted on disk. Therefore calling this method on app
     * startup would start a new session, rather than continuing any previous session.
     *
     * You should call this at the appropriate time in your application when you wish to resume
     * a previously started session. Any subsequent errors which occur in your application will
     * be reported to Bugsnag and will count towards your application's
     * [stability score](https://docs.bugsnag.com/product/releases/releases-dashboard/#stability-score).
     *
     * @see `startSession()`
     * @see `stopSession()`
     * @see `autoCaptureSessions`
     */
    resumeSession();
    /**
     * Clear custom user data and reset to the default device identifier
     */
    clearUser();
    /**
     * Wraps all console log functions with a function that will leave a breadcrumb for
     * each call, while continuing to call through to the original.
     *
     *   !!! Warning !!!
     *   This will cause all log messages to originate from Bugsnag, rather than the
     *   actual callsite of the log function in your source code.
     */
    enableConsoleBreadcrumbs();
    disableConsoleBreadCrumbs();
}
