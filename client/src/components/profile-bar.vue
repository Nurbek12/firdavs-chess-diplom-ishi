<template>
    <v-app-bar>
      <v-container>
        <v-app-bar-title>My Recent Trips</v-app-bar-title>
        
      </v-container>

        <template v-slot:append>
          <v-btn icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-btn>
        </template>

        <template #extension>
          <v-container>
            <v-tabs density="compact">
              <v-tab exact density="compact" color="primary" v-for="link,i in user_links" :key="i" :to="link.url">
                <v-icon class="mr-2">{{ link.icon }}</v-icon>
                <span>{{ link.title }}</span>
              </v-tab>
            </v-tabs>
          </v-container>
        </template>
    </v-app-bar>
</template>

<script setup lang="ts">
import { user_links } from '@/constants'
</script>