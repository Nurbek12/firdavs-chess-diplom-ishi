<template>
    <v-container>
        <v-timeline align="start" side="end">
            <v-timeline-item v-for="item,i in items" :key="i" dot-color="primary" icon="mdi-sword-cross" fill-dot>
                <v-card>
                    <v-card-title :class="['text-h6', 'bg-primary']">
                        {{ item.users[0].name }}
                    </v-card-title>
                    <v-card-text class="mt-2">
                        <!-- <p>{{  }}</p> -->
                        <v-btn :to="`/room/${item._id}`" class="mt-2" color="primary" variant="outlined">
                            Revanj
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-timeline-item>
        </v-timeline>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { timeline } from '@/api/tournament'

const items = ref<any[]>([])
const init = async () => {
    const { data } = await timeline()
    items.value = data
}

init()
</script>