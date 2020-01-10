import { firebase } from '@firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig.js'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
}

export const db = firebase.firestore()
