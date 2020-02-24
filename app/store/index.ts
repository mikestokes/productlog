import { MutationTree } from 'vuex'
import { vuexfireMutations } from 'vuexfire'
import { BaseState } from './types'


export type RootState = ReturnType<() => BaseState>

export const state = (): BaseState => ({
})

export const mutations : MutationTree<RootState> = {
  // Must export vuexfire mutations from root store not module, see:
  // https://github.com/vuejs/vuefire/tree/master/packages/vuexfire
  ...vuexfireMutations
}
