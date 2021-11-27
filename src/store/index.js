import { createStore } from 'vuex'
import {CmsBackendClient} from "../client/CmsClient";

export default createStore({
  state: {
    site: null,
    language: "de",
    api: null,
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
    },
    userGroups: [],
    login: JSON.parse(localStorage.getItem('login') || '{}')
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
    login(state, login) {
      // write loginToken into localStorage to maintain login-status if page is reloaded
      localStorage.setItem('login', JSON.stringify(login))
      state.login = login
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
    },
    userGroups(state, userGroups) {
      state.userGroups = userGroups
    }
  },
  actions: {
    loadUserGroups(context) {
      new CmsBackendClient().loadUserGroups()
          .then(userGroups =>
              // commit user-groups to store
              context.commit("userGroups", userGroups)
          )
          .catch(error => {
            context.commit("systemMessage", {status: "error", message: "The user groups could not be loaded!"})
            console.error(error)
          })
    }
  },
  modules: {
  },
  getters: {
    showSystemMessage(state) {
      return !!(state.systemMessage.status && state.systemMessage.message)
    },
    isLoggedIn(state) {
      return !!state.login.token
    }
  }
})
