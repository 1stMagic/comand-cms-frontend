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
            <a href="#" @click.prevent="editNavigation('openSettings', navigationEntry.title, navigationEntry.id)" :title="'Open settings for ' + navigationEntry.title">
              <span class="icon-cogs"></span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="editNavigation('addEntry', null, navigationEntry.id)" :title="'Add new entry below ' + navigationEntry.title">
              <span class="icon-plus add"></span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="editNavigation('addSubEntry', null, navigationEntry.id)" :title="'Add new entry on sublevel of ' + navigationEntry.title">
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
              <span class="icon-delete"></span>
            </a>
          </li>
        </ul>
      </div>
      <CmdEditModeNavigationLevel v-if="navigationEntry.children && showSubLevel[index]" :navigationEntries="navigationEntry.children" />
    </li>
  </ul>
  <button class="button add" @click.prevent="editNavigation('addEntry', null, null)" title="Add new entry">
    <span class="icon-plus"></span><span>Add new entry</span>
  </button>
</template>

<script>
    import {CmsBackendClient} from "../../../client/CmsClient"

    // import Cmd-components
    import {openFancyBox} from "comand-component-library/src/components/CmdFancyBox"

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
               this.showSubLevel[index] = !this.showSubLevel[index]
               this.selected = index
               this.$emit('entry-selected')
            },
            editNavigation (action, title, pageId, active) {
                if (action === "addEntry") {
                    this.openSettings(null, pageId)
                } else if (action === "addSubEntry") {
                    this.addSubEntry("New sub-page", pageId)
                } else if(action === "delete") {
                    this.deleteContent(pageId, title)
                } else if (action === "duplicate") {
                  this.duplicateContent(pageId)
                } else if (action === "toggleStatus") {
                    this.toggleStatus(pageId, active)
                } else if (action === "openSettings") {
                  this.openSettings(pageId)
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
                        this.$store.state.systemMessage.status="success"
                        this.$store.state.systemMessage.systemMessage="The new page was successfully created!"
                        this.$emit("reload-navigation")
                    })
                    .catch(error => {
                        this.$store.state.systemMessage.status="error"
                        this.$store.state.systemMessage.systemMessage="The new page could not be created!"
                        console.error(error)
                    })
            },
            deleteContent(pageId, title) {
                if(!confirm("Delete entry " + title + " (incl. content) completely?")) {
                  return
                }
                new CmsBackendClient()
                    .deletePage(pageId)
                    .then(() => {
                        this.$store.state.systemMessage.status="success"
                        this.$store.state.systemMessage.systemMessage="The content was deleted successfully!"
                        this.$emit("reload-navigation")
                    })
                    .catch(error => {
                        this.$store.state.systemMessage.status="error"
                        this.$store.state.systemMessage.systemMessage="The content could not be deleted!"
                        console.error(error)
                    })
            },
            duplicateContent(pageId) {
                new CmsBackendClient()
                    .clonePage(pageId)
                    .then(() => {
                        this.$store.commit('systemMessage', 'success', 'The content was duplicated successfully!')
                        this.$emit("reloadNavigation")
                    })
                    .catch(error => {
                        this.$store.commit('systemMessage', 'error', 'The content could not be duplicated!')
                        console.error(error)
                    })
            },
            toggleStatus(pageId, active) {
                new CmsBackendClient()
                    .updateActiveState(pageId, !active)
                    .then(() => {
                        this.$store.state.systemMessage.status="success"
                        if(!active) {
                            this.$store.state.systemMessage.systemMessage = "The content was activated successfully!"
                        } else {
                            this.$store.state.systemMessage.systemMessage = "The content was deactivated successfully!"
                        }
                        this.$emit("reloadNavigation")
                    })
                    .catch(error => {
                      this.$store.state.systemMessage.status="error"
                      this.$store.state.systemMessage.systemMessage="The content could not be duplicated!"
                      console.error(error)
                    })
            },
            updatePageTitle() {
                new CmsBackendClient()
                .updatePageTitle(this.newNavEntryId, this.newNavigationEntry)
                .then(() => {
                    this.$store.commit('systemMessage', 'success', 'The page has be saved successfully')
                    this.newNavEntryId = ""
                    this.newNavigationEntry = ""
                    this.$emit("reloadNavigation")
                })
                .catch(error => {
                    this.$store.commit('systemMessage', 'error', 'The page cannot be saved!')
                    console.error(error)
                })
            },
          openSettings(pageId, afterPageId) {
            this.$store.commit("fancybox", true)
            this.$store.commit("editPageSettings", pageId, afterPageId)
          }
        },
        watch: {
            entrySelected () {
                this.selected = -1
            }
        }
    }
</script>