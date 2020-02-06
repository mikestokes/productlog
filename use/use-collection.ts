import { ref, onServerPrefetch } from '@vue/composition-api'

export const useCollection = () => {
  const result = ref(0)

  onServerPrefetch(async () => {
    // Server prefetch is guaranteed to have an unique context
    // result.value = await callApi(ssrContext.someId);
  console.log('onServerPrefetch')
  result.value =  1;
  })

  console.log('useCollection broseph')

  return {
    result
  }
}
