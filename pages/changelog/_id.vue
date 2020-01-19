<template>
  <v-container>
    <v-row 
      justify="center"
      align="center"
    >
      <v-col
        md="8"
        sm="12"
        xs="12"
      >
        <AddPostButton/>
       
        <PostEntry
          v-for="(entry, index) in entries" :key="index"
          :id="entry.id"
          :draft="entry.draft"
          :published="entry.published"
          :title="entry.title"
          :markdown="entry.markdown"
          :html="entry.html"
          :tag="entry.tag"
        />
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AddPostButton from '~/components/AddPostButton'
import PostEntry from '~/components/PostEntry'

export default {
  components: {
    AddPostButton,
    PostEntry
  },

  computed: {
    ...mapGetters({
      log: 'log/log',
      entries: 'log/entries'
    })
  },
  
  async fetch ({ store, params }) {
    // Bind Firestore on the server for SSR
    await store.dispatch('log/subscribeToLog', params.id)
  },

  async mounted () {
    // Rebind Firestore on the client
    if (process.client) {
      await this.$store.dispatch('log/subscribeToLog', this.$route.params.id)
    }
  }
}
</script>
