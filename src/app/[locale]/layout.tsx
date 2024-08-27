import AppWrapper from "components/AppWrapper/AppWrapper";

import ApiServer from "api/requests/server";
import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { LOACLES } from "constants/GlobalParams";
import ISR from "utils/ISR";
import { ValidationResponseType } from "utils/types/vaildation";

export function generateStaticParams() {
  return LOACLES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const apiValidationData: ValidationResponseType =
    await ISR.serverValidation();

  const body = await ISR.init(locale);

  return (
    <AppWrapper color="site" data={body} apiValidationData={apiValidationData}>
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </AppWrapper>
  );
}
