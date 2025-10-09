import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { LocaleProvider } from "@/components/LocalProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Med Amine Portfolio",
  description: "Portfolio of a student Med Amine, a Full-Stack Developer specializing in React, Node.js, and cloud technologies.",
};


export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const currentLocale  = await params;
  let messages;
  try {
    messages = require(`../../../messages/${currentLocale.locale}.json`);
  } catch (error) {
    console.error(`Failed to load messages for locale ${currentLocale.locale}:`, error);
    messages = require(`../../../messages/en.json`); // Fallback to English
  }

  if (!routing.locales.includes(currentLocale.locale)) {
    // This will be handled by middleware or a 404
    return null;
  }


  return (
    <html lang={currentLocale.locale} dir={currentLocale.locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      
      <body>
      <ThemeProvider>

      <LocaleProvider initialLocale={currentLocale.locale} initialMessages={messages}>
          {children}
          <Toaster position="bottom-right" toastOptions={{ duration: 4000 }} />
        </LocaleProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}

export async function getStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}