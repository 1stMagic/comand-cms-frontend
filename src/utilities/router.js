import store from "@/store"
import router from "@/router"

const defaultRouteParams = {
    language: store.state.language
}

function navigateTo (routeName, params = {}) {
    router.push({name: routeName, params: routerParams(params)})
}

function routerParams (params) {
    return {
        // copy all key: value-pairs with "..." to params-object
        ...defaultRouteParams,
        ...params
    }
}

export {navigateTo, routerParams}