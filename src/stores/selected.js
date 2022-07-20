import { defineStore } from 'pinia';

export const useNotam = defineStore('notamStore', {
  state: () => {
    return {
      selectdState: 0,
    };
  },
});
