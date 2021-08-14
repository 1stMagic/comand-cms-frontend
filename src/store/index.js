import { createStore } from 'vuex'

export default createStore({
  state: {
    site: {},
    language: "de",
    api: {},
    login: false,
    systemMessage: {
      status: "",
      systemMessage: ""
    }
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
    },
    login(state, loggedin) {
      state.login = loggedin
    },
    systemMessage(state, status, message) {
      state.systemMessage.status = status
      state.systemMessage.systemMessage = message
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    showSystemMessage(state) {
      if(state.systemMessage.status && state.systemMessage.systemMessage) {
        return true
      }
      return false
    }
  }
})
