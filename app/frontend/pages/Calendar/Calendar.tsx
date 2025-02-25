import { CalendarType } from './types'

interface CalendarProps {
  calendar: CalendarType
}

export default function Calendar({ calendar }: CalendarProps) {
  return (
    <div>
      <p>
        <strong>Url:</strong>
        {calendar.url?.toString()}
      </p>
      <p>
        <strong>Data:</strong>
        {calendar.data?.toString()}
      </p>
      <p>
        <strong>Public:</strong>
        {calendar.public_id?.toString()}
      </p>
      <p>
        <strong>User:</strong>
        {calendar.user_id?.toString()}
      </p>
    </div>
  )
}
