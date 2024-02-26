<template>
  <div className="board my-2">
    <div v-for="b,i in displayedBoard" :key="i" class="row">
      <square v-for="a in b" :key="a.key" :css-classes="a.cssClasses" :piece="a.piece" />
    </div>
    <p>{{ message }}</p>
    <a href="/" v-if="checkmate">Play again?</a>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, toRefs } from 'vue'
import Square from './square.vue'

const props = defineProps<{
  lastMove: any,
  selectedSquare: any,
  checkmate: any,
  message: any,
  clicked: any,
  squares: any[],
}>()

const displayedBoard = ref<{
  key: any,
  piece: any,
  cssClasses: any,
  clicked?: any
}[][]>([])
const index = ref(0)
const {lastMove, selectedSquare, checkmate, clicked, squares, message} = toRefs(props)

const renderSquare = (square: any) => {
  let cssClasses = square.bgColor

  if (lastMove.value?.move_from === square.index || lastMove.value?.move_to === square.index) {
    cssClasses = 'bg-orange';
  } else if (selectedSquare.value?.piece === square.piece) {
    cssClasses += ' border-blue';
  }

  return checkmate.value ? {
    key: square.index,
    piece: square.piece,
    cssClasses,
  } : {
    key: square.index,
    piece: square.piece,
    cssClasses,
    clicked
  }
}

const init = () => {
  for (var x = 0; x < 8; x++) {
    let boardRow = [];
    for (var y = 0; y < 8; y++) {
      boardRow.push(renderSquare(squares.value[index.value]));
      index.value += 1;
    }
    displayedBoard.value.push(boardRow);
  }
}

init()
</script>