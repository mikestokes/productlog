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
     
          <v-card 
            outlined
            class="mx-auto"
            max-width="600">
            <v-card-title>
              <div class="headline">
                Welcome to your Product Log 📣
              </div>
            </v-card-title>
            <v-card-subtitle>
              <v-chip
                small
                class="mt-2 mr-2"
                color="primary"
              >
                Annoucement
              </v-chip>
              <span class="blue-grey--text text--lighten-2">
                12 days ago
              </span>
              <span class="blue-grey--text text--lighten-2">
                <em>(Draft)</em>
              </span>
            </v-card-subtitle>
            <v-card-text>
              <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                text
                >
                <v-icon left>mdi-pencil</v-icon>
                Edit
              </v-btn>
            </v-card-actions>
          </v-card>
        
    </v-flex>
  </v-layout>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  // components: {
  //   Logo,
  //   VuetifyLogo
  // }
}
</script>
