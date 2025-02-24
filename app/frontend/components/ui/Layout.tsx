// import { Link } from '@inertiajs/react'
import { Github } from "lucide-react";
import { ThemeProvider } from "../theme-provider";
import ModeToggle from "./mode-toggle";
import { Head } from "@inertiajs/react";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Head title="FixCal" />
      <main className="flex flex-col h-svh">
        {children}
        <footer className="p-4 flex flex-row gap-4 items-center backdrop-blur-sm relative z-10">
          <a href="https://github.com/maximusdionyssopoulos">
            <Github size={16} />
          </a>
          <ModeToggle />
          <span className="text-xs">Built by Maximus Dionyssopoulos</span>
        </footer>
      </main>
    </ThemeProvider>
  );
}
