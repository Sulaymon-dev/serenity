<script setup>
const props = defineProps(['sessions'])
const confirmingLogout = ref(false)
const password = ref()
const form = useForm({
  password: '',
})

const confirmLogout = () => {
  confirmingLogout.value = true
  setTimeout(() => password.value.input.focus(), 250)
}

const logoutOtherBrowserSessions = () => {
  form.delete(useRoutes('other-browser-sessions.destroy'), {
    preserveScroll: true,
    onSuccess: () => closeModal(),
    onError: () => password.value.input.focus(),
    onFinish: () => form.reset(),
  })
}

const closeModal = () => {
  confirmingLogout.value = false
  form.reset()
}

defineExpose({ password })
</script>

<template>
  <ActionSection>
    <template #title>{{ __('Browser Sessions') }}</template>

    <template #description>
      {{ __('Manage and log out your active sessions on other browsers and devices.') }}
    </template>

    <template #content>
      <div class="max-w-xl text-sm text-gray-600">
        {{
          __(
            'If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password.'
          )
        }}
      </div>

      <!-- Other Browser Sessions -->
      <div class="mt-5 space-y-6" v-if="props.sessions.length > 0">
        <div class="flex items-center" v-for="(session, i) in props.sessions" :key="i">
          <div>
            <IconOutlineDesktopComputer v-if="session.agent.is_desktop" class="h-8 w-8 text-gray-500" />
            <IconOutlineDeviceMobile v-else class="h-8 w-8 text-gray-500" />
          </div>

          <div class="ml-3">
            <div class="text-sm text-gray-600">{{ session.agent.platform }} - {{ session.agent.browser }}</div>

            <div>
              <div class="text-xs text-gray-500">
                {{ session.ip_address }},

                <span class="font-semibold text-green-500" v-if="session.is_current_device">
                  {{ __('This device') }}
                </span>
                <span v-else> {{ __('Last active') }} {{ session.last_active }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5 flex items-center">
        <Button @click="confirmLogout">
          {{ __('Log Out Other Browser Sessions') }}
        </Button>

        <ActionMessage :on="form.recentlySuccessful" class="ml-3"> {{ __('Done.') }}</ActionMessage>
      </div>

      <!-- Log Out Other Devices Confirmation Modal -->
      <DialogModal :show="confirmingLogout" @close="closeModal">
        <template #title>{{ __('Log Out Other Browser Sessions') }}</template>

        <template #content>
          {{
            __(
              'Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices.'
            )
          }}

          <div class="mt-4">
            <Input
              type="password"
              class="mt-1 block w-3/4"
              placeholder="Password"
              ref="password"
              v-model="form.password"
              @keyup.enter="logoutOtherBrowserSessions" />

            <InputError :message="form.errors.password" class="mt-2" />
          </div>
        </template>

        <template #footer>
          <SecondaryButton @click="closeModal">
            {{ __('Cancel') }}
          </SecondaryButton>

          <Button
            class="ml-2"
            @click="logoutOtherBrowserSessions"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing">
            {{ __('Log Out Other Browser Sessions') }}
          </Button>
        </template>
      </DialogModal>
    </template>
  </ActionSection>
</template>
