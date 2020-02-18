<template>
  <v-app>
    <v-app-bar
      class="toolbar-main"
      :class="{ 'toolbar-root': isRoot === true }"
      :dark="isRoot"
      elevate-on-scroll
      absolute
      flat>
      <a :href="link" target="_blank">
        <v-img
          class="image-logo mr-3"
          max-width="32px"
          height="32px"
          :src="logo"
          :alt="subTitle" />
      </a>
      <v-toolbar-title class="font-weight-medium">
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon/>
      <v-btn icon>
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content class="content-main">
      <nuxt />
    </v-content>
    <v-navigation-drawer
      v-model="editingDrawer"
      :right="true"
      :width="512"
      temporary
      fixed
      app>
     <PostEditor />
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
import { createComponent, computed, ref } from '@vue/composition-api'
import PostEditor from '~/components/PostEditor.vue'

export default createComponent({
  components: {
    PostEditor
  },

  setup(props, { root }) {
    const title = ref('Product Log')
    const subTitle = ref('www.productlog.dev')
    const link = ref('https://www.productlog.dev')
    const logo = ref('/logo.svg')

    const isRoot = computed(() => root.$route.fullPath === '/')
    const editing = computed((): boolean => root.$store.getters['log/editing'])
    const editingDrawer = computed({
      get: () => editing.value,
      set: (val) => {
        if (val === false)
          root.$store.commit('log/cancelEdit')
      }
    })

    return {
      title,
      subTitle,
      link,
      logo,
      isRoot,
      editing,
      editingDrawer
    }
  }
})
</script>

<style lang="scss">
.toolbar-main {
  .v-toolbar__content {
    border-bottom: solid 1px $light-grey-blue;
  }

  &.theme--dark {
    background-color: $dark-blue !important;
    .v-toolbar__content {
      border-bottom: none !important;
    }
  }
}
.content-main {
  background-color: $grey-blue;
}
</style>
