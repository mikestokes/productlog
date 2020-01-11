import { firestoreAction } from 'vuexfire'
import { log } from '../firebase/collections'

// TODO
// export const types = {
//   ADD_REQUEST
// }

export const state = () => ({
  log: null,
  editing: false,
  editingId: null,
  editingPayload: {
    id: null,
    draft: null,
    published: null,
    title: null,
    content: null,
    tag: null
  },
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
  editing (state) {
    return state.editing
  },
  editingId (state) {
    return state.editingId
  },
  editingPayload (state) {
    return state.editingPayload
  }
}

export const mutations = {
  editId (state, id) {
    state.editing = true
    state.editingId = id
    state.editingPayload = {
      ...state.log.entries[id]
    }
  },
  cancelEdit (state) {
    state.editing = false
    state.editingId = null
    state.editingPayload = {
      id: null,
      draft: null,
      published: null,
      title: null,
      content: null,
      tag: null
    }
  },
  newEntry (state) {
    state.editing = true
    state.editingId = null
    state.editingPayload = {
      id: null,
      draft: true,
      published: new Date(),
      title: 'Title',
      content: 'Content',
      tag: state.tagTypes[0]
    }
  },
  updateEntry (state, payload) {
    state.editingPayload = {
      ...state.editingPayload,
      ...payload
    }
  }
}

export const actions = {
  subscribeToLog: firestoreAction(async ({ bindFirestoreRef }, id) => {
    await bindFirestoreRef('log', log(id), { wait: true })
  }),
  // async add ({ commit }, entry) {
  //   commit('add', entry)
  // }
}
