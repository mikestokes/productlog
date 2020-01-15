<template>
  <v-card 
    outlined
    class="mx-auto"
    max-width="640"
  >
    <v-card-title>
      <div class="display-1">
        {{ isEditing ? editingPayload.title : title }}
      </div>
      <v-spacer />
      <span 
        class="body-1"
        v-if="draft"
      >
        Draft
      </span>
    </v-card-title>
    <v-card-subtitle >
      <v-chip
        small
        class="mr-2 overline"
        text-color="white"
        :color="isEditing ? editingPayload.tag.color : tag.color"
      >
        {{ isEditing ? editingPayload.tag.name : tag.name }}
      </v-chip>
      <span class="overline blue-grey--text text--lighten-2">
        {{ publishedFromNow }}
      </span>
    </v-card-subtitle>
    <v-card-text >
      <div v-html="isEditing ? editingPayload.html : html"></div>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        text
        v-if="canEditLog"
        @click.stop="editClick"
      >
        <v-icon left>mdi-pencil</v-icon>
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { fromNow } from '~/utils/date'

export default {
  props: {
    id: String,
    draft: Boolean,
    published: Object,
    title: String,
    markdown: String,
    html: String,
    tag: Object
  },

  computed: {
    ...mapGetters({
      canAddLog: 'log/canAddLog',
      canEditLog: 'log/canEditLog',
      editing: 'log/editing',
      editingId: 'log/editingId',
      editingPayload: 'log/editingPayload'
    }),

    isEditing() {
      return this.editing && this.editingId === this.id
    },

    publishedFromNow () {
      return fromNow(this.isEditing ? this.editingPayload.published : this.published)
    }
  },

  methods: {
    ...mapMutations({
      editId: 'log/editId'
    }),

    editClick () {
      this.editId(this.id)
    }
  }
}
</script>

<style lang="scss">
.v-card__title + .v-card__subtitle {
  margin-top: -6px;
}
</style>