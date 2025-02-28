import { Head, Link } from "@inertiajs/react";
import Form from "./Form";
import { CalendarType } from "./types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EditProps {
  calendar: CalendarType;
}

export default function Edit({ calendar }: EditProps) {
  return (
    <>
      <Head title="Editing calendar" />
      <div className="mx-auto flex flex-col max-w-5xl w-full gap-4 grow px-6">
        <h1 className="text-xl font-medium">Update calendar url</h1>
        <p className="text-sm text-muted-foreground">
          Update the url to generate the calendar from. Your calendar will
          automatically be re-generated.
        </p>
        <Link
          href={`/calendars/${calendar.public_id}`}
          className={cn(
            buttonVariants({
              variant: "link",
              size: "default",
              className: "p-0 justify-start",
            }),
          )}
        >
          Show this calendar
        </Link>
        <Form
          url={calendar.url}
          onSubmit={(form) => {
            form.transform((data) => ({ calendar: data }));
            form.patch(`/calendars/${calendar.public_id}`);
          }}
          submitText="Update Calendar URL"
        />
      </div>
    </>
  );
}
