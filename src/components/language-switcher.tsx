'use client';

import { type Language, translations } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface LanguageSwitcherProps {
  currentLanguage: Language;
}

export function LanguageSwitcher({ currentLanguage }: LanguageSwitcherProps) {
  const router = useRouter();

  const languages = Object.keys(translations) as Language[];

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <Button
          key={lang}
          variant={lang === currentLanguage ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            localStorage.setItem('language', lang);
            router.refresh();
          }}
          className="uppercase text-xs"
        >
          {lang}
        </Button>
      ))}
    </div>
  );
}
