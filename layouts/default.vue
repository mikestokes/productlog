<template>
  <v-app>
    <v-app-bar
      color="transparent"
      elevate-on-scroll
      absolute
      flat
      
    >
      <v-spacer />
      <v-app-bar-nav-icon color="primary"/>
      <v-btn icon>
        <v-icon color="primary">mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <div class="log-header d-flex justify-center align-center">
      <div class="logo"><img src="/v.png" :alt="title"/></div>
      <div class="d-flex flex-column justify-center align-center">
        <div class="display-1 font-weight-bold">{{ title }}</div>
        <div class="subtitle-link overline"><a :href="link">{{ subTitle }}</a></div>
      </div>
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
     <PostEditor/>
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import PostEditor from '~/components/PostEditor.vue'

export default Vue.extend({
  components: {
    PostEditor
  },

  computed: {
    ...mapGetters({
      editing: 'log/editing'
    }),

    editingDrawer: {
      get(): boolean {
        return this.editing
      },
      set(val: boolean) {
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
})
</script>

<style lang="scss">
.log-header {
  width:100vw;
  height: 120px;
  .logo {
    img {
      max-height: 48px;
    }
    margin-right: 16px;
  }
  .subtitle-link > a {
    text-decoration: none;
  }
}
</style>