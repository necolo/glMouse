# glMouse
Add a mouse control in your webgl: 
- wheel to scale
- drag to rotate

# Install
```
npm install gl-mouse
```

# usage
```js
const GLMouse = require('gl-mouse').GLMouse;
const mouse = new GLMouse(canvas);
```

or in TypeScript:
```ts
import { GLMouse } from 'gl-mouse';
const mouse = new GLMouse(canvas);
```

# example

It is very simple to use with [regl](http://regl.party)
```js
const canvas = document.createElement('canvas')
document.body.appendChild(canvas);

const regl = require('regl')(canvas);

// create glMouse entity
// all specs are optional, and here shows the default value
const mouse = new GLMouse(canvas, {
    eye: [0, 0, 8],
    wheelSpeed: 0.01,
})

const draw = regl({
    uniforms: {
        view: () => mouse.view; // set the view matrix
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
