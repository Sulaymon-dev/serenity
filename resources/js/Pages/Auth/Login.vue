<script setup>
const props = defineProps({
  canResetPassword: Boolean,
  status: String,
})

const form = useForm({
  email: '',
  password: '',
  remember: false,
})

const submit = () => {
  form
    .transform((data) => ({
      ...data,
      remember: form.remember ? 'on' : '',
    }))
    .post(useRoutes('login'), {
      onFinish: () => form.reset('password'),
    })
}
</script>

<template>
  <GuestLayout :title="__('Login')">
    <AuthenticationCard max-width="sm">
      <ValidationErrors class="mb-4" />

      <div v-if="props.status" class="mb-4 text-sm font-medium text-green-600">
        {{ props.status }}
      </div>

      <form @submit.prevent="submit">
        <div>
          <Label for="email" :value="__('Email Address')" req />
          <Input
            id="email"
            type="text"
            class="block w-full mt-1"
            v-model="form.email"
            autocomplete="email"
            required
            autofocus />
        </div>

        <div class="mt-4">
          <Label for="password" :value="__('Password')" req />
          <Input
            id="password"
            type="password"
            class="block w-full mt-1"
            v-model="form.password"
            required
            autocomplete="current-password" />
        </div>

        <div class="block mt-4">
          <label class="flex items-center">
            <Checkbox name="remember" v-model:checked="form.remember" />
            <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">{{ __('Remember me') }}</span>
          </label>
        </div>

        <div class="flex items-center justify-end mt-4">
          <Link
            v-if="props.canResetPassword"
            :href="route('password.request')"
            class="text-sm text-gray-600 underline hover:text-gray-900 dark:text-gray-400">
            {{ __('Forgot your password?') }}
          </Link>

          <Button class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
            {{ __('Login') }}
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  </GuestLayout>
</template>
