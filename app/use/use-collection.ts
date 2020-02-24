import { ref, onServerPrefetch } from '@vue/composition-api'

export const useCollection = () => {
  const result = ref(0)

  onServerPrefetch(async () => {
    // Server prefetch is guaranteed to have an unique context
    // result.value = await callApi(ssrContext.someId);
  result.value =  1;
  })

  return {
    result
  }
}
