'use client';

import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface LocaleProviderProps {
  children: React.ReactNode;
    initialLocale: string;
    initialMessages: { [key: string]: any };
}

export function LocaleProvider({ children, initialLocale, initialMessages } : LocaleProviderProps) {
  const [messages, setMessages] = useState(initialMessages);
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState(initialLocale);

  useEffect(() => {
    const pathLocale = pathname?.split('/')[1];
    if (routing.locales.includes(pathLocale)) {
      setLocale(pathLocale);
    } else if (!routing.locales.includes(locale)) {
      router.replace(`/${routing.locales[0]}${pathname}`);
    }
  }, [pathname, locale, router]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = (await import(`../../messages/${locale}.json`)).default;
        setMessages(messages);
      } catch (error) {
        console.error(`Failed to load messages for locale ${locale}:`, error);
        const fallbackMessages = (await import(`../../messages/en.json`)).default;
        setMessages(fallbackMessages);
      }
    };
    loadMessages();
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}