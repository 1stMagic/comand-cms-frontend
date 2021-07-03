import { createStore } from 'vuex'

export default createStore({
  state: {
    site: {},
    language: "de",
    api: {}
  },
  /* update states */
  mutations: {
    site(state, site) {
      state.site = site
    },
    language(state, language) {
      state.language = language
    },
    api(state, api) {
      state.api = api
    }
  },
  actions: {
  },
  modules: {
  }
})
