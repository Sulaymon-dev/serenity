<div {{ $attributes->only(['v-if', 'v-show', 'class']) }}>
    <label class="flex items-center dark:text-gray-200">
        <input {{ $attributes->except(['v-if', 'v-show', 'class'])->class(
            'rounded border-gray-300 text-blue-600 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50 disabled:opacity-50'
        )->merge([
            'name' => $name,
            'value' => $value,
            'type' => 'checkbox',
            'v-model' => $vueModel(),
            'data-validation-key' => $validationKey(),
        ]) }} :true-value="@js($value)" :false-value="@js($falseValue)" />

        @if(trim($slot))
            <span class="ml-2">{{ $slot }}</span>
        @else
            <span class="ml-2">{{ $label }}</span>
        @endif
    </label>

    @includeWhen($help, 'splade::form.help', ['help' => $help])
    @includeWhen($showErrors, 'splade::form.error', ['name' => $validationKey()])
</div>


