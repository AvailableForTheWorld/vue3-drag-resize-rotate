interface IProps {
    x: number;
    y: number;
    width?: number;
    height?: number;
    angle?: number;
    selected?: boolean;
    selectable?: boolean;
    draggable?: boolean;
    resizable?: boolean;
    rotatable?: boolean;
    hasActiveContent?: boolean;
    aspectRatio?: boolean;
    dragHandle?: string;
    dragCancel?: string;
    outerBound?: {
        x: number;
        y: number;
        width: number;
        height: number;
    } | null;
    innerBound?: {
        x: number;
        y: number;
        width: number;
        height: number;
    } | null;
    onDrag?: (e: any) => void;
    onResize?: (e: any) => void;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IProps>, {
    x: number;
    y: number;
    width: number;
    height: number;
    angle: number;
    selected: boolean;
    selectable: boolean;
    draggable: boolean;
    resizable: boolean;
    rotatable: boolean;
    hasActiveContent: boolean;
    aspectRatio: boolean;
    dragHandle: string;
    dragCancel: string;
    outerBound: null;
    innerBound: null;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("select" | "deselect" | "clicked" | "drag" | "resize" | "rotate" | "rotate-start" | "rotate-stop" | "drag-start" | "drag-stop" | "resize-start" | "resize-stop" | "change" | "content-active")[], "select" | "deselect" | "clicked" | "drag" | "resize" | "rotate" | "rotate-start" | "rotate-stop" | "drag-start" | "drag-stop" | "resize-start" | "resize-stop" | "change" | "content-active", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IProps>, {
    x: number;
    y: number;
    width: number;
    height: number;
    angle: number;
    selected: boolean;
    selectable: boolean;
    draggable: boolean;
    resizable: boolean;
    rotatable: boolean;
    hasActiveContent: boolean;
    aspectRatio: boolean;
    dragHandle: string;
    dragCancel: string;
    outerBound: null;
    innerBound: null;
}>>> & {
    onDrag?: ((...args: any[]) => any) | undefined;
    onResize?: ((...args: any[]) => any) | undefined;
    onSelect?: ((...args: any[]) => any) | undefined;
    onDeselect?: ((...args: any[]) => any) | undefined;
    onClicked?: ((...args: any[]) => any) | undefined;
    onRotate?: ((...args: any[]) => any) | undefined;
    "onRotate-start"?: ((...args: any[]) => any) | undefined;
    "onRotate-stop"?: ((...args: any[]) => any) | undefined;
    "onDrag-start"?: ((...args: any[]) => any) | undefined;
    "onDrag-stop"?: ((...args: any[]) => any) | undefined;
    "onResize-start"?: ((...args: any[]) => any) | undefined;
    "onResize-stop"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    "onContent-active"?: ((...args: any[]) => any) | undefined;
}, {
    x: number;
    y: number;
    width: number;
    height: number;
    angle: number;
    selected: boolean;
    selectable: boolean;
    draggable: boolean;
    resizable: boolean;
    rotatable: boolean;
    hasActiveContent: boolean;
    aspectRatio: boolean;
    dragHandle: string;
    dragCancel: string;
    outerBound: {
        x: number;
        y: number;
        width: number;
        height: number;
    } | null;
    innerBound: {
        x: number;
        y: number;
        width: number;
        height: number;
    } | null;
}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
