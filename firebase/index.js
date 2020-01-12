import { firebase } from '@firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig.js'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  if (process.client) {
    firebase.analytics() // uses window
  }
}

const { TimeStamp } = firebase.firestore
export { TimeStamp }

export const db = firebase.firestore()
