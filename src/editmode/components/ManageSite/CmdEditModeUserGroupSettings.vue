<template>
  <fieldset class="flex-container">
    <h2>Settings for <template v-if="userGroupName">{{userGroupName}}</template><template v-else>new user group</template></h2>
    <dl>
        <dt>User group id:</dt>
        <dd v-if="$store.state.editUserGroupSettings.id">{{ $store.state.editUserGroupSettings.id }}</dd>
        <dd v-else>-</dd>
    </dl>
    <CmdSwitchButton type="checkbox" labelText="Is active" v-model:value="userGroupActive" id="user-group" />
    <CmdFormElement element="input"
                type="text"
                required="required"
                v-model:value="userGroupName"
                placeholder="User group name"
                labelText="User group name:"
                id="user-group-entry" />
  </fieldset>
  <div class="button-wrapper flex-container">
    <CmdFormElement element="button" type="button" buttonText="Save settings" class="add" :buttonIcon="{iconClass: 'icon-check', iconPosition: 'before'}" @click="saveSettings" />
    <CmdFormElement element="button" type="button" buttonText="Cancel changes" class="cancel" :buttonIcon="{iconClass: 'icon-cancel', iconPosition: 'before'}" @click="closeFancybox" />
  </div>
</template>

<script>
import CmdFormElement from "comand-component-library/src/components/CmdFormElement"
import CmdSwitchButton from "comand-component-library/src/components/CmdSwitchButton"
import {CmsBackendClient} from "../../../client/CmsClient"
import bus from "../../../eventbus"

export default {
  name: "CmdEditModePageSettings",
  data() {
    return {
        userGroupName: "",
        userGroupActive: false
    }
  },
  components: {
    CmdFormElement,
    CmdSwitchButton
  },
  created() {
    this.userGroupName = this.$store.state.editUserGroupSettings.name
    this.userGroupActive = this.$store.state.editUserGroupSettings.active
  },
  methods: {
    saveSettings() {
      let userGroupId = this.$store.state.editUserGroupSettings.id
      let saveResponse = null

        if(userGroupId) {
        // update settings
        saveResponse = new CmsBackendClient().updateUserGroup(userGroupId, {
          name: this.userGroupName,
          active: this.userGroupActive
        })
      } else {
        // add new settings
        saveResponse = new CmsBackendClient().createUserGroup(this.userGroupName)
      }

      saveResponse.then(() => {
          if(userGroupId) {
              this.$store.commit("systemMessage", {status: "success", message: "The user group " + this.userGroupName + " was updated successfully!"})
          } else {
              this.$store.commit("systemMessage", {status: "success", message: "The new user group " + this.userGroupName + " was created successfully!"})
          }
      })
      .catch(error => {
        this.$store.commit("systemMessage", {status: "error", message: "The user group could not be updated/created!"})
        console.error(error)
      })
      // emit event via event-bus
      .finally(() => bus.emit("reload-user-groups"))
      this.closeFancybox()
    },
    closeFancybox() {
      this.$store.commit("fancybox", false)
    }
  }
}
</script>