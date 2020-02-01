import { MutationTree } from 'vuex'
import { vuexfireMutations } from 'vuexfire'

export const state = () => ({
})

export type RootState = ReturnType<typeof state>

export const mutations : MutationTree<RootState> = {
  // Must export vuexfire mutations from root store not module, see:
  // https://github.com/vuejs/vuefire/tree/master/packages/vuexfire
  ...vuexfireMutations
}
