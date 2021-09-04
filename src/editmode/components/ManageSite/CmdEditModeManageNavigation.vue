<template>
    <CmdEditModeNavigationLevel
        :navigationEntries="navigation"
    />
</template>

<script>
import {CmsBackendClient} from "../../../client/CmsClient"
import CmdEditModeNavigationLevel from "./CmdEditModeNavigationLevel"
import bus from "../../../eventbus"

export default {
    data() {
        return {
            navigation: []
        }
    },
    components: {
        CmdEditModeNavigationLevel
    },
    created() {
        // reload navigation if event-bus gets event 'reload-navigation'
        bus.on("reload-navigation", this.loadNavigationEntries)

        // call method and wait for resolved promise (from ajax-call) to assign response-data to data-property)
        this.loadNavigationEntries()
    },
    methods: {
        loadNavigationEntries() {
            return new CmsBackendClient()
                .loadSiteNavigation()
                .then(responseData => this.navigation = responseData)
                .catch(error => console.error(error))
        }
    }
}
</script>