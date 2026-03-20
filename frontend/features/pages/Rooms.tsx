"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { RoomCard } from "@/components/features/RoomCard";
import { ImageWithFallback } from "@/components/media/ImageWithFallback";

const heroImage = "https://images.unsplash.com/photo-1759223198981-661cadbbff36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb20lMjBzdWl0ZXxlbnwxfHx8fDE3NzM4OTMwMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// Fallback hardcoded rooms incase backend is down
const fallbackRooms = [
  {
    id: "1",
    name: "Standard Room",
    image: "https://images.unsplash.com/photo-1592901147824-212145b050cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGRlbHV4ZSUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzczOTA3NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Comfortable and well-appointed room perfect for solo travelers or couples. Features modern amenities and a cozy atmosphere.",
    features: ["Free WiFi", "Smart TV", "Coffee Maker", "City View"],
    price: 100,
    maxGuests: 2,
  },
  {
    id: "2",
    name: "Deluxe Room",
    image: "https://images.unsplash.com/photo-1592901147824-212145b050cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGRlbHV4ZSUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzczOTA3NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Spacious room with modern amenities and stunning city views. Perfect for both business and leisure travelers.",
    features: ["Free WiFi", "Smart TV", "Coffee Maker", "Work Desk"],
    price: 150,
    maxGuests: 2,
  }
];

export function Rooms({ initialRooms = [] }: { initialRooms?: any[] }) {
  // Map backend rooms to frontend shape, or use fallback if empty
  const displayRooms = initialRooms.length > 0 ? initialRooms.map(r => ({
    id: r.id,
    name: r.name,
    image: r.images?.[0] || 'https://images.unsplash.com/photo-1592901147824-212145b050cf?auto=format&fit=crop&q=80&w=1080',
    description: r.description,
    features: ["Free WiFi", "Smart TV", "City View"], 
    price: r.price,
    maxGuests: r.capacity
  })) : fallbackRooms;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="Our Rooms"
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
            Our Rooms & Suites
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200"
          >
            Find your perfect sanctuary
          </motion.p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">
              Choose Your Accommodation
            </h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each room is thoughtfully designed to provide comfort, style, and all the amenities you need
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayRooms.map((room: any, index: number) => (
              <RoomCard key={room.id} {...room} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Room Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">
              Room Amenities
            </h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              All rooms come equipped with premium amenities for your comfort
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              "High-Speed WiFi",
              "Smart TV with Cable",
              "Premium Bedding",
              "Coffee/Tea Maker",
              "Mini Bar",
              "Work Desk",
              "In-Room Safe",
              "Air Conditioning",
              "24/7 Room Service",
              "Daily Housekeeping",
              "Iron & Ironing Board",
              "Hair Dryer",
            ].map((amenity, index) => (
              <motion.div
                key={amenity}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center space-x-2 text-gray-700"
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
                Ready to Book Your Stay?
              </h2>
              <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-6" />
              <p className="text-gray-300 mb-8">
                Contact us today to reserve your room or inquire about special packages and group bookings
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-[#c9a961] hover:bg-[#b89851] text-white rounded-md transition-colors"
                >
                  Book Now
                </Link>
                <a
                  href="tel:+251911234567"
                  className="inline-flex items-center justify-center px-8 py-3 border border-white hover:bg-white hover:text-[#1e3a5f] text-white rounded-md transition-colors"
                >
                  Call Us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
