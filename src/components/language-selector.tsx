"use client";

import { FR, TN, US } from "country-flag-icons/react/3x2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import type { Language } from "@/lib/types";

const LANGUAGES = [
  { code: "ar", name: "العربية", flag: TN },
  { code: "fr", name: "Français", flag: FR },
  { code: "en", name: "English", flag: US },
];

export function LanguageSelector() {
  const { language, changeLanguage, mounted } = useLanguage();
  if (!mounted) return null;

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === language) ?? LANGUAGES[0];

  const CurrentFlag = currentLanguage?.flag ?? FR;

  const handleLanguageChange = (code: Language) => {
    changeLanguage(code);
    window.location.reload(); // refresh the page
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <CurrentFlag className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit">
        {LANGUAGES.map((lang) => {
          const Flag = lang.flag;
          const isActive = lang.code === language;
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
