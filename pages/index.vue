<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md8
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
        max-width="600">
        <v-card-title>
          <div class="headline font-weight-bold ">
            Welcome to your Product Log 📣
          </div>
          <v-spacer />
          <span class="subtitle-2 blue-grey--text text--lighten-2">
            <em>Not published</em>
          </span>
        </v-card-title>
        <v-card-subtitle class="pt-2">
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
        <v-card-text >
          <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
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
        
    </v-flex>
  </v-layout>
</template>

<script>
import logs from '~/store/logs'

export default {
}
</script>
