const errors: Record<number, { title: string; description: string }> = {
  503: {
    title: "Service Unavailable",
    description:
      "Sorry, we are doing some maintenance. Please check back soon.",
  },
  500: {
    title: "Server Error",
    description: "Whoops, something went wrong on our servers.",
  },
  404: {
    title: "Page Not Found",
    description: "Sorry, the page you are looking for could not be found.",
  },
  403: {
    title: "Forbidden",
    description: "Sorry, you are forbidden from accessing this page.",
  },
};

export default function ErrorPage({ status }: { status: number }) {
  const error = errors[status] || {
    title: "Unexpected Error",
    description: "An unexpected error occurred. Please try again later.",
  };
  return (
    <div className="flex flex-col items-center justify-center grow bg-background p-4">
      <div className="space-y-6 text-center max-w-md mx-auto">
        <div className="rounded-full bg-muted p-6 w-24 h-24 mx-auto flex items-center justify-center">
          <span className="text-4xl font-bold text-muted-foreground">
            {status}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          {error?.title || "Error"}
        </h1>
        <p className="text-muted-foreground">
          {error?.description || "An unexpected error occurred."}
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
