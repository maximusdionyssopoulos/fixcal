import { Head, Link, router } from "@inertiajs/react";
import Calendar from "./Calendar";
import { CalendarType } from "./types";
import { MoveLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";

interface ShowProps {
  calendar: CalendarType;
  flash: { notice?: string };
}

export default function Show({ calendar, flash }: ShowProps) {
  if (!calendar) {
    return (
      <div className="mx-auto max-w-xl w-full grow p-8 space-y-4 text-center rounded-lg mt-8 flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-3xl font-semibold text-red-500">Not Found</h1>
        <h2 className="text-xl font-medium">This calendar has been deleted.</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          The item you're looking for no longer exists or has been permanently
          removed.
        </p>
        <Link
          href="/calendars"
          className={cn(
            buttonVariants({ variant: "outline", size: "default" }),
            "mt-4",
          )}
        >
          Return to Calendars
        </Link>
      </div>
    );
  }

  if (flash.notice) {
    toast.success(flash.notice);
  }
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
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
              )}
            >
              Edit Calendar
            </Link>
            {/* TODO: Add a confirmation here */}
            <Link
              href={`/calendars/${calendar.public_id}`}
              as="button"
              method="delete"
              className={cn(
                buttonVariants({
                  variant: "destructive",
                  size: "default",
                  className: "bg-red-500 hover:bg-red-600 ",
                }),
              )}
            >
              Delete
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
