<template>
    <v-app-bar color="background" height="100">
        <template #default>
            <v-container class="d-flex align-center justify-space-between">
                <v-app-bar-title class="text-primary font-weight-bold">CHESS.UZ</v-app-bar-title>
        
                <div class="d-flex ga-2">
                    <v-btn v-for="link,i in links" :key="i" color="primary" :to="link.url" exact>{{ link.title }}</v-btn>
                    <v-btn v-if="!store.isLogged" color="primary" variant="elevated" to="/login">Войти</v-btn>
                    <v-btn v-else color="primary" variant="elevated" to="/profile">
                        <template #prepend>
                            <v-avatar size="28">
                                <v-img src="/users/4.jpg"></v-img>
                            </v-avatar>
                        </template>
                        <span>{{ store.user?.name }}</span>
                    </v-btn>
                </div>
            </v-container>
        </template>
    </v-app-bar>
</template>

<script setup lang="ts">
import useStore from '@/store'
import { links } from '@/constants'

const store = useStore()
</script>