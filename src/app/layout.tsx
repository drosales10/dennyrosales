import type { Metadata } from "next";
import { JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Ingenieria Geoespacial y Arquitectura TI",
  description:
    "Landing profesional de alto impacto para trayectoria en ingenieria forestal, arquitectura de software, ciencia de datos y soluciones geoespaciales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeInitializer = `
    (function() {
      try {
        var storageKey = "app-theme";
        var stored = localStorage.getItem(storageKey);
        var system = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
        var theme = stored === "light" || stored === "dark" ? stored : system;
        document.documentElement.setAttribute("data-theme", theme);
      } catch (e) {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    })();
  `;

  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
