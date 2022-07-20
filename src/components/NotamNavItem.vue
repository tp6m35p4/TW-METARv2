<template>
  <li class="nav-item">
    <button
      class="nav-link"
      :class="{ active: notam.selectdState == type }"
      type="button"
      @click="notam.selectdState = type"
    >
      {{ text }}
    </button>
  </li>
</template>

<script setup>
import { useNotam } from '../stores/selected';

defineProps(['text', 'type']);
const notam = useNotam();
</script>

<style lang="scss" scoped></style>
