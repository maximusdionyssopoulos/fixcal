import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Root() {
  const { data, setData, post, processing, errors } = useForm({
    url: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Placeholder url
    post("/calendars");
  };
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-background to-orange-100/30 dark:from-orange-800/80 dark:to-orange-900/40" />
      <div className="flex-grow relative h-full w-full overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 py-24 relative z-10">
          <div className="space-y-12">
            {/* Header Section */}
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl font-mono">
                Generate iCal calendars
                <br />
                for your social sport team(s)
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                If your sports team uses SportFix for fixturing, you can easily
                generate a calendar to view all fixtures in your preferred
                calendar application.
                <br />
                <br />
                Simply paste your SportFix URL below and click generate.
              </p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="url" className="text-base font-medium" hidden>
                  URL
                </label>
                <Input
                  type="text"
                  name="url"
                  id="url"
                  value={data.url}
                  onChange={(e) => setData("url", e.target.value)}
                  placeholder="https://sportfix.net/app/teamdetails?"
                  className=" bg-background h-12 border-orange-200/20"
                />
                {errors.url && (
                  <div className="text-sm text-destructive">{errors.url}</div>
                )}
              </div>

              <Button
                type="submit"
                disabled={processing}
                size={"lg"}
                className=" w-full bg-radial from-orange-500 from-45% to-orange-300 text-background dark:from-orange-600 dark:to-orange-400 dark:text-foreground font-mono text-md hover:opacity-90"
              >
                Subscribe to Calendar
              </Button>
              <Button
                type="submit"
                disabled={processing}
                size={"lg"}
                variant={"ghost"}
                className=" w-full font-mono text-md border border-orange-100 dark:border-orange-900 hover:bg-orange-50/50 dark:hover:bg-orange-950/80"
              >
                Generate and Download Calendar file
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
