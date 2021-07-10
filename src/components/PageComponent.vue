<script>
    import { h, resolveComponent } from "vue"

    export default {
        name: "PageComponent",
        props: {
            components: {
                type: Array
            }
        },
        render() {
            return JSON.parse(JSON.stringify(this.components || [])).map(this.toVNode)
        },
        methods: {
            toVNode(component) {
                return h(
                    resolveComponent(component.componentName),
                    this.getComponentProps(component),
                    {default: () => (component.components || []).map(this.toVNode)})
            },
            getComponentProps(component) {
                if (component.componentName === "CmdSlideshow") {
                    return this.mapSlideshowProperties(component)
                }
                return component.properties || {}
            },
            mapSlideshowProperties(componentData) {
                const assetsBaseUrl = this.$store.state.site.assets.baseUrl
                return {
                    slideshowItems: componentData.properties.items.map(item => {
                        item.images = item.images.map(image => {
                            image.imgPath = new URL(image.imgPath, assetsBaseUrl).href
                            return image
                        })
                        return item
                    })
                }
            }
        }
    }
</script>
