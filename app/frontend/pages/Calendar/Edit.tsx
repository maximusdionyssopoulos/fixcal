import { Head, Link } from '@inertiajs/react'
import Form from './Form'
import { CalendarType } from './types'

interface EditProps {
  calendar: CalendarType
}

export default function Edit({ calendar }: EditProps) {
  return (
    <>
      <Head title="Editing calendar" />

      <h1>Editing calendar</h1>

      <Form
        calendar={calendar}
        onSubmit={(form) => {
          form.transform((data) => ({ calendar: data }))
          form.patch(`/calendars/${calendar.id}`)
        }}
        submitText="Update Calendar"
      />

      <br />

      <div>
        <Link href={`/calendars/${calendar.id}`}>Show this calendar</Link>
        {' | '}
        <Link href="/calendars">Back to calendars</Link>
      </div>
    </>
  )
}
