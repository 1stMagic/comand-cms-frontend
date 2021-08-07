<template>
  <ul class="cmd-edit-mode-navigation-level">
    <li v-for="(userGroupEntry, index) in userGroupsData" :key="index" :class="{open : showSubLevel[index] && userGroupEntry.children && userGroupEntry.children.length}">
      <div :class="[status ? 'active' : 'inactive', {'selected' : selected === index}]">
        <a href="#"
           @click.prevent="loadComponentConfig(index)"
           :target="userGroupEntry.href"
           :class="{'has-subentries' : (userGroupEntry.children && userGroupEntry.children.length)}"
           :title="(userGroupEntry.children && userGroupEntry.children.length) ? 'Open page (and toggle subentries)' : 'Open page'">
          <span v-if="userGroupEntry.children && userGroupEntry.children.length" class="icon-single-arrow-right"></span>
          <span>{{ userGroupEntry.name }}</span>
        </a>
        <ul class="icon-wrapper" aria-expanded="true">
          <li>
            <a href="#" @click.prevent="editNavigation('addEntry', userGroupEntry.title, userGroupEntry.id, index)" title="Add new entry below this one">
              <span class="icon-plus add"></span>
            </a>
          </li>
          <li class="status">
            <a href="#" @click.prevent="editNavigation('toggleStatus', userGroupEntry.title, userGroupEntry.id, index)" :title="'Toggle status for ' +  userGroupEntry.title">
              <span :class="status ? 'icon-check' : 'icon-cancel'"></span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="editNavigation('duplicate', userGroupEntry.title, userGroupEntry.id, index)" :title="'Duplicate ' +  userGroupEntry.title">
              <span class="icon-duplicate-content"></span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="editNavigation('delete', userGroupEntry.title, userGroupEntry.id, index)" :title="'Delete ' +  userGroupEntry.title">
              <span class="icon-delete"></span>
            </a>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
    import userGroupsData from "@/assets/data/user-groups.json"

    import axios from "axios"

    export default {
        name: "CmdEditModeGroupLevel",
        data() {
            return {
                showSubLevel: {},
                status: false,
                selected: 0,
                userGroupsData
            }
        },
        methods: {
            loadComponentConfig (index) {
               this.showSubLevel[index] = !this.showSubLevel[index]
               this.selected = index
            },
            editNavigation (action, title, pageId) {
                if(action === "delete") {
                    this.deleteContent(pageId, title)
                } else if (action === "duplicate") {
                  this.duplicateContent(pageId)
                } else if (action === "toggleStatus") {
                    this.toggleStatus(pageId)
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
                            this.$emit("reloadNavigation")
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
            toggleStatus() {
                this.status = !this.status
            }
        }
    }
</script>
