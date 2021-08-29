<template>
  <fieldset class="flex-container">
    <h2>Settings for <template v-if="navigationTitle">{{navigationTitle}}</template><template v-else>new page</template></h2>
    <dl>
        <dt>Parent entry:</dt>
        <dd v-if="$store.state.editPageSettings.parentTitle">{{ $store.state.editPageSettings.parentTitle }}</dd>
        <dd v-else>None (main level)</dd>
    </dl>
    <CmdFormElement element="input"
                type="text"
                required="required"
                v-model:value="navigationTitle"
                placeholder="Title in navigation"
                labelText="Title in navigation:"
                id="page-navigation-entry" />
    <div class="label">
      <span>Eintrag in folgender Navigation anzeigen:<sup>*</sup></span>
      <div class="flex-container input-wrapper">
        <CmdFormElement element="input" type="checkbox" v-model:value="navigationType" inputValue="topHeader" labelText="Top-Header-Navigation" id="page-navigation-top-header" />
        <CmdFormElement element="input" type="checkbox" v-model:value="navigationType" inputValue="main" labelText="Main-Navigation" id="page-navigation-main" />
        <CmdFormElement element="input" type="checkbox" v-model:value="navigationType" inputValue="footer" labelText="Footer-Navigation" id="page-navigation-footer" />
        <CmdFormElement element="input" type="checkbox" v-model:value="navigationType" inputValue="none" labelText="Don't show in navigation" id="page-navigation-none" />
      </div>
    </div>
    <div class="label">
      <span>Eintrag verlinken:<sup>*</sup></span>
      <div class="flex-container input-wrapper">
        <CmdFormElement element="input" type="radio" v-model:value="linkedWith" inputValue="page" labelText="mit Seiteninhalt" name="linked-with" id="link-page" />
        <CmdFormElement element="input" type="radio" v-model:value="linkedWith" inputValue="none" labelText="Nichts (nur Eintrag)" name="linked-with" id="link-none" />
        <CmdFormElement element="input" type="radio" v-model:value="linkedWith" inputValue="media" labelText="mit Datei" name="linked-with" id="link-file" />
        <CmdFormElement element="input" type="radio" v-model:value="linkedWith" inputValue="external" labelText="mit externer Website" name="linked-with" id="link-external-site" />
      </div>
    </div>
    <CmdFormElement v-if="linkedWith === 'media'"
                    element="button"
                    v-model:value="linkedUrl"
                    type="button"
                    buttonText="Datei wählen"
                    :buttonIcon="{iconClass: 'icon-file', iconPosition: 'before'}"
                    @click="openFileManager"
                    id="select-file" />
    <CmdFormElement v-if="linkedWith === 'external'"
                    required="required"
                    element="input" type="url"
                    v-model:value="linkedUrl"
                    labelText="Link zur externen Website:"
                    placeholder="Link (inkl. http(s)) zur externen Website"
                    id="url-external-site" />
  </fieldset>
  <div class="button-wrapper flex-container">
    <CmdFormElement element="button" type="button" buttonText="Save settings" class="add" :buttonIcon="{iconClass: 'icon-check', iconPosition: 'before'}" @click="saveSettings" />
    <CmdFormElement element="button" type="button" buttonText="Cancel changes" class="cancel" :buttonIcon="{iconClass: 'icon-cancel', iconPosition: 'before'}" @click="closeFancybox" />
  </div>
</template>

<script>
import CmdFormElement from "comand-component-library/src/components/CmdFormElement"
import {CmsBackendClient} from "../../../client/CmsClient"
import bus from "../../../eventbus"

export default {
  name: "CmdEditModePageSettings",
  data() {
    return {
      navigationTitle: "",
      navigationType: ["main"],
      linkedWith: "page",
      linkedUrl: ""
    }
  },
  components: {
    CmdFormElement
  },
  created() {
    //document.getElementById('page-navigation-entry').focus()
    let pageId = this.$store.state.editPageSettings.pageId

    if(pageId) {
      new CmsBackendClient().loadPage(pageId)
          .then(response => {
            this.navigationTitle=response.navigationTitle[this.$store.state.language]

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
            this.$store.commit("systemMessage", {status: "error", message: "Configuration for this page could not be loaded!"})
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
      let parentId = this.$store.state.editPageSettings.parentId
      let title = this.navigationTitle
      let saveResponse = null
      if(pageId) {
        // update settings
        saveResponse = new CmsBackendClient().updatePage(pageId, {
          title: {
            [this.$store.state.language]: title
          },
          showInTopNavigation: this.navigationType.includes("topHeader"),
          showInMainNavigation: this.navigationType.includes("main"),
          showInFooterNavigation: this.navigationType.includes("footer"),
          navigationEntry: this.linkedWith === "none",
          media: this.linkedWith === "media",
          external: this.linkedWith === "external",
          href: this.linkedUrl
        })

      } else {
        // add new settings
        saveResponse = new CmsBackendClient().createPage(title, {
            showInTopNavigation: this.navigationType.includes("topHeader"),
            showInMainNavigation: this.navigationType.includes("main"),
            showInFooterNavigation: this.navigationType.includes("footer"),
            navigationEntry: this.linkedWith === "none",
            media: this.linkedWith === "media",
            external: this.linkedWith === "external",
            href: this.linkedUrl
        },
            afterPageId, parentId
        )
      }
      saveResponse.then(() => {
        this.$store.commit("systemMessage", {status: "success", message: "The new page was successfully created!"})
      })
      .catch(error => {
        this.$store.commit("systemMessage", {status: "error", message: "The new page could not be created!"})
        console.error(error)
      })
      // emit event via event-bus
      .finally(() => bus.emit("reload-navigation"))
      this.closeFancybox()
    },
    closeFancybox() {
      this.$store.commit("fancybox", false)
    }
  }
}
</script>