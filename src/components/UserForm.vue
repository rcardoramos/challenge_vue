<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <form ref="formRef" @submit.prevent="handleSubmit">
        <v-text-field v-model="form.name" label="Name" required />
        <v-text-field v-model="form.username" label="Username" required />
        <v-text-field v-model="form.email" label="Email" type="email" required />
        <v-text-field v-model="form.phone" label="Phone" required />

        <v-card-actions class="justify-end">
          <v-btn type="submit" color="primary">
            {{ buttonText }}
          </v-btn>
        </v-card-actions>

        <v-alert v-if="error" type="error" variant="outlined" class="mt-4" dense>
          {{ error }}
        </v-alert>
        <v-alert v-if="success" type="success" variant="outlined" class="mt-4" dense>
          Usuario {{ isEdit ? 'actualizado' : 'creado' }} ✅
        </v-alert>
      </form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '../types/user.interface'

const props = withDefaults(
  defineProps<{
    modelValue?: Omit<User, 'id'> | null
    isEdit?: boolean
    title?: string
    buttonText?: string
  }>(),
  { title: 'Crear nuevo usuario', buttonText: 'Crear' }
)
const emit = defineEmits<{
  (e: 'submit', user: Omit<User, 'id'>): void
}>()
const router = useRouter()

const formRef = ref<HTMLFormElement | null>(null)

const form = reactive<Omit<User, 'id'>>({
  name: '',
  username: '',
  email: '',
  phone: ''
})
const success = ref(false)
const error = ref('')

watch(
  () => props.modelValue,
  val => {
    if (val) Object.assign(form, val)
  },
  { immediate: true }
)

function handleSubmit() {
  error.value = ''
  success.value = false

  if (!formRef.value?.checkValidity()) {
    formRef.value?.reportValidity()
    return
  }

  emit('submit', {
    name: form.name.trim(),
    username: form.username.trim(),
    email: form.email.trim(),
    phone: form.phone.trim()
  })

  router.push('/')
  success.value = true
  setTimeout(() => (success.value = false), 2000)
}
</script>
