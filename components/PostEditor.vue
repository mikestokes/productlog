<template>
  <div>
    <v-toolbar color="white" flat>
      <v-btn icon @click.stop="cancel">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="font-weight-bold">
        Edit Post
      </v-toolbar-title>
    </v-toolbar>

    <v-container class="d-flex flex-column">
      <!-- Title -->
      <v-row>
        <v-col>
          <v-text-field 
            v-model="title"
            outlined
            hide-details
            label="Title of the post"
            class="headline font-weight-bold"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Tag and Publish Date -->
      <v-row>
        <!-- Tag -->
        <v-col cols="6">
          <v-combobox
            itemText="name"
            label="Tag this post as"
            hide-details
            chips
            outlined
            v-model="tag"
            :items="tagTypes"
          >
            <template v-slot:selection="{ item, attrs, index }">
              <v-chip
                small
                text-color="white"
                :color="item.color"
                :key="index"
              >
                {{ item.name }}
              </v-chip>
            </template>
          </v-combobox>
        </v-col>

        <!-- Publish Date -->
        <v-col cols="6">
          <v-menu
            max-width="290"
            v-model="dateMenu"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                readonly
                outlined
                hide-details
                label="Publish the post on"
                v-on="on"
                :disabled="draft"
                :value="publishedFromNow"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="datepickerDate"
              @change="dateMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <!-- Content -->
      <v-row>
        <v-col>
          <v-textarea
            no-resize
            outlined
            rows="15"
            label="Post content (Markdown)"
            style="font-family: Monaco, monospace; font-size: 14px;"
            v-model="markdown"
          ></v-textarea>
        </v-col>
      </v-row>
      
      <v-spacer></v-spacer>
  
      <!-- Toolbar -->
      <v-row>
        <v-col>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              text
              color="red"
              @click.stop="remove"
            >
              Delete
            </v-btn>

            <v-btn
              text
              color="grey"
              @click.stop="cancel"
            >
              Cancel
            </v-btn>
            <v-spacer></v-spacer>

            <v-switch 
              class="mr-3"
              inset 
              v-model="draft" 
              label="Save as draft"
            ></v-switch>

            <v-btn
              class="white--text"
              color="primary"
              depressed
              @click.stop="save"
            >Save</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { createComponent, computed, ref } from '@vue/composition-api'
import { fromNow, dateFromDateOrTimestamp } from '~/utils/date'
import { EditingPayload, Tag } from '~/store/types'

export default createComponent({
  setup (props, { root }) {
    const dateMenu = ref(false)

    const tagTypes = computed((): string => root.$store.getters['log/tagTypes'])
    const editingId = computed((): Tag[] => root.$store.getters['log/editingId'])
    const editingPayload = computed((): EditingPayload => root.$store.getters['log/editingPayload'])
    
    const draft = computed({
      get: () => editingPayload.value.draft,
      set: (val) => root.$store.commit('log/updateEntry', { draft: val })
    })
    const tag = computed({
      get: () => editingPayload.value.tag,
      set: (val) => root.$store.commit('log/updateEntry', { tag: val })
    })
    const datepickerDate = computed({
      get: () => dateFromDateOrTimestamp(editingPayload.value.published).toISOString().substr(0, 10),
      set: (val) => root.$store.commit('log/updateEntry', { published: new Date(val) })
    })
    const title = computed({
      get: () => editingPayload.value.title,
      set: (val) => root.$store.commit('log/updateEntry', { title: val })
    })
    const markdown = computed({
      get: () => editingPayload.value.markdown,
      set: (val) => root.$store.commit('log/updateEntry', { markdown: val })
    })

    const publishedFromNow = computed(() => fromNow(editingPayload.value.published))

    const cancel = () => root.$store.commit('log/cancelEdit')
    const save = async () => root.$store.dispatch('log/saveEntry')
    const remove = async () => root.$store.dispatch('log/removeEntry')

    return {
      dateMenu,
      tagTypes,
      editingId,
      editingPayload,
      draft,
      tag,
      datepickerDate,
      title,
      markdown,
      publishedFromNow,
      cancel,
      save,
      remove
    }
  }
})
</script>

<style lang="scss">
.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--box .v-select__selections, 
.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--enclosed .v-select__selections {
  min-height: auto;
}
.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot textarea {
  line-height: 1.5rem;
}
</style>