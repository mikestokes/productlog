<template>
  <v-card
    elevation="0"
    class="ma-1"
  >
    <v-row>
      <v-col class="py-0">
        <v-text-field 
          v-model="title"
          full-width
          single-line
          required
          hide-details
          prepend-inner-icon="mdi-close"
          class="title font-weight-bold"
        ></v-text-field>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col class="py-0">
        <v-combobox
          v-model="select"
          :items="items"
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
              <!-- <v-avatar class="accent white--text" left>
                {{ data.item.slice(0, 1).toUpperCase() }}
              </v-avatar> -->
              {{ data.item }}
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="py-0">
        <v-textarea
          clearable
          no-resize
          rows="15"
          style="font-family: Monaco, monospace"
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
  </v-card>
</template>

<script>

export default {
  data () {
    return {
      title: "High school reunion",
      select: 'Announcement',
      items: [
        'Announcement',
        'Fix',
        'Feature'
      ]
    }
  }
}
</script>
