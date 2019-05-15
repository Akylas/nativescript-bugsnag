import { BreadcrumbType, Configuration, NativePropertyOptions, NotifyOptions } from './bugsnag';
import { isAndroid } from 'tns-core-modules/platform';
import * as application from 'tns-core-modules/application';
import * as trace from 'tns-core-modules/trace';

export const BREADCRUMB_MAX_LENGTH = 30;

const originalConsoleFuncs = {};
['log', 'debug', 'info', 'warn', 'error'].forEach(method => {
    if (typeof console[method] === 'function') {
        originalConsoleFuncs[method] = console[method];
    }
});

export const clog: typeof console.log = originalConsoleFuncs['log'];
export const cwarn: typeof console.warn = originalConsoleFuncs['warn'];
export const cerror: typeof console.error = originalConsoleFuncs['error'];

export abstract class ClientBase {
    config: Configuration;

    abstract leaveBreadcrumb(message: string, type?: BreadcrumbType, metaData?: { [k: string]: string });
    abstract handleNotify(options): Promise<any>;

    onNativeError(args) {
        if (this.config.autoNotify && this.config.shouldNotify()) {
            const error = args.error;
            // const nErrror = args.android as java.lang.Exception;
            // clog('onNativeError', error, Object.keys(args), Object.keys(error), error.message, error.stackTrace);
            // clog('nErrror', nErrror);
            clog('nativeException', error.message, error.stack);

            // const array  = /(?:.*?)\s*\ncom\.tns\.NativeScriptException:\s*\n((?:.|[\r\n])*)StackTrace:((?:.|[\r\n])*)/mg.exec(error.stackTrace)
            // clog('array', error.stackTrace.replace(/(\n|\t|\r)/g, '$$$'), array);
            this.handleNotify({
                apiKey: this.config.apiKey,
                // context: 'NativeScriptActivity',
                errorClass: 'NativeScriptError',
                errorMessage: error.message,
                // groupingHash: undefined,
                // metadata: undefined,
                severity: 'error',
                stacktrace: error.stack,
                // user: {},
                // defaultSeverity: true,
                // blocking: false,
                // unhandled: true,
                severityReason: 'unhandledException'
            }).catch(err => {});
        }
    }
    /**
     * Registers a global error handler which sends any uncaught error to
     * Bugsnag before invoking the previous handler, if any.
     */
    handleUncaughtErrors() {
        application.on(application.uncaughtErrorEvent, this.onNativeError, this);
        application.on(application.discardedErrorEvent, this.onNativeError, this);
        // application.on(application.discardedErrorEvent, function(args: application.DiscardedErrorEventData) {
        //     console.log("### [discarded] NativeScriptError: " + args.error);
        //     console.log("### [discarded] nativeException: " + (<any>args.error).nativeException);
        //     console.log(`### [discarded] stackTrace: '${(<any>args.error).stackTrace}'`);
        //     console.log(`### [discarded] error message: '${error.message}'`);
        //     console.log(`### [discarded] stack: '${args.error.stack}'`);
        // });
        // application.on(application.uncaughtErrorEvent, function(args: application.UnhandledErrorEventData) {
        //     const error = args.error as any;
        //     console.log("### [uncaught] NativeScriptError: ", error);
        //     console.log("### [uncaught] nativeException: ", error.nativeException);
        //     console.log(`### [uncaught] stackTrace: '${error.stackTrace}'`);
        //     console.log(`### [uncaught] error message: '${error.message}'`);
        //     console.log(`### [uncaught] stack: '${error.stack}'`);
        // });
        // trace.setErrorHandler is for manual triggered error ?
        const errorHandler: trace.ErrorHandler = {
            handlerError(err) {
                clog('handlerError', err);
                this.onNativeError(err);
            }
        };
        trace.setErrorHandler(errorHandler);
    }

    abstract getBreadcrumbType(str: string): any;
    enableConsoleBreadcrumbs() {
        clog('enableConsoleBreadcrumbs');
        Object.keys(originalConsoleFuncs).forEach(method => {
            console[method] = (...args) => {
                originalConsoleFuncs[method].apply(console, args);
                try {
                    this.leaveBreadcrumb('Console', this.getBreadcrumbType('LOG'), {
                        severity: /^group/.test(method) ? 'log' : method,
                        message: args
                            .map(arg => {
                                let stringified;
                                // do the best/simplest stringification of each argument
                                try {
                                    stringified = String(arg);
                                } catch (e) {}
                                // unless it stringifies to [object Object], use the toString() value
                                if (stringified && stringified !== '[object Object]') return stringified;
                                // otherwise attempt to JSON stringify (with indents/spaces)
                                try {
                                    stringified = JSON.stringify(arg, null, 2);
                                } catch (e) {}
                                // any errors, fallback to [object Object]
                                return stringified;
                            })
                            .join(' ')
                    });
                } catch (error) {
                    originalConsoleFuncs['warn'](`Unable to serialize console.${method} arguments to Bugsnag breadcrumb.`, error);
                }
            };
        });
    }

    disableConsoleBreadCrumbs() {
        Object.keys(originalConsoleFuncs).forEach(method => {
            console[method] = originalConsoleFuncs[method];
        });
    }
    notify(options: NotifyOptions | Error | string, _handledState?) {
        const error = options instanceof Error ? options : options['error'] || options;
        const realOptions: NotifyOptions = error !== options ? (options as NotifyOptions) : { error };
        // clog('notify', error instanceof Error, typeof error, error, error.message, error.stack);
        if (!(error instanceof Error)) {
            if (realOptions.postSendCallback) {
                realOptions.postSendCallback(false);
            }
            return Promise.reject('Bugsnag could not notify: error must be of type Error');
        }
        if (!this.config.shouldNotify()) {
            if (realOptions.postSendCallback) {
                realOptions.postSendCallback(false);
            }
            return Promise.reject(undefined);
        }

        const report = new Report(this.config.apiKey, realOptions.error, _handledState);
        if (this.config.codeBundleId) {
            report.addMetadata('app', 'codeBundleId', this.config.codeBundleId);
        }
        if (realOptions.metadata) {
            report.addMetadatas(realOptions.metadata);
        }

        if (this.config.beforeSendCallbacks) {
            for (const callback of this.config.beforeSendCallbacks) {
                if (callback(report, realOptions.error) === false) {
                    if (realOptions.postSendCallback) {
                        realOptions.postSendCallback(false);
                    }
                    return Promise.reject('cancelled');
                }
            }
        }

        if (realOptions.beforeSendReportCallback) {
            realOptions.beforeSendReportCallback(report);
        }

        const payload: any = report.toJSON();
        payload.blocking = !!realOptions.blocking;

        return this.handleNotify(payload)
            .then(() => {
                if (realOptions.postSendCallback) {
                    realOptions.postSendCallback();
                }
            })
            .catch(err => {
                if (realOptions.postSendCallback) {
                    realOptions.postSendCallback(false);
                }
                return Promise.reject(err);
            });
    }
}

export function createGetter(key: string, options: NativePropertyOptions) {
    // clog('createGetter', key, options);
    const nativeGetterName = ((isAndroid ? options.android : options.ios) || options).nativeGetterName || 'get' + key.charAt(0).toUpperCase() + key.slice(1);
    const converter = options.converter;
    return function() {
        let result;
        // clog('getter', key, nativeGetterName);
        if (this.native && this.native[nativeGetterName]) {
            result = this.native[nativeGetterName]();
        } else {
            result = this.options[key] || options.defaultValue;
        }
        result = converter ? converter.fromNative.call(this, result, key) : result;
        // clog('getter', key, options, nativeGetterName, !!getConverter, result);
        return result;
    };
}
export function createSetter(key, options: NativePropertyOptions) {
    // clog('createSetter', key, options);
    const nativeSetterName = ((isAndroid ? options.android : options.ios) || options).nativeSetterName || 'set' + key.charAt(0).toUpperCase() + key.slice(1);
    return function(newVal) {
        // clog('setter', key, newVal, Array.isArray(newVal), typeof newVal, nativeSetterName, this.native && this.native[nativeSetterName]);
        this.options[key] = newVal;
        if (this.native && typeof this.native[nativeSetterName] === 'function') {
            const actualVal = options.converter ? options.converter.toNative.call(this, newVal, key) : newVal;
            this.native[nativeSetterName](actualVal);
        } else {
            const actualKey = ((isAndroid ? options.android : options.ios) || options).nativeKey || key;
            const actualVal = options.converter ? options.converter.toNative.call(this, newVal, key) : newVal;
            this.native[actualKey] = actualVal;
            this._buildStyle = null;
        }
        // this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: key, value: actualVal });
    };
}

export function hasSetter(obj, prop) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
    return descriptor && !!descriptor['set'];
}

export abstract class BaseNative<T, U extends {}> {
    constructor(public options?: U, native?: T) {
        if (native) {
            this.native = native;
        }
    }
    native: T;
    initNativeView(native: T, options: U) {
        for (const key in options) {
            (this as any)[key] = options[key];
        }
    }
    getNative() {
        if (!this.native) {
            this.native = this.createNative(this.options);
            this.initNativeView(this.native, this.options);
        }
        return this.native;
    }
    abstract createNative(options: U): T;
}
export class StandardDelivery {
    constructor(public endpoint, public sessionsEndpoint) {}
}

class HandledState {
    constructor(public originalSeverity, public unhandled, public severityReason) {}
}
/**
 * A report generated from an error
 */
export class Report {
    errorClass;
    errorMessage;
    context;
    groupingHash;
    metadata;
    stacktrace;
    user;
    severity;
    _handledState;
    constructor(private apiKey, error, _handledState) {
        this.errorClass = error.constructor.name;
        this.errorMessage = error.message;
        this.context = undefined;
        this.groupingHash = undefined;
        this.metadata = {};
        this.stacktrace = error.stack;
        this.user = {};

        if (!_handledState || !(_handledState instanceof HandledState)) {
            _handledState = new HandledState('warning', false, 'handledException');
        }

        this.severity = _handledState.originalSeverity;
        this._handledState = _handledState;
    }

    /**
     * Attach additional diagnostic data to the report. The key/value pairs
     * are grouped into sections.
     */
    addMetadata = (section, key, value) => {
        if (!this.metadata[section]) {
            this.metadata[section] = {};
        }
        this.metadata[section][key] = value;
    }

    addMetadatas = object => {
        Object.assign(this.metadata, object);
    }

    toJSON = () => {
        if (!this._handledState || !(this._handledState instanceof HandledState)) {
            this._handledState = new HandledState('warning', false, 'handledException');
        }
        // severityReason must be a string, and severity must match the original
        // state, otherwise we assume that the user has modified _handledState
        // in a callback
        const defaultSeverity = this._handledState.originalSeverity === this.severity;
        const isValidReason = typeof this._handledState.severityReason === 'string';
        const severityType = defaultSeverity && isValidReason ? this._handledState.severityReason : 'userCallbackSetSeverity';

        // if unhandled not set, user has modified the report in a callback
        // or via notify, so default to false
        const isUnhandled = typeof this._handledState.unhandled === 'boolean' ? this._handledState.unhandled : false;

        return {
            apiKey: this.apiKey,
            context: this.context,
            errorClass: this.errorClass,
            errorMessage: this.errorMessage,
            groupingHash: this.groupingHash,
            metadata: this.metadata,
            severity: this.severity,
            stacktrace: this.stacktrace,
            user: this.user,
            defaultSeverity,
            unhandled: isUnhandled,
            severityReason: severityType
        };
    }
}
