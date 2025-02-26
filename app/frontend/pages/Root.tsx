import { useForm } from "@inertiajs/react";
import axios, { AxiosError } from "axios";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Root() {
  const { data, setData, post, processing, errors, setError, clearErrors } =
    useForm({
      url: "",
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Placeholder url
    post("/calendars");
  };

  // To ensure the download we need to use a non-inertia request thus use the axios library since sits included
  const handleDownload = async () => {
    if (
      !data.url ||
      !data.url.trim() ||
      !data.url.startsWith("https://sportfix.net/app/teamdetails?")
    ) {
      setError("url", "Please enter a valid URL");
      return;
    }
    try {
      clearErrors();
      const response = await axios.get("/download", {
        params: {
          url: data.url,
        },
      });
      // transform the response into a blob which can be downloaded
      let blob = new Blob([response.data], { type: "text/calendar" });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "fixtures.ics";
      link.click();
    } catch (error: AxiosError<{ data: string }> | Error | unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          setError("url", error.response.data.error as string);
        } else {
          setError("url", "Failed to download calendar. Please try again.");
        }
      } else {
        setError("url", "An unexpected error occurred.");
      }
    }
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

            <div className="space-y-6">
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
              </form>
              <Button
                onClick={handleDownload}
                size={"lg"}
                variant={"ghost"}
                className=" w-full font-mono text-md border border-orange-100 dark:border-orange-900 hover:bg-orange-50/50 dark:hover:bg-orange-950/80"
              >
                Generate and Download Calendar file
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
