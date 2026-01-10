"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createPrize } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function PrizeDraw() {
  const t = useTranslations("PrizeDraw");
  const [hasWon, setHasWon] = useState(false);
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, t("validation.name_min")),
    phoneNumber: z.string().min(8, t("validation.phone_min")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
    },
  });

  const handlePress = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Generate code
    const randomCode = `HONEY-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;
    setCode(randomCode);
    setHasWon(true);

    // Fire confetti
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    await confetti({
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const result = await createPrize({
        name: values.name,
        phoneNumber: values.phoneNumber,
        code: code,
      });
      if (result.success) {
        setIsSubmitted(true);
      } else {
        // handle error
        console.error(result.error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <Card className="mx-4 w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-green-600">
            {t("gift_claimed_success")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("participation_recorded")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted rounded-lg p-4 text-center">
            <p className="mb-1 text-sm font-medium">{t("your_winner_code")}</p>
            <p className="text-2xl font-bold tracking-widest">{code}</p>
            <p className="text-muted-foreground mt-2 text-xs">
              {t("save_code_message")}
            </p>
          </div>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => window.location.reload()}
          >
            {t("back")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (hasWon) {
    return (
      <Card className="animate-in fade-in zoom-in mx-4 w-full max-w-md duration-300">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {t("congratulations")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("thank_you_message")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("full_name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("full_name_placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phone_number")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("phone_number_placeholder")}
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("claim_gift")}
              </Button>
              <p className="text-muted-foreground mt-2 text-center text-xs">
                {t("contact_info_message")}
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Button
      size="lg"
      variant="outline"
      onClick={handlePress}
      className="text-lg"
    >
      {t("press_me")}
    </Button>
  );
}
