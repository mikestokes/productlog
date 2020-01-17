<template>
  <v-app>
    <v-app-bar
      color="transparent"
      elevate-on-scroll
      absolute
      flat
      
    >
      <v-spacer />
      <v-app-bar-nav-icon/>
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <div class="log-header d-flex flex-column justify-center align-center">
      <div class="display-1 font-weight-bold">{{ title }}</div>
      <div class="subtitle-link overline"><a :href="link">{{ subTitle }}</a></div>
    </div>
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

<style lang="scss">
.log-header {
  width:100vw;
  height: 120px;

  .subtitle-link > a {
    text-decoration: none;
  }
}
</style>