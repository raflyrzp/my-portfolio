"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";

type Locale = "en" | "id";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isPending: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

function setCookie(name: string, value: string, days: number = 365) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const savedLocale = getCookie("locale") as Locale;
    if (savedLocale && (savedLocale === "en" || savedLocale === "id")) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setCookie("locale", newLocale);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, isPending }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
