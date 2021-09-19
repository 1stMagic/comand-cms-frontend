<template>
    <fieldset class="flex-container">
        <CmdFormElement element="input" type="text" required="required" labelText="Title:" v-model:value="title" placeholder="Title (60 characters max.)" max-length="60"/>
        <CmdFormElement element="textarea" required="required" labelText="Description:" v-model:value="description" placeholder="Description (160 characters max.)" max-length="160"/>
        <CmdFormElement element="select" labelText="Robots:" v-model:value="robots" :selectOptions="[
      {
        text: 'index, follow',
        value: 'index, follow',
        selected: true
      },
      {
        text: 'index, nofollow',
        value: 'index, nofollow'
      },
       {
        text: 'noindex, follow',
        value: 'noindex, follow'
      },
      {
        text: 'noindex, nofollow',
        value: 'noindex, nofollow'
      }
    ]"/>
        <CmdFormElement element="select" labelText="Rating:" v-model:value="rating" :selectOptions="[
      {
        text: 'safe for kids',
        value: 'safe',
        selected: true
      },
      {
        text: '14 years',
        value: '14'
      },
       {
        text: 'mature',
        value: 'mature'
      },
      {
        text: 'general',
        value: 'general'
      },
      {
        text: 'restricted',
        value: 'restricted'
      }
    ]"/>
    </fieldset>
    <div class="button-wrapper">
        <button class="button add" @click="saveMetaData">
            <span class="icon-check"></span>
            <span>Save</span>
        </button>
        <button class="button cancel" @click="cancelMetaData">
            <span class="icon-cancel"></span>
            <span>Cancel</span>
        </button>
    </div>
</template>

<script>
// import Cms-backend-client
import {CmsBackendClient} from "../../../client/CmsClient"

// import Cmd-components
import CmdFormElement from "comand-component-library/src/components/CmdFormElement"

export default {
    name: "CmdEditModeMeta",
    data() {
        return {
            title: "",
            description: "",
            robots: "index, follow",
            rating: "safe for kids"
        }
    },
    components: {
        CmdFormElement
    },
    methods: {
        loadMetaData() {
            new CmsBackendClient().loadPage(this.$store.state.editPageSettings.pageId)
                .then(response => {
                    this.title = response.metaData?.title?.[this.$store.state.language] || ""
                    this.description = response.metaData?.description?.[this.$store.state.language] || ""
                    this.robots = response.metaData?.robots?.[this.$store.state.language] || "index, follow"
                    this.rating = response.metaData?.rating?.[this.$store.state.language] || "safe for kids"
                })
                .catch(error => {
                    this.$store.commit("systemMessage", {status: "error", message: "Meta data for this page could not be loaded!"})
                    console.error(error)
                })
        },
        saveMetaData() {
            new CmsBackendClient().updatePage(this.$store.state.editPageSettings.pageId, {
                metaData: {
                    title: {
                        [this.$store.state.language]: this.title
                    },
                    description: {
                        [this.$store.state.language]: this.description
                    },
                    robots: {
                        [this.$store.state.language]: this.robots
                    },
                    rating: {
                        [this.$store.state.language]: this.rating
                    }
                }
            })
            .then(() => {
                console.log("updated")
                this.$store.commit("systemMessage", {status: "success", message: "Meta data for this page has been updated!"})
            })
            .catch(error => {
                this.$store.commit("systemMessage", {status: "error", message: "Meta data for this page could not updated!"})
                console.error(error)
            })
        },
        cancelMetaData() {
            this.loadMetaData()
        }
    },
    watch: {
        "$store.state.editPageSettings.pageId": {
            handler() {
                if (this.$store.state.editPageSettings.pageId) {
                    this.loadMetaData()
                }
            },
            immediate: true
        }
    }
}
</script>