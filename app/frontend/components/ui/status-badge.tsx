import { cn } from "@/lib/utils";

const variants: Record<"Upcoming" | "Completed", [classname: string]> = {
  Upcoming: [
    "bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-500",
  ],
  Completed: [
    "bg-orange-100 text-orange-600 border-orange-300  dark:bg-orange-900 dark:text-orange-300 dark:border-orange-500",
  ],
};
export default function StatusBadge({
  status,
  children,
}: {
  status: "Upcoming" | "Completed";
  children: React.ReactNode;
}) {
  const [variant] = variants[status];
  return (
    <div
      className={cn(
        "inline-flex h-min items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant,
      )}
    >
      {status}
      {children}
    </div>
  );
}
