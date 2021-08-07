<template>
  <h3>Group</h3>
  <CmdEditModeGroupLevel />
  <hr />

  <button class="button add" @click="addEntry">
    <span class="icon-plus"></span>
    <span>Add new entry</span>
  </button>
</template>

<script>
  import axios from "axios"
  import CmdEditModeGroupLevel from "./CmdEditModeGroupLevel"

  export default {
      data () {
          return {
              topHeaderNavigation: [],
              mainNavigation: [],
              footerNavigation: []
          }
      },
      components: {
          CmdEditModeGroupLevel
      },
      created() {
          // call method and wait for resolved promise (from ajax-call) to assign response-data to data-property)
          this.loadNavigationEntries('top-navigation').then(responseData => this.topHeaderNavigation = responseData)
          this.loadNavigationEntries('main-navigation').then(responseData => this.mainNavigation = responseData)
          this.loadNavigationEntries('footer-navigation').then(responseData => this.footerNavigation = responseData)
      },
      methods: {
          loadNavigationEntries(path) {
              const url = new URL(`admin/pages/${this.$store.state.site.name}/${path}`, this.$store.state.site.api.baseUrl)
              return axios.get(url.href, {headers: {"Accept-Language": this.$store.state.language}})
                  .then(response => response.data) // get data from response
                  .catch(error => console.error(error))
          },
          reloadNavigation(navigationName) {
              this.loadNavigationEntries(navigationName).then(responseData => this.mainNavigation = responseData)
          },
          addEntry() {
              alert("Add new entry!")
          }
      }
  }
</script>