import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import { getMessages, getLocale } from "next-intl/server";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rafly Rabbany Z.P. | Backend Developer",
  description:
    "Passionate Backend Developer specializing in building robust, scalable web applications. Portfolio showcasing projects, experience, and skills.",
  keywords: [
    "Backend Developer",
    "Web Developer",
    "Laravel",
    "Node.js",
    "PHP",
    "Portfolio",
    "Rafly Rabbany",
  ],
  authors: [{ name: "Rafly Rabbany Zalfa Pateda" }],
  openGraph: {
    title: "Rafly Rabbany Z.P. | Backend Developer",
    description:
      "Passionate Backend Developer specializing in building robust, scalable web applications.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafly Rabbany Z.P. | Backend Developer",
    description:
      "Passionate Backend Developer specializing in building robust, scalable web applications.",
  },
  metadataBase: new URL("https://raflyrzp.vercel.app"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased">
        <ClientLayout locale={locale} messages={messages}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
