<template>
  <div class="cmd-edit-mode-manage-page-visibility">
    <CmdFormElement labelText="This page is visible for:" element="select" @change="changeVisibilityAccess" :selectOptions="[
    {
      'text': 'for all users',
      'value': 'all',
      'selected': true
    },
        {
      'text': 'for no one',
      'value': 'noone'
    },
        {
      'text': 'for specific user groups only',
      'value': 'specific'
    }
    ]"/>
  </div>
</template>

<script>
// import axios from "axios"

// import Cmd-components
import CmdFormElement from "comand-component-library/src/components/CmdFormElement"

export default {
    name: "CmdEditModePageVisibility",
    components: {
        CmdFormElement
    },
    methods: {
        changeVisibilityAccess() {
            // return axios.delete()
            // .then(response => response.data) // get data (from backend) from (http) response
            // .then(backendResponse => {
            //     if(backendResponse.success) {
            //         this.$store.state.systemMessage.status = "success"
            //         this.$store.state.systemMessage.systemMessage = "The page visibility was changed successfully!"
            //         this.$emit("reloadNavigation")
            //     } else {
            //         this.$store.state.systemMessage.status = "error"
            //         this.$store.state.systemMessage.systemMessage = "The page visibility could not be changed!"
            //         throw new Error(backendResponse.messages)
            //     }
            // })
            // .catch(error => console.error(error))
        }
    }
}
</script>