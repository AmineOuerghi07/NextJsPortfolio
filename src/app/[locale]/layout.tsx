import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { LocaleProvider } from "@/components/LocalProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const metadataCopy = {
  en: {
    title: "Mohamed Amine Ouerghi · Software Engineer",
    description:
      "Software engineer building REST APIs, background jobs, and cross-platform apps with NestJS, .NET, MongoDB, and Angular.",
  },
  fr: {
    title: "Mohamed Amine Ouerghi · Ingénieur logiciel",
    description:
      "Ingénieur logiciel. API REST, traitements en arrière-plan et applications multiplateformes avec NestJS, .NET, MongoDB et Angular.",
  },
  ar: {
    title: "Mohamed Amine Ouerghi · مهندس برمجيات",
    description:
      "مهندس برمجيات يبني واجهات REST ومهام الخلفية وتطبيقات متعددة المنصات باستخدام NestJS و.NET وMongoDB وAngular.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = metadataCopy[locale as keyof typeof metadataCopy] ?? metadataCopy.en;
  return {
    title: copy.title,
    description: copy.description,
  };
}


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
    <html
      lang={currentLocale.locale}
      dir={currentLocale.locale === "ar" ? "rtl" : "ltr"}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-stone-100 text-stone-900 antialiased dark:bg-stone-950 dark:text-stone-100">
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