<template>
  <CmdEditModeNavigationLevel
          :navigationEntries="topHeaderNavigation"
          @reload-navigation="reloadNavigation('top-navigation')"
          @entry-selected="toggleEntrySelectedTopHeaderNavigation"
          :entrySelected="entrySelectedTopHeaderNavigation"
  />
  <CmdEditModeNavigationLevel
          :navigationEntries="mainNavigation"
          @reload-navigation="reloadNavigation('main-navigation')"
          @entry-selected="toggleEntrySelectedMainNavigation"
          :entrySelected="entrySelectedMainNavigation"
  />
  <CmdEditModeNavigationLevel
          :navigationEntries="footerNavigation"
          @reload-navigation="reloadNavigation('footer-navigation')"
          @entry-selected="toggleEntrySelectedFooterNavigation"
          :entrySelected="entrySelectedFooterNavigation"
  />
</template>

<script>
  import {CmsBackendClient} from "../../../client/CmsClient"
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
              return new CmsBackendClient()
                  .loadSiteNavigation(path)
                  .catch(error => console.error(error))
          },
          reloadNavigation(navigationName) {
              this.loadNavigationEntries(navigationName).then(responseData => {
                  if(navigationName === 'top-navigation') {
                      this.topHeaderNavigation = responseData
                  } else if(navigationName === 'main-navigation') {
                      this.mainNavigation = responseData
                  } else if(navigationName === 'footer-navigation') {
                      this.footerNavigation = responseData
                  }
                }
              )
          }
      }
  }
</script>