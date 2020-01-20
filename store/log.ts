import { GetterTree, ActionTree, MutationTree } from 'vuex'
import marked from 'marked'
import { firestoreAction } from 'vuexfire'
import { log, entries } from '../firebase/collections'
import { RootState } from '~/store'

// TODO
// export const types = {
//   ADD_REQUEST
// }

export interface EditingPayload {
  draft?: boolean,
  published?: Date,
  title?: string,
  markdown?: string,
  html?: string,
  tag?: Tag
}

export const emptyEditingPayload = {
  draft: undefined,
  published: undefined,
  title: undefined,
  markdown: undefined,
  html: undefined,
  tag: undefined
}

export interface Tag {
  color: string,
  name: string
}

export interface Post extends EditingPayload {
  id?: string
}

export interface Log {
  id?: string,
  title: string,
  website: string,
  entry: Post[]
}

export type LogModuleState = ReturnType<typeof state>

export const state = () => ({
  log: undefined as unknown as Log,
  entries: [] as Post[],
  editing: false,
  editingId: undefined,
  editingPayload: emptyEditingPayload as EditingPayload,
  tagTypes: [{
    name: 'Announcement',
    color: '#7CB342FF'
  }, {
    name: 'Feature',
    color: '#0288D1FF'
  }, {
    name: 'Fix',
    color: '#D81B60FF'
  }] as Tag[]
})

export const getters: GetterTree<LogModuleState, RootState> = {
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

export const mutations: MutationTree<LogModuleState> = {
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
    state.editingId = undefined
    state.editingPayload = emptyEditingPayload
  },
  newEntry (state) {
    state.editing = true
    state.editingId = undefined
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

export const actions: ActionTree<LogModuleState, RootState> = {
  subscribeToLog: firestoreAction(async ({ bindFirestoreRef }, id) => {
    await bindFirestoreRef('log', log(id), { wait: true })
    await bindFirestoreRef('entries', entries(id), { wait: true })
  }),
  async saveEntry ({ state, commit }) {
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
