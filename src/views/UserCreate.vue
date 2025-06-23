<template>
    <UserForm @submit="handleCreate" title="Crear nuevo usuario" buttonText="Crear" />
</template>

<script setup lang="ts">
import UserForm from './../components/UserForm.vue';
import type { User } from '../types/user.interface';
import { addUser } from '../utils/userStorage';

const handleCreate = (user: Omit<User, 'id'>) => {
    addUser(user)
}
</script>