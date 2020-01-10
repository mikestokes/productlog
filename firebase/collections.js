import { db } from './index'

export const log = id => {
  return db.collection('logs').doc(id)
}
