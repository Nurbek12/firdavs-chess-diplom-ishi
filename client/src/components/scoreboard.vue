<template>
  <section className="scoreboard h-100 d-flex flex-column justify-content-between">
    <PlayerCard :player="players['black']" :current="current" :graveyard="whiteGraveyard" />
    <div className="h-100 p-2">
      <div className="move-history bg-white h-100 scrollable">
        <ol className="d-inline-block">
          <li v-for="m,i in moveList" :key="i">
            <div className="move-description">
              <span>{{ m.span1 }}</span>
              <span>{{ m.span2 }}</span>
            </div>
          </li>
        </ol>
      </div>
    </div>
    <PlayerCard :player="players['white']" :current="current" :graveyard="blackGraveyard" />
  </section>
</template>

<script setup lang="ts">
import { ref, toRefs, defineProps } from 'vue'
import PlayerCard from './playercard.vue'

const moveList = ref<any[]>([]);
const whiteMove = ref<any|null>(null)
const blackMove = ref<any|null>(null)
const props = defineProps<{
  moves:any[],
  players: any,
  current: any,
  blackGraveyard: any,
  whiteGraveyard: any
}>()
const { moves, players, current, blackGraveyard, whiteGraveyard } = toRefs(props)

const displayMoveList = (moves: any[]) => {
  for (let i = 0; i < moves.length; i++) {
    whiteMove.value = moves[i];
    blackMove.value = null;

    if (i !== (moves.length - 1)) {
      i += 1;
      blackMove.value = moves[i];
    }

    moveList.value.push({
      key: i,
      span1: whiteMove.value.notation,
      span2: blackMove.value?.notation,
    })
  }
}

displayMoveList(moves.value)
</script>

export default class Scoreboard extends React.Component {
  displayMoveList(moves) {

    for (let i = 0; i < moves.length; i++) {
      whiteMove = moves[i];
      blackMove = null;

      if (i !== (moves.length - 1)) {
        i += 1;
        blackMove = moves[i];
      }

      moveList.push(
        <li key={i}>
          <div className="move-description">
            <span>{whiteMove.notation}</span>
            <span>{blackMove?.notation}</span>
          </div>
        </li>
      );
    }

    return moveList;
  }

  render() {
    return (
      
    );
  }
};
