export interface CalendarType {
  id: number
  url: string
  data: string
  public_id: string
  user_id: string
}

export type CalendarFormType = Omit<CalendarType, 'id'>
