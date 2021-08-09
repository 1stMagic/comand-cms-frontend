<template>
  <h3>Languages</h3>
  <table>
    <thead>
      <tr>
        <th>Lang.</th>
        <th>On web site</th>
        <th>Master</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(language, index) in languagesData" :key="index">
        <td>
          <img src="" :alt="language.iso2" :title="language.name" />
        </td>
        <td>
          <CmdFormElement element="input" type="checkbox" :id="'active-' + language.iso2" :labelText="'Activate ' + language.name" :hideLabelText="true" />
        </td>
        <td>
          <CmdFormElement element="input" type="radio" name="master-language" :id="'master-' + language.iso2" :labelText="'Activate ' + language.name" :hideLabelText="true" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import languagesData from "@/assets/data/languages.json"

  // import axios from "axios"

  import CmdFormElement from "comand-component-library/src/components/CmdFormElement"

  export default {
      name: "CmdEditModeManageLanguages",
      data() {
          return {
            activated: false,
              languagesData
          }
      },
      components: {
          CmdFormElement
      }
  }
</script>