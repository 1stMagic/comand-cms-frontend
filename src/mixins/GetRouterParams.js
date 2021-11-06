import {routerParams} from "../utilities/router"

export default {
    methods: {
        getRouterParams(params) {
            return routerParams(params)
        }
    }
}