<script setup lang="ts">
</script>

<template>
  <nav>
    <router-link to="/">Lista de usuarios</router-link> |
    <router-link to="/create">Crear usuario</router-link>
  </nav>
  <router-view />
</template>

<style scoped>
nav {
  margin-bottom: 16px;
}

router-link {
  margin-right: 8px;
}
</style>
