<template>
  <ul class="cmd-edit-mode-navigation-level">
    <li v-for="(navigationEntry, index) in navigationEntries" :key="index" :class="{open : showSubLevel[index] && navigationEntry.children && navigationEntry.children.length}">
      <div :class="[status ? 'active' : 'inactive', {'selected' : selected === index}]">
        <a href="#"
           @click.prevent="loadComponentConfig(index)"
           :target="navigationEntry.href"
           :class="{'has-subentries' : (navigationEntry.children && navigationEntry.children.length)}"
           :title="(navigationEntry.children && navigationEntry.children.length) ? 'Open page (and toggle subentries)' : 'Open page'">
          <span v-if="navigationEntry.children && navigationEntry.children.length" class="icon-single-arrow-right"></span>
          <span>{{ navigationEntry.title }}</span>
        </a>
        <ul class="icon-wrapper" aria-expanded="true">
          <li>
            <a href="#" @click.prevent="editNavigation('addEntry', navigationEntry.title, navigationEntry.id, index)" title="Add new entry below this one">
              <span class="icon-plus add"></span>
            </a>
          </li>
          <li class="status">
            <a href="#" @click.prevent="editNavigation('toggleStatus', navigationEntry.title, navigationEntry.id, index)" :title="'Toggle status for ' +  navigationEntry.title">
              <span :class="status ? 'icon-check' : 'icon-cancel'"></span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="editNavigation('duplicate', navigationEntry.title, navigationEntry.id, index)" :title="'Duplicate ' +  navigationEntry.title">
              <span class="icon-duplicate-content"></span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="editNavigation('delete', navigationEntry.title, navigationEntry.id, index)" :title="'Delete ' +  navigationEntry.title">
              <span class="icon-delete"></span>
            </a>
          </li>
        </ul>
      </div>
      <CmdEditModeNavigationLevel v-if="navigationEntry.children && showSubLevel[index]" :navigationEntries="navigationEntry.children" />
    </li>
  </ul>
</template>

<script>
    import axios from "axios"

    export default {
        name: "CmdEditModeNavigationLevel",
        data() {
            return {
                showSubLevel: {},
                status: false,
                selected: 0
            }
        },
        props: {
            navigationEntries: {
                type: Array,
                required: true
            }
        },
        methods: {
            loadComponentConfig (index) {
               this.showSubLevel[index] = !this.showSubLevel[index]
               this.selected = index
            },
            editNavigation (action, title, pageId) {
                if(action === "delete") {
                    this.deleteContent(pageId, title)
                } else if (action === "duplicate") {
                  this.duplicateContent(pageId)
                } else if (action === "toggleStatus") {
                    this.toggleStatus(pageId)
                }
            },
            deleteContent(pageId, title) {
                if(!confirm("Die Seite " + title + " inkl. des Inhalts endgültig löschen?")) {
                  return
                }
                const url = new URL(`admin/pages/${this.$store.state.site.name}/${pageId}`, this.$store.state.site.api.baseUrl)
                return axios.delete(url.href)
                    .then(response => response.data) // get data (from backend) from (http) response
                    .then(backendResponse => {
                        if(backendResponse.success) {
                            this.$emit("reloadNavigation")
                        } else {
                            throw new Error(backendResponse.messages)
                        }
                    })
                    .catch(error => console.error(error))
            },
            duplicateContent(pageId) {
                const url = new URL(`admin/pages/${this.$store.state.site.name}/clone/${pageId}`, this.$store.state.site.api.baseUrl)
                return axios.post(url.href)
                .then(response => response.data) // get data (from backend) from (http) response
                .then(backendResponse => {
                    if(backendResponse.success) {
                        this.$emit("reloadNavigation")
                    } else {
                        throw new Error(backendResponse.messages)
                    }
                })
                .catch(error => console.error(error))
            },
            toggleStatus() {
                this.status = !this.status
            }
        }
    }
</script>

<style lang="scss">
.cmd-edit-mode-navigation-level {
  display: flex;
  flex-direction: column;

  > li {

    & > div {
      display: flex;
      align-items: center;
      min-height: 3.3rem;
      padding: calc(var(--default-padding) / 2);

      &:hover, &:active {
        ul.icon-wrapper {
          display: flex;
        }
      }

      &.active {
        ul.icon-wrapper {
          li.status {
            a {
              [class*="icon"] {
                border-color: var(--success-color);
                background: var(--success-color);
              }

              &:hover, &:active, &:focus {
                [class*="icon"] {
                  background: var(--pure-white);
                  color: var(--success-color);
                }
              }
            }
          }
        }
      } /* end .active */

      &.inactive {
        > a {
          font-style: italic;
          color: var(--disabled-color);
        }

        ul.icon-wrapper {
          li.status {
            a {
              [class*="icon"] {
                color: var(--pure-white);
                border-color: var(--error-color);
                background: var(--error-color);
              }

              &:hover, &:active, &:focus {
                [class*="icon"] {
                  border-color: var(--error-color);
                  background: var(--pure-white);
                  color: var(--error-color);
                }
              }
            }
          }
        }
      } /* end inactive */
    }

    &.open {
      & > div {
        > a {
          > span[class*="icon"]::before {
            display: inline-block;
            transform: rotate(90deg);
          }
        }
      }
    } /* end .open */
  }

  li {
    margin: 0;
    list-style: none;
    padding: 0 .1rem;

    > div {
      &:hover, &:active, &.selected {
        background: rgba(var(--primary-color-rgb-values), .1);
      }

      &.inactive {
        &:hover, &:active, &.selected {
          background: rgba(var(--disabled-color-rgb-values), .1);
        }
      }

      &.selected {
        ul.icon-wrapper {
          display: flex;
        }
      }

      ul.icon-wrapper {
        display: none;
        margin: 0 0 0 auto;
        gap: calc(var(--default-gap) / 5);

        li {
          a {
            [class*="icon"] {
              border: var(--primary-border);
              font-size: 1rem;
              color: var(--pure-white);
              background: var(--primary-color);
              border-radius: var(--full-circle);
              padding: calc(var(--default-padding) / 2);
            }

            &:hover, &:active, &:focus {
              [class*="icon"] {
                background: var(--pure-white);
                color: var(--primary-color);
              }
            }
          }
        }
      } /* end .icon-wrapper */
    }

    a {
      text-decoration: none;
      display: block;

      &.has-subentries {
        span[class*='icon'] {
          font-size: 1rem;
        }
      }
    }

    ul.cmd-edit-mode-navigation-level {
      margin: 0 0 0 calc(var(--default-margin) * 2.5);
    }
  }
}
</style>