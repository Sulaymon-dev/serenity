<script setup>
const props = defineProps(['team'])
const confirmingTeamDeletion = ref(false)

const form = useForm()

const confirmTeamDeletion = () => {
  confirmingTeamDeletion.value = true
}

const deleteTeam = () => {
  form.delete(useRoutes('teams.destroy', { team: props.team.id }), {
    errorBag: 'deleteTeam',
  })
}
</script>

<template>
  <ActionSection>
    <template #title> {{ __('Delete Team') }} </template>

    <template #description> {{ __('Permanently delete this team.') }} </template>

    <template #content>
      <div class="max-w-xl text-sm text-gray-700 dark:text-gray-500">
        {{
          __(
            'Once a team is deleted, all of its resources and data will be permanently deleted. Before deleting this team, please download any data or information regarding this team that you wish to retain.'
          )
        }}
      </div>

      <div class="mt-5">
        <DangerButton @click="confirmTeamDeletion"> {{ __('Delete Team') }} </DangerButton>
      </div>

      <!-- Delete Team Confirmation Modal -->
      <ConfirmationModal :show="confirmingTeamDeletion" @close="confirmingTeamDeletion = false">
        <template #title> {{ __('Delete Team') }} </template>

        <template #content>
          <span class="dark:text-gray-500">
            {{
              __(
                'Are you sure you want to delete this team? Once a team is deleted, all of its resources and data will be permanently deleted.'
              )
            }}
          </span>
        </template>

        <template #footer>
          <SecondaryButton @click="confirmingTeamDeletion = false">
            {{ __('Cancel') }}
          </SecondaryButton>

          <DangerButton
            class="ml-2"
            @click="deleteTeam"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing">
            {{ __('Delete Team') }}
          </DangerButton>
        </template>
      </ConfirmationModal>
    </template>
  </ActionSection>
</template>
