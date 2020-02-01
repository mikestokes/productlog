import dayjs from 'dayjs'
import { isToday } from 'date-fns'
import { Timestamp } from '~/firebase'

export const fromNow = (val: any): string => {
  const jsDate = dateFromDateOrTimestamp(val)
  const dayjsDate = dayjs(jsDate)

  return isToday(jsDate) ? 'Today' : dayjsDate.fromNow()
}

export const dateFromDateOrTimestamp = (val: any): Date => {
  let dayjsDate

  if (typeof val === 'number') {          // Unix (seconds since epoch)
    dayjsDate = dayjs.unix(val)
  } else if (val instanceof Timestamp) {  // Firestore Timestamp
    dayjsDate = dayjs.unix(val.seconds)
  } else if (val instanceof Date) {       // JavaScript Date
    dayjsDate = dayjs(val)
  } else {                                // Falsey  
    dayjsDate = dayjs(new Date())
  }

  return dayjsDate.toDate()
}
