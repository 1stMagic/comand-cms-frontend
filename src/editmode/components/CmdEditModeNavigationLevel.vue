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
          <span>{{ navigationEntry.title }}</span>
        </a>
        <ul class="icon-wrapper" aria-expanded="true">
          <li>
            <a href="#" @click.prevent="editNavigation('addEntry', navigationEntry.title, navigationEntry.id)" title="Add new entry below this one">
              <span class="icon-plus add"></span>
            </a>
          </li>
          <li class="status">
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
    import axios from "axios"

    export default {
        name: "CmdEditModeNavigationLevel",
        data() {
            return {
                showSubLevel: {},
                status: false,
                selected: -1
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
                if(action === "delete") {
                    this.deleteContent(pageId, title)
                } else if (action === "duplicate") {
                  this.duplicateContent(pageId)
                } else if (action === "toggleStatus") {
                    this.toggleStatus(pageId, active)
                }
            },
            deleteContent(pageId, title) {
                if(!confirm("Die Seite " + title + " inkl. des Inhalts endgültig löschen?")) {
                  return
                }
                const url = new URL(`admin/pages/${this.$store.state.site.name}/${pageId}`, this.$store.state.site.api.baseUrl)
                return axios.delete(url.href)
                    .then(response => response.data) // get data (from backend) from (http) response
                    .then(backendResponse => {
                        if(backendResponse.success) {
                            this.$emit("reload-navigation")
                        } else {
                            throw new Error(backendResponse.messages)
                        }
                    })
                    .catch(error => console.error(error))
            },
            duplicateContent(pageId) {
                const url = new URL(`admin/pages/${this.$store.state.site.name}/clone/${pageId}`, this.$store.state.site.api.baseUrl)
                return axios.post(url.href)
                .then(response => response.data) // get data (from backend) from (http) response
                .then(backendResponse => {
                    if(backendResponse.success) {
                        this.$emit("reloadNavigation")
                    } else {
                        throw new Error(backendResponse.messages)
                    }
                })
                .catch(error => console.error(error))
            },
            toggleStatus(pageId, active) {
                const url = new URL(`admin/pages/${this.$store.state.site.name}/${pageId}`, this.$store.state.site.api.baseUrl)
                return axios.put(url.href, {active: !active})
                .then(response => response.data) // get data (from backend) from (http) response
                .then(backendResponse => {
                    if(backendResponse.success) {
                        this.$emit("reloadNavigation")
                    } else {
                        throw new Error(backendResponse.messages)
                    }
                })
                .catch(error => console.error(error))
            }
        },
        watch: {
            entrySelected () {
                this.selected = -1
            }
        }
    }
</script>