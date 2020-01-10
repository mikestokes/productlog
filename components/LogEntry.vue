<template>
  <v-card 
    outlined
    class="mx-auto"
    max-width="640"
  >
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
        {{ title }}
      </div>
      <v-spacer />
      <span 
        class="subtitle-2 blue-grey--text text--lighten-2"
        v-if="draft"
        >
        <em>Not published</em>
      </span>
    </v-card-title>
    <v-card-text >
      <div v-html="content"></div>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        text
        v-if="canEditLog"
      >
        <v-icon left>mdi-pencil</v-icon>
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    draft: Boolean,
    published: String,
    title: String,
    content: String,
    tags: Array
  },

  computed: {
    ...mapGetters({
      canAddLog: 'log/canAddLog',
      canEditLog: 'log/canEditLog'
    })
  }
}
</script>
