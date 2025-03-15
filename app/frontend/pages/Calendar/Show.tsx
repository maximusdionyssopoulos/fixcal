import { Head, Link } from "@inertiajs/react";
import Calendar from "./Calendar";
import { CalendarType } from "./types";
import {
  Copy,
  Download,
  MoreVertical,
  MoveLeft,
  Pencil,
  Share,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ShowProps {
  calendar: CalendarType;
  flash: { notice?: string };
}

export default function Show({ calendar, flash }: ShowProps) {
  // replace https:// to webcal://
  const getWebcalUrl = () => {
    const baseUrl = window.location.origin;
    const calendarPath = `${calendar.public_id}.ics`;
    return `webcal://${baseUrl.replace(/^https?:\/\//, "")}/calendars/${calendarPath}`;
  };

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

  async function copyToClipboard(value: string) {
    await navigator.clipboard.writeText(value);
    toast.success("Link copied to clipboard");
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
          <div className="gap-2 inline-flex items-center flex-wrap">
            <div className="flex overflow-hidden text-primary-foreground shadow-xs items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ">
              <a
                className="bg-primary hover:bg-primary/90 rounded-sm rounded-r-none h-9 px-4 py-2 border-r"
                href={getWebcalUrl()}
              >
                Subscribe
              </a>
              <button
                className="h-9 px-3 py-2 rounded-r-sm bg-primary hover:bg-primary/90 cursor-pointer hidden sm:block"
                onClick={() => copyToClipboard(getWebcalUrl())}
              >
                <Copy />
              </button>
            </div>

            <AlertDialog>
              <div className="hidden sm:contents">
                <Link
                  href={`/calendars/${calendar.public_id}/edit`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                  )}
                >
                  Edit
                </Link>

                <AlertDialogTrigger asChild>
                  <Button
                    variant={"destructive"}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <Tooltip delayDuration={350}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className="cursor-pointer"
                      onClick={() => copyToClipboard(window.location.href)}
                    >
                      <Share />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share this calendar by link</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={350}>
                  <TooltipTrigger asChild>
                    <a
                      href={`/calendars/${calendar.public_id}.ics`}
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                          size: "icon",
                          className: "hidden sm:flex",
                        }),
                      )}
                    >
                      <Download />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download this calendar file</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="sm:hidden">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => copyToClipboard(getWebcalUrl())}
                  >
                    <Copy />
                    Copy webcal link
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/calendars/${calendar.public_id}/edit`}
                      className="flex items-center gap-2 w-full"
                    >
                      <Pencil className="" />
                      <span className="">Edit Calendar</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href={`/calendars/${calendar.public_id}.ics`}
                      className="flex items-center gap-2 w-full"
                    >
                      <Download /> Download
                    </a>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => copyToClipboard(window.location.href)}
                  >
                    <Share />
                    Share
                  </DropdownMenuItem>

                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem variant="destructive">
                      <Trash2 className="" />
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this calendar?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the calendar and its ICS file from our servers. Any
                    applications where you've subscribed to this calendar will
                    stop receiving updates, and the calendar links will no
                    longer work.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
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
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto w-full px-6">
        <Calendar calendar={calendar} />
      </div>
    </>
  );
}
