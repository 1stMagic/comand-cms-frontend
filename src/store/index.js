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
    },
    fancybox: {
      show: false
    },
    editPageSettings: {
      pageId: "",
      afterPageId: ""
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
    },
    fancybox(state, status) {
      state.fancybox.show = status
    },
    editPageSettings(state, pageId, afterPageId) {
      state.editPageSettings.pageId = pageId
      state.editPageSettings.afterPageId = afterPageId
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
