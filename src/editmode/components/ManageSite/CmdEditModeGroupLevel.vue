<template>
  <ul class="cmd-edit-mode-group-level">
    <li v-for="(userGroup, index) in allUserGroups" :key="index">
      <div :class="userGroup.active ? 'active' : 'inactive'">
        <a href="#"
           @click.prevent>
          {{ userGroup.name }}
        </a>
        <ul class="icon-wrapper" aria-expanded="true">
          <li>
              <a href="#" @click.prevent="editUserGroup('openSettings', userGroup.name, userGroup.id)" :title="'Open settings for ' + userGroup.name">
                  <span class="icon-cogs"></span>
              </a>
          </li>
          <li class="status">
            <a href="#" @click.prevent="editUserGroup('toggleStatus', userGroup.name, userGroup.id, userGroup.active)" :title="'Toggle status for ' +  userGroup.name">
              <span :class="userGroup.active ? 'icon-check' : 'icon-cancel'"></span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="editUserGroup('delete', userGroup.name, userGroup.id)" :title="'Delete ' +  userGroup.name">
              <span class="icon-delete"></span>
            </a>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
    // import vue-eventbus
    import bus from "../../../eventbus"
    import {CmsBackendClient} from "../../../client/CmsClient";

    export default {
        name: "CmdEditModeGroupLevel",
        data() {
            return {
                allUserGroups: []
            }
        },
        created() {
            // reload navigation if event-bus gets event 'reload-navigation'
            bus.on("reload-user-groups", this.loadUserGroups)

            // call method and wait for resolved promise (from ajax-call) to assign response-data to data-property
            this.loadUserGroups()
        },
        methods: {
            loadUserGroups() {
                return new CmsBackendClient()
                    .loadUserGroups()
                    .then(responseData => this.allUserGroups = responseData)
                    .catch(error => {
                        this.$store.commit("systemMessage", {status: "error", message: "The user groups could not be loaded!"})
                        console.error(error)
                    })
            },
            editUserGroup (action, userGroupName, userGroupId, active) {
                if(action === "delete") {
                    this.deleteContent(userGroupId, userGroupName)
                } else if (action === "toggleStatus") {
                    this.toggleStatus(userGroupId, userGroupName, active)
                } else if (action === "openSettings") {
                    this.openSettings(userGroupId, userGroupName)
                }
            },
            deleteContent(userGroupId, userGroupName) {
                if(!confirm("Delete entry " + userGroupName + " completely?")) {
                  return
                }
                new CmsBackendClient()
                    .deleteUserGroup(userGroupId)
                    .then(() => {
                        this.$store.commit("systemMessage", {status: "success", message: "The user group " + userGroupName + " was deleted successfully!"})
                    })
                    .catch(error => {
                        this.$store.commit("systemMessage", {status: "error", message: "The user group " + userGroupName +  " could not be deleted!"})
                        console.error(error)
                    })
                    // emit event via event-bus
                    .finally(() => bus.emit("reload-user-groups"))
            },
            toggleStatus(userGroupId, userGroupName, active) {
                new CmsBackendClient()
                    .updateUserGroupActiveState(userGroupId, !active)
                    .then(() => {
                        if(!active) {
                            this.$store.commit("systemMessage", {status: "success", message: "The user group " + userGroupName +  " was activated successfully!"})
                        } else {
                            this.$store.commit("systemMessage", {status: "success", message: "The user group " + userGroupName +  " was deactivated successfully!"})
                        }
                    })
                    .catch(error => {
                        this.$store.commit("systemMessage", {status: "error", message: "The status for user group " + userGroupName +  " could not be toggled!"})
                        console.error(error)
                    })
                    // emit event via event-bus
                    .finally(() => bus.emit("reload-user-groups"))
            },
            openSettings(userGroupId, userGroupName) {
                this.$store.commit("fancybox", { show: true, type: "usergroup"})
                this.$store.commit("editUserGroupSettings", {
                    id: userGroupId,
                    name: userGroupName
                })
            }
        }
    }
</script>
