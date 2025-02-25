import { Head, Link } from '@inertiajs/react'
import Form from './Form'
import { CalendarType } from './types'

interface NewProps {
  calendar: CalendarType
}

export default function New({ calendar }: NewProps) {
  return (
    <>
      <Head title="New calendar" />

      <h1>New calendar</h1>

      <Form
        calendar={calendar}
        onSubmit={(form) => {
          form.transform((data) => ({ calendar: data }))
          form.post('/calendars')
        }}
        submitText="Create Calendar"
      />

      <br />

      <div>
        <Link href="/calendars">Back to calendars</Link>
      </div>
    </>
  )
}
