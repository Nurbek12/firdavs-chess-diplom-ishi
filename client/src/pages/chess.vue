<template>
    <v-app full-height>
        <v-app-bar title="Application bar">
            <span>Go'lib: {{ winner?.name }}</span>
        </v-app-bar>

        <v-navigation-drawer width="300">
            <v-list>
                <v-list-item title="История игры"></v-list-item>
                <v-divider></v-divider>
                <v-list-item v-for="h,i in history" :key="i">
                    <template #prepend>
                        <v-avatar size="40" :color="{w:'black',b:'white'}[h.color]">
                            <v-icon size="30" :color="{w:'white',b:'black'}[h.color]">
                                {{ pieces[h.piece] }}
                            </v-icon>
                        </v-avatar>
                    </template>
                    <v-list-item-title>{{ h.from.toLocaleUpperCase().split('').join(',') }} ===> {{ h.to.toLocaleUpperCase().split('').join(',') }}</v-list-item-title>
                    <template #append v-if="h.captured">
                        <v-avatar size="40" :color="{w:'white',b:'black'}[h.color]">
                            <v-icon size="30" :color="{w:'black',b:'white'}[h.color]">
                                {{ pieces[h.captured] }}
                            </v-icon>
                        </v-avatar>
                    </template>
                    <v-list-item-subtitle></v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-navigation-drawer location="right">
            <v-list>
                <v-list-item title="Пользователи"></v-list-item>
                <v-divider></v-divider>
                <v-list-item density="compact" v-for="user,i in users" :key="i" :title="user[1].name"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main class="d-flex align-center justify-center">
            <v-card max-height="700" max-width="700" width="100%" height="100%">
                <!-- :player-color="'white'" -->
                <TheChessboard v-if="is_gaming"
                    :player-color="userColor"
                    @checkmate="checkmate"
                    @move="move"
                    @draw="draw"
                    @board-created="a => api=a"
                />
            </v-card>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useStore from '@/store'
import { useRoute } from 'vue-router'
import 'vue3-chessboard/style.css'
import { io } from 'socket.io-client'
import { get_game } from '@/api/tournament'
import { winner_game } from '@/api/tournament'
import { TheChessboard, BoardApi, MoveEvent } from 'vue3-chessboard'

const route = useRoute()
const userColor = ref<any>(null)
const winner = ref<any>(null)
const store = useStore()
const is_gaming = ref(false)
const history = ref<MoveEvent[]>([])
const api = ref<BoardApi|null>(null)
const users = ref<any[]>([])
const socket = io('http://localhost:4000')

const pieces = {
    p: "mdi-chess-pawn",
    b: "mdi-chess-bishop",
    k: "mdi-chess-king",
    n: "mdi-chess-knight",
    q: "mdi-chess-queen",
    r: "mdi-chess-rook",
}

// const config: BoardConfig = {
    
// }

const checkmate = async (isMated: string) => {

    if(isMated !== userColor.value) {
        // alert('Siz yutdingiz')
        const { data } = await winner_game(route.params.id,store.user?._id)
        console.log(data);
        
        winner.value = data.winner
    } else {
        alert('Siz yutqazdingiz')
    }
}

const draw = () => {
    console.log('Draw')
}

const joinGame = async () => {
    const { data } = await get_game(route.params.id)
    console.log(data)
    if(data.winner) winner.value = data.winner
    userColor.value = data.colors[store.user?._id||'']||'null'
    
    socket.emit('join-to-game', store.user || { name: 'Anonim', _id: Date.now() }, route.params.id)
    is_gaming.value = true
}

joinGame()

socket.on('get-users', (data) => {
    // console.log(data);
    users.value = data
})

const run = (e: any) => {
    history.value.push(e)
    api.value?.move(e)
}

const move = (e: MoveEvent) => {
    socket.emit('move-a', e)   
}

socket.on('move-d', (data: any) => {
    run(data)
})

socket.on('get-game', (data: any) => {
    history.value = data
    // api.value.
    console.log(data);
    
    // history.value.at(-1)?.after&&
    // api.value?.
    // .(history.value.at(-1)?.after!)
})
</script>