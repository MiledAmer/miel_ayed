'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/hooks/use-language'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin } from 'lucide-react'
import { useState } from 'react'

const translations = {
  en: {
    title: 'Contact Us',
    subtitle: 'Get in touch with Miel Ayed. We\'d love to hear from you.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
    or: 'Or contact us directly:',
    phone: 'Phone',
    phone_number: '+216 XX XXX XXXX',
    email_label: 'Email',
    email_address: 'info@mielayed.tn',
    location: 'Location',
    address: 'Tunisia',
    hours: 'Business Hours',
    hours_desc: 'Monday - Friday: 9:00 AM - 6:00 PM',
  },
  fr: {
    title: 'Nous Contacter',
    subtitle: 'Restez en contact avec Miel Ayed. Nous aimerions vous entendre.',
    name: 'Nom',
    email: 'Email',
    message: 'Message',
    send: 'Envoyer un message',
    or: 'Ou contactez-nous directement:',
    phone: 'Téléphone',
    phone_number: '+216 XX XXX XXXX',
    email_label: 'Email',
    email_address: 'info@mielayed.tn',
    location: 'Localisation',
    address: 'Tunisie',
    hours: 'Heures d\'ouverture',
    hours_desc: 'Lundi - Vendredi: 9h00 - 18h00',
  },
  ar: {
    title: 'اتصل بنا',
    subtitle: 'ابق على تواصل مع عسل عياد. نود أن نسمع منك.',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    message: 'الرسالة',
    send: 'إرسال الرسالة',
    or: 'أو اتصل بنا مباشرة:',
    phone: 'الهاتف',
    phone_number: '+216 XX XXX XXXX',
    email_label: 'البريد الإلكتروني',
    email_address: 'info@mielayed.tn',
    location: 'الموقع',
    address: 'تونس',
    hours: 'ساعات العمل',
    hours_desc: 'الاثنين - الجمعة: 9:00 - 18:00',
  },
}

export default function ContactPage() {
  const { language, mounted } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  if (!mounted) return null

  const t = translations[language as keyof typeof translations] || translations.fr
  const isRTL = language === 'ar'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <main className={isRTL ? 'rtl' : 'ltr'} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-balance">
            {t.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  {t.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder={t.name}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  {t.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder={t.email}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  {t.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  placeholder={t.message}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {t.send}
              </Button>

              {submitted && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  {language === 'en'
                    ? 'Thank you for your message! We\'ll get back to you soon.'
                    : language === 'fr'
                    ? 'Merci pour votre message! Nous vous recontacterons bientôt.'
                    : 'شكراً لرسالتك! سنعود إليك قريباً.'}
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-8">{t.or}</h2>

            <div className="space-y-8">
              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t.phone}</h3>
                  <a
                    href="tel:+216XXXXXXXX"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {t.phone_number}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t.email_label}</h3>
                  <a
                    href="mailto:info@mielayed.tn"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {t.email_address}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t.location}</h3>
                  <p className="text-muted-foreground">{t.address}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t.hours}</h3>
                  <p className="text-muted-foreground">{t.hours_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
