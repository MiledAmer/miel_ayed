"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { Locales } from "./request";

export async function setLocale(locale: Locales) {
  const store = await cookies();
  store.set("locale", String(locale));
  revalidatePath("/", "layout");
}
