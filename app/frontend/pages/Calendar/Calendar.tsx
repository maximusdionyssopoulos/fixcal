import { CalendarType, Event as EventType } from "./types";
import { CalendarClock, MapPin } from "lucide-react";
import StatusBadge from "@/components/ui/status-badge";

interface CalendarProps {
  calendar: CalendarType;
}

const scroller = (node: HTMLDivElement | null): void => {
  node?.scrollIntoView({ behavior: "instant", block: "center" });
};

export default function Calendar({ calendar }: CalendarProps) {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-6">
        {calendar.completed_events.map((event) => (
          <Event
            event={event}
            key={event.AwayTeam + event.Round}
            index={-1}
            scroller={() => undefined}
          />
        ))}
        {calendar.upcoming_events.map((event, index) => (
          <Event
            event={event}
            key={event.AwayTeam + event.Round}
            index={index}
            scroller={scroller}
          />
        ))}
      </div>
    </div>
  );
}

function Event({
  event,
  index,
  scroller,
}: {
  event: EventType;
  index: number;
  scroller: (node: HTMLDivElement | null) => void;
}) {
  const status = event.ResultSubmitted === true ? "Completed" : "Upcoming";
  return (
    <div
      className="relative flex items-center"
      ref={index === 0 ? scroller : null}
    >
      <div className="absolute left-0 flex items-center">
        <div className="z-10 flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-xl bg-radial from-orange-500 from-45% to-orange-300 shadow-md">
          {event.Round.includes("Finals")
            ? `F${event.Round.charAt(0)}`
            : `R${event.Round}`}
        </div>
      </div>
      <div className="ml-16 w-full p-4 flex flex-col gap-1 border border-neutral-200 shadow-sm rounded-md">
        <div className="flex flex-row flex-wrap gap-2 sm:gap-4 items-center justify-between">
          <div className="text-sm inline-flex flex-wrap gap-1 sm:gap-4">
            <StatusBadge status={status} />
            <p className="text-neutral-500">{event.CompetitionName}</p>
          </div>
          {event.AwayTeamScore && event.HomeTeamScore ? (
            <span className="flex items-center gap-2 text-xl font-semibold font-mono">
              {event.HomeTeamScore} - {event.AwayTeamScore}
            </span>
          ) : null}
        </div>
        <h3 className="text-xl font-medium">
          {event.HomeTeam.Name} vs {event.AwayTeam.Name}
        </h3>

        <p className="inline-flex text-sm gap-2 items-center text-primary">
          <MapPin className="size-4 text-neutral-500" />
          {event.CourtName}
        </p>
        <p className="inline-flex text-sm gap-2 items-center">
          <CalendarClock className="size-4 text-neutral-500" />{" "}
          {event.MatchDate} - {event.MatchTime}
        </p>
      </div>
    </div>
  );
}
