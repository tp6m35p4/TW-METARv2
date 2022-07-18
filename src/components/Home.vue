<template>
  <div class="card m-4">
    <div class="card-body">
      <h5 class="card-title">
        {{ id }} /
        {{ airport["AirportName"]["Zh_tw"] }}
        <!-- {{ airport }} -->
      </h5>
      <p class="card-text">
        <!-- {{ airport.data.MetarText }} -->
        {{ airport["MetarText"] }}
      </p>
      <!-- <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a> -->
    </div>
  </div>
  <div class="card m-4">
    <div class="card-header d-flex justify-content-between">
      <ul class="nav nav-tabs card-header-tabs">
        <NotamNavItem
          v-for="(i, k) in notamCode.validity"
          :text="i[0]"
          :type="k"
          :key="k"
        />
      </ul>
      <button @click="loadNotam" class="btn btn-secondary btn-sm">Load</button>
    </div>
    <div class="card-body">
      <h5 class="card-title">
        NOTAMs of {{ id }}
        <!-- {{ airport }} -->
      </h5>
      <NotamAccordion :notams="notam" />

      <!-- <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a> -->
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { computed, watch } from "vue";
import NotamNavItem from "./NotamNavItem.vue";
import { useNotam } from "../stores/selected";
import { parse } from "../helpers/notamParser";
import NotamAccordion from "./NotamAccordion.vue";
import { notamCode } from "../stores/notamCode";
import { windyNotamUrl } from "../stores/url";
const props = defineProps(["id", "airports"]);
// const route = useRoute();
const selectedNotamType = 0;
const airport = computed(() => {
  return props.airports.data[props.id];
});
const notams = reactive({
  data: {},
});

const notamStore = useNotam();

const notam = computed(() => {
  if (notams.data[props.id] != undefined) {
    if (notamStore.selectdState == 2) {
      return notams.data[props.id];
    } else {
      return notams.data[props.id].filter((e) => {
        return e["validity"] == notamStore.selectdState;
      });
    }
  }
  return [];
});

function loadNotam() {
  fetch(`${windyNotamUrl}/${props.id}`)
    // fetch("notam_RCTP.json")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Get data error");
    })
    .then((data) => {
      notams.data[props.id] = [];
      data.forEach((e) => {
        let fromTo = e["fromTo"].split("-");
        let from = fromTo[0];
        let to = fromTo[1];
        let n = parse(e["raw"]);
        notams.data[props.id].push({
          id: e["id"],
          validity: e["validity"],
          validityStr: e["validityStr"],
          from,
          to,
          raw: e["raw"],
          body: e["body"],
          parsed: n,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      alert("Windy API error");
    });
}
</script>
