import { defineStore } from 'pinia';

export const useAirportsData = defineStore('airportsDataStore', {
  state: () => {
    return {
      RCFN: {},
      RCTP: {},
      RCKH: {},
      RCSS: {},
      RCBS: {},
      RCKU: {},
      RCMQ: {},
      RCMT: {},
      RCNN: {},
      RCQC: {},
      RCYU: {},
      // RCCM: {},
      RCFG: {},
      RCGI: {},
      // RCKW: {},
      RCLY: {},
      // RCWA: {},
      // RCSP: {},
      // RCDC: {},
    };
  },
  getters: {
    avaliableAirport(state) {},
  },
  actions: {
    checkExpired() {},
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});
