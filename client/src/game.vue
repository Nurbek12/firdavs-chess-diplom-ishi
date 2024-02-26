<template>
    <v-sheet>
        <v-card>
            <v-card-text>
                <h4>Room ID: {{ room }}</h4>
            </v-card-text>
        </v-card>
        <v-sheet class="pt-2">
            <div class="board" style="max-width: 600px; max-height: 600px; flex-grow: 1;">
                <TheChessboard></TheChessboard>
            </div>
        </v-sheet>
    </v-sheet>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, toRefs } from 'vue'
import { TheChessboard } from 'vue3-chessboard'
import { Chess } from 'chess.js'
import socket from './socket'

const chess = ref(new Chess())
const fen = ref(chess.value.fen())
const over = ref("")
const props = defineProps<{
    players: any,
    room: any,
    orientation: any,
    cleanup: any
}>()
const { cleanup, orientation, players, room } = toRefs(props)

function onDrop(sourceSquare: any, targetSquare: any) {
    if(chess.value.turn() !== orientation.value[0]) return false

    if(players.value.length < 2) return false

    const moveData = {
        from: sourceSquare,
        to: targetSquare,
        color: chess.value.turn(),
        promotion: "q"
    }

    const move = makeMove(moveData)
    
    if(move === null) return false

    socket.emit("move", {
        move,
        room
    })

    return true
}

const makeMove = (move: any) => {
    try {
        const result = chess.value.move(move)
        fen.value = chess.value.fen()

        if(chess.value.isGameOver()){
            if(chess.value.isCheckmate()) {
                over.value = `Checkmate! ${chess.value.turn() === "w" ? "black" : "white"} wins!`
            } else if (chess.value.isDraw()) {
                over.value = "Draw"
            } else {
                over.value = "Game over"
            }
        }

        return result
    } catch (error) {
        return null
    }
}

socket.emit("move", (move: any) => {
    makeMove(move)
})

watch(chess, () => {
    fen.value = chess.value.fen()
})
</script>