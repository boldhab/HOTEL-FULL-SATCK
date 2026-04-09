import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import type { PublicSettings } from "@/lib/settings";

type FooterProps = {
  settings: PublicSettings;
};

const normalizePhoneHref = (value: string) => `tel:${value.replace(/[^\d+]/g, "")}`;

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-[#1e3a5f] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <div className="mb-4">
              <h3 className="text-2xl font-serif text-[#c9a961] mb-1">{settings.hotelName}</h3>
              <p className="text-xs tracking-widest text-gray-300 uppercase">Hotel</p>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Experience luxury and comfort in the heart of the city. Your perfect stay awaits.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4 text-[#c9a961]">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-300 hover:text-[#c9a961] transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-[#c9a961] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="text-sm text-gray-300 hover:text-[#c9a961] transition-colors">
                  Rooms
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-300 hover:text-[#c9a961] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm text-gray-300 hover:text-[#c9a961] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-[#c9a961] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg mb-4 text-[#c9a961]">Location</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#c9a961] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">
                  {settings.hotelAddress}
                </span>
              </li>
            </ul>

            <h4 className="text-lg mt-6 mb-4 text-[#c9a961]">Contacts</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#c9a961] flex-shrink-0" />
                <a href={normalizePhoneHref(settings.contactPhone)} className="text-sm text-gray-300 hover:text-[#c9a961] transition-colors">
                  {settings.contactPhone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#c9a961] flex-shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="text-sm text-gray-300 hover:text-[#c9a961] transition-colors">
                  {settings.contactEmail}
                </a>
              </li>
              {settings.website && (
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#c9a961] flex-shrink-0" />
                  <a href={settings.website} className="text-sm text-gray-300 hover:text-[#c9a961] transition-colors" target="_blank" rel="noreferrer">
                    Visit Website
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg mb-4 text-[#c9a961]">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#c9a961] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#c9a961] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={settings.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#c9a961] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-300">
                Subscribe to our newsletter for exclusive offers
              </p>
              <div className="mt-3 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 text-sm bg-white/10 border border-white/20 rounded-l-md focus:outline-none focus:border-[#c9a961] text-white placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-[#c9a961] hover:bg-[#b89851] text-white text-sm rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} {settings.hotelName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
