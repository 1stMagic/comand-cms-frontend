<template>
  <h2>ID: {{ $store.state.editPageSettings.pageId }}</h2>
  <CmdFormElement element="input" type="text" v-model:value="navEntryTitle" labelText="Titel in Navigation" id="page-navigation-entry" />
  <CmdFormElement element="input" type="checkbox" v-model:value="navigationType" inputValue="topHeader" labelText="Top Header Navigation" id="page-navigation-top-header" />
  <CmdFormElement element="input" type="checkbox" v-model:value="navigationType" inputValue="main" labelText="Main Navigation" id="page-navigation-main" />
  <CmdFormElement element="input" type="checkbox" v-model:value="navigationType" inputValue="footer" labelText="Footer Navigation" id="page-navigation-footer" />
  <CmdFormElement element="input" type="radio" v-model:value="linkedWith" inputValue="page" labelText="Verlinkt mit Seiteninhalt" name="linked-with" id="link-page" />
  <CmdFormElement element="input" type="radio" v-model:value="linkedWith" inputValue="none"  labelText="Nicht verlinkt (nur Navigationseintrag)" name="linked-with" id="link-none" />
  <CmdFormElement element="input" type="radio" v-model:value="linkedWith" inputValue="file"  labelText="Verlinkt mit Datei" name="linked-with" id="link-file" />
  <CmdFormElement element="button" type="button" buttonText="Datei wählen" @click="openFileManager" id="select-file" />
  <CmdFormElement element="input" type="radio" v-model:value="linkedWith" inputValue="external"  labelText="Verlinkt mit externer Website" name="linked-with" id="link-external-site" />
  <CmdFormElement element="input" type="url" v-model:value="externalUrl" labelText="Link zur externen Website" id="url-external-site" />
  <div class="button-wrapper flex-container">
    <CmdFormElement element="button" type="button" buttonText="Save settings" @click="saveSettings" />
  <CmdFormElement element="button" type="button" buttonText="Cancel changes" @click="closeFancybox" />
  </div>
</template>

<script>
import CmdFormElement from "comand-component-library/src/components/CmdFormElement"
import {CmsBackendClient} from "../../../client/CmsClient";

export default {
  name: "CmdEditModePageSettings",
  data() {
    return {
      navEntryTitle: "",
      navigationType: [],
      linkedWith: "",
      externalUrl: ""
    }
  },
  components: {
    CmdFormElement
  },
  created() {
    let pageId = this.$store.state.editPageSettings.pageId

    if(pageId) {
      new CmsBackendClient().loadPage(pageId)
          .then(response => {
            this.navEntryTitle=response.mainNavigationTitle[this.$store.state.language]

            if(response.showInTopNavigation) {
              this.navigationType.push("topHeader")
            }
            if(response.showInMainNavigation) {
              this.navigationType.push("main")
            }
            if(response.showInFooterNavigation) {
              this.navigationType.push("footer")
            }

            this.linkedWith = response.external ? "external" : "page"

            if(response.external) {
              this.externalUrl = response.href
            }
          })
          .catch(error => {
            this.$store.state.systemMessage.status="error"
            this.$store.state.systemMessage.systemMessage="Configuration for this page could not be loaded!"
            console.error(error)
          })
    }
  },
  methods: {
    openFileManager() {
      alert("FileManager")
    },
    saveSettings() {
      let pageId = this.$store.state.editPageSettings.pageId
      let afterPageId = this.$store.state.editPageSettings.afterPageId
      let title = this.navEntryTitle
      let saveResponse = null
      if(pageId) {
        // update settings
        saveResponse = new CmsBackendClient().updatePage(pageId, {
          mainNavigationTitle: {
            [this.$store.state.language]: title
          },
          showInTopNavigation: this.navigationType.includes("topHeader"),
          showInMainNavigation: this.navigationType.includes("main"),
          showInFooterNavigation: this.navigationType.includes("footer")
        })

      } else {
        // add new settings
        saveResponse = new CmsBackendClient().createPage(title, {
            showInTopNavigation: this.navigationType.includes("topHeader"),
            showInMainNavigation: this.navigationType.includes("main"),
            showInFooterNavigation: this.navigationType.includes("footer")
        },
        afterPageId
        )
      }
      saveResponse.then(() => {
        this.$store.state.systemMessage.status="success"
        this.$store.state.systemMessage.systemMessage="The new page was successfully created!"
      })
      .catch(error => {
        this.$store.state.systemMessage.status="error"
        this.$store.state.systemMessage.systemMessage="The new page could not be created!"
        console.error(error)
      })
      this.closeFancybox()
    },
    closeFancybox() {
      this.$store.commit("fancybox", false)
    }
  }
}
</script>

<style lang="scss">

</style>