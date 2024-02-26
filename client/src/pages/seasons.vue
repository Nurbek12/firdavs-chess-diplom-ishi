<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="text-center text-h4 text-primary">Топовое Турниры</h1>
            </v-col>
            <v-col v-for="s, i in seasons" :key="i" cols="12" sm="6" md="3">
                <v-card height="100%">
                    <v-card-text class="pb-0">
                        <div class="overflow-hidden rounded-lg">
                            <v-img :src="`/assets/image${i + 1}.jpg`" height="200" cover></v-img>
                        </div>
                    </v-card-text>
                    <v-card-text class="text-center pt-0">
                        <v-list-item lines="three">
                            <v-list-item-title class="text-h5 mb-2 text-primary">{{ s.title }}</v-list-item-title>
                            <v-list-item-subtitle>{{ s.description }}</v-list-item-subtitle>
                        </v-list-item>
                        <div class="d-flex ga-6 justify-center">
                            <div>
                                <h1 class="text-h4">{{ s.registered_users }}</h1>
                                <span class="text-body-2">участников</span>
                            </div>
                            <div>
                                <h1 class="text-h4 text-primary">{{s.price }}</h1>
                                <span class="text-body-2 text-white">награда</span>
                            </div>
                        </div>
                    </v-card-text>
                    <v-card-text>
                        <v-btn color="primary" block height="50" class="font-weight-bold">Участвовать</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
    
<script setup lang="ts">
import { seasons } from '@/constants'
</script>