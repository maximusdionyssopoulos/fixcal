import { Head, Link } from "@inertiajs/react";
import { CalendarType } from "./types";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ExternalLink, Plus, Tag } from "lucide-react";
import StatusBadge from "@/components/ui/status-badge";
import { toast } from "sonner";

interface IndexProps {
  calendars: CalendarType[];
  flash: { notice?: string };
}

export default function Index({ calendars, flash }: IndexProps) {
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      return domain;
    } catch (e) {
      return url;
    }
  };

  const getTeamId = (url: string) => {
    try {
      const urlObj = new URL(url);
      const teamId = urlObj.searchParams.get("teamID");
      return teamId || "";
    } catch (e) {
      return "";
    }
  };

  if (flash.notice) {
    toast.success(flash.notice);
  }

  const CalendarView = calendars.map((calendar) => (
    <Link
      key={calendar.public_id}
      href={`/calendars/${calendar.public_id}`}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md group ransition-shadow bg-muted/50 dark:bg-muted p-4 flex flex-wrap gap-3 justify-between"
    >
      <div className="font-medium text-lg flex flex-col gap-0.5 group-hover:font-semibold">
        team-{getTeamId(calendar.url)}
        <div className="flex flex-wrap items-center text-sm gap-2 text-muted-foreground">
          <StatusBadge status="Completed">
            {" "}
            Matches ({calendar.completed_events.length})
          </StatusBadge>
          <StatusBadge status="Upcoming">
            {" "}
            Matches ({calendar.upcoming_events.length})
          </StatusBadge>
        </div>
      </div>
      <a
        href={calendar.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 flex flex-col items-center gap-3 text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="inline-flex gap-1 items-center">
          View source <ExternalLink className="size-3.5" />
        </span>
        <span className="text-muted-foreground inline-flex items-center gap-1">
          <Tag className="size-4" />
          {getDomain(calendar.url)}
        </span>
      </a>
    </Link>
  ));

  const EmptyCalendarView = (
    <div className="mx-auto max-w-xl w-full grow p-8 space-y-4 text-center rounded-lg mt-8 flex flex-col items-center justify-center">
      <h2 className="text-xl font-medium max-w-md mx-auto">
        No Calendar's Created.
      </h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
        Create a calendar first to view it here.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
      >
        <Plus />
        New calendar
      </Link>
    </div>
  );

  return (
    <>
      <Head title="Calendars" />

      <div className="flex flex-col max-w-5xl mx-auto flex-grow relative w-full px-6">
        <div className="inline-flex gap-4 items-center justify-between">
          <h1 className="text-3xl">Calendars</h1>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            <Plus />
            New calendar
          </Link>
        </div>
        <div className="flex flex-col gap-3 pt-3 grow">
          {calendars.length === 0 ? EmptyCalendarView : CalendarView}
        </div>
      </div>
    </>
  );
}
