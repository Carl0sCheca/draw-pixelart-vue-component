<template>
    <canvas class="canvasDrawing" style="width:100%;height:100%" :id="id"></canvas>
</template>

<script lang="ts" setup>
    import { onMounted, ref, type Ref } from "vue";
    import { DrawApp } from "draw-pixelart-app"

    const props = withDefaults(defineProps<{
        id?: string,
        gridSize?: number,
        gridColor?: string,
        showGrid?: boolean,
    }>(), {
        id: "drawApp",
        gridSize: 32,
        gridColor: "000",
        showGrid: true,
    });

    let drawApp: Ref<DrawApp | undefined> = ref(undefined)

    onMounted(() => {
        drawApp.value = new DrawApp((document.getElementById(props.id) as HTMLCanvasElement), {
            gridSize: props.gridSize,
            gridColor: props.gridColor,
            showGrid: props.showGrid,
        });
    })

    defineExpose( { drawApp })

    type DrawAppRef = Ref<{ drawApp: DrawApp } | undefined>
    export type { DrawAppRef }
</script>