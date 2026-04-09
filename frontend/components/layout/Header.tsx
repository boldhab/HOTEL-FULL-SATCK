"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Sparkles, Calendar, User, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/actions/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import type { PublicSettings } from "@/lib/settings";

// Constants
const NAV_LINKS = [
  { name: "Overview", path: "/" },
  { name: "Rooms", path: "/rooms" },
  { name: "Service", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
] as const;

const SCROLL_THRESHOLD = 50;
const HOME_HEADER_OFFSET = 140;

type HeaderProps = {
  settings: PublicSettings;
};

const normalizePhoneHref = (value: string) => `tel:${value.replace(/[^\d+]/g, "")}`;

export function Header({ settings }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const showSolidHeader = isScrolled || isMenuOpen;
  const headerBackground = !showSolidHeader
    ? "rgba(44, 30, 24, 0.88)"
    : "rgba(92, 62, 46, 0.95)";

  // Scroll progress indicator
  const scrollProgress = useTransform(scrollY, [0, 1000], [0, 1]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const threshold = Math.max(window.innerHeight - HOME_HEADER_OFFSET, SCROLL_THRESHOLD);
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Memoized active route checker
  const isActiveRoute = useCallback((path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  }, [pathname]);

  // Memoized nav items for desktop
  const desktopNavItems = useMemo(() => (
    <nav className="hidden lg:flex items-center space-x-1">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className="relative px-4 py-2 text-base font-semibold tracking-wide transition-colors duration-300"
        >
          <span className={`relative z-10 ${isActiveRoute(link.path) ? "text-[#E5C98A]" : "text-white hover:text-[#E5C98A]"}`}>
            {link.name}
          </span>
          {isActiveRoute(link.path) && (
            <motion.div
              layoutId="active-nav-line"
              className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-[#C9A961] to-[#C9A961]/60"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
            />
          )}
        </Link>
      ))}
    </nav>
  ), [isActiveRoute]);

  // Handle menu close on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      style={{
        backgroundColor: headerBackground,
        backdropFilter: "blur(12px)",
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolidHeader ? "border-b border-white/15 shadow-md" : "border-b border-white/10 shadow-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link href="/" className="group relative z-10">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-1 bg-[#C9A961]/20 rounded-full blur-md"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                />
                <Sparkles className="w-6 h-6 text-[#C9A961] relative" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl text-white font-serif tracking-tight">
                  {settings.hotelName}
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#C9A961] uppercase">
                  Hotel & Resort
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          {desktopNavItems}

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            
            <motion.a
              href={normalizePhoneHref(settings.contactPhone)}
              className="text-white/80 hover:text-[#C9A961] transition-colors relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Call us"
            >
              <Phone className="h-5 w-5" />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#5C3E2E] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Call Us
              </span>
            </motion.a>

            <Button
              className="bg-gradient-to-r from-[#C9A961] to-[#B87C4F] hover:from-[#B87C4F] hover:to-[#8B5A3C] text-white px-6 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href={settings.maintenanceMode ? "/contact" : "/booking"} className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{settings.maintenanceMode ? "Contact Us" : "Book Now"}</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-white hover:text-[#C9A961] transition-colors relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-white/10 bg-[#5C3E2E]/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-6 space-y-1">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.path}
                    className={`
                      flex items-center justify-between py-3 px-4 
                      text-lg font-semibold tracking-wide transition-all duration-300 rounded-lg
                      ${isActiveRoute(link.path)
                        ? "text-[#C9A961] bg-white/5"
                        : "text-white/90 hover:text-[#C9A961] hover:bg-white/5"
                      }
                    `}
                  >
                    <span>{link.name}</span>
                    {isActiveRoute(link.path) && (
                      <ChevronRight className="w-4 h-4 text-[#C9A961]" />
                    )}
                  </Link>
                  {isActiveRoute(link.path) && (
                    <motion.div
                      className="h-0.5 bg-gradient-to-r from-[#C9A961] to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                    />
                  )}
                </motion.div>
              ))}

              <motion.div
                className="pt-6 mt-4 space-y-3 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-lg">
                  <span className="text-sm text-white/80 font-medium">Theme</span>
                  <ThemeToggle />
                </div>

                <motion.a
                  href={normalizePhoneHref(settings.contactPhone)}
                  className="flex items-center space-x-3 px-4 py-3 text-white/80 hover:text-[#C9A961] hover:bg-white/5 transition-all duration-300 rounded-lg group"
                  whileHover={{ x: 5 }}
                >
                  <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{settings.contactPhone}</span>
                </motion.a>

                <Button
                  className="w-full bg-gradient-to-r from-[#C9A961] to-[#B87C4F] hover:from-[#B87C4F] hover:to-[#8B5A3C] text-white shadow-lg"
                  asChild
                >
                  <Link href={settings.maintenanceMode ? "/contact" : "/booking"} className="flex items-center justify-center space-x-2 py-3">
                    <Calendar className="w-4 h-4" />
                    <span>{settings.maintenanceMode ? "Contact Our Team" : "Book Your Stay"}</span>
                  </Link>
                </Button>

                <Link
                  href="/login"
                  className="flex items-center justify-center space-x-2 text-sm text-white/60 hover:text-[#C9A961] transition-colors py-2"
                >
                  <User className="w-4 h-4" />
                  <span>Guest Login</span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C9A961] to-[#C9A961]/20 origin-left"
        style={{ scaleX: scrollProgress }}
      />
    </motion.header>
  );
}
