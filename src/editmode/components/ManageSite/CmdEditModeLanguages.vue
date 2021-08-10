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
          <CmdSwitchButton type="checkbox" :id="'language-' + language.iso2" :colored="true" onLabel="On" offLabel="off" />
        </td>
        <td>
          <CmdSwitchButton type="radio" :id="'master-' + language.iso2" name="master-language"  :colored="true" onLabel="Master" offLabel="No master" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import languagesData from "@/assets/data/languages.json"

  // import axios from "axios"

  import CmdSwitchButton from "comand-component-library/src/components/CmdSwitchButton"

  export default {
      name: "CmdEditModeManageLanguages",
      data() {
          return {
            activated: false,
              languagesData
          }
      },
      components: {
          CmdSwitchButton
      }
  }
</script>