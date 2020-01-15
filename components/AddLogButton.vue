<template>
  <v-btn
    absolute
    dark
    fab
    top
    left
    color="primary"
    v-if="canAddLog"
    @click.stop="newEntryClick"
  >
    <v-icon>mdi-plus</v-icon>
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
