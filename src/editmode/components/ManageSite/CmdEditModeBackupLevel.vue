<template>
  <ul class="cmd-edit-mode-backup-level">
    <li v-for="(backupEntry, index) in backupsData" :key="index">
      <div :class="{'selected' : selected === index}">
        <span :title="backupEntry.date">{{ backupEntry.name }}</span>
        <ul class="icon-wrapper" aria-expanded="true">
          <li>
            <a href="#" @click.prevent="callAction('restore', backupEntry.name, backupEntry.id, index)" title="Restore backup (current content will be overwritten!)">
              <span class="icon-upload add"></span>
            </a>
          </li>
          <li>
            <a :href="backupEntry.url" title="Download backup file to harddiscdrive">
              <span class="icon-download"></span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="callAction('delete', backupEntry.name, backupEntry.id, index)" :title="'Delete ' +  backupEntry.title">
              <span class="icon-delete"></span>
            </a>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
    import backupsData from "@/assets/data/backups.json"

    import axios from "axios"

    export default {
        name: "CmdEditModeGroupLevel",
        data() {
            return {
                selected: -1,
                backupsData
            }
        },
        methods: {
            callAction (action, title, backupId) {
                if(action === "delete") {
                    this.deleteContent(backupId, title)
                } else if (action === "restore") {
                    this.restoreContent(backupId, title)
                }
            },
            deleteContent(backupId, title) {
                if(!confirm("Delete backup file " + title + " completely?")) {
                  return
                }
                const url = new URL(`admin/pages/${this.$store.state.site.name}/backup/${backupId}`, this.$store.state.site.api.baseUrl)
                return axios.delete(url.href)
                    .then(response => response.data) // get data (from backend) from (http) response
                    .then(backendResponse => {
                        if(backendResponse.success) {
                            this.$store.state.systemMessage.status = "success"
                            this.$store.state.systemMessage.systemMessage = "The backup " + title + " was deleted successfully!"
                            this.$emit("reloadNavigation")
                        } else {
                            this.$store.state.systemMessage.status = "error"
                            this.$store.state.systemMessage.systemMessage = "The backup " + title + " could not be deleted!"
                            throw new Error(backendResponse.messages)
                        }
                    })
                    .catch(error => console.error(error))
            },
            restoreContent(backupId, title) {
                if(!confirm("Restoring backup" + title + " will overwrite existing content!")) {
                    return
                }
                const url = new URL(`admin/pages/${this.$store.state.site.name}/backup/${backupId}`, this.$store.state.site.api.baseUrl)
                return axios.post(url.href)
                .then(response => response.data) // get data (from backend) from (http) response
                .then(backendResponse => {
                    if(backendResponse.success) {
                        this.$store.state.systemMessage.status = "success"
                        this.$store.state.systemMessage.systemMessage = "The backup  " + title + " was restored successfully!"
                        this.$emit("reloadNavigation")
                    } else {
                        this.$store.state.systemMessage.status = "error"
                        this.$store.state.systemMessage.systemMessage = "The backup  " + title + " could not be restored!"
                        throw new Error(backendResponse.messages)
                    }
                })
                .catch(error => console.error(error))
            }
        }
    }
</script>
