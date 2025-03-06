import { Head, Link } from "@inertiajs/react";
import Calendar from "./Calendar";
import { CalendarType } from "./types";
import { Download, MoreVertical, MoveLeft, Pencil, Trash2 } from "lucide-react";
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
            <a
              href={getWebcalUrl()}
              className={cn(
                buttonVariants({ variant: "default", size: "default" }),
              )}
            >
              Subscribe
            </a>
            <AlertDialog>
              <div className="space-x-2 hidden sm:contents">
                <Link
                  href={`/calendars/${calendar.public_id}/edit`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                  )}
                >
                  Edit Calendar
                </Link>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={"destructive"}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="sm:hidden">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <a
                      href={`/calendars/${calendar.public_id}.ics`}
                      className="flex items-center gap-2 w-full"
                    >
                      <Download /> Download
                    </a>
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
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem variant="destructive">
                      {/* <Link
                        href={`/calendars/${calendar.public_id}`}
                        as="button"
                        method="delete"
                        className="flex items-center gap-2 w-full"
                      > */}
                      <Trash2 className="" />
                      Delete
                      {/* </Link> */}
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

// const DeleteButton = ({
//   isMobile = false,
//   public_id,
// }: {
//   isMobile?: boolean;
//   public_id: string;
// }) => {
//   if (isMobile) {
//     return;
//   }

//   return (

//   );
// };
