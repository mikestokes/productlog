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
import { createComponent, computed, PropType } from '@vue/composition-api'
import { Tag, EditingPayload } from '~/store/types'
import { fromNow } from '~/utils/date'
import { Timestamp } from '~/firebase'

export default createComponent({
  props: {
    id: String,
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
    const _title = computed(() => editing.value ? editingPayload.value.title : props.title)
    const _html = computed(() => editing.value ? editingPayload.value.html : props.html)
    const _tagColor = computed(() => editing.value ? editingPayload.value.tag?.color : props.tag?.color)
    const _tagName = computed(() => editing.value ? editingPayload.value.tag?.name : props.tag?.name)
    const _published = computed(() => editing.value ? editingPayload.value.published : props.published)

    const editClick = () => root.$store.commit('log/editId', props.id)
    
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