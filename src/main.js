import { createApp } from "vue"
import router from "./router"
import store from "./store"
import axios from "axios"

/* import css from comand-frontend-framework */
import "comand-frontend-framework/src/assets/css/normalize.css"
import "comand-frontend-framework/src/assets/css/framework.css"
import "comand-frontend-framework/src/assets/css/framework-iconfont.css"

/* import additional iconfont containing company-logos */
import "comand-component-library/src/assets/styles/logos-iconfont.css"

/* import css for comand-component-library-components */
import "comand-component-library/dist/comand-component-library.css"

/* import css for comand-component-library-structure */
import "comand-component-library/src/assets/styles/comand-component-library-structure.scss"

/* import css for comand-component-library-layout */
import "comand-component-library/src/assets/styles/comand-component-library-layout.scss"

/* import css for global transitions */
import 'comand-component-library/src/assets/styles/transitions.scss'

/* import css for cms-sitestructure */
import "@/assets/css/structure/cms-sitestructure.scss"

/* import css for your custom styles */
import "@/assets/css/layout/template.scss"

import * as componentLibraryComponents from "comand-component-library"

/* load cms-configuration */
axios.get(process.env.BASE_URL + "cms-config.json")
    .then(response => response.data)
    .then(config => {
        const url = new URL("sites/" + encodeURIComponent(config.site), config.api.baseUrl)
        return axios.get(url.href)
            .then(response => response.data)
            .then(site => ({ ...site, api: config.api, assets: config.assets }))
    })
    .then(site => {
        store.commit("site", site)
        store.commit("language", site.config.language)
        return site
    })
    .then(site => {
        return import(`./assets/themes/${site.config.theme}.css`)
            .then(() => import(`./layouts/${site.config.layout}`))
    })
    .then(layout => {
        /* mount vue instance to dom-element */
        const app = createApp(layout.default).use(store).use(router)
        app.mount("body")
        return app
    })
    .then(app => {
        Object.entries(componentLibraryComponents).forEach(([name]) => console.log("Comp: " + name))
        Object.entries(componentLibraryComponents).forEach(([name, component]) => app.component(name, component))
        return app
    })
