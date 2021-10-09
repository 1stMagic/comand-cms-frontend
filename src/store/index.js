import { createStore } from 'vuex'

export default createStore({
  state: {
    site: null,
    language: "de",
    api: null,
    login: localStorage.getItem('login') === "true",
    systemMessage: {
      status: "",
      message: ""
    },
    fancybox: {
      show: false,
      type: ""
    },
    editPageSettings: {
      pageId: "",
      afterPageId: "",
      parentId: "",
      parentTitle: ""
    },
    pageInformation: null,
    editUserGroupSettings: {
      id: "",
      name: "",
      active: false
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
      localStorage.setItem('login', loggedin);
      state.login = loggedin
    },
    systemMessage(state, systemMessage) {
      state.systemMessage.status = systemMessage.status
      state.systemMessage.message = systemMessage.message
    },
    fancybox(state, fancybox) {
      state.fancybox = fancybox
    },
    editPageSettings(state, pageSettings) {
      state.editPageSettings.pageId = pageSettings.pageId
      state.editPageSettings.afterPageId = pageSettings.afterPageId
      state.editPageSettings.parentId = pageSettings.parentId
      state.editPageSettings.parentTitle = pageSettings.parentTitle
    },
    pageInformation(state, pageInformation) {
      state.pageInformation = pageInformation
    },
    editUserGroupSettings(state, userGroupSettings) {
      state.editUserGroupSettings = userGroupSettings
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    showSystemMessage(state) {
      if(state.systemMessage.status && state.systemMessage.message) {
        return true
      }
      return false
    }
  }
})
