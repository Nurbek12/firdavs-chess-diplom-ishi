<template>
  <div class="player-card bg-white flex flex-col justify-between p-1 m-2">
    <div class="flex justify-between">
      <h2 class="m-0 capitalize">{{player.color}}</h2>
      <span class="bg-gray-400 p-1 text-white badge" :class="current === player ? 'bg-blue-500' : 'bg-gray-100'">Your turn</span>
    </div>

    <div className="graveyard flex">
      <img v-for="piece,i in graveyard" :key="i" :src="piece.image" :alt="piece.name" height="20px" width="20px"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue'

const props = defineProps<{
  player: any,
  current: any,
  graveyard: any[],
}>()
const { player, current, graveyard } = toRefs(props)
</script>
