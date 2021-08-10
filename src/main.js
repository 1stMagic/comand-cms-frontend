import { createApp } from "vue"
import router from "./router"
import store from "./store"
import axios from "axios"

/* begin import css from comand-frontend-framework */
import "comand-frontend-framework/src/assets/css/normalize.css"
import "comand-frontend-framework/src/assets/css/framework.css"
import "comand-frontend-framework/src/assets/css/framework-iconfont.css"
/* end import css from comand-frontend-framework */

/* begin import css from comand-component-library */
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
/* end import css from comand-component-library */

/* begin import css from comand-cms */
/* import css for cms-sitestructure */
import "@/assets/css/structure/cms-sitestructure.scss"

/* import css for cms-sitestructure */
import "@/assets/css/structure/cms-sitestructure.scss"

/* import css for your custom styles */
import "@/assets/css/layout/template.scss"

/* import css for cms-editmode */
import "@/assets/css/global/editmode.scss"
/* end import css from comand-cms */

import * as componentLibraryComponents from "comand-component-library"

/* load cms-configuration */
axios.get(process.env.BASE_URL + "cms-config.json")
    .then(response => response.data)
    .then(config => {
        const url = new URL("sites/" + encodeURIComponent(config.site), config.api.baseUrl)
        return axios.get(url.href)
            .then(response => response.data)
            .then(site => ({ ...site, name: config.site, api: config.api, assets: config.assets }))
    })
    .then(site => {
        store.commit("site", site)
        store.commit("language", site.language)
        return site
    })
    .then(site => {
        return import(`./assets/themes/${site.theme}.css`)
            .then(() => import(`./layouts/${site.layout}`))
    })
    .then(layout => {
        /* mount vue instance to dom-element */
        const app = createApp(layout.default).use(store).use(router)
        app.mount("body")
        return app
    })
    .then(app => {
        // Object.entries(componentLibraryComponents).forEach(([name]) => console.log("Comp: " + name))
        Object.entries(componentLibraryComponents).forEach(([name, component]) => app.component(name, component))
        return app
    })
