import { mat4, vec3 } from 'gl-matrix';
export declare type Vector3 = [number, number, number];
export declare type MouseT = {
    tick: () => void;
    model: () => mat4;
    view: () => mat4;
    preset: (spec: {
        camera: Vector3;
    }) => void;
    eye: vec3;
};
export declare function glMouse(canvas: HTMLCanvasElement): MouseT;
