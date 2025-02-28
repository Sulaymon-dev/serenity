<script setup>
const props = defineProps({
  align: {
    default: 'right',
  },
  width: {
    default: '48',
  },
  contentClasses: {
    default: () => ['py-1', 'bg-white', 'dark:bg-gray-700'],
  },
})

let open = ref(false)

const closeOnEscape = (e) => {
  if (open.value && e.key === 'Escape') {
    open.value = false
  }
}

onMounted(() => document.addEventListener('keydown', closeOnEscape))
onUnmounted(() => document.removeEventListener('keydown', closeOnEscape))

const widthClass = computed(() => {
  return {
    48: 'w-48',
  }[props.width.toString()]
})

const alignmentClasses = computed(() => {
  if (props.align === 'left') {
    return 'origin-top-left left-0'
  } else if (props.align === 'right') {
    return 'origin-top-right right-0'
  } else {
    return 'origin-top'
  }
})
</script>

<template>
  <div class="relative">
    <div @click="open = !open">
      <slot name="trigger"></slot>
    </div>

    <!-- Full Screen Dropdown Overlay -->
    <div v-show="open" class="fixed inset-0 z-40" @click="open = false"></div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0">
      <div
        v-show="open"
        class="absolute z-50 mt-2 rounded-md shadow-lg"
        :class="[widthClass, alignmentClasses]"
        style="display: none"
        @click="open = false">
        <div
          class="py-1 mt-2 bg-white rounded-md shadow-lg w-60 ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700"
          :class="contentClasses">
          <slot name="content"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>
