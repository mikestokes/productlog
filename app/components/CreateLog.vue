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
        <v-form
          ref="formcreate"
          v-model="valid">
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
            :error-messages="nameErrors"
            :rules="[rules.required, rules.length, rules.name]"
            :append-outer-icon="available ? 'mdi-check-circle' : ''"
          ></v-text-field>
          <v-checkbox 
            v-model="acceptTerms"
            :rules="[rules.accepted]">
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
            :disabled="!valid"
            @click="submit">
            Continue</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from '@vue/composition-api'

export default defineComponent({
  setup (props, { root  }) {
    const dialog = ref(true)
    const name = ref('')
    const acceptTerms = ref()
    const valid = ref(false)
    const available = ref(false)
    const nameErrors = ref([])
    const rules = reactive({
      accepted: (value: boolean) => !!value || 'Please accept the terms',
      required: (value: string) => !!value || 'Changelog name is required',
      length: (value: string) => value.length >= 3 || 'Changelog name must be at least 3 characters long',
      name: (value: string) => {
        // Allow a-z, 0-9, -, _, ignore case
        const pattern = /^[a-z0-9-_]+$/ig
        return pattern.test(value) || 'Changelog names can only contain: letters, numbers, - and _ characters'
      }
    })

    watch(name, async (name, prevName) => { 
      // TODO: debounce
      // TODO: make use of form validation
      if (name.length <= 3) return

      available.value = await root.$store.dispatch('log/isNameAvailable', name)

      if (!available.value) {
        // @ts-ignore
        nameErrors.value.push('This changelog name is already taken')
      } else {
        nameErrors.value = []
      }
    })

    const submit = () => {
      if (!(root.$refs.formcreate as Vue & { validate: () => boolean }).validate()) 
        return
      
    }

    return {
      dialog,
      name,
      acceptTerms,
      valid,
      available,
      nameErrors,
      rules,
      submit
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
    .v-messages__message {
      line-height: 1.2rem;
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