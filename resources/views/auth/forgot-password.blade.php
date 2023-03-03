@seoTitle(__('Forgot Password'))

<x-authentication-card>
    <x-slot:logo>
        <x-authentication-card-logo class="h-24" />
    </x-slot>

    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {{ __('Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.') }}
    </div>

    @if($status = session('status'))
        <div class="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
            {{ $status }}
        </div>
    @endif

    <x-splade-form class="space-y-4" :action="route('password.email')">
        <x-splade-input id="email" name="email" type="email" :label="__('Email')" required autofocus />

        <div class="flex items-center justify-end mt-4">
            <x-splade-submit :label="__('Email Password Reset Link')" />
        </div>
    </x-splade-form>
</x-authentication-card>
