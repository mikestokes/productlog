<template>
  <div>
    <v-toolbar color="white" flat>
      <v-btn icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="font-weight-bold">
        Edit Post
      </v-toolbar-title>
    </v-toolbar>

  <v-container>
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
    
    <v-row>
      <v-col cols="6">
        <v-combobox
          v-model="select"
          :items="items"
          label="Tag this post as an"
          hide-details
          outlined
          chips
        >
          <template v-slot:selection="data">
            <v-chip
              small
              color="primary"
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
              @click.stop="data.parent.selectedIndex = data.index"
              @click:close="data.parent.selectItem(data.item)"
            >
              {{ data.item }}
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
    <!-- </v-row>

    <v-row> -->
      <v-col cols="6">
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="computedDateFormattedDatefns"
              clearable
              readonly
              outlined
              hide-details
              label="Publish the post on"
              v-on="on"
              @click:clear="date = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @change="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-textarea
          clearable
          no-resize
          outlined
          rows="15"
          label="Post content (Markdown)"
          style="font-family: Monaco, monospace; font-size: 14px;"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        text
        color="red"
      >
        Delete
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        text
        color="grey"
      >
        Cancel
      </v-btn>
      <v-btn
        class="white--text"
        color="deep-purple accent-4"
        depressed
      >Save</v-btn>
    </v-card-actions>
  </v-container>
  </div>
</template>

<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

export default {
  data () {
    return {
      menu2: false,
      title: "High school reunion",
      select: 'Announcement',
      date: new Date().toISOString().substr(0, 10),
      items: [
        'Announcement',
        'Fix',
        'Feature'
      ]
    }
  },

  computed: {
      computedDateFormattedDatefns () {
        return this.date //? format(parseISO(this.date), 'dddd, MMMM Do YYYY') : ''
      }
    }
}
</script>

<style lang="scss">
.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--box .v-select__selections, .v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--enclosed .v-select__selections {
  min-height: auto;
}
</style>