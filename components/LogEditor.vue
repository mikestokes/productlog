<template>
  <div>
    <v-toolbar color="white" flat>
      <v-btn icon @click.stop="cancelEdit">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="font-weight-bold">
        Edit Post
      </v-toolbar-title>
    </v-toolbar>

    <v-container class="d-flex flex-column">
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
            >
              Delete
            </v-btn>

            <v-btn
              text
              color="grey"
              @click.stop="cancelEdit"
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
            >Save</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { fromNow, dateFromDateOrTimestamp } from '~/utils/date'

export default {
  data () {
    return {
      dateMenu: false
    }
  },

  computed: {
    ...mapGetters({
      tagTypes: 'log/tagTypes',
      editingId: 'log/editingId',
      editingPayload: 'log/editingPayload'
    }),

    draft: {
      get () {
        return this.editingPayload.draft
      },
      set (val) {
        this.updateEntry({ draft: val })
      }
    },

    tag: {
      get () {
        return this.editingPayload.tag
      },
      set (val) {
        this.updateEntry({ tag: val })
      }
    },

    datepickerDate: {
      get () {
        // Vuetify requires just the date string
        return dateFromDateOrTimestamp(this.editingPayload.published).toISOString().substr(0, 10)
      },
      set (val) {
        this.updateEntry({ published: new Date(val) })
      }
    },

    title: {
      get () {
        return this.editingPayload.title
      },
      set (val) {
        this.updateEntry({ title: val })
      }
    },

    markdown: {
      get () {
        return this.editingPayload.markdown
      },
      set (val) {
        this.updateEntry({ markdown: val })
      }
    },

    publishedFromNow () {
      return fromNow(this.editingPayload.published)
    }
  },

  methods: {
    ...mapMutations({
      updateEntry: 'log/updateEntry',
      cancelEdit: 'log/cancelEdit'
    })
  }
}
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