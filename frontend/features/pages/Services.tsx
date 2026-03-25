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

  const menuPreview = [
    { name: "Doro Wat", description: "Traditional Ethiopian chicken stew with injera", price: "ETB 420" },
    { name: "Tibs", description: "Sizzling beef cubes with rosemary and onions", price: "ETB 520" },
    { name: "Grilled Nile Perch", description: "Pan-seared fish with lemon herb sauce", price: "ETB 640" },
    { name: "Pasta Alfredo", description: "Creamy pasta with mushrooms and parmesan", price: "ETB 460" },
  ];

  const dishPhotos = [
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  ];

  const conferenceLayouts = [
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=80",
  ];

  const eventGallery = [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
  ];

  const amenityHighlights = [
    {
      icon: Wifi,
      title: "Free Wi-Fi",
      description: "Reliable internet coverage in rooms, lobby, and dining areas.",
    },
    {
      icon: Car,
      title: "Parking",
      description: "Secure on-site parking for guests and event visitors.",
    },
    {
      icon: Coffee,
      title: "Room Service",
      description: "Food and beverages available directly to your room.",
    },
    {
      icon: Clock,
      title: "24/7 Reception",
      description: "Front desk support at any time for check-in and assistance.",
    },
  ];

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

      {/* Restaurant / Dining */}
      <section className="py-16 md:py-24 bg-[#f8f8f8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">Restaurant / Dining</h2>
              <div className="w-20 h-1 bg-[#c9a961] mb-6" />
              <p className="text-gray-600 mb-6">
                Enjoy Ethiopian and international dishes prepared by our chefs, with curated beverages in a calm dining atmosphere.
              </p>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-lg font-semibold text-[#1e3a5f] mb-4">Menu Preview</h3>
                <div className="space-y-3">
                  {menuPreview.map((item) => (
                    <div key={item.name} className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <p className="text-sm font-semibold text-[#1e3a5f]">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 inline-flex items-center rounded-full bg-[#1e3a5f] px-4 py-2 text-sm text-white">
                Open Hours: 6:30 AM - 11:00 PM
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {dishPhotos.map((src, index) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={index === 0 ? "col-span-2" : ""}
                >
                  <ImageWithFallback
                    src={src}
                    alt="Dining service dish"
                    className="h-52 w-full rounded-xl object-cover shadow-sm"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conference / Meeting */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">Conference / Meeting Services</h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional meeting spaces for workshops, conferences, and business gatherings.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-xl bg-[#f8f8f8] border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2">Meeting Hall Capacity</h3>
              <p className="text-3xl font-bold text-[#1e3a5f] mb-4">Up to 50 People</p>
              <p className="text-sm text-gray-600 mb-6">Flexible room setup with projector support, audio system, and hospitality service.</p>
              <Link href="/contact" className="inline-flex items-center justify-center px-5 py-3 bg-[#1e3a5f] hover:bg-[#16304f] text-white rounded-md transition-colors">
                Send Booking Inquiry
              </Link>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-4">
              {conferenceLayouts.map((src, index) => (
                <motion.div key={src} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                  <ImageWithFallback
                    src={src}
                    alt="Conference layout"
                    className="h-44 w-full rounded-xl object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 md:py-24 bg-[#f8f8f8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">Events</h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Weddings, private parties, and business events hosted with tailored support and venue styling.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {eventGallery.map((src, index) => (
              <motion.div key={src} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <ImageWithFallback src={src} alt="Past event at Ethio Bernos" className="h-56 w-full rounded-xl object-cover shadow-sm" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Basic Amenities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">Basic Amenities</h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-4" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {amenityHighlights.map((amenity, index) => (
              <motion.div
                key={amenity.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-xl border border-gray-200 p-5 bg-gradient-to-b from-white to-gray-50 shadow-sm hover:shadow-md transition-all"
              >
                <div className="h-10 w-10 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center mb-3">
                  <amenity.icon className="h-5 w-5 text-[#1e3a5f]" />
                </div>
                <h3 className="font-semibold text-[#1e3a5f] mb-2">{amenity.title}</h3>
                <p className="text-sm text-gray-600">{amenity.description}</p>
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
