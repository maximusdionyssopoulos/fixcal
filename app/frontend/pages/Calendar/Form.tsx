import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { CalendarFormType, CalendarType } from './types'

// Temporary fix for InertiaFormProps not being exported from @inertiajs/react
type InertiaFormProps<TForm extends Record<string, any>> = ReturnType<typeof useForm<TForm>>

interface FormProps {
  calendar: CalendarType
  onSubmit: (form: InertiaFormProps<CalendarFormType>) => void
  submitText: string
}

export default function Form({ calendar, onSubmit, submitText }: FormProps) {
  const form = useForm<CalendarFormType>({
    url: calendar.url,
    data: calendar.data,
    public_id: calendar.public_id,
    user_id: calendar.user_id,
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label style={{ display: 'block' }} htmlFor="url">
          Url
        </label>
        <input
          type="text"
          name="url"
          id="url"
          value={data.url}
          onChange={(e) => setData('url', e.target.value)}
        />
        {errors.url && (
          <div style={{ color: 'red' }}>{errors.url}</div>
        )}
      </div>
      <div>
        <label style={{ display: 'block' }} htmlFor="datum">
          Data
        </label>
        <input
          type="text"
          name="datum"
          id="datum"
          value={data.data}
          onChange={(e) => setData('data', e.target.value)}
        />
        {errors.data && (
          <div style={{ color: 'red' }}>{errors.data}</div>
        )}
      </div>
      <div>
        <label style={{ display: 'block' }} htmlFor="public">
          Public
        </label>
        <input
          type="text"
          name="public"
          id="public"
          value={data.public_id}
          onChange={(e) => setData('public_id', e.target.value)}
        />
        {errors.public_id && (
          <div style={{ color: 'red' }}>{errors.public_id}</div>
        )}
      </div>
      <div>
        <label style={{ display: 'block' }} htmlFor="user">
          User
        </label>
        <input
          type="text"
          name="user"
          id="user"
          value={data.user_id}
          onChange={(e) => setData('user_id', e.target.value)}
        />
        {errors.user_id && (
          <div style={{ color: 'red' }}>{errors.user_id}</div>
        )}
      </div>
      <div>
        <button type="submit" disabled={processing}>
          {submitText}
        </button>
      </div>
    </form>
  )
}
