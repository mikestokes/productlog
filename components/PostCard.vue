<template>
<div>
  <v-card 
    outlined
    class="mx-auto"
    max-width="720"
  >
    <v-card-title>
      <!-- <v-avatar left size="36" class="log-avatar">
        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"/>
      </v-avatar> -->
      <div class="display-1">
        {{ _title }}
      </div>
      <v-spacer />
      <span 
        class="body-1"
        v-if="draft"
      >
        Draft
      </span>
    </v-card-title>
    <v-card-text >
      <div v-html="_html"></div>
    </v-card-text>
    <v-card-actions>
      <v-card-subtitle >
      <v-chip
        small
        class="mr-2 overline"
        text-color="white"
        :color="_tagColor"
      >
        {{ _tagName }}
      </v-chip>
      <span class="overline blue-grey--text text--lighten-2">
        {{ _published }}
      </span>
    </v-card-subtitle>
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
</div>
</template>

<script lang="ts">
import Vue, { PropType }  from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { fromNow } from '~/utils/date'
import { Tag, EditingPayload } from '~/store/types'
import { Timestamp } from '~/firebase'

export default Vue.extend({
  props: {
    id: String,
    draft: Boolean,
    published: Object,
    title: String,
    markdown: String,
    html: String,
    tag: Object as PropType<Tag>
  },

  computed: {
    ...mapGetters({
      canAddLog: 'log/canAddLog',
      canEditLog: 'log/canEditLog',
      editing: 'log/editing',
      editingId: 'log/editingId',
      editingPayload: 'log/editingPayload'
    }),

    isEditing (): boolean {
      return this.editing && this.editingId === this.id
    },

    _title () {
      return this.isEditing ? this.editingPayload.title : this.title
    },

    _html () {
      return this.isEditing ? this.editingPayload.html : this.html
    },

    _tagColor () {
      return this.isEditing ? this.editingPayload.tag.color : this.tag.color
    },

    _tagName () {
      return this.isEditing ? this.editingPayload.tag.name : this.tag.name
    },

    _published () {
      return fromNow(this.isEditing ? this.editingPayload.published : this.published)
    }
  },

  methods: {
    editClick () {
      this.$store.commit('log/editId', this.id)
    }
  }
})
</script>

<style lang="scss" scoped>
.v-card__title + .v-card__subtitle {
  margin-top: -6px;
}
.v-card__subtitle {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 8px;
}
.log-avatar {
  margin-right: 12px;
}
</style>