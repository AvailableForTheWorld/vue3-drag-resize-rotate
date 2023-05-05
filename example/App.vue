<script setup lang="ts">
import drr from './components/drr.vue'
import { ref } from 'vue'
const mock = ref({
  'x-location': 500,
  'y-location': 500,
  width: 300,
  height: 200,
  angle: 0,
})

const handleDragStop = (curRect: any) => {
  modifyRect(curRect)
}
const handleResizeStop = (curRect: any) => {
  modifyRect(curRect)
}
const handleRotateStop = (curRect: any) => {
  modifyRect(curRect)
}

const modifyRect = (curRect: any) => {
  mock.value['x-location'] = curRect.x
  mock.value['y-location'] = curRect.y
  mock.value.width = curRect.width
  mock.value.height = curRect.height
  mock.value.angle = curRect.angle
}
</script>

<template>
  <drr
    :x="mock['x-location']"
    :y="mock['y-location']"
    :width="mock.width"
    :height="mock.height"
    :angle="mock.angle"
    :aspectRatio="true"
    :outerBound="{ x: 600, y: 600, width: 600, height: 400 }"
    @drag-stop="handleDragStop"
    @resize-stop="handleResizeStop"
    @rotate-stop="handleRotateStop"
  >
    <div>你好案件法术抵抗放假啦空手道</div>
  </drr>
</template>

<style>
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
