<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      color="white"
      elevate-on-scroll
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      :width="512"
      temporary
      fixed
      app
    >
      <LogEditor/>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import LogEditor from '~/components/LogEditor.vue'

export default {
  components: {
    LogEditor
  },

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      right: true,
      rightDrawer: true,
      title: 'Product Log'
    }
  }
}
</script>
