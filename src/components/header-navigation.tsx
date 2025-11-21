"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { Category } from "@/sanity/types/categories";
import { useIsMobile } from "@/hooks/use-mobile"
import {
  getTranslatedCategoryName,
  getTranslatedSubcategoryName,
} from "@/sanity/sanity-utils";
import { useLocale, useTranslations } from "next-intl";
export function HeaderNavigation({ categories }: { categories: Category[] }) {
  const t = useTranslations("HomePage.Header");
  const locale = useLocale();
  const isMobile = useIsMobile();

  return (
    <NavigationMenu  viewport={isMobile} className="hidden md:flex">
      <NavigationMenuList className="flex-wrap">
        {categories.map((category) => (
          <NavigationMenuItem key={category._id} >
            {category.subcategories == null ? (
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={`/products?category=${category.slug.current}`}>
                  {getTranslatedCategoryName(category, locale)}
                </Link>
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger className="bg-transparent">
                  <Link href={`/products?category=${category.slug.current}`}>
                    {getTranslatedCategoryName(category, locale)}
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-4"> 
                    <li>
                      {category.subcategories.map((subcategory) => (
                        <NavigationMenuLink asChild key={subcategory._id}>
                          <Link
                            href={`/products?category=${category.slug.current}&subcategory=${subcategory.slug.current}`}
                          >
                            {getTranslatedSubcategoryName(subcategory, locale)}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </li>
                  </ul>
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href="/about"
              className="text-foreground hover:text-accent font-medium transition-colors"
            >
              {t("about")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}> 
            <Link
              href="/contact"
              className="text-foreground hover:text-accent font-medium transition-colors"
            >
              {t("contact")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
