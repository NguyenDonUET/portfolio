import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/common/Navbar";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { Footer } from "@/components/sections/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { portfolioData } from "@/data/portfolioData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { personal } = portfolioData;

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([
    getTranslations("personal"),
    getLocale(),
  ]);
  const title = `${personal.name} · ${t("title")}`;
  const description = t("bio");

  return {
    title: {
      default: title,
      template: `%s · ${personal.name}`,
    },
    description,
    metadataBase: new URL("https://example.com"),
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      siteName: personal.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * Root shell: fonts + metadata live here (server).
 * Interactive chrome (Navbar) is isolated as client components.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent theme flash before React hydrates ThemeToggle */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider>
          <TooltipProvider delay={150}>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ScrollToTop />
          </TooltipProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
