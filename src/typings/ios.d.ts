declare const enum BSGBreadcrumbType {
    Manual = 0,

    Error = 1,

    Log = 2,

    Navigation = 3,

    Process = 4,

    Request = 5,

    State = 6,

    User = 7
}

declare function BSGFormatSeverity(severity: BSGSeverity): string;

declare function BSGParseSeverity(severity: string): BSGSeverity;

declare const enum BSGSeverity {
    Error = 0,

    Warning = 1,

    Info = 2
}

interface BSG_KSCrashReportWriter {
    addBooleanElement: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>, p2: string, p3: boolean) => void>;
    addFloatingPointElement: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>, p2: string, p3: number) => void>;
    addIntegerElement: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>, p2: string, p3: number) => void>;
    addUIntegerElement: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>, p2: string, p3: number) => void>;
    addStringElement: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>, p2: string, p3: string) => void>;
    addTextFileElement: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>, p2: string, p3: string) => void>;
    addJSONFileElement: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>, p2: string, p3: string) => void>;
    addDataElement: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>, p2: string, p3: string, p4: number) => void>;
    beginDataElement: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>, p2: string) => void>;
    appendDataElement: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>, p2: string, p3: number) => void>;
    endDataElement: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>) => void>;
    addUUIDElement: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>, p2: string, p3: string) => void>;
    addJSONElement: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>, p2: string, p3: string) => void>;
    beginObject: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>, p2: string) => void>;
    beginArray: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>, p2: string) => void>;
    endContainer: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>) => void>;
    context: interop.Pointer | interop.Reference<any>;
}
declare const BSG_KSCrashReportWriter: interop.StructType<BSG_KSCrashReportWriter>;

declare class Bugsnag extends NSObject {
    static addAttributeWithValueToTabWithName(attributeName: string, value: any, tabName: string): void;

    static alloc(): Bugsnag; // inherited from NSObject

    static appDidCrashLastLaunch(): boolean;

    static clearBreadcrumbs(): void;

    static clearTabWithName(tabName: string): void;

    static configuration(): BugsnagConfiguration;

    static internalClientNotifyWithDataBlock(exception: NSException, metaData: NSDictionary<any, any>, block: (p1: BugsnagCrashReport) => void): void;

    static leaveBreadcrumbForNotificationName(notificationName: string): void;

    static leaveBreadcrumbWithBlock(block: (p1: BugsnagBreadcrumb) => void): void;

    static leaveBreadcrumbWithMessage(message: string): void;

    static new(): Bugsnag; // inherited from NSObject

    static notify(exception: NSException): void;

    static notifyBlock(exception: NSException, block: (p1: BugsnagCrashReport) => void): void;

    static notifyError(error: NSError): void;

    static notifyErrorBlock(error: NSError, block: (p1: BugsnagCrashReport) => void): void;

    static notifyWithData(exception: NSException, metaData: NSDictionary<any, any>): void;

    static notifyWithDataAtSeverity(exception: NSException, metaData: NSDictionary<any, any>, severity: string): void;

    static payloadDateFormatter(): NSDateFormatter;

    static resumeSession(): boolean;

    static setBreadcrumbCapacity(capacity: number): void;

    static setReportWhenDebuggerIsAttached(reportWhenDebuggerIsAttached: boolean): void;

    static setSuspendThreadsForUserReported(suspendThreadsForUserReported: boolean): void;

    static setThreadTracingEnabled(threadTracingEnabled: boolean): void;

    static setWriteBinaryImagesForUserReported(writeBinaryImagesForUserReported: boolean): void;

    static startBugsnagWithApiKey(apiKey: string): void;

    static startBugsnagWithConfiguration(configuration: BugsnagConfiguration): void;

    static startSession(): void;

    static stopSession(): void;
}

declare class BugsnagBreadcrumb extends NSObject {
    static alloc(): BugsnagBreadcrumb; // inherited from NSObject

    static breadcrumbWithBlock(block: (p1: BugsnagBreadcrumb) => void): BugsnagBreadcrumb;

    static new(): BugsnagBreadcrumb; // inherited from NSObject

    metadata: NSDictionary<any, any>;

    name: string;

    readonly timestamp: Date;

    type: BSGBreadcrumbType;
}

declare class BugsnagBreadcrumbs extends NSObject {
    static alloc(): BugsnagBreadcrumbs; // inherited from NSObject

    static new(): BugsnagBreadcrumbs; // inherited from NSObject

    readonly cachePath: string;

    capacity: number;

    readonly count: number;
    [index: number]: BugsnagBreadcrumb;

    addBreadcrumb(breadcrumbMessage: string): void;

    addBreadcrumbWithBlock(block: (p1: BugsnagBreadcrumb) => void): void;

    arrayValue(): NSArray<any>;

    clearBreadcrumbs(): void;

    objectAtIndexedSubscript(index: number): BugsnagBreadcrumb;
}

declare class BugsnagConfiguration extends NSObject {
    static alloc(): BugsnagConfiguration; // inherited from NSObject

    static new(): BugsnagConfiguration; // inherited from NSObject

    apiKey: string;

    appVersion: string;

    autoDetectErrors: boolean;

    autoNotify: boolean;

    autoTrackSessions: boolean;

    automaticallyCollectBreadcrumbs: boolean;

    readonly beforeNotifyHooks: NSArray<any>;

    readonly beforeSendBlocks: NSArray<(p1: NSDictionary<any, any>, p2: BugsnagCrashReport) => boolean>;

    readonly beforeSendSessionBlocks: NSArray<(p1: NSMutableDictionary<any, any>) => void>;

    readonly breadcrumbs: BugsnagBreadcrumbs;

    codeBundleId: string;

    config: BugsnagMetaData;

    context: string;

    maxBreadcrumbs: number;

    metaData: BugsnagMetaData;

    notifierType: string;

    notifyReleaseStages: NSArray<any>;

    readonly notifyURL: NSURL;

    onCrashHandler: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<BSG_KSCrashReportWriter>) => void>;

    releaseStage: string;

    reportBackgroundOOMs: boolean;

    reportOOMs: boolean;

    session: NSURLSession;

    readonly sessionURL: NSURL;

    shouldAutoCaptureSessions: boolean;

    addBeforeNotifyHook(hook: (p1: NSArray<any>, p2: NSDictionary<any, any>) => NSDictionary<any, any>): void;

    addBeforeSendBlock(block: (p1: NSDictionary<any, any>, p2: BugsnagCrashReport) => boolean): void;

    addBeforeSendSession(block: (p1: NSMutableDictionary<any, any>) => void): void;

    clearBeforeSendBlocks(): void;

    errorApiHeaders(): NSDictionary<any, any>;

    hasValidApiKey(): boolean;

    sessionApiHeaders(): NSDictionary<any, any>;

    setEndpointsForNotifySessions(notify: string, sessions: string): void;

    setUserWithNameAndEmail(userId: string, name: string, email: string): void;

    shouldSendReports(): boolean;
}

declare class BugsnagCrashReport extends NSObject {
    static alloc(): BugsnagCrashReport; // inherited from NSObject

    static new(): BugsnagCrashReport; // inherited from NSObject

    app: NSDictionary<any, any>;

    appState: NSDictionary<any, any>;

    breadcrumbs: NSArray<any>;

    context: string;

    depth: number;

    device: NSDictionary<any, any>;

    deviceState: NSDictionary<any, any>;

    error: NSDictionary<any, any>;

    errorClass: string;

    errorMessage: string;

    groupingHash: string;

    readonly incomplete: boolean;

    metaData: NSDictionary<any, any>;

    notifyReleaseStages: NSArray<any>;

    readonly overrides: NSDictionary<any, any>;

    releaseStage: string;

    severity: BSGSeverity;


    constructor(o: { KSReport: NSDictionary<any, any>; fileMetadata?: string });

    addAttributeWithValueToTabWithName(attributeName: string, value: any, tabName: string): void;

    addMetadataToTabWithName(metadata: NSDictionary<any, any>, tabName: string): void;

    attachCustomStacktraceWithType(frames: NSArray<any> | any[], type: string): void;

    enhancedErrorMessageForThread(thread: NSDictionary<any, any>): string;

    initWithKSReport(report: NSDictionary<any, any>): this;

    initWithKSReportFileMetadata(report: NSDictionary<any, any>, metadata: string): this;

    serializableValueWithTopLevelData(data: NSMutableDictionary<any, any>): NSDictionary<any, any>;

    shouldBeSent(): boolean;

    toJson(): NSDictionary<any, any>;
}

declare class BugsnagMetaData extends NSObject implements NSMutableCopying {
    static alloc(): BugsnagMetaData; // inherited from NSObject

    static new(): BugsnagMetaData; // inherited from NSObject

    delegate: BugsnagMetaDataDelegate;

    constructor(o: { dictionary: NSMutableDictionary<any, any> });

    addAttributeWithValueToTabWithName(attributeName: string, value: any, tabName: string): void;

    clearTab(tabName: string): void;

    getTab(tabName: string): NSMutableDictionary<any, any>;

    initWithDictionary(dict: NSMutableDictionary<any, any>): this;

    mutableCopyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

    toDictionary(): NSDictionary<any, any>;
}

interface BugsnagMetaDataDelegate extends NSObjectProtocol {
    metaDataChanged(metaData: BugsnagMetaData): void;
}
declare const BugsnagMetaDataDelegate: {
    prototype: BugsnagMetaDataDelegate;
};

interface BugsnagPlugin extends NSObjectProtocol {
    isStarted(): boolean;

    start(): void;
}
declare const BugsnagPlugin: {
    prototype: BugsnagPlugin;
};

declare const BugsnagVersionNumber: number;

declare const BugsnagVersionString: interop.Reference<number>;
