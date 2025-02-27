import { Head, Link } from "@inertiajs/react";
import Calendar from "./Calendar";
import { CalendarType } from "./types";

interface ShowProps {
  calendar: CalendarType;
}

export default function Show({ calendar }: ShowProps) {
  return (
    <>
      <Head title={`Calendar #${calendar.public_id}`} />
      <div className="max-w-5xl p-6">
        <h1>Calendar #{calendar.public_id}</h1>

        <Calendar calendar={calendar} />

        <div>
          <Link href={`/calendars/${calendar.public_id}/edit`}>
            Edit this calendar
          </Link>
          <Link href="/calendars">Back to calendars</Link>

          <br />

          <Link
            href={`/calendars/${calendar.public_id}`}
            as="button"
            method="delete"
          >
            Destroy this calendar
          </Link>
        </div>
      </div>
    </>
  );
}
