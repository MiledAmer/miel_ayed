"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { useParams } from "next/navigation"

export default function SuccessPage() {
  const t = useTranslations("Checkout")
  const tCart = useTranslations("CartPage")
  const params = useParams()
  const locale = useLocale()
  const isRTL = locale === "ar"
  const orderId = params.orderId as string

  return (
    <main className={isRTL ? "rtl" : "ltr"} dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full mb-6">
          <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t("order_success")}
        </h1>
        
        <p className="text-muted-foreground max-w-md mb-8">
          {t("success_desc")}
          <br />
          <span className="font-medium mt-2 block">Order ID: {orderId}</span>
        </p>
        
        <Link href="/products">
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {tCart("continue_shopping")}
          </Button>
        </Link>
      </div>
    </main>
  )
}