<template>
  <ul class="cmd-edit-mode-group-level">
    <li v-for="(userGroup, index) in userGroups" :key="index">
      <div :class="userGroup.active ? 'active' : 'inactive'">
        <a href="#"
           @click.prevent>
          {{ userGroup.name }}
        </a>
        <ul class="icon-wrapper" aria-expanded="true">
          <li>
              <a href="#" @click.prevent="editUserGroup('openSettings', userGroup.name, userGroup.id, userGroup.active)" :title="'Open settings for ' + userGroup.name">
                  <span class="icon-cogs"></span>
              </a>
          </li>
          <li class="status">
            <a href="#" @click.prevent="editUserGroup('toggleStatus', userGroup.name, userGroup.id, userGroup.active)" :title="'Toggle status for ' + userGroup.name">
              <span :class="userGroup.active ? 'icon-check' : 'icon-cancel'"></span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="editUserGroup('delete', userGroup.name, userGroup.id)" :title="'Delete ' + userGroup.name">
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
        created() {
            // reload user-groups if event-bus gets event 'reload-user-groups'
            bus.on("reload-user-groups", () => this.$store.dispatch("loadUserGroups"))
        },
        computed: {
            userGroups() {
                return this.$store.state.userGroups
            }
        },
        methods: {
            editUserGroup (action, userGroupName, userGroupId, active) {
                if(action === "delete") {
                    this.deleteUserGroup(userGroupId, userGroupName)
                } else if (action === "toggleStatus") {
                    this.toggleStatus(userGroupId, userGroupName, active)
                } else if (action === "openSettings") {
                    this.openSettings(userGroupId, userGroupName, active)
                }
            },
            deleteUserGroup(userGroupId, userGroupName) {
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
            toggleStatus(userGroupId, userGroupName, userGroupActive) {
                new CmsBackendClient()
                    .updateUserGroup(userGroupId, {
                        active: !userGroupActive
                    })
                    .then(() => {
                        if(!userGroupActive) {
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
            openSettings(userGroupId, userGroupName, userGroupActive) {
                this.$store.commit("editUserGroupSettings", {
                    id: userGroupId,
                    name: userGroupName,
                    active: userGroupActive
                })
                this.$store.commit("fancybox", { show: true, type: "usergroup"})
            }
        }
    }
</script>
