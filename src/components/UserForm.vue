<template>
  <div class="user-form">
    <h2>{{ title }}</h2>

    <form @submit.prevent="handleSubmit" class="form">
      <input v-model="form.name" type="text" placeholder="Name" />
      <input v-model="form.username" type="text" placeholder="Username" />
      <input v-model="form.email" type="email" placeholder="Email" />
      <input v-model="form.phone" type="text" placeholder="Phone" />

      <button type="submit">{{ buttonText }}</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">Usuario {{ isEdit ? 'actualizado' : 'creado' }} ✅</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { User } from '../types/user.interface'

const props = withDefaults(
  defineProps<{
    modelValue?: Omit<User, 'id'> | null
    isEdit?: boolean
    title?: string
    buttonText?: string
  }>(),
  {
    title: 'Create User',
    buttonText: 'Save'
  }
)

const emit = defineEmits<{
  (e: 'submit', user: Omit<User, 'id'>): void
}>()

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
  (val) => {
    if (val) {
      form.name = val.name
      form.username = val.username
      form.email = val.email
      form.phone = val.phone
    }
  },
  { immediate: true }
)

const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const handleSubmit = () => {
  error.value = ''
  success.value = false

  const { name, username, email, phone } = form

  if (!name || !username || !email || !phone) {
    error.value = 'Todos los campos son obligatorios.'
    return
  }

  if (!validateEmail(email)) {
    error.value = 'El correo no es válido.'
    return
  }

  emit('submit', {
    name: name.trim(),
    username: username.trim(),
    email: email.trim(),
    phone: phone.trim()
  })

  success.value = true
  setTimeout(() => (success.value = false), 2000)
}
</script>

<style scoped>
.user-form {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 0 auto;
}

h2 {
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

input {
  padding: 8px;
  font-size: 14px;
}

button {
  padding: 10px;
  background-color: #42b883;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #36966c;
}

.success {
  color: green;
  font-size: 14px;
  margin-top: 8px;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 8px;
}
</style>
