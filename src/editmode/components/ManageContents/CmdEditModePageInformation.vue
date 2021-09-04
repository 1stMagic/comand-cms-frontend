<template>
  <div class="cmd-edit-mode-manage-page-information">
    <dl>
      <template v-for="(modification, index) in pageModifications" :key="index">
        <dt>{{ modification.label }}</dt>
        <dd>{{ modification.data }}</dd>
      </template>
    </dl>
  </div>
</template>

<script>
import {CmsBackendClient} from "../../../client/CmsClient"

export default {
    name: "CmdEditModePageInformation",
    data() {
        return {
            pageModifications: []
        }
    },
    methods: {
        loadPageModifications() {
            this.pageModifications = []
            new CmsBackendClient().loadPage(this.$store.state.editPageSettings.pageId)
                .then(response => {
                    this.pageModifications.push(
                        { label: "created", data: response.modification.created },
                        { label: "createdBy", data: response.modification.createdBy },
                        { label: "lastModified", data: response.modification.lastModified },
                        { label: "lastModifiedBy", data: response.modification.lastModifiedBy }
                    )
                })
                .catch(error => {
                    this.$store.commit("systemMessage", {status: "error", message: "Page information for this page could not be loaded!"})
                    console.error(error)
                })
        }
    },
    watch: {
        "$store.state.editPageSettings.pageId": {
            handler() {
                if (this.$store.state.editPageSettings.pageId) {
                    this.loadPageModifications()
                }
            },
            immediate: true
        }
    }
}
</script>