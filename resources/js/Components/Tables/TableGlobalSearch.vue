<template>
  <div class="relative">
    <input
      class="block w-full text-sm border-gray-300 rounded-md shadow-sm pl-9 focus:border-violet-500 focus:ring-violet-500"
      :placeholder="label"
      :value="value"
      type="text"
      name="global"
      @input="onChange($event.target.value)" />
    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'Search ...',
    required: false,
  },

  value: {
    type: String,
    default: '',
    required: false,
  },

  onChange: {
    type: Function,
    required: true,
  },
})
</script>
