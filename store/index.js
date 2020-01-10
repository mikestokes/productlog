import { vuexfireMutations } from 'vuexfire'

export const state = () => ({
})

export const mutations = {
  // Must export vuexfire mutations from root store not module, see:
  // https://github.com/vuejs/vuefire/tree/master/packages/vuexfire
  ...vuexfireMutations
}
