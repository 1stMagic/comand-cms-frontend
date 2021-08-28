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
      afterPageId: "",
      parentId: "",
      parentTitle: ""
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
    systemMessage(state, systemMessage) {
      state.systemMessage.status = systemMessage.status
      state.systemMessage.systemMessage = systemMessage.systemMessage
    },
    fancybox(state, status) {
      state.fancybox.show = status
    },
    editPageSettings(state, pageSettings) {
      state.editPageSettings.pageId = pageSettings.pageId
      state.editPageSettings.afterPageId = pageSettings.afterPageId
      state.editPageSettings.parentId = pageSettings.parentId
      state.editPageSettings.parentTitle = pageSettings.parentTitle
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
