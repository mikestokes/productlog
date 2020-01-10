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
        <v-btn
          outlined
          color="primary"
          class="mb-3">
          <v-icon>mdi-add</v-icon>
          New Post...
        </v-btn>

        <v-card 
          outlined
          class="mx-auto"
          max-width="600"
          v-for="(entry, index) in entries" :key="index">
          <v-card-subtitle >
            <v-chip
              small
              class="mr-2"
              color="primary"
            >
              Annoucement
            </v-chip>
            <span class="blue-grey--text text--lighten-2">
              12 days ago
            </span>
          </v-card-subtitle>
          <v-card-title class="pt-0">
            <div class="headline font-weight-bold">
              {{ entry.title }}
            </div>
            <v-spacer />
            <span 
              class="subtitle-2 blue-grey--text text--lighten-2"
              v-if="entry.draft"
              >
              <em>Not published</em>
            </span>
          </v-card-title>
          <v-card-text >
            kjbhkjh
            <!-- <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p> -->
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text>
              <v-icon left>mdi-pencil</v-icon>
              Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
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
