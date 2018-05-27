import { mat4 } from 'gl-matrix';
export declare type Vector3 = [number, number, number];
export declare type MouseT = {
    tick: () => void;
    model: () => mat4;
    view: () => mat4;
    preset: (spec: {
        camera: Vector3;
    }) => void;
};
export declare function glMouse(canvas: HTMLCanvasElement): MouseT;
