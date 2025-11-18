'use client'

import { useLanguage } from '@/hooks/use-language'
import type { Language } from '@/lib/types'

export function LanguageToggle() {
  const { language, changeLanguage, mounted } = useLanguage()

  if (!mounted) return null

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'ع' },
  ]

  return (
    <div className="flex gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
            language === lang.code
              ? 'bg-accent text-accent-foreground'
              : 'bg-muted text-muted-foreground hover:bg-border'
          }`}
          aria-label={`Switch to ${lang.label}`}
          aria-pressed={language === lang.code}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
