<template>
  <div class="accordion" id="accordionPanelsStayOpenExample">
    <div class="accordion-item" v-for="(i, k) in notams" :key="k">
      <h2 class="accordion-header" :id="`panelsStayOpen-heading-${k}`">
        <button
          class="accordion-button collapsed d-flex gap-1"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#panelsStayOpen-collapse-${k}`"
          aria-expanded="true"
          :aria-controls="`panelsStayOpen-collapse-${k}`"
        >
          {{ i["parsed"]["type"][0] }}
          <span
            class="badge"
            :class="notamCode['type'][i['parsed']['type'][1]][1]"
            >{{ notamCode["type"][i["parsed"]["type"][1]][0] }}</span
          >
          <span
            class="badge"
            :class="notamCode['validity'][i['validity']][1]"
            >{{ notamCode["validity"][i["validity"]][0] }}</span
          >
        </button>
      </h2>
      <div
        :id="`panelsStayOpen-collapse-${k}`"
        class="accordion-collapse collapse"
        :aria-labelledby="`panelsStayOpen-heading-${k}`"
      >
        <div class="accordion-body">
          {{ i["raw"] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { notamCode } from "../stores/notamCode";
defineProps(["notams"]);
</script>

<style lang="scss" scoped></style>
