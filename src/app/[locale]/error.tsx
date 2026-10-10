"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/routing";
import { RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Application Error Boundary]", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background py-20 px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="h-16 w-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
          <RefreshCcw className="h-8 w-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
          Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We encountered an unexpected error while loading this page. Our team has been notified.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button variant="brass" onClick={() => reset()} className="flex items-center gap-2">
            <RefreshCcw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="h-4 w-4 mr-1 inline-block" />
              <span>Go Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
