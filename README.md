# glMouse
Add a mouse control in your webgl: 
- wheel to scale
- drag to rotate

# Install
```
npm install gl-mouse
```

# Usage

It is very simple to use with [regl](http://regl.party)
```js
const canvas = document.createElement('canvas')
document.body.appendChild(canvas);

const regl = require('regl')(canvas);

// create glMouse entity
const mouse = require('gl-mouse')(canvas);

mouse.preset({
    camera: [0, 0, 8], // preset the camera position [x, y, z]
})

const draw = regl({
    uniforms: {
        view: () => mouse.view(); // set the view matrix to mouse.view()
    }
})

regl.frame(() => {
    regl.clear({
        depth: 1,
        color: [0, 0, 0, 1],
    });

    mouse.tick(); // insert mouse.tick() here
    draw();
})
```

# todos
- add example to use glMouse in normal webgl program without regl
