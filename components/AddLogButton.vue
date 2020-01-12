<template>
  <v-btn
    outlined
    color="primary"
    class="mb-3"
    v-if="canAddLog"
    @click.stop="newEntryClick"
  >
    <v-icon>mdi-plus</v-icon>
    New Post...
  </v-btn>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      canAddLog: 'log/canAddLog'
    })
  },

  methods: {
    ...mapMutations({
      newEntry: 'log/newEntry'
    }),

    newEntryClick () {
      this.newEntry()
    }
  }
}
</script>
