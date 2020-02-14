<template>
  <v-card
    outlined
    class="mx-auto card-post border-left-feature"
    max-width="720"
  >
    <v-card-title>
      <!-- <v-avatar left size="36" class="log-avatar">
        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"/>
      </v-avatar> -->
      <div class="headline">
        {{ _title }}
      </div>
      <v-spacer />
      <span class="overline blue-grey--text text--lighten-2">
        {{ _published }}
      </span>
      <v-btn
        class="link-share"
        color="blue-grey lighten-3"
        text
        icon
        small
        @click.stop="shareClick"
      >
        <v-icon left>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <div v-html="_html"></div>
    </v-card-text>
    <v-card-actions>
      <v-card-subtitle>
        <!-- <v-chip
          small
          class="mr-2 overline"
          text-color="white"
          :color="_tagColor"
        >
          {{ _tagName }}
        </v-chip> -->
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
</template>

<script lang="ts">
import { createComponent, computed, PropType } from '@vue/composition-api'
import { Tag, EditingPayload } from '~/store/types'
import { fromNow } from '~/utils/date'
import { Timestamp } from '~/firebase'

export default createComponent({
  props: {
    id: {
      type: String,
      required: false     // on initial load, won't exist
    },
    draft: Boolean,
    published: Object,
    title: String,
    markdown: String,
    html: String,
    tag: Object as PropType<Tag>
  },

  setup (props, { root  }) {
    const canEditLog = computed((): boolean => root.$store.getters['log/canEditLog'])
    const editing = computed((): boolean => root.$store.getters['log/editing'])
    const editingId = computed((): string => root.$store.getters['log/editingId'])
    const editingPayload = computed((): EditingPayload => root.$store.getters['log/editingPayload'])
    const isEditing = computed(() => editing.value && editingId.value === props.id)
    const _title = computed(() => isEditing.value ? editingPayload.value.title : props.title)
    const _html = computed(() => isEditing.value ? editingPayload.value.html : props.html)
    const _tagColor = computed(() => isEditing.value ? editingPayload.value.tag?.color : props.tag?.color)
    const _tagName = computed(() => isEditing.value ? editingPayload.value.tag?.name : props.tag?.name)
    const _published = computed(() => fromNow(isEditing.value ? editingPayload.value.published : props.published))

    const editClick = () => root.$store.commit('log/editId', props.id)
    const shareClick = () => {}

    return {
      canEditLog,
      editing,
      editingId,
      editingPayload,
      isEditing,
      _title,
      _html,
      _tagColor,
      _tagName,
      _published,
      editClick
    }
  }
})
</script>

<style lang="scss" scoped>
.border-left-feature {
  border-left: solid 10px red !important;
}
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
.link-share {
  margin-left: 16px;
}
</style>
