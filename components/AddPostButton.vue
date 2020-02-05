<template>
  <v-btn
    absolute
    dark
    fab
    bottom
    right
    large
    color="primary"
    class="add-log-button"
    v-if="canAddLog"
    @click.stop="newEntryClick"
  >
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
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
})
</script>

<style lang="scss">
.add-log-button {
  margin-bottom: 75px;
  margin-right: 20px;
}
</style>