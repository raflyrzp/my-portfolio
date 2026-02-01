"use client";

import { NextIntlClientProvider } from "next-intl";
import { LanguageProvider } from "@/lib/LanguageContext";
import BubbleNav from "@/components/BubbleNav";
import BackgroundEffects from "@/components/BackgroundEffects";

interface ClientLayoutProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
}

export default function ClientLayout({
  children,
  locale,
  messages,
}: ClientLayoutProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LanguageProvider>
        <BackgroundEffects />
        <BubbleNav />
        {children}
      </LanguageProvider>
    </NextIntlClientProvider>
  );
}
