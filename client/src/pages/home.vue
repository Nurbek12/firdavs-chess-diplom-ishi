<template>
<v-container>
    <v-card height="500" rounded="xl">
        <v-img src="/assets/bg-image.jpg" cover height="100%">
            <v-card-text style="height: 100%;">
                <div class="px-4 text-center h-100 d-flex flex-column justify-center align-center">
                    <h1 class="text-h4 text-grey-darken-4">Добро пожаловать на Шахматный Портал!</h1>
                    <p class="text-body-1 text-grey-darken-3 w-75">Здесь, в мире умных ходов и захватывающих сражений, мы приглашаем вас присоединиться к нашему сообществу шахматистов. Наши турниры предоставляют отличную возможность померяться силами с опытными игроками, обменяться опытом и, конечно же, насладиться удовольствием от игры.</p>
                    <div class="d-flex ga-4 mt-6 justify-center">
                        <v-btn class="text-primary" height="50">Участвовать</v-btn>
                    </div>
                </div>
            </v-card-text>
        </v-img>
    </v-card>
    <v-row class="mt-10">
        <v-col cols="12" sm="6" md="3">
            <div class="d-flex align-center justify-center flex-column px-2 py-8">
                <h1 class="text-primary text-h4 font-weight-bold">1,286</h1>
                <p class="text-h6">Пользователи</p>
            </div>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <div class="d-flex align-center justify-center flex-column px-2 py-8">
                <h1 class="text-primary text-h4 font-weight-bold">100+</h1>
                <p class="text-h6">Победители</p>
            </div>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <div class="d-flex align-center justify-center flex-column px-2 py-8">
                <h1 class="text-primary text-h4 font-weight-bold">600+</h1>
                <p class="text-h6">Сезоны</p>
            </div>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <div class="d-flex align-center justify-center flex-column px-2 py-8">
                <h1 class="text-primary text-h4 font-weight-bold">3,000 $</h1>
                <p class="text-h6">Награда</p>
            </div>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <h1 class="text-center text-h4 text-primary">Топовое Турниры</h1>
        </v-col>
        <v-col v-for="item,i in items" :key="i" cols="12" sm="6" md="3">
            <v-card height="100%">
                <v-card-text class="pb-0">
                    <div class="overflow-hidden rounded-lg">
                        <v-img :src="`${baseURL}/file/${item.image}`" height="200" cover></v-img>
                    </div>
                </v-card-text>
                <v-card-text class="text-center pt-0">
                    <v-list-item lines="three">
                        <v-list-item-title class="text-h5 mb-2 text-primary">{{ item.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
                    </v-list-item>
                    <div class="d-flex ga-6 justify-center">
                        <div>
                            <h1 class="text-h4">{{ item.users?.length }}/{{ item.max_users }}</h1>
                            <span class="text-body-2">участников</span>
                        </div>
                        <div>
                            <h1 class="text-h4 text-primary">{{ item.reward }} $</h1>
                            <span class="text-body-2 text-white">награда</span>
                        </div>
                    </div>
                </v-card-text>
                <v-card-text>
                    <v-btn :disabled="item.users.includes(store.user?._id)" @click="handleAttend(item._id, i)" color="primary" block height="50" class="font-weight-bold">Участвовать</v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row class="mt-10">
        <v-col>
            <h1 class="text-center text-h4 text-primary">5 лучших игроков</h1>
        </v-col>
        <v-col cols="12">
            <v-data-table class="text-body-1" :headers="headers" :items="leaders.splice(0,5)" no-data-text="Нет игроков" hover items-per-page="-1">
                <template #bottom></template>
                <template #item.photo="{index}">
                    <div class="py-2">
                        <v-avatar size="70">
                            <v-img :src="`/users/${index+1}.jpg`"></v-img>
                        </v-avatar>
                    </div>
                </template>
                <template #item.name="{item}">
                    <h4>{{ item.name }}</h4>
                    <p class="text-medium-emphasis">{{ item.username }}</p>
                </template>
                <template #item.rating="{item}">
                    <h3 class="text-primary font-weight-bold">{{ item.rating }} XP</h3>
                    <p class="text-medium-emphasis">{{ item.tournaments_won }} Выиграно турниров</p>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useStore from '@/store'
import { baseURL } from '@/api'
import { leaders } from '@/constants'
import { get_all, attend } from '@/api/tournament'

const store = useStore()
const items = ref<any[]>([])
const headers = [
    { title: "Фото", key: "photo", sortable: false },
    { title: "Фамилия имя", key: "name", sortable: false },
    { title: "Рейтинг", key: "rating", sortable: false },
]

const init = async () => {
    const { data } = await get_all({limit: 4})
    items.value = data.result
}

const handleAttend = async (id: any, index: number) => {
    const { data } = await attend(id)
    if(data) items.value[index]?.users?.push(store.user?._id)
}

init()
</script>