import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { firestoreAction } from 'vuexfire'
import { log, entries } from '../firebase/collections'
import { RootState } from '~/store'
import { LogState } from './types'
import { emptyEditingPayload } from './types'
import MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import twemoji from 'twemoji'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

// NOTE: Nuxt automatically wires up state modules for each file
// in the store folder.

const md  = new MarkdownIt('default', {
  html: false,
  xhtmlOut: false,
  typographer: true,
  linkify: true,
  breaks: false,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
}).use(emoji)

md.renderer.rules.emoji = function(token, idx) {
  return twemoji.parse(token[idx].content)
}


export type LogModuleState = ReturnType<() => LogState>

export const state = (): LogState => ({
  log: undefined,
  entries: [],
  editing: false,
  editingId: undefined,
  editingPayload: emptyEditingPayload(),
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
    state.editingPayload = emptyEditingPayload()
  },
  newEntry (state) {
    state.editing = true
    state.editingId = undefined
    state.editingPayload = {
      draft: false,
      pinned: false,
      published: new Date(),
      title: 'Title',
      markdown: '# Heading',
      html: md.render('# Heading'),
      tag: { 
        ...state.tagTypes[0] 
      }
    }
  },
  updateEntry (state, payload) {
    state.editingPayload = {
      ...state.editingPayload,
      ...payload,
      html: md.render(payload.markdown || state.editingPayload.markdown)
    }
  }
}

export const actions: ActionTree<LogModuleState, RootState> = {
  subscribeToLog: firestoreAction(async ({ bindFirestoreRef }, id) => {
    await bindFirestoreRef('log', log(id), { wait: true })
    await bindFirestoreRef('entries', entries(id), { wait: true })
  }),
  async saveEntry ({ state, commit }) {
    if (!state.log?.id) 
      return

    if (state.editingId) {
      await entries(state.log?.id).doc(state.editingId).update(state.editingPayload)
    } else {
      await entries(state.log?.id).add(state.editingPayload)
    }
    commit('cancelEdit')
  },
  async removeEntry ({ state, commit }) {
    if (!state.editingId) 
      return
    if (!state.log?.id) 
      return

    try {
      await entries(state.log?.id).doc(state.editingId).delete()
    } catch (e) {
      console.error(e)
      return
    }

    commit('cancelEdit')
  }
}
