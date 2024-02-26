<template>
    <v-sheet height="100vh" class="py-1 d-flex align-center justify-center">
        <v-dialog v-model="roomDialog">
            <v-card>
                <v-card-title>Select Room to Join</v-card-title>
                <v-card-text>Enter a valid room ID to join the room</v-card-text>
                <v-card-text>
                    <v-text-field autofocus density="compact" v-model="roomInput" label="Room ID"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="handleCountinue"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-btn @click="startGame">Start a game</v-btn>
        <v-btn @click="roomDialog=true">Join a game</v-btn>
    </v-sheet>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import socket from './socket'

const emits = defineEmits(['setRoom','setOrientation','setPlayers'])
const roomDialog = ref(false)
const roomInput = ref("")
const roomError = ref("")

const handleCountinue = () => {
    if(!roomInput.value?.trim()) return

    socket.emit('joinRoom', { roomId: roomInput.value }, (r: any) => {
        if(r.error) return roomError.value = r.message

        emits('setRoom', r?.roomId)
        emits("setPlayers", r?.players)
        emits("setOrientation", "black")
        roomDialog.value = false
    })
}

const startGame = () => {
    socket.emit('createRoom', (r: any) => {
        emits("setRoom", r)
        emits("setOrientation", "white")
    })
}
</script>