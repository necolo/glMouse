/*
import { mat4, vec3, vec2 } from 'gl-matrix';

export type Vector3 = [number, number, number];

//todo: add:
// set_wheelSpeed
// set_moveSpeed
export type MouseT = {
    tick: () => void;
    model: () => mat4;
    view: () => mat4;
    preset:(spec:{
        camera:Vector3,
    }) => void;
    eye:vec3;
}

export function glMouse (canvas:HTMLCanvasElement) : MouseT {
    const { height, width }  = canvas;

    let rotate:mat4 = mat4.create();

    let lastMouseX = 0;
    let lastMouseY = 0;

    const res:MouseT = {} as MouseT;

    let radius = 8;
    let lat = 0;
    let lon = 0;

    const light_move:number[][] = [];
    res.preset = (spec) => {
        const { camera } = spec;
        const [cx, cy, cz] = camera;
        radius = getRadius(cx, cy, cz);
        lat = getAngle([1, 0], [cx, cz]); 
        lon = getAngle([1, 0], [cz, cy]);
    }

    const handleWheel = (ev) => {
        ev.preventDefault();
        radius -= ev.deltaY * 0.001;
    }

    const handleDragmove = (ev) => {
        ev.preventDefault();
        lat += ev.movementX * 0.01;

        if (lon < 1.57 && lon > -1.57) {
            lon += ev.movementY * 0.01;
        } else {
            lon = (lon > 0) ? 1.56 : -1.56;
        }
    }

    res.tick = () => {
        res.eye = getCircleCoor(lat, lon, radius);

        const view = mat4.lookAt(
            mat4.create(),
            res.eye, 
            [0, 0, 0],
            [0, 1, 0],
        );

        res.view = () => view;
    }

    canvas.addEventListener('mousewheel', handleWheel);
    canvas.addEventListener('mousedown', (ev) => canvas.addEventListener('mousemove', handleDragmove));
    canvas.addEventListener('mouseup', (ev) => canvas.removeEventListener('mousemove', handleDragmove));

    return res;
}

function toFixed (n:Vector3, f:number = 2) {
    return [
        parseInt(n[0].toFixed(f)),
        parseInt(n[1].toFixed(f)),
        parseInt(n[2].toFixed(f)),
    ]
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function radToDeg(radian) {
    return radian * 180 / Math.PI;
}

function getRadius (x, y, z = 0) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
}

function getCircleCoor (lat, lon, r) : [number, number, number]{
    return [
        r * Math.cos(lat) * Math.cos(lon),
        r * Math.sin(lon),
        r * Math.sin(lat) * Math.cos(lon),
    ]
}

function getAngle (a:[number, number], b:[number, number]) {
    return Math.atan2(b[1], b[0]) - Math.atan2(a[1], a[0]);
}
*/