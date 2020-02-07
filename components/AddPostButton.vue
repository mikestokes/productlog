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
import { createComponent, computed } from '@vue/composition-api'

export default createComponent({
  setup (props, { root }) {
    const canAddLog = computed((): boolean => root.$store.getters['log/canAddLog'])
    const newEntryClick = () => root.$store.commit('log/newEntry')

    return {
      canAddLog,
      newEntryClick
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