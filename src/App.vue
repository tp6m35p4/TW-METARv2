<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import NavbarVue from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import { onMounted, reactive } from 'vue';
import { useFetchAirportMetarInit } from './composables/fetchAirportData';
onMounted(async () => {
  await useFetchAirportMetarInit();
});
const airportList = [
  'RCFN',
  'RCTP',
  'RCKH',
  'RCSS',
  'RCBS',
  'RCKU',
  'RCMQ',
  'RCMT',
  'RCNN',
  'RCQC',
  'RCYU',
  'RCCM',
  'RCFG',
  'RCGI',
  'RCKW',
  'RCLY',
  'RCWA',
  'RCSP',
  'RCDC',
];

// function getAirportDataById(id, d) {
//   let fData = d.filter((airport) => airport.StationID == id);
//   return fData.length > 0 ? fData[0] : undefined;
// }

// onMounted(async () => {
//   const { data, isFinished } = await useAxios(metarUrl);
//   console.log(data);
//   if (isFinished) {
//     for (let i in airportList) {
//       let d = getAirportDataById(airportList[i], data.value);
//       if (d) {
//         airports.data[airportList[i]] = d;
//       }
//     }
//   }
// });
// onMounted(async () => {
//   fetch(metarUrl)
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       throw new Error('Get data error');
//     })
//     .then((data) => {
//       for (let i in airportList) {
//         let d = getAirportDataById(airportList[i], data);
//         if (d) {
//           airports.data[airportList[i]] = d;
//         }
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       alert('API error');
//     });
// });
</script>

<template>
  <NavbarVue />
  <div class="container-fuild">
    <div class="row">
      <Sidebar />
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <!-- <Home :airport="selectedAirport" /> -->
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
</style>
