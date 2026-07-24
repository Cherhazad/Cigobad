import {CalendarDate} from '@internationalized/date'

export const calendarDateToDate = (calendarDate: CalendarDate): Date => {
    return new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day)
}

export const dateToCalendarDate = (date: Date | string): CalendarDate => {
    const d = new Date(date)
    return new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate())
}