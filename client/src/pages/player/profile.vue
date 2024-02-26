<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <v-row>
                    <v-col cols="12">
                        <v-card rounded="lg" elevation="4">
                            <v-img src="/users/6.jpg" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)">
                                <div class="w-100 h-100 d-flex flex-column justify-end">
                                    <v-rating class="ml-2" density="comfortable" color="orange" model-value="5"></v-rating>
                                    <v-card-title class="pt-0 d-flex align-center justify-space-between">
                                        <span>{{ store.user?.name }}</span>
                                        <v-btn variant="text" rounded="circle" size="40">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                    </v-card-title>
                                </div>
                            </v-img>
                            <v-card-text class="d-flex align-center ga-3 text-h6 text-primary">
                                <span>Tajriba: </span> <span>22,007 EXP</span>
                            </v-card-text>
                            <v-card-text class="d-flex align-center ga-3 text-body-1 pt-0">
                                <span>Yoshi: </span> <span>{{ store.user?.age }} yosh</span>
                            </v-card-text>
                            <v-card-text class="d-flex align-center ga-3 text-body-1 pt-0">
                                <span>Email: </span> <span>{{ store.user?.email }}</span>
                            </v-card-text>
                            <v-card-text class="d-flex align-center ga-3 text-body-1 pt-0">
                                <v-btn v-show="false" color="primary" height="45" class="font-weight-bold" block prepend-icon="mdi-sword-cross">
                                    Revanj
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title>Yutuqlar</v-card-title>
                            <v-card-text>
                                <v-list>
                                    <v-list-item v-for="i in 3" :key="i">
                                        <template #prepend>
                                            <v-avatar rounded size="80">
                                                <v-img src="/assets/image9.jpg" cover></v-img>
                                            </v-avatar>
                                        </template>
                                        <v-list-item-title>Chempinat {{ i }}</v-list-item-title>
                                        <v-list-item-subtitle>Turnirdagi o'rni</v-list-item-subtitle>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title>Последные игры</v-card-title>
                    <v-card-text>
                        <v-data-table :items="leaders" :items-per-page="-1">
                            <template #bottom></template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { leaders } from '@/constants'
import useStore from '@/store'

const store = useStore()
</script>