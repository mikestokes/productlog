import dayjs from 'dayjs'
import { isToday } from 'date-fns'

export const fromNow = val => {
  const jsDate = dateFromDateOrTimestamp(val)
  const dayjsDate = dayjs(jsDate)

  return isToday(jsDate) ? 'Today' : dayjsDate.fromNow()
}

export const dateFromDateOrTimestamp = val => {
  let dayjsDate

  if (val === null) {
    dayjsDate = dayjs(new Date())
  } else if (typeof val === 'number') {
    dayjsDate = dayjs.unix(val)
  } else if (typeof val === 'object' && val.seconds) {
    dayjsDate = dayjs.unix(val.seconds)
  } else if (val instanceof Date) {
    dayjsDate = dayjs(val)
  }

  return dayjsDate.toDate()
}
