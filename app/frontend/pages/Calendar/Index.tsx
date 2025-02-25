import { Head, Link } from '@inertiajs/react'
import Calendar from './Calendar'
import { CalendarType } from './types'

interface IndexProps {
  calendars: CalendarType[]
  flash: { notice?: string }
}

export default function Index({ calendars, flash }: IndexProps) {
  return (
    <>
      <Head title="Calendars" />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Calendars</h1>
      <div>
        {calendars.map((calendar) => (
          <div key={calendar.id}>
            <Calendar calendar={calendar} />
            <p>
              <Link href={`/calendars/${calendar.id}`}>Show this calendar</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href="/calendars/new">New calendar</Link>
    </>
  )
}
