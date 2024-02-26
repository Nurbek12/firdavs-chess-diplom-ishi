<template>
     <v-app>
        <site-top-bar />
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import SiteTopBar from '../components/site-top-bar.vue'
</script>