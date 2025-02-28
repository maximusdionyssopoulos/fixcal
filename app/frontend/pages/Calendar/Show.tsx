import { Head, Link } from "@inertiajs/react";
import Calendar from "./Calendar";
import { CalendarType } from "./types";
import { MoveLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface ShowProps {
  calendar: CalendarType;
}

export default function Show({ calendar }: ShowProps) {
  return (
    <>
      <Head title={`Calendar #${calendar.public_id}`} />
      <div className="sticky top-0 pt-2 z-20 backdrop-blur-xl w-full border-b dark:border-neutral-600">
        <div className="flex flex-row gap-6 justify-between pb-2 max-w-5xl px-6 mx-auto">
          <Link
            href="/calendars"
            className={cn(buttonVariants({ variant: "link", size: "lg" }))}
          >
            <MoveLeft /> All Calendars
          </Link>
          <div className="space-x-2">
            <Link
              href={`/calendars/${calendar.public_id}/edit`}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Edit this calendar
            </Link>
            {/* TODO: Add a confirmation here */}
            <Link
              href={`/calendars/${calendar.public_id}`}
              as="button"
              method="delete"
              className={cn(
                buttonVariants({
                  variant: "destructive",
                  size: "lg",
                  className: "bg-red-500 hover:bg-red-600 ",
                }),
              )}
            >
              Destroy this calendar
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto w-full px-6">
        <Calendar calendar={calendar} />
      </div>
    </>
  );
}
