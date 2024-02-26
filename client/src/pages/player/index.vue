<template>
    <v-app>
        <profile-bar />
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>
  
<script setup lang="ts">
import ProfileBar from '@/components/profile-bar.vue'
</script>