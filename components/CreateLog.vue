<template>
  <v-dialog 
    v-model="dialog" 
    fullscreen 
    hide-overlay 
    transition="dialog-bottom-transition">
    <v-row
      justify="center"
      align="center"
      class="pa-4"
      cols="9">
      <v-col class="col-content">
        <v-btn 
          icon 
          class="button-close" 
          @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <h4 class="subtitle-1 font-weight-medium grey--text text--darken-1">
          Create a changelog
        </h4>
        <h1 class="display-1 black--text mb-3">
          Let's start with a name for your <span class="pink--text">changelog</span>
        </h1>
        <v-text-field
          class="display-1 grey--text"
          label="Enter your changelog name"
          minLength="3"
          v-model="name"
          :rules="[rules.required, rules.length, rules.name]"
        ></v-text-field>
        <v-checkbox 
          v-model="acceptTerms">
          <template v-slot:label>
            <div>
              I accept the
              <a
                target="_blank"
                href="http://vuetifyjs.com"
                @click.stop>
                Product Log terms
              </a>
            </div>
          </template>
        </v-checkbox>
        <v-btn 
          class="mt-2 mr-2 white--text" 
          large 
          depressed
          color="blue darken-2"
          :disabled="!acceptTerms">
          Continue</v-btn>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script lang="ts">
import { createComponent, ref, computed, reactive } from '@vue/composition-api'

export default createComponent({
  setup (props, { root  }) {
    const dialog = ref(true)
    const name = ref('')
    const acceptTerms = ref()
    const rules = reactive({
      required: (value: string) => !!value || 'Required.',
      length: (value: string) => value.length >= 3 || 'Minimum 3 characters.',
      name: (value: string) => {
        // Allow a-z, 0-9, -, _, ignore case
        const pattern = /^[a-z0-9-_]+$/ig
        return pattern.test(value) || 'Invalid name.'
      }
    })

    return {
      dialog,
      name,
      acceptTerms,
      rules
    }
  }
})
</script> 

<style lang="scss">
.v-dialog--fullscreen {
  background-color: $grey-blue;
  .col-content {
    padding: 12px;
    padding-top: 0;
    .button-close {
      position: absolute;
      top: 12px;
      right: 12px;
    }
    h4 {
      padding-bottom: 48px;
    }
    h1 {
      padding-bottom: 24px;
    }
    .theme--light.v-input input {
      color: rgba(0, 0, 0, 0.5);
    }
    .v-text-field {
      padding-bottom: 48px;
    }
    .v-input--checkbox {
      padding-bottom: 8px;
    }
    @media only screen and (min-width: $mobile-breakpoint) {
      margin-left: 48px;

      .button-close {
        position: absolute;
        top: 12px;
        left: 12px;
      }
    }
  }
}
</style>                                      