import { db } from './index'

export const log = (id: string) => {
  return db.collection('logs').doc(id)
}

export const entries = (id: string) => {
  return db.collection('logs').doc(id).collection('entry')
}
