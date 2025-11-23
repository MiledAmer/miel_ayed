"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/lib/store"
import { createOrder } from "@/lib/actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

const formSchema = z.object({
  customerName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  customerEmail: z.string().email({
    message: "Please enter a valid email address.",
  }).optional().or(z.literal('')),
  customerPhone: z.string().min(8, {
    message: "Phone number must be at least 8 characters.",
  }),
  shippingAddress: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),
})

export function CheckoutForm() {
  const t = useTranslations("Checkout")
  const { items, getTotal, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      shippingAddress: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (items.length === 0) {
      toast.error(t("cart_empty"))
      return
    }

    setIsSubmitting(true)

    try {
      const orderData = {
        ...values,
        items: items.map(item => ({
          productId: item.product._id,
          variantKey: item.variant._key,
          weight: item.variant.weight,
          quantity: item.quantity,
          price: item.variant.price
        })),
        totalAmount: getTotal()
      }

      const result = await createOrder(orderData)

      if (result.success) {
        clearCart()
        toast.success(t("order_success"))
        router.push(`/checkout/success/${result.orderId}`)
      } else {
        toast.error(t("order_error"))
      }
    } catch (error) {
      console.error(error)
      toast.error(t("order_error"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("name_placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="customerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")} ({t("optional")})</FormLabel>
                <FormControl>
                  <Input placeholder={t("email_placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="customerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("phone")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("phone_placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="shippingAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("address")}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t("address_placeholder")} 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? t("processing") : t("place_order")}
        </Button>
      </form>
    </Form>
  )
}