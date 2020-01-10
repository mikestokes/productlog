import { firestoreAction } from 'vuexfire'
import { log } from '../firebase/collections'

// TODO
// export const types = {
//   ADD_REQUEST
// }

export const state = () => ({
  log: null
})

export const getters = {
  log (state) {
    return state.log
  },
  entries (state) {
    return state.log.entries
  }
}

export const mutations = {
  add (state, entry) {
    state.entries.push(entry)
  }
}

export const actions = {
  subscribeToLog: firestoreAction(async ({ bindFirestoreRef }, id) => {
    await bindFirestoreRef('log', log(id), { wait: true })
  }),

  async add ({ commit }, entry) {
    commit('add', entry)
  }
}
