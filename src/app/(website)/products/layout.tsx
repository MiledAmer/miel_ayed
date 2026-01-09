import { Suspense } from "react";

export const metadata = {
  title: 'Boutique',
  description: 'Parcourez notre sélection de miels et produits d’abeilles artisanaux.',
}

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense>{children}</Suspense>;
}
