"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className={isRTL ? "rtl" : "ltr"} dir={isRTL ? "rtl" : "ltr"}>
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-primary mb-4 text-4xl font-bold text-balance md:text-5xl">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl text-pretty">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="text-foreground mb-2 block text-sm font-medium"
                >
                  {t("name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-border bg-card text-foreground placeholder-muted-foreground focus:ring-accent w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                  placeholder={t("name")}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-foreground mb-2 block text-sm font-medium"
                >
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-border bg-card text-foreground placeholder-muted-foreground focus:ring-accent w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                  placeholder={t("email")}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-foreground mb-2 block text-sm font-medium"
                >
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="border-border bg-card text-foreground placeholder-muted-foreground focus:ring-accent w-full resize-none rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                  placeholder={t("message")}
                />
              </div>

              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-accent-foreground w-full"
              >
                {t("send")}
              </Button>

              {submitted && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                  {t("thanks")}
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-primary mb-8 text-2xl font-bold">{t("or")}</h2>

            <div className="space-y-8">
              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-accent/10 rounded-full p-3">
                    <Phone className="text-accent h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-foreground mb-1 font-semibold">
                    {t("phone")}
                  </h3>
                  <a
                    href="tel:+216XXXXXXXX"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {t("phone_number")}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-accent/10 rounded-full p-3">
                    <Mail className="text-accent h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-foreground mb-1 font-semibold">
                    {t("email_label")}
                  </h3>
                  <a
                    href="mailto:info@mielayed.tn"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {t("email_address")}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-accent/10 rounded-full p-3">
                    <MapPin className="text-accent h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-foreground mb-1 font-semibold">
                    {t("location")}
                  </h3>
                  <p className="text-muted-foreground">{t("address")}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-accent/10 rounded-full p-3">
                    <Phone className="text-accent h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-foreground mb-1 font-semibold">
                    {t("hours")}
                  </h3>
                  <p className="text-muted-foreground">{t("hours_desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
