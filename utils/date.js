import dayjs from 'dayjs'
import { isToday } from 'date-fns'

export const fromNow = published => {
  const dayjsDate = typeof published === 'number' 
    ? dayjs.unix(published) 
    : dayjs(published)

  const jsDate = dayjsDate.toDate()

  return isToday(jsDate) ? 'Today' : dayjsDate.fromNow()
}