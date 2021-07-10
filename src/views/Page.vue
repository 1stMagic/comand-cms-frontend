<template>
  <PageComponent :components="components" />
</template>

<script>
  import PageComponent from "../components/PageComponent"
  import axios from "axios"

  export default {
      name: "Page",
      components: { PageComponent },
      props: {
          page: {
              type: [Array,String]
          },
          language: {
              type: String
          }
      },
      data() {
        return {
            components: [],
            mainHeadline: "",
            breadcrumbs: []
        }
      },
      created() {
          this.loadPage()
      },
      computed: {
          pageName() {
              const pageName = this.page || this.$store.state.site?.config?.homePage || "index.html"
              if (Array.isArray(pageName)) {
                  return pageName.join("/")
              }
              return pageName
          }
      },
      methods: {
          loadPage() {
              const url = new URL(`pages/of-site/${this.$store.state.site.name}`, this.$store.state.site.api.baseUrl)
              url.searchParams.set("relativePagePath", this.pageName.replace(/\.html$/, ""))
              axios.get(url.href, {headers: {"Accept-Language": this.$store.state.language}})
                  .then(response => response.data)
                  .then(this.updatePageTitle)
                  .then(this.updatePageMetaData)
                  .then(this.updateBodyId)
                  .then(this.processBreadcrumbs)
                  .then(this.processComponents)
                  .catch(error => console.error(error))
          },
          updatePageTitle(pageData) {
              document.querySelector("html > head > title").textContent = pageData?.title ?? ""
              return pageData
          },
          updatePageMetaData(pageData) {
              const head = document.querySelector("html > head")
              head.querySelectorAll("meta[name][content]").forEach(el => el.remove())
              if (pageData?.metaData) {
                  Object.entries(pageData.metaData).forEach(([name, value]) => {
                      const metaTag = document.createElement("meta")
                      metaTag.setAttribute("name", name)
                      metaTag.setAttribute("content", value)
                      head.append(metaTag)
                  })
              }
              return pageData
          },
          updateBodyId(pageData) {
             let startIndex = pageData.id.indexOf(".")
             startIndex++
             let id = pageData.id.slice(startIndex)
             id = id.replace(".", "-")
             document.body.id = id // assign id to body
             return pageData // return pageData to continue chaining
          },
          processBreadcrumbs(pageData) {
              this.breadcrumbs = pageData.breadcrumbs || []
              return pageData
          },
          processComponents(pageData) {
              this.mainHeadline = pageData.title // assign headline
              this.components = pageData?.components || []
          }
      },
      watch: {
          page() {
              this.loadPage()
          },
          "$store.state.language"() {
              this.loadPage()
          }
      }
  }
</script>
