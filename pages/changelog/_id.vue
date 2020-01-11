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
          :id="entry.index"
          :draft="entry.draft"
          :published="entry.published"
          :title="entry.title"
          :content="entry.content"
          :tags="entry.tags"
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
    await store.dispatch('log/subscribeToLog', params.id)
  },
}
</script>
