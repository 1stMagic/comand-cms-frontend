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
          <img :src="require('comand-component-library/src/assets/images/flags/flag-' + language.iso2 + '.svg')" :alt="language.iso2" :title="language.tooltip" />
        </td>
        <td>
          <CmdSwitchButton type="checkbox" @change="toggleActiveLanguages(language.iso2, language.active)" v-model:value="language.active" :id="'language-' + language.iso2" :colored="true" onLabel="On" offLabel="Off" />
        </td>
        <td>
          <CmdSwitchButton type="radio" @change="setDefaultLanguage(language.iso2, language.default)" v-model:value="language.default" :id="'default-' + language.iso2" name="default-language" :colored="true" onLabel="Default" offLabel="Not default" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import CmdSwitchButton from "comand-component-library/src/components/CmdSwitchButton"

  export default {
      name: "CmdEditModeManageLanguages",
      data() {
          return {
            activated: false
          }
      },
      components: {
          CmdSwitchButton
      },
      computed: {
          languagesData() {
              const supportedLanguages = this.$store.state.site.supportedLanguages
              const languages = []
              for (let i = 0; i < supportedLanguages.length; i++) {
                  languages.push({
                      "iso2": supportedLanguages[i].language,
                      "tooltip": supportedLanguages[i].title,
                      "name": supportedLanguages[i].title,
                      "active": supportedLanguages[i].active || false,
                      "default": supportedLanguages[i].default || false,
                      "link": {
                          "type": "router",
                          "name": "Page",
                          "params": {
                              "language": supportedLanguages[i].language,
                              "page": this.$route.params.page
                          }
                      }
                  })
              }
              return languages
          }
      },
      methods: {
          toggleActiveLanguages(iso2, activeLanguage) {
             alert(iso2 + " " + activeLanguage)
          },
          setDefaultLanguage(iso2, defaultLanguage) {
              alert(iso2 + " " + defaultLanguage)
          }
      }
  }
</script>