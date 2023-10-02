# Demo

https://drawapp.demos.carl0scheca.com/

# Install

```bash
npm install --save-dev https://github.com/Carl0sCheca/draw-pixelart-vue-component
```

# Usage

```vue
<template>
  <div class="main">
    <DrawApp />
  </div>
</template>

<script setup lang="ts">
import { DrawApp } from "vue-drawapp";
</script>

<style scoped>
.main {
  width: 480px;
  height: 480px;
}
</style>
```

## Save image button example

```vue
<template>
  <div class="main">
    <DrawApp ref="drawApp" />
    <button @click="saveImage">Save image</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DrawApp, type DrawAppRef } from "vue-drawapp";

const drawApp: DrawAppRef = ref(undefined);

const saveImage = () => {
  drawApp.value?.drawApp.saveImage();
};
</script>

<style scoped>
.main {
  width: 480px;
  height: 480px;
}
</style>
```

## Avaliable properties

| Property    | Description                                            |
| ----------- | ------------------------------------------------------ |
| `id`        | Canvas id, default value: `drawApp`                    |
| `gridSize`  | Number of pixels, default value: `32` (32x32)          |
| `gridColor` | Crosshair color, default value: `000` (black)          |
| `showGrid`  | Show grid when canvas is loaded, default value: `true` |

## Avaliable methods

| Method                       | Description                               |
| ---------------------------- | ----------------------------------------- |
| `saveImage()`                | Save canvas image                         |
| `getData()`                  | Get 2D array of pixels color `string[][]` |
| `loadData(data: string[][])` | Load data pixels to canvas                |

More: https://github.com/Carl0sCheca/draw-pixelart-app
