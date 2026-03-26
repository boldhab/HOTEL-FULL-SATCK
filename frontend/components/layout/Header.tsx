"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/actions/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Rooms", path: "/rooms" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--brand-primary)]/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl text-white font-serif tracking-tight">
                Ethio Bernos
              </span>
              <span className="text-xs tracking-widest text-[#c9a961] uppercase">
                Hotel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm tracking-wide transition-colors relative group ${
                  isActive(link.path)
                    ? "text-[var(--brand-accent)]"
                    : "text-white/85 hover:text-[var(--brand-accent)]"
                  }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--brand-accent)] transition-transform origin-left ${
                    isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <a href="tel:+251911234567" className="text-white hover:text-[var(--brand-accent)] transition-colors">
              <Phone className="h-5 w-5" />
            </a>
            <Button
              className="bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-black px-6"
              asChild
            >
              <Link href="/contact">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white hover:text-[var(--brand-accent)] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-white/10 bg-[var(--brand-primary)] overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`block py-2 text-sm tracking-wide transition-colors ${
                    isActive(link.path)
                      ? "text-[var(--brand-accent)]"
                      : "text-white/85 hover:text-[var(--brand-accent)]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Theme</span>
                  <ThemeToggle />
                </div>
                <a
                  href="tel:+251911234567"
                  className="flex items-center space-x-2 text-white/85 hover:text-[var(--brand-accent)] transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span className="text-sm">+251 911 234 567</span>
                </a>
                <Button
                  className="w-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-black"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/contact">Book Now</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
