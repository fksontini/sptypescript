
declare module Sys {
    export class EventArgs {
        static Empty: Sys.EventArgs;
    }
    export class StringBuilder {
        /** Appends a string to the string builder */
        append(s: string): void;
        /** Appends a line to the string builder */
        appendLine(s: string): void;
        /** Clears the contents of the string builder */
        clear(): void;
        /** Indicates wherever the string builder is empty */
        isEmpty(): boolean;
        /** Gets the contents of the string builder as a string */
        toString(): string;
    }
    export class Component {
        get_id(): string;
        static create(type: Component, properties?: any, events?: any, references?: any, element?: Node);
        initialize(): void;
        updated(): void;
    }

    export interface IContainer {
        addComponent(component: Component): void;
        findComponent(id: string): Component;
        getComponents(): Component[];
        removeComponent(component: Component);
    }

    export class Application extends Component implements IContainer {
        addComponent(component: Component): void;
        findComponent(id: string): Component;
        getComponents(): Component[];
        removeComponent(component: Component);

        static add_load(handler: (sender: Application, eventArgs: ApplicationLoadEventArgs) => void);
        static remove_load(handler: (sender: Application, eventArgs: ApplicationLoadEventArgs) => void);
    }

    export class ApplicationLoadEventArgs {
        constructor(components: Component[], isPartialLoad: boolean);
        public components: Component[];
        public isPartialLoad: boolean;
    }

    module UI {
        export class Control extends Component { }
        export class DomEvent {
            static addHandler(element: HTMLElement, eventName: string, handler: (e: DomEvent) => void);
            static removeHandler(element: HTMLElement, eventName: string, handler: (e: DomEvent) => void);
            static clearHandlers(element: HTMLElement);

            constructor(element: HTMLElement)
            rawEvent: Event;
            altKey: boolean;
            button: MouseButton;
            keyCode: number;
            clientX: number;
            clientY: number;
            ctrlKey: boolean;
            offsetX: number;
            offsetY: number;
            screenX: number;
            screenY: number;
            shiftKey: boolean;
            target: HTMLElement;
            type: string;
            preventDefault(): void;
            stopPropagation(): void;

        }

        export class DomElement {
            static getBounds(element: HTMLElement): { x: number; y: number; width: number; height: number; };
        }

        export enum MouseButton {
            leftButton,
            middleButto,
            rightButton
        }

        export enum Key {
            backspace,
            tab,
            enter,
            esc,
            space,
            pageUp,
            pageDown,
            end,
            home,
            left,
            up,
            right,
            down,
            del
        }
    }
    module Net {
        export class WebRequest {
            get_url(): string;
            set_url(value: string): void;
            get_httpVerb(): string;
            set_httpVerb(value: string): void;
            get_timeout(): number;
            set_timeout(value: number): void;
            get_body(): string;
            set_body(value: string): void;
            get_headers(): { [key: string]: string; };
            get_userContext(): any;
            set_userContext(value: any): void;
            get_executor(): WebRequestExecutor;
            set_executor(value: WebRequestExecutor): void;

            getResolvedUrl(); string;
            invoke(): void;
            completed(args: Sys.EventArgs): void;

            add_completed(handler: (executor: WebRequestExecutor, args: Sys.EventArgs) => void): void;
            remove_completed(handler: (executor: WebRequestExecutor, args: Sys.EventArgs) => void): void;
        }

        export class WebRequestExecutor {
            get_aborted(): boolean;
            get_responseAvailable(): boolean;
            get_responseData(): string;
            get_object(): any;
            get_started(): boolean;
            get_statusCode(): number;
            get_statusText(): string;
            get_timedOut(): boolean;
            get_xml(): Document;
            get_webRequest(): WebRequest;
            abort(): void;
            executeRequest(): void;
            getAllResponseHeaders(): string;
            getResponseHeader(key: string): string;
        }

        export class NetworkRequestEventArgs extends EventArgs {
            get_webRequest(): WebRequest;
        }


        export class WebRequestManager {
            static get_defaultExecutorType(): string;
            static set_defaultExecutorType(value: string): void;
            static get_defaultTimeout(): number;
            static set_defaultTimeout(value: number): void;

            static executeRequest(request: WebRequest): void;
            static add_completedRequest(handler: (executor: WebRequestExecutor, args: Sys.EventArgs) => void): void;
            static remove_completedRequest(handler: (executor: WebRequestExecutor, args: Sys.EventArgs) => void): void;
            static add_invokingRequest(handler: (executor: WebRequestExecutor, args: NetworkRequestEventArgs) => void): void;
            static remove_invokingRequest(handler: (executor: WebRequestExecutor, args: NetworkRequestEventArgs) => void): void;
        }

        export class WebServiceProxy {
            static invoke(
                servicePath: string,
                methodName: string,
                useGet?: boolean,
                params?: any,
                onSuccess?: (result: string, eventArgs: EventArgs) => void,
                onFailure?: (error: WebServiceError) => void,
                userContext?: any,
                timeout?: number,
                enableJsonp?: boolean,
                jsonpCallbackParameter?: string): WebRequest;
        }

        export class WebServiceError {
            get_errorObject(): any;
            get_exceptionType(): any;
            get_message(): string;
            get_stackTrace(): string;
            get_statusCode(): number;
            get_timedOut(): boolean;
        }
    }
    interface IDisposable {
        dispose(): void;
    }

}

declare var $get: { (id: string): HTMLElement; };
declare var $addHandler: { (element: HTMLElement, eventName: string, handler: (e: Sys.UI.DomEvent) => void): void; };
declare var $removeHandler: { (element: HTMLElement, eventName: string, handler: (e: Sys.UI.DomEvent) => void): void; };
