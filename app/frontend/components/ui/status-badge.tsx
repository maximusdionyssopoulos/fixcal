import { cn } from "@/lib/utils";

const variants: Record<"Upcoming" | "Completed", [classname: string]> = {
  Upcoming: ["bg-green-50 text-green-700 border-green-200"],
  Completed: ["bg-orange-50 text-orange-500 border-orange-200 "],
};
export default function StatusBadge({
  status,
}: {
  status: "Upcoming" | "Completed";
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
    </div>
  );
}
