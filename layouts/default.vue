<template>
  <v-app>
    <v-app-bar
      :clipped-left="false"
      color="white"
      elevate-on-scroll
      app
    >
      <v-app-bar-nav-icon/>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
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
      <LogEditor/>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import LogEditor from '~/components/LogEditor.vue'

export default {
  components: {
    LogEditor
  },

  computed: {
    ...mapGetters({
      editing: 'log/editing'
    }),

    editingDrawer: {
      get() {
        return this.editing
      },
      set(val) {
        if (val === false) {
          this.cancelEdit()
        }
      }
    }
  },

  data () {
    return {
      title: 'Product Log'
    }
  },

  methods: {
    ...mapMutations({
      cancelEdit: 'log/cancelEdit'
    })
  }
}
</script>
