<template>
  <div class="fill-parent-height">
    <v-toolbar color="white" flat>
      <v-btn icon @click.stop="cancel">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="font-weight-bold">
        Edit Post
      </v-toolbar-title>
    </v-toolbar>

    <v-container class="d-flex flex-column justify-start pb-0 height-less-toolbar">
      <!-- Title -->
      <v-row class="flex-grow-0 flex-shrink-1">
        <v-col>
          <v-text-field 
            v-model="title"
            outlined
            hide-details
            label="Title of the post"
            class="headline"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Tag and Publish Date -->
      <v-row class="flex-grow-0 flex-shrink-1">
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
                x-small
                text-color="white"
                class="overline"
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
      <v-row class="flex-grow-1 flex-shrink-0">
        <v-col>
          <v-textarea
            no-resize
            outlined
            hide-details
            label="Post content (Markdown)"
            class="textarea-post-editor"
            v-model="markdown"
          ></v-textarea>
        </v-col>
      </v-row>

      <!-- Pinned -->
      <v-row class="flex-grow-0 flex-shrink-1">
        <v-col>
          <v-switch 
            dense
            hide-details
            v-model="pinned"
          >
            <template v-slot:label>
              <strong>Pin&nbsp;</strong> post to top
            </template>
          </v-switch>
        </v-col>
      </v-row>

      <!-- Draft -->
      <v-row class="flex-grow-0 flex-shrink-1">
        <v-col>
          <v-switch 
            dense
            hide-details
            v-model="draft" 
          >
            <template v-slot:label>
              Save post as<strong>&nbsp;draft</strong>
            </template>
          </v-switch>
        </v-col>
      </v-row>
      
  
      <!-- Toolbar -->
      <v-row class="flex-grow-0 flex-shrink-1">
        <v-col>
          <v-divider class="mb-2"></v-divider>
          <v-card-actions>
            <v-btn
              depressed
              class="grey--text"
              color="grey lighten-3"
              @click.stop="cancel"
            >Cancel</v-btn>
            <v-btn
              text
              color="red"
              @click.stop="remove"
            >
              <v-icon left>mdi-trash-can-outline</v-icon> Delete
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="white--text"
              color="primary"
              depressed
              @click.stop="save"
            >Save Post</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'
import { fromNow, dateFromDateOrTimestamp } from '~/utils/date'
import { EditingPayload, Tag } from '~/store/types'

export default defineComponent({
  setup (props, { root }) {
    const dateMenu = ref(false)

    const tagTypes = computed((): string => root.$store.getters['log/tagTypes'])
    const editingId = computed((): Tag[] => root.$store.getters['log/editingId'])
    const editingPayload = computed((): EditingPayload => root.$store.getters['log/editingPayload'])
    
    const pinned = computed({
      get: () => editingPayload.value.pinned,
      set: (val) => root.$store.commit('log/updateEntry', { pinned: val })
    })
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
      pinned,
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

<style lang="scss" scoped>
.fill-parent-height {
  box-sizing: border-box;
  height: 100%;
}
.height-less-toolbar {
  height: calc(100vh - 56px);
}
.v-input--selection-controls {
  margin-top: 0;
}
.v-chip.v-size--x-small {
  height: 18px;
  border-radius: 9px;
}
</style>

<style lang="scss">
.textarea-post-editor {
  box-sizing: border-box;
  height: 100%;
  font-family: Monaco, monospace;
  font-size: 13px;
  .v-input__control, 
  .v-input__slot, 
  .v-text-field__slot {
    height: 100% !important;
  }
}
.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--box .v-select__selections, 
.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--enclosed .v-select__selections {
  min-height: auto;
}
.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot textarea {
  height: 100%;
  line-height: 1.5rem;
}
</style>