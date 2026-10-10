"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "ar", label: "العربية", flag: "🇦🇪", dir: "rtl" },
  { code: "fr", label: "Français", flag: "🇫🇷", dir: "ltr" },
] as const;

export function LanguageSwitcher({ className }: { className?: string }) {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale as "en" | "ar" | "fr" });
  };

  return (
    <div className={className}>
      <Select value={currentLocale} onValueChange={handleLanguageChange}>
        <SelectTrigger className="h-9 w-[130px] rounded-lg border-border/60 bg-background/40 backdrop-blur-md px-3 text-xs font-medium focus:ring-1 focus:ring-brass">
          <div className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 text-brass" />
            <SelectValue placeholder="Language" />
          </div>
        </SelectTrigger>
        <SelectContent align="end" className="rounded-xl border-border bg-popover/95 backdrop-blur-lg">
          {languages.map((lang) => (
            <SelectItem
              key={lang.code}
              value={lang.code}
              className="text-xs font-medium cursor-pointer py-2"
            >
              <span className="mr-2">{lang.flag}</span>
              <span>{lang.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
