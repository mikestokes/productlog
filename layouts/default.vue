<template>
  <v-app>
    <v-app-bar
      :clipped-left="false"
      color="white"
      elevate-on-scroll
      flat
      prominent
      app
    >
      <div class="d-flex flex-column justify-center align-center" style="width:100%; height: 100%">
        <div class="display-1 font-weight-black">{{ title }}</div>
        <div class="overline"><a :href="link">{{ subTitle }}</a></div>
      </div>
      
      <v-spacer />
      <v-app-bar-nav-icon/>
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
      title: 'Product Log',
      subTitle: 'www.productlog.dev',
      link: 'https://www.productlog.dev'
    }
  },

  methods: {
    ...mapMutations({
      cancelEdit: 'log/cancelEdit'
    })
  }
}
</script>
