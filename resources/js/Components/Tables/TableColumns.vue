<template>
  <ButtonWithDropdown placement="bottom-end" dusk="columns-dropdown" :active="hasHiddenColumns">
    <template #button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        :class="{
          'text-gray-400': !hasHiddenColumns,
          'text-violet-400': hasHiddenColumns,
        }"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path
          fill-rule="evenodd"
          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
          clip-rule="evenodd" />
      </svg>
    </template>

    <div role="menu" aria-orientation="horizontal" aria-labelledby="toggle-columns-menu" class="min-w-max">
      <div class="px-2">
        <ul class="divide-y divide-gray-200">
          <li
            v-for="(column, key) in props.columns"
            v-show="column.can_be_hidden"
            :key="key"
            class="flex items-center justify-between py-2">
            <p class="text-sm text-gray-900">
              {{ column.label }}
            </p>

            <button
              type="button"
              class="relative inline-flex flex-shrink-0 h-6 ml-4 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer focus:ring-light-blue-500 w-11 focus:outline-none focus:ring-2 focus:ring-offset-2"
              :class="{
                'bg-violet-500': !column.hidden,
                'bg-gray-200': column.hidden,
              }"
              :aria-pressed="!column.hidden"
              :aria-labelledby="`toggle-column-${column.key}`"
              :aria-describedby="`toggle-column-${column.key}`"
              :dusk="`toggle-column-${column.key}`"
              @click.prevent="onChange(column.key, column.hidden)">
              <span class="sr-only">Column status</span>
              <span
                aria-hidden="true"
                :class="{
                  'translate-x-5': !column.hidden,
                  'translate-x-0': column.hidden,
                }"
                class="inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full shadow ring-0" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </ButtonWithDropdown>
</template>

<script setup>
const props = defineProps({
  columns: {
    type: Object,
    required: true,
  },

  hasHiddenColumns: {
    type: Boolean,
    required: true,
  },

  onChange: {
    type: Function,
    required: true,
  },
})
</script>
