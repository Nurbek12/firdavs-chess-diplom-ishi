<template>
  <div class="square" :class="props.cssClasses" @click="$emit('clicked')">
    <img v-if="props.piece" :src="props.piece.image" :alt="props.piece.name" />
    <span v-else class="sr-only">empty square</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{piece: any, cssClasses: any}>()
</script>