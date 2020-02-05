import { firebase } from '@firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  if (process.client) {
    firebase.analytics() // uses window
  }
}

const { Timestamp } = firebase.firestore
export { Timestamp }

export const db = firebase.firestore()
