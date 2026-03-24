import type { Metadata } from "next";
import "@/styles/index.css";

import { Layout } from "@/components/layout/Layout";

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
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
