<template>
  <ul class="cmd-edit-mode-navigation-level">
    <li v-for="(navigationEntry, index) in navigationEntries" :key="index" :class="{open : showSubLevel[index] && navigationEntry.children && navigationEntry.children.length}">
      <template v-if="navigationEntry.id === newNavEntryId" >
        <input type="text" v-model="newNavigationEntry" />
        <button type="button" class="button" title="Save entry" @click="updatePageTitle"><span class="icon-check"></span></button>
      </template>
      <div v-else :class="[navigationEntry.active ? 'active' : 'inactive', {'selected' : selected === index}]">
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
            <a href="#" @click.prevent="editNavigation('addEntry', navigationEntry.title, navigationEntry.id)" title="Add new entry below this one">
              <span class="icon-plus add"></span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="editNavigation('addSubEntry', navigationEntry.title, navigationEntry.id)" title="Add new entry on sublevel">
              <span class="icon-arrow-right add"></span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="editNavigation('toggleStatus', navigationEntry.title, navigationEntry.id, navigationEntry.active)" :title="'Toggle status for ' +  navigationEntry.title">
              <span :class="navigationEntry.active ? 'icon-check' : 'icon-cancel'"></span>
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
</template>

<script>
    import {CmsBackendClient} from "../../../client/CmsClient"

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
            loadComponentConfig (index) {
               this.showSubLevel[index] = !this.showSubLevel[index]
               this.selected = index
               this.$emit('entry-selected')
            },
            editNavigation (action, title, pageId, active) {
                if (action === "addEntry") {
                    this.addEntry("New page", pageId)
                } else if (action === "addSubEntry") {
                    this.addSubEntry("New sub-page", pageId)
                } else if(action === "delete") {
                    this.deleteContent(pageId, title)
                } else if (action === "duplicate") {
                  this.duplicateContent(pageId)
                } else if (action === "toggleStatus") {
                    this.toggleStatus(pageId, active)
                }
            },
            addEntry(title, afterPageId) {
                const method = (type => {
                    if (type === "top-navigation") return "createTopNavigationPage"
                    if (type === "footer-navigation") return "createFooterNavigationPage"
                    return "createMainNavigationPage"
                })(this.type)
                new CmsBackendClient()[method](title, afterPageId)
                    .then(response => {
                        this.$store.state.systemMessage.status="success"
                        this.$store.state.systemMessage.systemMessage="The new page was successfully created!"
                        this.$emit("reload-navigation")
                        this.newNavEntryId = response.id
                    })
                    .catch(error => {
                        this.$store.state.systemMessage.status="error"
                        this.$store.state.systemMessage.systemMessage="The new page could not be created!"
                        console.error(error)
                    })
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
            }
        },
        watch: {
            entrySelected () {
                this.selected = -1
            }
        }
    }
</script>