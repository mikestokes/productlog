<template>
  <v-container fluid>
    <v-row
      justify="center"
      align="center"
      class="hero pa-4">
      <v-col>
        <h2 class="display-1 white--text mb-3">
          Welcome to Product Log!
        </h2>
        <p class="body-1 white--text mb-6">
          Awesome changelog, release notes and what's new widget for your product
        </p>
        <v-btn 
          class="mt-4 mr-2 blue--text text--darken-2" 
          large 
          depressed 
          color="white">
          Create a changelog</v-btn>
        <v-btn 
          class="mt-4 white--text"
          large 
          depressed
          color="blue darken-1">
          <v-icon left>mdi-text-subject</v-icon> 
          View docs
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup (props, { root }) {
    return {
    }
  }
})
</script>

<style lang="scss" scoped>
.hero {
  height: 400px;
  background-color: $dark-blue;
  @media only screen and (min-width: $mobile-breakpoint) {
    height: 500px;
  }
}
</style>

<style lang="scss">
.v-application {
  .display-1 {
    font-weight: 500;
    font-size: 1.65rem !important;
  }
  @media only screen and (min-width: $mobile-breakpoint) {
    .display-1 {
      font-size: 2.125rem !important;
    }
  }
}
</style>