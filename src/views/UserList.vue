<template>
  <v-container class="pa-4">
    <v-card>
      <v-card-title>User List</v-card-title>
      <v-card-text>
        <div v-if="loading" class="d-flex justify-center pa-6">
          <v-progress-circular indeterminate size="48" />
        </div>
        <v-data-table v-else :headers="headers" :items="users" item-key="id" class="elevation-1">
          <template #item.actions="{ item }">
            <v-btn icon size="small" class="me-2" @click="editUser(item.id)">
              <v-icon size="small">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon size="small" color="error" @click="promptDelete(item.id, item.name)">
              <v-icon size="small">mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirmar eliminación</v-card-title>
        <v-card-text>
          ¿Deseas eliminar al usuario “{{ deletingName }}”?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="error" @click="confirmDelete">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
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

const headers = [
  { text: 'Nombre', value: 'name' },
  { text: 'Usuario', value: 'username' },
  { text: 'Email', value: 'email' },
  { text: 'Teléfono', value: 'phone' },
  { text: 'Acciones', value: 'actions', sortable: false },
]

async function loadUsers() {
  const cached = getUsers()
  if (cached.length) {
    users.value = cached
    loading.value = false
    return
  }
  try {
    const fetched = await fetchUsers()
    users.value = fetched
    saveUsers(fetched)
  } catch {
  } finally {
    loading.value = false
  }
}

function editUser(id: number) {
  router.push(`/edit/${id}`)
}

const dialog = ref(false)
const deletingId = ref<number | null>(null)
const deletingName = ref('')

function promptDelete(id: number, name: string) {
  deletingId.value = id
  deletingName.value = name
  dialog.value = true
}

function confirmDelete() {
  if (deletingId.value !== null) {
    removeUser(deletingId.value)
    users.value = getUsers()
  }
  dialog.value = false
  deletingId.value = null
  deletingName.value = ''
}

onMounted(loadUsers)
</script>
