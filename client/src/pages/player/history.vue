<template>
    <v-container>
        <v-card>
            <v-card-text>
                <v-data-table :items="leaders" :items-per-page="-1">
                    <template #bottom></template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { leaders } from '@/constants'
</script>