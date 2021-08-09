<template>
  <h3>Google Recaptcha&trade;</h3>
  <fieldset class="flex-container">
    <CmdFormElement element="input" type="checkbox" labelText="Activate" v-model="activated" />
    <CmdFormElement element="input" type="text" labelText="Web site key:" :required="activated" placeholder="Enter key" />
    <CmdFormElement element="input" type="text" labelText="Secret key:" :required="activated" placeholder="Enter key" />
    <CmdFormElement element="input" type="number" labelText="User-score:" step="0.1" value="0.5" />
  </fieldset>
</template>

<script>
  // import axios from "axios"

  import CmdFormElement from "comand-component-library/src/components/CmdFormElement"

  export default {
      name: "CmdEditModeManageGoogleRecaptcha",
      data() {
          return {
            activated: false
          }
      },
      components: {
          CmdFormElement
      }
  }
</script>