<template>
  <v-btn
    outlined
    color="primary"
    class="mb-3"
    v-if="canAddLog"
  >
    <v-icon>mdi-add</v-icon>
    New Post...
  </v-btn>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      canAddLog: 'log/canAddLog'
    })
  }
}
</script>
