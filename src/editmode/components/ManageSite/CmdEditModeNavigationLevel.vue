<template>
  <ul class="cmd-edit-mode-navigation-level">
    <li v-for="(navigationEntry, index) in navigationEntries" :key="index" :class="{open : showSubLevel[index] && navigationEntry.children && navigationEntry.children.length}">
      <div :class="[navigationEntry.active ? 'active' : 'inactive', {'selected' : selected === index}]">
        <a href="#"
           @click.prevent="loadComponentConfig(index)"
           :target="navigationEntry.href"
           :class="{'has-subentries' : (navigationEntry.children && navigationEntry.children.length)}"
           :title="(navigationEntry.children && navigationEntry.children.length) ? 'Open page (and toggle subentries)' : 'Open page'">
          <span v-if="navigationEntry.children && navigationEntry.children.length" class="icon-single-arrow-right"></span>
          <span :title="navigationEntry.title">{{ navigationEntry.title }}</span>
        </a>
        <ul class="icon-wrapper" aria-expanded="true">
          <li>
            <a href="#" @click.prevent="editNavigation('openSettings', navigationEntry.title, navigationEntry.id,false, parentTitle)" :title="'Open settings for ' + navigationEntry.title">
              <span class="icon-cogs"></span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="editNavigation('addEntry', null, navigationEntry.id, false, parentTitle)" :title="'Add new entry below ' + navigationEntry.title">
              <span class="icon-plus add"></span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="editNavigation('addSubEntry', null, navigationEntry.id, false, navigationEntry.title)" :title="'Add new entry on sublevel of ' + navigationEntry.title">
              <span class="icon-arrow-right add"></span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="editNavigation('toggleStatus', navigationEntry.title, navigationEntry.id, navigationEntry.active)" :title="'Toggle status for ' +  navigationEntry.title">
              <span :class="navigationEntry.active ? 'icon-check' : 'icon-cancel'" aria-live="polite"></span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="editNavigation('duplicate', navigationEntry.title, navigationEntry.id)" :title="'Duplicate ' +  navigationEntry.title">
              <span class="icon-duplicate-content"></span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="editNavigation('delete', navigationEntry.title, navigationEntry.id)" :title="'Delete ' +  navigationEntry.title">
              <span class="icon-delete delete"></span>
            </a>
          </li>
        </ul>
      </div>
      <CmdEditModeNavigationLevel v-if="navigationEntry.children && showSubLevel[index]" :navigationEntries="navigationEntry.children" :parentTitle="navigationEntry.title" />
    </li>
  </ul>
  <button class="button add" @click.prevent="editNavigation('addEntry', null, null)" title="Add new entry">
    <span class="icon-plus"></span><span>{{ }}Add new entry on this level</span>
  </button>
</template>

<script>
    import {CmsBackendClient} from "../../../client/CmsClient"

    // import Cmd-components
    import {openFancyBox} from "comand-component-library/src/components/CmdFancyBox"

    // import vue-eventbus
    import bus from "../../../eventbus";

    export default {
        name: "CmdEditModeNavigationLevel",
        data() {
            return {
                showSubLevel: {},
                status: false,
                selected: -1,
                newNavEntryId: "",
                newNavigationEntry: ""
            }
        },
        props: {
            navigationEntries: {
                type: Array,
                required: true
            },
            entrySelected: {
                type: Boolean,
                default: false
            },
            parentTitle: {
                type: String,
                default: ""
            }
        },
        methods: {
          showFancyBox(type, content) {
            if (type === 'text') {
              openFancyBox({content: content})
            } else if (type === 'image') {
              openFancyBox({url: content})
            }
          },
            loadComponentConfig (index) {
                // commit pageId to store
                this.$store.commit("editPageSettings", { pageId: this.navigationEntries[index].id })

                // commit page information to store
                new CmsBackendClient()
                    .loadPage(this.navigationEntries[index].id)
                    .then(responseData => this.$store.commit("pageInformation", responseData))
                    .catch(error => {
                        this.$store.commit("systemMessage", {status: "error", message: "The page could not be loaded!"})
                        console.error(error)
                    })

                // toggle sub-level-entries
                this.showSubLevel[index] = !this.showSubLevel[index]

                // set selected entry to current (page-)index to set css-highlight
                this.selected = index

                // check if entries is page (and active)
                if(this.navigationEntries[index].page && this.navigationEntries[index].active) {
                    // load clicked page with router
                    this.$router.push({
                        name: "Page",
                        params: {
                            language: this.$store.state.language,
                            page: this.navigationEntries[index].href.split("/")
                        }
                    })
                }
            },
            editNavigation (action, title, pageId, active, parentTitle) {
                if (action === "addEntry") {
                    this.openSettings(null, pageId, null, parentTitle)
                } else if (action === "addSubEntry") {
                    this.openSettings(null, null, pageId, parentTitle)
                } else if(action === "delete") {
                    this.deleteContent(pageId, title)
                } else if (action === "duplicate") {
                  this.duplicateContent(pageId)
                } else if (action === "toggleStatus") {
                    this.toggleStatus(pageId, active)
                } else if (action === "openSettings") {
                    this.openSettings(pageId, null, null, parentTitle)
                }
            },
            addSubEntry(title, parentId) {
                const method = (type => {
                    if (type === "top-navigation") return "createTopNavigationPage"
                    if (type === "footer-navigation") return "createFooterNavigationPage"
                    return "createMainNavigationPage"
                })(this.type)
                new CmsBackendClient()[method](title, null, parentId)
                    .then(() => {
                        this.$store.commit("systemMessage", {status: "success", message: "The " + title + " new page was successfully created!"})
                    })
                    .catch(error => {
                        this.$store.commit("systemMessage", {status: "error", message: "The new page could not be created!"})
                        console.error(error)
                    })
                    .finally(() => bus.emit("reload-navigation"))
            },
            deleteContent(pageId, title) {
                if(!confirm("Delete entry " + title + " (incl. content) completely?")) {
                  return
                }
                new CmsBackendClient()
                    .deletePage(pageId)
                    .then(() => {
                        this.$store.commit("systemMessage", {status: "success", message: "The content was deleted successfully!"})
                    })
                    .catch(error => {
                        this.$store.commit("systemMessage", {status: "error", message: "The content could not be deleted!"})
                        console.error(error)
                    })
                    // emit event via event-bus
                    .finally(() => bus.emit("reload-navigation"))
            },
            duplicateContent(pageId) {
                new CmsBackendClient()
                    .clonePage(pageId)
                    .then(() => {
                        this.$store.commit("systemMessage", {status: "success", systemMessage: "The content was duplicated successfully!"})
                    })
                    .catch(error => {
                        this.$store.commit("systemMessage", {status: "error", systemMessage: "The content could not be duplicated!"})
                        console.error(error)
                    })
                    // emit event via event-bus
                    .finally(() => bus.emit("reload-navigation"))
            },
            toggleStatus(pageId, active) {
                new CmsBackendClient()
                    .updateActiveState(pageId, !active)
                    .then(() => {
                        if(!active) {
                            this.$store.commit("systemMessage", {status: "success", systemMessage: "The content was activated successfully!"})
                        } else {
                            this.$store.commit("systemMessage", {status: "success", systemMessage: "The content was deactivated successfully!"})
                        }
                    })
                    .catch(error => {
                        this.$store.commit("systemMessage", {status: "error", systemMessage: "The content could not be duplicated!"})
                      console.error(error)
                    })
                    .finally(() => bus.emit("reload-navigation"))
            },
            updatePageTitle() {
                new CmsBackendClient()
                .updatePageTitle(this.newNavEntryId, this.newNavigationEntry)
                .then(() => {
                    this.$store.commit("systemMessage", {status: "success", systemMessage: "The page has be saved successfully!"})
                    this.newNavEntryId = ""
                    this.newNavigationEntry = ""
                    bus.on("reload-navigation", this.loadNavigationEntries)
                })
                .catch(error => {
                    this.$store.commit("systemMessage", {status: "error", systemMessage: "The page cannot be saved!"})
                    console.error(error)
                })
                .finally(() => bus.emit("reload-navigation"))
            },
          openSettings(pageId, afterPageId, parentId, parentTitle) {
            this.$store.commit("fancybox", { show: true, type: "page"})
            this.$store.commit("editPageSettings", { pageId, afterPageId, parentId, parentTitle })
          }
        }
    }
</script>