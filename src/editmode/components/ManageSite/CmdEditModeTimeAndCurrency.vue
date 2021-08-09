<template>
  <h3>Time and currency</h3>
  <fieldset class="flex-container">
    <CmdFormElement element="select" labelText="Timezone:" :selectOptions="[{
      'text': 'Europe/Berlin',
      'value': 'Europe/Berlin'
    }]" />
    <CmdFormElement element="select" labelText="Date format:" :selectOptions="[{
      'text': 'TT.MM.JJJJ',
      'value': 'tt.mm.jjjj'
    }]" />
    <CmdFormElement element="select" labelText="Time format:" :selectOptions="[{
      'text': 'HH:MM',
      'value': 'hh:mm'
    }]" />
    <CmdFormElement element="select" labelText="Hours format:" :selectOptions="[{
      'text': '24 hours',
      'value': '24'
    }]" />
  </fieldset>
</template>

<script>
  // import axios from "axios"

  import CmdFormElement from "comand-component-library/src/components/CmdFormElement"

  export default {
      name: "CmdEditModeManageTimeAndCurrency",
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