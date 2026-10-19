import { Link } from "@/i18n/routing";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F8FAFC] py-20 px-4 text-center">
      <div className="max-w-md space-y-6">
        <span className="text-6xl sm:text-8xl font-bold font-display text-brass block">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
          Page Not Found
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button asChild variant="brass">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/services">
              <span>View Services</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
