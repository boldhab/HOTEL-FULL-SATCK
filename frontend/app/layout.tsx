import type { Metadata } from "next";
import "@/styles/index.css";

import { Layout } from "@/components/layout/Layout";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata: Metadata = {
  title: "Ethio Bernos Hotel",
  description: "Luxury hospitality frontend built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
