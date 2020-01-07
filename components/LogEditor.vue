<template>
  <v-list>
    <v-list-item>
      <v-list-item-title>
        <v-text-field 
          v-model="title"
          class="title font-weight-bold"
          prepend-inner-icon="mdi-close"></v-text-field>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>

export default {
  data () {
    return {
      title: "High school reunion",
    }
  }
}
</script>
