import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md text-center">
        <p className="mb-4 text-sm font-semibold tracking-widest text-primary">
          ERROR 404
        </p>

        <h1 className="mb-4 text-7xl font-bold tracking-tight sm:text-8xl">
          404
        </h1>

        <h2 className="mb-3 text-2xl font-semibold tracking-tight">
          Page not found
        </h2>

        <p className="mb-8 text-sm leading-6 text-muted-foreground">
          Sorry, we could not find the page you are looking for.
          It might have been removed, renamed, or does not exist.
        </p>

        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
