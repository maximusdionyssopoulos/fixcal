import { Github } from "lucide-react";
import { ThemeProvider } from "../theme-provider";
import ModeToggle from "./mode-toggle";
import { Head, Link, usePage } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Toaster } from "./sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { signed_in } = usePage().props;
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Head title="FixCal" />
      <main className="flex flex-col min-h-screen">
        <nav className="z-10 p-4 flex flex-row justify-between">
          <Link
            href="/"
            className="text-3xl font-semibold font-mono backdrop-blur-lg"
          >
            <span className="text-orange-600 dark:text-orange-400">Fix</span>cal
          </Link>
          {signed_in ? (
            <div>
              <Link
                href="/calendars"
                className={cn(
                  buttonVariants({ variant: "link", size: "default" }),
                )}
              >
                Calendars
              </Link>
              <Link
                href="/auth"
                method="delete"
                className={cn(
                  buttonVariants({ variant: "link", size: "default" }),
                )}
              >
                Log Out
              </Link>
            </div>
          ) : (
            <Link
              href="/auth"
              className={cn(
                buttonVariants({ variant: "link", size: "default" }),
              )}
            >
              Login
            </Link>
          )}
        </nav>
        {children}
        <footer className="p-4 flex flex-row gap-4 items-center relative z-10">
          <ModeToggle />
          <a
            href="https://github.com/maximusdionyssopoulos"
            className="text-xs ml-auto inline-flex items-center gap-2"
          >
            <Github size={16} />
            Built by Maximus Dionyssopoulos
          </a>
        </footer>
      </main>
      <Toaster richColors />
    </ThemeProvider>
  );
}
