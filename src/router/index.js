import { createRouter, createWebHistory } from 'vue-router'
import store from "../store"
import Error from "../layouts/Error"
import ViewContainer from "../views/ViewContainer"
import Page from "../views/Page"

const routes = [
  {
    path: "/",
    redirect: () => ({ name: "Index", params: { language: store.state.language }})
  },
  {
    path: "/:language([a-z]{2})",
    name: "Index",
    component: ViewContainer,
    redirect: { name: "Page" },
    children: [
      {
        path: ":page(.+)*",
        name: "Page",
        component: Page,
        props: true
      }
    ]
  },
  {
    path: "/:pathMatch(.*)",
    component: Error,
    props: route => ({
      error: "Page not found: " + route.params.pathMatch
    })
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(to => {
  if (to.params.language && to.params.language !== store.state.language) {
    if (store.state.site?.config?.supportedLanguages?.includes(to.params.language)) {
      store.commit("language", to.params.language)
    } else if (to.params.language !== store.state.site?.config?.language) {
      store.commit("language", store.state.site?.config?.language ?? "de")
      const newRoute = { ...to }
      newRoute.params.language = store.state.language
      return newRoute
    }
  }
})

export default router
