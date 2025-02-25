import { Head, Link } from '@inertiajs/react'
import Calendar from './Calendar'
import { CalendarType } from './types'

interface ShowProps {
  calendar: CalendarType
  flash: { notice?: string }
}

export default function Show({ calendar, flash }: ShowProps) {
  return (
    <>
      <Head title={`Calendar #${calendar.id}`} />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Calendar #{calendar.id}</h1>

      <Calendar calendar={calendar} />

      <div>
        <Link href={`/calendars/${calendar.id}/edit`}>Edit this calendar</Link>
        {' | '}
        <Link href="/calendars">Back to calendars</Link>

        <br />

        <Link
          href={`/calendars/${calendar.id}`}
          as="button"
          method="delete"
        >
          Destroy this calendar
        </Link>
      </div>
    </>
  )
}
