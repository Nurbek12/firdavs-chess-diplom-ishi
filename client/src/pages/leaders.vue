<template>
    <v-container>
        <v-row>
            <v-col>
                <h1 class="text-center text-h4 text-primary">Лучших игроков платформы</h1>
            </v-col>
            <v-col cols="12">
                <v-data-table class="text-body-1" :headers="headers" :items="leaders" no-data-text="Нет игроков"
                    hover items-per-page="-1">
                    <template #bottom></template>
                    <template #item.photo="{ index }">
                        <div class="py-2">
                            <v-avatar size="70">
                                <v-img :src="`/users/${index + 1}.jpg`"></v-img>
                            </v-avatar>
                        </div>
                    </template>
                    <template #item.name="{ item }">
                        <h4>{{ item.name }}</h4>
                        <p class="text-medium-emphasis">{{ item.username }}</p>
                    </template>
                    <template #item.rating="{ item }">
                        <h3 class="text-primary font-weight-bold">{{ item.rating }} XP</h3>
                        <p class="text-medium-emphasis">{{ item.tournaments_won }} Выиграно турниров</p>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>
    
<script setup lang="ts">
import { leaders } from '@/constants'

const headers = [
    { title: "Фото", key: "photo", sortable: false },
    { title: "Фамилия имя", key: "name", sortable: false },
    { title: "Рейтинг", key: "rating", sortable: false },
]
</script>