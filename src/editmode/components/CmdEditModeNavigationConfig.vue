<template>
  <h4>Top-Header-Navigation</h4>
  <CmdEditModeNavigationLevel
          :navigationEntries="topHeaderNavigation"
          @reload-navigation="reloadNavigation('top-navigation')"
          @entry-selected="toggleEntrySelectedTopHeaderNavigation"
          :entrySelected="entrySelectedTopHeaderNavigation"
  />
  <hr />
  <h4>Main-Navigation</h4>
  <CmdEditModeNavigationLevel
          :navigationEntries="mainNavigation"
          @reload-navigation="reloadNavigation('main-navigation')"
          @entry-selected="toggleEntrySelectedMainNavigation"
          :entrySelected="entrySelectedMainNavigation"
  />
  <hr />
  <h4>Footer-Navigation</h4>
  <CmdEditModeNavigationLevel
          :navigationEntries="footerNavigation"
          @reload-navigation="reloadNavigation('footer-navigation')"
          @entry-selected="toggleEntrySelectedFooterNavigation"
          :entrySelected="entrySelectedFooterNavigation"
  />
  <hr />
  <button class="button add" @click="addEntry">
    <span class="icon-plus"></span>
    <span>Add new entry</span>
  </button>
</template>

<script>
  import axios from "axios"
  import CmdEditModeNavigationLevel from "./CmdEditModeNavigationLevel"

  export default {
      data () {
          return {
              topHeaderNavigation: [],
              mainNavigation: [],
              footerNavigation: [],
              entrySelectedTopHeaderNavigation: false,
              entrySelectedMainNavigation: false,
              entrySelectedFooterNavigation: false

          }
      },
      components: {
          CmdEditModeNavigationLevel
      },
      created() {
          // call method and wait for resolved promise (from ajax-call) to assign response-data to data-property)
          this.loadNavigationEntries('top-navigation').then(responseData => this.topHeaderNavigation = responseData)
          this.loadNavigationEntries('main-navigation').then(responseData => this.mainNavigation = responseData)
          this.loadNavigationEntries('footer-navigation').then(responseData => this.footerNavigation = responseData)
      },
      methods: {
          toggleEntrySelectedTopHeaderNavigation() {
              this.entrySelectedMainNavigation = !this.entrySelectedMainNavigation
              this.entrySelectedFooterNavigation = !this.entrySelectedFooterNavigation
          },
          toggleEntrySelectedMainNavigation() {
              this.entrySelectedTopHeaderNavigation = !this.entrySelectedTopHeaderNavigation
              this.entrySelectedFooterNavigation = !this.entrySelectedFooterNavigation
          },
          toggleEntrySelectedFooterNavigation() {
              this.entrySelectedTopHeaderNavigation = !this.entrySelectedTopHeaderNavigation
              this.entrySelectedMainNavigation = !this.entrySelectedMainNavigation
          },
          loadNavigationEntries(path) {
              const url = new URL(`admin/pages/${this.$store.state.site.name}/${path}`, this.$store.state.site.api.baseUrl)
              return axios.get(url.href, {headers: {"Accept-Language": this.$store.state.language}})
                  .then(response => response.data) // get data from response
                  .catch(error => console.error(error))
          },
          reloadNavigation(navigationName) {
              this.loadNavigationEntries(navigationName).then(responseData => {
                  if(navigationName === 'top-navigation') {
                      this.topNavigation = responseData
                  } else if(navigationName === 'main-navigation') {
                      this.mainNavigation = responseData
                  } else if(navigationName === 'footer-navigation') {
                      this.footerNavigation = responseData
                  }
                }
              )
          },
          addEntry() {
              alert("Add new entry!")
          }
      }
  }
</script>