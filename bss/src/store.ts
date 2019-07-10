import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new (<any>Vuex.Store)({
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus(state: { isLoading: boolean }, isLoading: boolean) {
      state.isLoading = isLoading;
    }
  },
  actions: {}
});
