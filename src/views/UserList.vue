<template>
  <div class="user-list">
    <h1>User List</h1>

    <div v-if="loading" class="loading">Cargando usuarios...</div>

    <table v-else>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Usuario</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <button @click="editUser(user.id)">Editar</button>
            <button @click="deleteUser(user.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '../types/user.interface'
import { getUsers, saveUsers, removeUser } from '../utils/userStorage'
import { fetchUsers } from '../api/userApi'

const router = useRouter()
const users = ref<User[]>([])
const loading = ref(true)

async function loadUsers() {
  const cachedUsers = getUsers()

  if (cachedUsers.length > 0) {
    users.value = cachedUsers
    loading.value = false
    return
  }

  try {
    const userList = await fetchUsers()
    users.value = userList
    saveUsers(userList)
  } catch (err) {
    console.error('Error al obtener usuarios:', err)
  } finally {
    loading.value = false
  }
}

function editUser(id: number) {
  router.push(`/edit/${id}`)
}

function deleteUser(id: number) {
  if (confirm('¿Estás seguro de eliminar este usuario?')) {
    removeUser(id)
    users.value = getUsers()
  }
}

onMounted(loadUsers)
</script>

<style scoped>
.user-list {
  font-family: Arial, sans-serif;
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 16px;
}

.loading {
  font-style: italic;
  color: #666;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

th,
td {
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #ccc;
}

thead {
  background-color: #f2f2f2;
}

button {
  margin-right: 8px;
  padding: 6px 10px;
  font-size: 13px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

button:first-of-type {
  background-color: #42b883;
  color: white;
}

button:last-of-type {
  background-color: #ff4d4f;
  color: white;
}
</style>
