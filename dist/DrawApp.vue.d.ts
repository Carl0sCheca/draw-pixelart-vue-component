import { type Ref } from "vue";
import { DrawApp } from "draw-pixelart-app";
type DrawAppRef = Ref<{
    drawApp: DrawApp;
} | undefined>;
export type { DrawAppRef };
declare const _default: import("vue").DefineComponent<{
    id: {
        type: import("vue").PropType<string>;
        default: string;
    };
    gridSize: {
        type: import("vue").PropType<number>;
        default: number;
    };
    gridColor: {
        type: import("vue").PropType<string>;
        default: string;
    };
    showGrid: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}, {
    drawApp: Ref<DrawApp | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    id: {
        type: import("vue").PropType<string>;
        default: string;
    };
    gridSize: {
        type: import("vue").PropType<number>;
        default: number;
    };
    gridColor: {
        type: import("vue").PropType<string>;
        default: string;
    };
    showGrid: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}>>, {
    id: string;
    gridSize: number;
    gridColor: string;
    showGrid: boolean;
}, {}>;
export default _default;
