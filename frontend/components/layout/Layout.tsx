import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { getPublicSettings } from "@/lib/settings";

interface LayoutProps {
  children: ReactNode;
}

export async function Layout({ children }: LayoutProps) {
  const settings = await getPublicSettings();

  return (
    <div className="min-h-screen flex flex-col">
      <BackToTop />
      <Header settings={settings} />
      <main className="flex-1">
        {children}
      </main>
      <Footer settings={settings} />
    </div>
  );
}
