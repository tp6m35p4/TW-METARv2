<script setup>
import { useAirportsData } from '../stores/airports';

defineProps({
  // airports: Object,
  id: String,
});
const airportsData = useAirportsData();
</script>

<template>
  <nav
    id="sidebarMenu"
    class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
  >
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li
          v-for="(airport, key) in airportsData.$state"
          :key="key"
          class="nav-item"
        >
          <router-link
            class="nav-link btn btn-link"
            aria-current="page"
            :to="{ name: 'home', params: { id: key } }"
          >
            <!-- <span data-feather="home" class="align-text-bottom"></span> -->
            {{ key }} / {{ airport?.AirportName?.Zh_tw }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  /* rtl:raw:
  right: 0;
  */
  bottom: 0;
  /* rtl:remove */
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #727272;
}

.sidebar .nav-link.active {
  color: #2470dc;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
}
</style>
