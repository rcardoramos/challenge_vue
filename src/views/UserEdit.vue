<template>
    <div class="user-edit">
        <UserForm v-if="user" :modelValue="user" :isEdit="true" title="Editar usuario" buttonText="Actualizar"
            @submit="handleUpdate" />

        <p v-else class="error">Usuario no encontrado.</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserForm from './../components/UserForm.vue'
import { getUsers, updateUser } from '../utils/userStorage'
import type { User } from '../types/user.interface'

const route = useRoute()
const router = useRouter()
const userId = Number(route.params.id)

const allUsers = getUsers()
const user = ref<User | null>(allUsers.find(u => u.id === userId) || null)

function handleUpdate(updatedData: Omit<User, 'id'>) {
    if (!user.value) return

    updateUser({ ...updatedData, id: user.value.id })

    router.push('/')
}
</script>

<style scoped>
.user-edit {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.error {
    color: red;
    font-size: 16px;
    text-align: center;
}
</style>