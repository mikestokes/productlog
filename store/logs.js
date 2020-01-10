import { firestoreAction } from 'vuexfire'
import { log, entries } from '../firebase/collections'

// TODO
// export const types = {
//   ADD_REQUEST
// }

export const state = () => ({
  log: {},
  entries: []
})

export const mutations = {
  add (state, entry) {
    state.entries.push(entry)
  }
}

export const actions = {
  subscribeToLog: firestoreAction(({ bindFirestoreRef }, id) => {
    return bindFirestoreRef('log', log(id))
  }),

  subscribeToLogEntries: firestoreAction(({ bindFirestoreRef }, id) => {
    return bindFirestoreRef('entries', entries(id))
  }),

  async add ({ commit }, entry) {
    commit('add', entry)
  }
}
