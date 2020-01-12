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
        <AddLogButton/>

        <LogEntry
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
import AddLogButton from '~/components/AddLogButton'
import LogEntry from '~/components/LogEntry'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AddLogButton,
    LogEntry
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
    await this.$store.dispatch('log/subscribeToLog', this.$route.params.id)
  }
}
</script>
