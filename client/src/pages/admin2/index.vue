<template>
    <div class="flex">
        <app-nav-drawer />
        <main class="flex-1 w-full min-h-[100vh] bg-gray-100 pl-[57px] md:pl-0 overflow-auto">
            <router-view />
        </main>
    </div>
</template>

<script setup lang="ts">
import AppNavDrawer from '../../components/app-nav-drawer.vue'
</script>