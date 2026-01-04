"use client";

import { FR, TN, US } from "country-flag-icons/react/3x2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/types";
import type { Locales } from "@/i18n/request";
import { setLocale } from "@/i18n/actions";
import { useLocale, useTranslations } from "next-intl";
// import { setLocale, type Locales } from "@/i18n/request";

const LANGUAGES = [
  { code: "ar", name: "العربية", flag: TN },
  { code: "fr", name: "Français", flag: FR },
  { code: "en", name: "English", flag: US },
];

export function LanguageSelector() {
  const locale = useLocale();
  const t = useTranslations("HomePage.Header");

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === locale) ?? LANGUAGES[0];

  const CurrentFlag = currentLanguage?.flag ?? US;

  const handleLanguageChange = async (code: Language) => {
    await setLocale(code as Locales);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative" aria-label={t("language")}>
          <CurrentFlag className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit">
        {LANGUAGES.map((lang) => {
          const Flag = lang.flag;
          const isActive = lang.code === locale;
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code as Language)}
              className={`flex gap-2 ${isActive ? "bg-accent text-accent-foreground" : ""}`}
            >
              <Flag className="h-5 w-5" />
              {lang.name}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
