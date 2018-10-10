import { mat4, vec3 } from 'gl-matrix';

export type VEC3 = number[];

export interface GLMouseSpec {
    eye?:vec3|VEC3;
}

export class GLMouse {
    public eye:vec3;
    public view:mat4 = mat4.create();
    
    private _canvas:HTMLCanvasElement;
    private _radius:number;
    private _lat:number;
    private _lon:number;

    constructor (canvas:HTMLCanvasElement, spec:GLMouseSpec = {}) {
        this._canvas = canvas;
        const { height, width } = canvas;

        this.eye = spec.eye && vec3.copy(vec3.create(), spec.eye) || vec3.fromValues(0, 0, 1);
        this._calView();
        this._radius = getRadius(this.eye[0], this.eye[1], this.eye[2]) || 8;
        this._lat = getAngle([1, 0], [this.eye[0], this.eye[2]]);
        this._lon = getAngle([1, 0], [this.eye[2], this.eye[1]]);

        this.bindMouseUpEvent();
        this.bindMouseDownEvent();
        this.bindMouseWheelEvent();
    }

    public tick = () => {
        this.eye = getCircleCoord(this._lat, this._lon, this._radius);
        this._calView();
    }

    private _calView () {
        mat4.lookAt(
            this.view,
            this.eye,
            [0, 0, 0],
            [0, 1, 0],
        );
    }

    public bindMouseUpEvent = () => {
        this._canvas.addEventListener('mouseup', this._handleMouseUp);
    }

    public bindMouseDownEvent = () => {
        this._canvas.addEventListener('mousedown', this._handleMouseDown);
    }

    public bindMouseWheelEvent = () => {
        this._canvas.addEventListener('mousewheel', this._handleMouseWheel);
    }

    public removeMouseUpEvent = () => {
        this._canvas.removeEventListener('mouseup', this._handleMouseUp);
    }

    public removeMouseDownEvent = () => {
        this._canvas.removeEventListener('mousedown', this._handleMouseDown);
    }

    public removeMouseWheelEvent = () => {
        this._canvas.removeEventListener('mousewheel', this._handleMouseWheel);
    }

    private _handleMouseUp = () => {
        this._canvas.removeEventListener('mousemove', this._handleDragMove);
    }

    private _handleMouseDown = () => {
        this._canvas.addEventListener('mousemove', this._handleDragMove);
    }

    private _handleMouseWheel = (ev:WheelEvent) => {
        ev.preventDefault();
        this._radius -= ev.deltaY * 0.001;
    }

    private _lastX:number = 0;
    private _lastY:number = 0;
    private _handleDragMove = (ev:MouseEvent) => {
        ev.preventDefault();

        const { _lastX, _lastY } = this;
        const { screenX, screenY } = ev;
        this._lastX = screenX;
        this._lastY = screenY;

        if (!ev.buttons) { return; }

        const dx = screenX - _lastX;
        const dy = screenY - _lastY;
        let lon = this._lon;
        lon += dy * 0.01;

        this._lat += dx * 0.01;
        if (lon > 1.57 || lon < -1.57) {
            this._lon = lon < 0 ? -1.57 : 1.57;
        } else {
            this._lon = lon;
        }
    }
}

function toFixed (n:vec3, f:number = 2) {
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

function getCircleCoord (lat, lon, r) : vec3{
    return vec3.fromValues(
        r * Math.cos(lat) * Math.cos(lon),
        r * Math.sin(lon),
        r * Math.sin(lat) * Math.cos(lon),
    );
}

function getAngle (a:[number, number], b:[number, number]) {
    return Math.atan2(b[1], b[0]) - Math.atan2(a[1], a[0]);
}