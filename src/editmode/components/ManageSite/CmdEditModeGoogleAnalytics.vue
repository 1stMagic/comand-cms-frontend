<template>
  <h4>Google Analytics&trade;</h4>
  <fieldset class="flex-container">
    <CmdSwitchButton type="checkbox" id="google-analytics-activated" v-model:value="activated"  :colored="true" onLabel="Activate" offLabel="Deactivate" />
    <CmdFormElement v-if="activated" element="textarea" labelText="Script:" placeholder="Enter script (without <script>-tag)" />
  </fieldset>
</template>

<script>
  // import axios from "axios"

  import CmdFormElement from "comand-component-library/src/components/CmdFormElement"
  import CmdSwitchButton from "comand-component-library/src/components/CmdSwitchButton";

  export default {
      name: "CmdEditModeGoogleAnalytics",
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