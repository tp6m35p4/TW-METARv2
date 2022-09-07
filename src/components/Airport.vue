<template>
  <MetarCard :metar="metar" :id="id" />
  <!-- <TafCard :id="id" /> -->
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
      <button
        class="btn btn-secondary btn-sm"
        @click="useFetchAirportNotam(id)"
      >
        Load
      </button>
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
import { computed, onMounted, watch } from 'vue';
import NotamNavItem from './NotamNavItem.vue';
import { useNotam } from '../stores/selected';
import NotamAccordion from './NotamAccordion.vue';
import { notamCode } from '../stores/notamCode';
import MetarCard from './MetarCard.vue';
import ClipboardJS from 'clipboard';
// import TafCard from './TafCard.vue';
import { useAirportsData } from '../stores/airports';
import { useFetchAirportNotam } from '../composables/fetchAirportData';
import { useRefreshNotam } from '../composables/refreshAirportData';
import { useRoute } from 'vue-router';
const props = defineProps({
  id: String,
});

const route = useRoute();
const airportsData = useAirportsData();
airportsData.checkExpired(props.id);
const metar = computed(() => {
  return airportsData[props.id]['metar'];
});
useRefreshNotam(props.id);
const notamStore = useNotam();
const notam = computed(() => {
  if (airportsData[props.id]['notam']?.['data'] != undefined) {
    if (notamStore.selectdState == 2) {
      return airportsData[props.id]['notam']['data'];
    } else {
      return airportsData[props.id]['notam']['data'].filter((e) => {
        return e['validity'] == notamStore.selectdState;
      });
    }
  }
  return [];
});

watch(
  () => route.params.id,
  (newId) => {
    useRefreshNotam(newId);
  }
);

onMounted(() => {
  new ClipboardJS('.btn.copy-metar');
});
</script>
