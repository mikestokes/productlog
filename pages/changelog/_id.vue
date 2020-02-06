<template>
  <v-container>
    <v-row 
      justify="center"
      align="center"
    >
      <v-col
        md="8"
        sm="12"
        xs="12"
      >
        <AddPostButton/>
       
        <PostCard
          v-for="(entry, index) in entries" :key="index"
          :id="entry.id"
          :draft="entry.draft"
          :published="entry.published"
          :title="entry.title"
          :markdown="entry.markdown"
          :html="entry.html"
          :tag="entry.tag"
        />
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent, computed, PropType, onServerPrefetch } from '@vue/composition-api'
import AddPostButton from '~/components/AddPostButton.vue'
import PostCard from '~/components/PostCard.vue'
import { useCollection } from '~/use/use-collection'
import { Post, Log } from '~/store/types'

export default createComponent({
  components: {
    AddPostButton,
    PostCard
  },

  setup (props, { root }) {
    const data = useCollection()

    onServerPrefetch(async () => {
      // Server prefetch is guaranteed to have an unique context
      // result.value = await callApi(ssrContext.someId);
      console.log('_ID::onServerPrefetch', root.$route.params.id)
      await root.$store.dispatch('log/subscribeToLog', root.$route.params.id)
    })
    
    const log = computed((): Log => root.$store.getters['log/log'])
    const entries = computed((): Post[] => root.$store.getters['log/entries'])

    return {
      log,
      entries,
      data
    }
  }


  
  // async fetch ({ store, params }) {
  //   // Bind Firestore on the server for SSR
  //   await store.dispatch('log/subscribeToLog', params.id)
  // },

  // async mounted () {
  //   // Rebind Firestore on the client
  //   if (process.client) {
  //     await this.$store.dispatch('log/subscribeToLog', this.$route.params.id)
  //   }
  // }
})
</script>
