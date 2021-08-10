<template>
  <h4>Google Recaptcha&trade;</h4>
  <fieldset class="flex-container">
    <CmdSwitchButton type="checkbox" id="google-recaptcha-activated" :colored="true" onLabel="Activate" offLabel="Deactivate" @input="activated = !activated" />
    <template v-if="activated">
      <CmdFormElement element="input" type="text" labelText="Web site key:" :required="activated" placeholder="Enter key" />
      <CmdFormElement element="input" type="text" labelText="Secret key:" :required="activated" placeholder="Enter key" />
      <CmdFormElement element="input" type="number" labelText="User-score:" step="0.1" value="0.5" placeholder="Between 0.0 to 1.0" />
    </template>
  </fieldset>
</template>

<script>
  // import axios from "axios"

  import CmdFormElement from "comand-component-library/src/components/CmdFormElement"
  import CmdSwitchButton from "comand-component-library/src/components/CmdSwitchButton"

  export default {
      name: "CmdEditModeManageGoogleRecaptcha",
      data() {
          return {
            activated: false
          }
      },
      components: {
          CmdFormElement,
          CmdSwitchButton
      }
  }
</script>