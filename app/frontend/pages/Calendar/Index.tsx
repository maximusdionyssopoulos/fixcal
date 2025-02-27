import { Head, Link } from "@inertiajs/react";
import Calendar from "./Calendar";
import { CalendarType } from "./types";

interface IndexProps {
  calendars: CalendarType[];
  // flash: { notice?: string }
}

export default function Index({ calendars }: IndexProps) {
  return (
    <>
      <Head title="Calendars" />

      <div>
        <div className="inline-flex gap-4">
          <h1>Calendars</h1>
          <Link href="/">New calendar</Link>
        </div>
        <div>
          {calendars.map((calendar) => (
            <div key={calendar.public_id}>
              <p>
                <Link href={`/calendars/${calendar.public_id}`}>
                  Show this calendar
                </Link>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
