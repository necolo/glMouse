"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gl_matrix_1 = require("gl-matrix");
function glMouse(canvas) {
    var height = canvas.height, width = canvas.width;
    var rotate = gl_matrix_1.mat4.create();
    var lastMouseX = 0;
    var lastMouseY = 0;
    var res = {};
    var radius = 8;
    var lat = 0;
    var lon = 0;
    var light_move = [];
    res.preset = function (spec) {
        var camera = spec.camera;
        var cx = camera[0], cy = camera[1], cz = camera[2];
        radius = getRadius(cx, cy, cz);
        lat = getAngle([1, 0], [cx, cz]);
        lon = getAngle([1, 0], [cz, cy]);
    };
    var handleWheel = function (ev) {
        ev.preventDefault();
        radius -= ev.deltaY * 0.001;
    };
    var handleDragmove = function (ev) {
        ev.preventDefault();
        lat += ev.movementX * 0.01;
        if (lon < 1.57 && lon > -1.57) {
            lon += ev.movementY * 0.01;
        }
        else {
            lon = (lon > 0) ? 1.56 : -1.56;
        }
    };
    res.tick = function () {
        var camera = getCircleCoor(lat, lon, radius);
        var view = gl_matrix_1.mat4.lookAt(gl_matrix_1.mat4.create(), camera, [0, 0, 0], [0, 1, 0]);
        res.view = function () { return view; };
    };
    canvas.addEventListener('mousewheel', handleWheel);
    canvas.addEventListener('mousedown', function (ev) { return canvas.addEventListener('mousemove', handleDragmove); });
    canvas.addEventListener('mouseup', function (ev) { return canvas.removeEventListener('mousemove', handleDragmove); });
    return res;
}
exports.glMouse = glMouse;
function toFixed(n, f) {
    if (f === void 0) { f = 2; }
    return [
        parseInt(n[0].toFixed(f)),
        parseInt(n[1].toFixed(f)),
        parseInt(n[2].toFixed(f)),
    ];
}
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
function radToDeg(radian) {
    return radian * 180 / Math.PI;
}
function getRadius(x, y, z) {
    if (z === void 0) { z = 0; }
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
}
function getCircleCoor(lat, lon, r) {
    return [
        r * Math.cos(lat) * Math.cos(lon),
        r * Math.sin(lon),
        r * Math.sin(lat) * Math.cos(lon),
    ];
}
function getAngle(a, b) {
    return Math.atan2(b[1], b[0]) - Math.atan2(a[1], a[0]);
}
//# sourceMappingURL=index.js.map