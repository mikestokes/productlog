import marked from 'marked'
import { firestoreAction } from 'vuexfire'
import { log, entries } from '../firebase/collections'
import { Timestamp } from '../firebase'

// TODO
// export const types = {
//   ADD_REQUEST
// }

export const state = () => ({
  log: null,
  entries: [],
  editing: false,
  editingId: null,
  editingPayload: {
    draft: null,
    published: null,
    title: null,
    markdown: null,
    html: null,
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
    return state.entries
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
    const entry = state.entries.find(el => el.id === id)
    if (!entry) 
      return

    state.editing = true
    state.editingId = id
    state.editingPayload = {
      ...entry
    }
  },
  cancelEdit (state) {
    state.editing = false
    state.editingId = null
    state.editingPayload = {
      draft: null,
      published: null,
      title: null,
      markdown: null,
      html: null,
      tag: null
    }
  },
  newEntry (state) {
    state.editing = true
    state.editingId = null
    state.editingPayload = {
      draft: true,
      published: new Date(),
      title: 'Title',
      markdown: '# Heading',
      html: marked('# Heading'),
      tag: { 
        ...state.tagTypes[0] 
      }
    }
  },
  updateEntry (state, payload) {
    state.editingPayload = {
      ...state.editingPayload,
      ...payload,
      html: marked(payload.markdown || state.editingPayload.markdown)
    }
  }
}

export const actions = {
  subscribeToLog: firestoreAction(async ({ bindFirestoreRef }, id) => {
    await bindFirestoreRef('log', log(id), { wait: true })
    await bindFirestoreRef('entries', entries(id), { wait: true })
  }),
  async saveEntry ({ state }) {
    if (state.editingId) {
      await entries(state.log.id).doc(state.editingId).update(state.editingPayload)
    } else {
      await entries(state.log.id).add(state.editingPayload)
    }
    commit('cancelEdit')
  },
  async removeEntry ({ state, commit }) {
    if (!state.editingId) 
      return

    try {
      await entries(state.log.id).doc(state.editingId).delete()
    } catch (e) {
      console.error(e)
      return
    }

    commit('cancelEdit')
  }
}
