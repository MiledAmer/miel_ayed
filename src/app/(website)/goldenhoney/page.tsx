import SplashCursor from "@/components/SplashCursor";
import { PrizeDraw } from "@/components/prize-draw";
import { getTranslations } from "next-intl/server";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getPrizesCount } from "@/sanity/create-prize-function";

export default async function Page() {
  const prizesCount = await getPrizesCount();
  const t = await getTranslations("PrizeDraw");

  if (prizesCount > 0) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-4">
        <SplashCursor />
        <Card className="mx-4 w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-muted-foreground text-center text-xl">
              {t("prize_already_claimed")}
              
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <SplashCursor />
      <PrizeDraw />
    </div>
  );
}
