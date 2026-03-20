"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Wifi, Utensils, Dumbbell, Sparkles, Car, Clock, Wine, UtensilsCrossed, Waves, Users, Coffee, Shirt } from "lucide-react";
import { ServiceCard } from "@/components/features/ServiceCard";
import { ImageWithFallback } from "@/components/media/ImageWithFallback";

const heroImage = "https://images.unsplash.com/photo-1759038085950-1234ca8f5fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlY2VwdGlvbiUyMGRlc2slMjBjb25jaWVyZ2V8ZW58MXx8fHwxNzczOTI1Mjk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const fallbackMainServices = [
  {
    icon: Wifi,
    title: "Free High-Speed WiFi",
    description: "Stay connected with complimentary high-speed internet access throughout the hotel premises",
  },
  {
    icon: Utensils,
    title: "Fine Dining Restaurant",
    description: "World-class restaurant serving international and local cuisine prepared by expert chefs",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "State-of-the-art gym equipment and personal training services available 24/7",
  },
  {
    icon: Sparkles,
    title: "Luxury Spa & Wellness",
    description: "Rejuvenating spa treatments, massages, and wellness programs for complete relaxation",
  }
];

export function Services({ initialServices = [] }: { initialServices?: any[] }) {

  // We fallback to standard icons or just Sparkles
  const iconMap: Record<string, any> = {
    'Wifi': Wifi,
    'Utensils': Utensils,
    'Dumbbell': Dumbbell,
    'Sparkles': Sparkles,
    'Car': Car,
    'Clock': Clock,
    'Wine': Wine,
    'UtensilsCrossed': UtensilsCrossed,
    'Waves': Waves,
    'Users': Users,
    'Coffee': Coffee,
    'Shirt': Shirt,
  };

  const displayServices = initialServices.length > 0 ? initialServices.map((s) => ({
    icon: s.icon && iconMap[s.icon] ? iconMap[s.icon] : Sparkles,
    title: s.title,
    description: s.description
  })) : fallbackMainServices;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="Hotel Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif mb-4"
          >
            Services & Amenities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200"
          >
            Everything you need for a perfect stay
          </motion.p>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">
              Our Services
            </h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive amenities designed to exceed your expectations
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayServices.map((service: any, index: number) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Amenities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">
              Additional Amenities
            </h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-4" />
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              "Airport Shuttle Service",
              "Currency Exchange",
              "Tour Desk & Bookings",
              "Multilingual Staff",
              "Luggage Storage",
              "Express Check-in/out",
              "Business Center",
              "Gift Shop",
              "ATM on Premises",
              "Baby Sitting Services",
              "Pet-Friendly Rooms",
              "Wheelchair Accessible",
            ].map((amenity, index) => (
              <motion.div
                key={amenity}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center space-x-3 text-gray-700 bg-gray-50 p-4 rounded-lg"
              >
                <div className="w-2 h-2 bg-[#c9a961] rounded-full flex-shrink-0" />
                <span className="text-sm">{amenity}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#1e3a5f] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                Experience Our Services
              </h2>
              <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-6" />
              <p className="text-gray-300 mb-8">
                Book your stay today and enjoy all our world-class amenities and services
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#c9a961] hover:bg-[#b89851] text-white rounded-md transition-colors"
              >
                Book Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
