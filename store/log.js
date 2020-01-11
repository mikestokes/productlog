import { firestoreAction } from 'vuexfire'
import { log } from '../firebase/collections'

// TODO
// export const types = {
//   ADD_REQUEST
// }

export const state = () => ({
  log: null,
  editingId: null,
  tagTypes: [{
    name: 'Announcement',
    color: '#7CB342FF'
  }, {
    name: 'Feature',
    color: '#0288D1FF'
  }, {
    name: 'Fix',
    color: '#D81B60FF'
  }]
})

export const getters = {
  tagTypes (state) {
    return state.tagTypes
  },
  log (state) {
    return state.log
  },
  entries (state) {
    return state.log.entries
  },
  canAddLog (state) {
    return true
  },
  canEditLog (state) {
    return true
  },
  editingId (state) {
    return state.editingId
  }
}

export const mutations = {
  editId (state, id) {
    state.editingId = id
  },
  cancelEdit (state) {
    state.editingId = null
  },
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
