<template>
  <h4>Google Maps&trade;</h4>
  <fieldset class="flex-container">
    <CmdSwitchButton type="checkbox" id="google-maps-activated" v-model:value="activated" :colored="true" onLabel="Activate" offLabel="Deactivate" />
    <template v-if="activated">
      <CmdFormElement element="input" type="checkbox" labelText="Link all addresses with Google Maps&trade;" />
      <CmdFormElement element="input" type="checkbox" labelText="Enable Google Maps&trade; as component" />
    </template>
  </fieldset>
</template>

<script>
  // import axios from "axios"

  import CmdFormElement from "comand-component-library/src/components/CmdFormElement"
  import CmdSwitchButton from "comand-component-library/src/components/CmdSwitchButton";

  export default {
      name: "CmdEditModeMGoogleMaps",
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