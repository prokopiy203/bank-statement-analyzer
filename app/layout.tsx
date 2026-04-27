import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bank Statement Analyzer",
  description: "Розрахунок транзакцій",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uk"
      className={cn(
        "dark h-full antialiased",
        geistSans.variable,
        geistMono.variable,
      )}
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
          <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold tracking-tight">
              Bank Statement Analyzer
            </h1>

            {/* Можеш потім додати кнопку теми */}
            <div className="text-xs text-muted-foreground">CSV Analyzer</div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1">
          <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
        </main>

        <footer className="border-t">
          <div className="mx-auto max-w-5xl px-6 py-4 text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Bank Analyzer
          </div>
        </footer>
      </body>
    </html>
  );
}
