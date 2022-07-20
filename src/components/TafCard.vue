<template>
  <div class="card m-4">
    <div class="card-body">
      <div class="d-flex flex-row align-items-center card-title">
        <h5 class="my-auto flex-grow-1">TAF</h5>
        <button
          class="btn btn-sm btn-outline-secondary copy-metar"
          :data-clipboard-target="`#${id}-taf-text`"
        >
          Copy
        </button>
      </div>

      <p class="card-text" :id="`${id}-taf-text`"></p>
      <!-- <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a> -->
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: String,
});
</script>

<style lang="scss" scoped></style>
