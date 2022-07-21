<template>
  <div class="card m-4">
    <div class="card-body">
      <div class="d-flex flex-row align-items-center card-title">
        <h5 class="my-auto flex-grow-1">
          {{ metar?.StationID }} /
          {{ metar?.AirportName?.Zh_tw }}
          <!-- {{ airport }} -->
        </h5>
        <button
          class="btn btn-sm btn-outline-secondary copy-metar"
          :data-clipboard-target="`#${metar?.StationID}-metar-text`"
        >
          Copy
        </button>
      </div>

      <p :id="`${metar?.StationID}-metar-text`" class="card-text">
        <!-- {{ airport.data.MetarText }} -->
        {{ metar?.MetarText }}
      </p>
      <!-- <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a> -->
    </div>
  </div>
</template>

<script setup>
defineProps({
  metar: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
