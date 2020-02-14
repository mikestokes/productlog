<template>
  <v-app>
    <v-app-bar
      color="white"
      class="toolbar-main"
      elevate-on-scroll
      absolute
      flat
    >
      <v-img
        class="image-logo"
        max-width="40px"
        height="40px"
        :src="logo"
        :alt="subTitle"
      />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon color="primary"/>
      <v-btn icon>
        <v-icon color="primary">mdi-account-circle-outline</v-icon>
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
      app
    >
     <PostEditor/>
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
    const logo = ref('https://cdn.vuetifyjs.com/images/parallax/material.jpg')

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
      editing,
      editingDrawer
    }
  }
})
</script>

<style lang="scss">
.toolbar-main {
  .v-toolbar__content {
    border-bottom: solid 1px #eceff8;
    .image-logo {
      margin-right: 16px;
    }
  }
}
.content-main {
  padding-top: 72px !important;
  background-color: #f8fbfd;
}
</style>
