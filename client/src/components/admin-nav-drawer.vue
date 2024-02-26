<template>
    <v-navigation-drawer border v-model="drawer" :rail="rail" permanent width="250" elevation="0" :expand-on-hover="mobile">
        <v-list :lines="false" nav variant="elevated">
            <v-list-item active-class="text-white" exact elevation="0" link v-for="link, i in admin_links" :key="i" :to="link.url" color="primary">
                <template v-slot:prepend>
                    <v-icon :icon="link.icon"></v-icon>
                </template>
                <v-list-item-title class="text-body-2 font-weight-medium">{{ link.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
        <v-btn position="absolute" elevation="1" v-if="!mobile" rounded="circle" size="30" class="border" @click="rail = !rail" style="right: -15px">
            <v-icon>mdi-chevron-{{ !rail?"left":"right" }}</v-icon>
        </v-btn>

    </v-navigation-drawer>
</template>
  
<script setup lang="ts">
import { ref, watch } from "vue"
import { useDisplay } from "vuetify"
import { admin_links } from "@/constants"

const rail = ref(true)
const drawer = ref(true)
const mobile = useDisplay().mobile

watch(mobile, () => { if (mobile) rail.value = true })
</script>