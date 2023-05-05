<template>
  <div class="drr" :class="classObject" :style="styleObject" @dblclick="handleDbClick" @mousedown="bodyMouseDown">
    <slot></slot>
    <div
      v-for="stick in sticks"
      :key="stick"
      class="drr-stick"
      :class="['drr-stick-' + stick, resizable ? '' : 'not-resizable']"
      :style="drrStick(stick)"
      @mousedown.stop.prevent="stickDown(stick, $event)"
    ></div>
    <div v-if="rotatable" class="ro-stick-handle"></div>
  </div>
</template>

<script lang="ts" setup>
import Vector from '../utils/vector'
import { STICK_SIZE, ROTATION_STICK_SIZE, STYLE_MAPPING } from '../utils/constant'
import { nanoid } from 'nanoid'
import { ref, computed, toRefs, watch, onMounted, onBeforeUnmount, withDefaults } from 'vue'

interface IProps {
  x: number
  y: number
  width?: number
  height?: number
  angle?: number
  selected?: boolean
  selectable?: boolean
  draggable?: boolean
  resizable?: boolean
  rotatable?: boolean
  hasActiveContent?: boolean
  aspectRatio?: boolean
  dragHandle?: string
  dragCancel?: string
  outerBound?: {
    x: number
    y: number
    width: number
    height: number
  } | null
  innerBound?: {
    x: number
    y: number
    width: number
    height: number
  } | null
  onDrag?: (e: any) => void
  onResize?: (e: any) => void
}

const props = withDefaults(defineProps<IProps>(), {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  angle: 0,
  selected: false,
  selectable: true,
  draggable: true,
  resizable: true,
  rotatable: true,
  hasActiveContent: false,
  aspectRatio: false,
  dragHandle: '',
  dragCancel: '',
  outerBound: null,
  innerBound: null,
})

const {
  x,
  y,
  width,
  height,
  angle,
  selected,
  selectable,
  draggable,
  resizable,
  rotatable,
  hasActiveContent,
  aspectRatio,
  dragHandle,
  dragCancel,
  outerBound,
  innerBound,
  onDrag,
  onResize,
} = toRefs(props)

const emit = defineEmits([
  'select',
  'deselect',
  'clicked',
  'drag',
  'resize',
  'rotate',
  'rotate-start',
  'rotate-stop',
  'drag-start',
  'drag-stop',
  'resize-start',
  'resize-stop',
  'change',
  'content-active',
])

const active = ref(selected.value)
const contentActive = ref(false)

const curX = ref(x.value)
const curY = ref(y.value)
const curWidth = ref(width?.value || 0)
const curHeight = ref(height?.value || 0)
const rotation = ref(angle?.value)
const stickDrag = ref(false)
const bodyDrag = ref(false)
const dragged = ref(false)
const resized = ref(false)
const rotated = ref(false)
const currentStick = ref<string[]>([])
const stickStartPos = ref({
  mouseX: 0,
  mouseY: 0,
  curX: 0,
  curY: 0,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  rotation: 0,
})
const rotateStartEmitted = ref(false)
const resizeStartEmitted = ref(false)
const dragStartEmitted = ref(false)

const getRect = () => {
  return {
    x: curX.value,
    y: curY.value,
    width: curWidth.value,
    height: curHeight.value,
    angle: rotation.value,
  }
}

const setRect = (r: any) => {
  curX.value = r.x
  curY.value = r.y
  curWidth.value = r.width
  curHeight.value = r.height
  rotation.value = r.angle
}

const startRect = ref(getRect())

const sticks = computed(() => {
  const arr: string[] = []
  if (resizable.value) {
    arr.push('tl', 'tr', 'br', 'bl')
  }
  if (rotatable.value) {
    arr.push('ro')
  }
  return arr
})

const classObject = computed(() => {
  return {
    active: active.value,
    selectable: selectable.value,
    dragging: bodyDrag.value,
    contentActive: contentActive.value,
  }
})

const styleObject = computed(() => {
  return {
    left: curX.value - curWidth.value / 2 + 'px',
    top: curY.value - curHeight.value / 2 + 'px',
    width: curWidth.value + 'px',
    height: curHeight.value + 'px',
    transform: 'rotate(' + rotation.value + 'deg)',
  }
})

const handleDbClick = () => {
  if (!selectable.value) {
    return
  }
  emit('content-active')
}

const drrStick = computed(() => {
  return (stick: any) => {
    const stickStyle: any = {
      width: `${STICK_SIZE}px`,
      height: `${STICK_SIZE}px`,
    }
    if (stick == 'ro') {
      stickStyle['top'] = `${-STICK_SIZE / 2 - ROTATION_STICK_SIZE}px`
      stickStyle['marginLeft'] = `${-STICK_SIZE / 2 + 1}px`
    } else {
      stickStyle[STYLE_MAPPING.y[stick[0] as 't' | 'm' | 'b']] = `${-STICK_SIZE / 2}px`
      stickStyle[STYLE_MAPPING.x[stick[1] as 'l' | 'm' | 'r']] = `${-STICK_SIZE / 2}px`
    }
    return stickStyle
  }
})

const toggleContentActive = (val: boolean) => {
  contentActive.value = val
  active.value = !val
  // TODO: children?
  // for (const child of this.$children) {
  //   child.$emit('active')
  // }
}

const stickMove = (e: MouseEvent) => {
  const pos = stickStartPos.value
  const delta = new Vector(e.pageX - pos.mouseX, e.pageY - pos.mouseY)
  // TODO: 这里的currentStick好像有问题
  if (currentStick.value.includes('ro')) {
    let up = new Vector(0, -height.value / 2 - ROTATION_STICK_SIZE)
    const rotationRad = Vector.rad(pos.rotation)
    up = up.rotate(rotationRad)
    const v = up.add(delta)
    if (!rotateStartEmitted.value) {
      emit('rotate-start', startRect.value)
      rotateStartEmitted.value = true
    }
    rotation.value = Vector.deg(v.angle()) + 90
    rotated.value = true
    emit('rotate', getRect())
  } else {
    const dirX = currentStick.value.includes('r') ? 1 : -1
    const dirY = currentStick.value.includes('b') ? 1 : -1
    const phi = Vector.rad(stickStartPos.value.rotation)
    let p
    if (aspectRatio.value) {
      let axis = new Vector((dirX * stickStartPos.value.width) / 2, (dirY * stickStartPos.value.height) / 2)
      axis = axis.rotate(phi).unit()
      p = axis.mul(axis.mul(delta)) as Vector
    } else {
      p = delta
    }
    let pn = p.rotate(-phi)
    let newcx = stickStartPos.value.curX + p.x / 2
    let newcy = stickStartPos.value.curY + p.y / 2
    let newwidth = stickStartPos.value.width + dirX * pn.x
    let newheight = stickStartPos.value.height + dirY * pn.y
    let x1 = newcx - newwidth / 2
    let y1 = newcy - newheight / 2
    let x2 = newcx + newwidth / 2
    let y2 = newcy + newheight / 2

    if (outerBound.value && rotation.value === 0) {
      let bx1 = outerBound.value.x - outerBound.value.width / 2
      let by1 = outerBound.value.y - outerBound.value.height / 2
      let bx2 = outerBound.value.x + outerBound.value.width / 2
      let by2 = outerBound.value.y + outerBound.value.height / 2
      let dx = 0
      let dy = 0
      if (x1 < bx1) dx = bx1 - x1
      if (x2 > bx2) dx = bx2 - x2
      if (y1 < by1) dy = by1 - y1
      if (y2 > by2) dy = by2 - y2

      if (dx != 0 || dy != 0) {
        if (aspectRatio.value) {
          if (dx / p.x < dy / p.y) {
            p.y += (dx * p.y) / p.x
            p.x += dx
          } else {
            p.x += (dy * p.x) / p.y
            p.y += dy
          }
        } else {
          p.x += dx
          p.y += dy
        }
      }
    }

    if (innerBound.value && rotation.value === 0) {
      let bx1 = innerBound.value.x - innerBound.value.width / 2
      let by1 = innerBound.value.y - innerBound.value.height / 2
      let bx2 = innerBound.value.x + innerBound.value.width / 2
      let by2 = innerBound.value.y + innerBound.value.height / 2
      let dx = 0
      let dy = 0
      if (x1 > bx1) dx = bx1 - x1
      if (x2 < bx2) dx = bx2 - x2
      if (y1 > by1) dy = by1 - y1
      if (y2 < by2) dy = by2 - y2

      if (dx != 0 || dy != 0) {
        if (aspectRatio.value) {
          if (dx / p.x < dy / p.y) {
            p.y += (dx * p.y) / p.x
            p.x += dx
          } else {
            p.x += (dy * p.x) / p.y
            p.y += dy
          }
        } else {
          p.x += dx
          p.y += dy
        }
      }
    }

    curX.value = stickStartPos.value.curX + p.x / 2
    curY.value = stickStartPos.value.curY + p.y / 2
    pn = p.rotate(-phi)
    curWidth.value = stickStartPos.value.width + dirX * pn.x
    curHeight.value = stickStartPos.value.height + dirY * pn.y

    if (onResize && onResize.value) setRect(onResize.value(getRect()))

    if (!resizeStartEmitted.value) {
      emit('resize-start', startRect.value)
      resizeStartEmitted.value = true
    }

    resized.value = true
    emit('resize', getRect())
  }
}

const bodyMove = (ev: MouseEvent) => {
  const newPos = {
    mouseX: ev.pageX,
    mouseY: ev.pageY,
  }
  const delta = {
    x: newPos.mouseX - stickStartPos.value.mouseX,
    y: newPos.mouseY - stickStartPos.value.mouseY,
  }
  let newcx = stickStartPos.value.curX + delta.x
  let newcy = stickStartPos.value.curY + delta.y
  let x1 = newcx - width.value / 2
  let y1 = newcy - height.value / 2
  let x2 = newcx + width.value / 2
  let y2 = newcy + height.value / 2

  if (outerBound.value && rotation.value === 0) {
    let bx1 = outerBound.value.x - outerBound.value.width / 2
    let by1 = outerBound.value.y - outerBound.value.height / 2
    let bx2 = outerBound.value.x + outerBound.value.width / 2
    let by2 = outerBound.value.y + outerBound.value.height / 2
    if (x1 < bx1) delta.x -= x1 - bx1
    if (x2 > bx2) delta.x -= x2 - bx2
    if (y1 < by1) delta.y -= y1 - by1
    if (y2 > by2) delta.y -= y2 - by2
  }

  if (innerBound.value && rotation.value === 0) {
    let bx1 = innerBound.value.x - innerBound.value.width / 2
    let by1 = innerBound.value.y - innerBound.value.height / 2
    let bx2 = innerBound.value.x + innerBound.value.width / 2
    let by2 = innerBound.value.y + innerBound.value.height / 2
    if (x1 > bx1) delta.x -= x1 - bx1
    if (x2 < bx2) delta.x -= x2 - bx2
    if (y1 > by1) delta.y -= y1 - by1
    if (y2 < by2) delta.y -= y2 - by2
  }

  curX.value = stickStartPos.value.curX + delta.x
  curY.value = stickStartPos.value.curY + delta.y

  if (onDrag && onDrag.value) setRect(onDrag.value(getRect()))

  if (!dragStartEmitted.value) {
    emit('drag-start', startRect)
    dragStartEmitted.value = true
  }

  dragged.value = true
  emit('drag', getRect())
}

const stickUp = () => {
  stickDrag.value = false
  stickStartPos.value = {
    mouseX: 0,
    mouseY: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    curX: curX.value,
    curY: curY.value,
    rotation: rotation.value,
  }

  if (resized.value) {
    emit('resize-stop', getRect()) // TODO
    emit('change', getRect())
  }

  if (rotated.value) {
    emit('rotate-stop', getRect())
    emit('change', getRect())
  }
}

const stickDown = (stick: any, ev: MouseEvent) => {
  if (!resizable.value || !active.value) return
  resizeStartEmitted.value = false
  rotateStartEmitted.value = false
  startRect.value = getRect()
  stickDrag.value = true
  resized.value = false
  rotated.value = false
  stickStartPos.value = {
    mouseX: ev.pageX,
    mouseY: ev.pageY,
    x: stick.x,
    y: stick.y,
    width: curWidth.value,
    height: curHeight.value,
    curX: curX.value,
    curY: curY.value,
    rotation: rotation.value,
  }
  currentStick.value = stick
}

const bodyUp = () => {
  bodyDrag.value = false
  stickStartPos.value = {
    mouseX: 0,
    mouseY: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    curX: curX.value,
    curY: curY.value,
    rotation: rotation.value,
  }

  if (dragged.value) {
    emit('drag-stop', getRect())
    emit('change', getRect())
  }
}

const onMouseMove = (e: MouseEvent) => {
  if (!judgeIsDrag()) {
    return
  }
  e.stopPropagation()
  if (stickDrag.value) {
    // debugger
    stickMove(e)
  }
  if (bodyDrag.value) {
    bodyMove(e)
  }
}
const onMouseUp = () => {
  if (stickDrag.value) {
    stickUp()
  }
  if (bodyDrag.value) {
    bodyUp()
  }
}

const deSelect = () => {
  emit('deselect')
  active.value = false
}

const onMouseDown = () => {
  deSelect()
}

const bodyMouseDown = (e: MouseEvent) => {
  if (contentActive.value || !selectable.value) {
    return
  } else {
    e.preventDefault()
    e.stopPropagation()
  }

  const target = e.target as HTMLElement

  active.value = true

  if (e.button && e.button !== 0) {
    return
  }

  emit('clicked', e)

  if (!draggable.value || !active.value) {
    return
  }

  // FIXME: UID
  if (
    dragHandle.value &&
    (target.getAttribute('data-drag-handle') !== 'true' || target.getAttribute('data-drag-cancel') === null)
  ) {
    return
  }

  bodyDrag.value = true
  dragged.value = false

  dragStartEmitted.value = false
  startRect.value = getRect()

  stickStartPos.value.mouseX = e.pageX
  stickStartPos.value.mouseY = e.pageY

  stickStartPos.value.curX = curX.value
  stickStartPos.value.curY = curY.value
}

const onMouseLeave = () => {
  onMouseUp()
}

const judgeIsDrag = () => {
  return stickDrag.value || bodyDrag.value
}

const addListenerEvent = () => {
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
  document.addEventListener('mousedown', onMouseDown)
  document.addEventListener('mouseleave', onMouseLeave)
}

const removeListenerEvent = () => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
  document.removeEventListener('mousedown', onMouseDown)
  document.removeEventListener('mouseleave', onMouseLeave)
}

onMounted(() => {
  addListenerEvent()
  if (dragHandle.value) {
    const dragHandleElements = document.querySelectorAll(dragHandle.value)
    if (dragHandleElements) {
      dragHandleElements.forEach((element) => {
        element.setAttribute('data-drag-handle', nanoid())
      })
    }
  }
  if (dragCancel.value) {
    const dragCancelElements = document.querySelectorAll(dragCancel.value)
    if (dragCancelElements) {
      dragCancelElements.forEach((element) => {
        element.setAttribute('data-drag-cancel', nanoid())
      })
    }
  }
})

onBeforeUnmount(() => {
  removeListenerEvent()
})

watch(active, (val) => {
  if (val) {
    emit('select')
  } else {
    emit('deselect')
  }
})

watch(selected, (val) => {
  active.value = val
})

watch(hasActiveContent, (val) => {
  toggleContentActive(val)
})

watch(x, (val) => {
  if (judgeIsDrag()) {
    return
  }
  curX.value = val
})

watch(y, (val) => {
  if (judgeIsDrag()) {
    return
  }
  curY.value = val
})

watch(width, (val) => {
  if (judgeIsDrag()) {
    return
  }
  currentStick.value = ['m', 'r']
  curWidth.value = val
})

watch(height, (val) => {
  if (judgeIsDrag()) {
    return
  }
  currentStick.value = ['b', 'm']
  curHeight.value = val
})

watch(angle, (val) => {
  if (judgeIsDrag()) {
    return
  }
  rotation.value = val
})
</script>

<style>
.drr {
  position: absolute;
  box-sizing: border-box;
  cursor: pointer;
}
.drr img {
  width: inherit;
  height: inherit;
}
.drr.active:before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  outline: 2px dashed lightskyblue;
}

.drr.selectable.inactive:hover:before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  outline: 2px dashed #d6d6d6;
}

.drr.non-selectable {
  pointer-events: none;
}

.drr-stick {
  box-sizing: border-box;
  position: absolute;
  font-size: 1px;
  background: #ffffff;
  border: 1px solid #6c6c6c;
  box-shadow: 0 0 2px #bbb;
}

.drr-stick:hover {
  border-color: lightskyblue;
}

.inactive > .drr-stick {
  display: none;
}

.drr-stick-tl,
.drr-stick-br {
  cursor: nwse-resize;
}

.drr-stick-tm,
.drr-stick-bm {
  left: 50%;
  cursor: ns-resize;
}

.drr-stick-tr,
.drr-stick-bl {
  cursor: nesw-resize;
}

.drr-stick-ml,
.drr-stick-mr {
  top: 50%;
  cursor: ew-resize;
}

.drr-stick-ro {
  left: 50%;
  cursor: ew-resize;
  border-radius: 4px;
}

.ro-stick-handle {
  left: 50%;
  top: -16px;
  box-sizing: border-box;
  position: absolute;
  font-size: 1px;
  background: #ffffff;
  border: 1px solid #6c6c6c;
  box-shadow: 0 0 2px #bbb;
  width: 0px;
  height: 16px;
}

.inactive > .ro-stick-handle {
  display: none;
}

.drr-stick.not-resizable {
  display: none;
}

.content-active {
  border: 2px solid lightskyblue; /*TODO*/
}
</style>
