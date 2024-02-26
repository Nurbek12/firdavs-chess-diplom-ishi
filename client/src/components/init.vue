<template>
<div class="d-flex align-center justify-center" style="height: 100vh; width: 100%;">
    <v-card max-width="500" max-height="500" width="100%">
        <v-card-title>Select Room to Join</v-card-title>
        <v-card-text>Enter a valid room ID to join the room</v-card-text>
        <v-card-text>
            <v-text-field autofocus label="Room ID" v-model="roominput" color="primary"></v-text-field>
        </v-card-text>
        <v-card-text class="pt-0 pb-6">
            <v-btn block color="primary" height="50" variant="elevated" @click="joinRoom">Join Room</v-btn>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="pt-0 pb-6">
            <v-btn block color="primary" height="50" variant="elevated" @click="creatRoom">Create Room</v-btn>
        </v-card-text>
    </v-card>
</div>
</template>

<script setup lang="ts">
// import socket from '@/socket'
import { ref, defineEmits } from 'vue'

const emits = defineEmits(['setroom', 'setorientation', 'setplayers'])

const roominput = ref('')
// const roomError = ref('')

const joinRoom = () => {
    if(!roominput.value.trim()) return
    // socket.emit('join', { roomId: roominput.value }, (r: any) => {
    //     if (r.error) return roomError.value = r.message

    //     emits('setroom', r?.roomId)
    //     emits('setplayers', r?.players)
    //     emits("setorientation", "black")
    // })
}

const creatRoom = () => {
    // socket.emit("createRoom", (r: any) => {
    //     emits('setroom', r?.roomId)
    //     emits("setorientation", "white")
    // })
}
</script>