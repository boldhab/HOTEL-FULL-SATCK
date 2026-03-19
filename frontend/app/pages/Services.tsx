"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Wifi, Utensils, Dumbbell, Sparkles, Car, Clock, Wine, UtensilsCrossed, Waves, Users, Coffee, Shirt } from "lucide-react";
import { ServiceCard } from "../components/ServiceCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const heroImage = "https://images.unsplash.com/photo-1759038085950-1234ca8f5fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlY2VwdGlvbiUyMGRlc2slMjBjb25jaWVyZ2V8ZW58MXx8fHwxNzczOTI1Mjk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const restaurantImage = "https://images.unsplash.com/photo-1768697358705-c1b60333da35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlc3RhdXJhbnQlMjBkaW5pbmclMjBlbGVnYW50fGVufDF8fHx8MTc3MzgxMjk3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const poolImage = "https://images.unsplash.com/photo-1731080647266-85cf1bc27162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN3aW1taW5nJTIwcG9vbCUyMGx1eHVyeXxlbnwxfHx8fDE3NzM5MjUyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const spaImage = "https://images.unsplash.com/photo-1584536318461-2ee56bc042f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHNwYSUyMHdlbGxuZXNzJTIwY2VudGVyfGVufDF8fHx8MTc3MzkyNTI5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const gymImage = "https://images.unsplash.com/photo-1669807164466-10a6584a067e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGZpdG5lc3MlMjBneW0lMjBtb2Rlcm58ZW58MXx8fHwxNzczOTI1Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const conferenceImage = "https://images.unsplash.com/photo-1505845753232-f74a87b62db6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGNvbmZlcmVuY2UlMjByb29tJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzczOTI1Mjk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const mainServices = [
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
  },
  {
    icon: Car,
    title: "Valet Parking",
    description: "Complimentary valet parking service for all hotel guests with secure parking facilities",
  },
  {
    icon: Clock,
    title: "24/7 Concierge",
    description: "Round-the-clock concierge service to assist with all your needs and requests",
  },
  {
    icon: Wine,
    title: "Rooftop Bar & Lounge",
    description: "Elegant rooftop bar offering premium cocktails and stunning city views",
  },
  {
    icon: UtensilsCrossed,
    title: "Room Service",
    description: "24-hour in-room dining service with an extensive menu selection",
  },
  {
    icon: Waves,
    title: "Infinity Pool",
    description: "Luxurious outdoor infinity pool with panoramic views and poolside service",
  },
  {
    icon: Users,
    title: "Conference & Events",
    description: "Professional meeting rooms and event spaces with modern AV equipment",
  },
  {
    icon: Coffee,
    title: "Executive Lounge",
    description: "Exclusive lounge access for business travelers with refreshments and workspaces",
  },
  {
    icon: Shirt,
    title: "Laundry & Dry Cleaning",
    description: "Same-day laundry and dry cleaning services available for your convenience",
  },
];

const detailedServices = [
  {
    title: "Restaurant & Dining",
    image: restaurantImage,
    description: "Experience culinary excellence at our signature restaurant. Our expert chefs create masterful dishes using the finest ingredients, blending international flavors with traditional Ethiopian cuisine.",
    features: ["Breakfast Buffet", "À la Carte Dining", "Private Dining", "Dietary Options"],
  },
  {
    title: "Infinity Pool & Cabanas",
    image: poolImage,
    description: "Relax by our stunning infinity pool with breathtaking city views. Enjoy poolside service, comfortable cabanas, and a dedicated bar serving refreshing cocktails and light meals.",
    features: ["Heated Pool", "Pool Bar", "Towel Service", "Sun Loungers"],
  },
  {
    title: "Spa & Wellness Center",
    image: spaImage,
    description: "Indulge in rejuvenating treatments at our world-class spa. From therapeutic massages to beauty treatments, our experienced therapists ensure complete relaxation and renewal.",
    features: ["Massages", "Facials", "Body Treatments", "Sauna & Steam"],
  },
  {
    title: "Fitness & Recreation",
    image: gymImage,
    description: "Maintain your fitness routine with our state-of-the-art gym facilities. Equipped with the latest cardio and strength training equipment, plus personal training services.",
    features: ["Cardio Equipment", "Free Weights", "Personal Training", "Yoga Classes"],
  },
  {
    title: "Business & Events",
    image: conferenceImage,
    description: "Host successful meetings and events in our versatile conference spaces. Modern AV equipment, high-speed internet, and professional catering services ensure flawless execution.",
    features: ["Meeting Rooms", "Banquet Halls", "AV Equipment", "Catering Services"],
  },
];

export function Services() {
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
            {mainServices.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">
              Featured Facilities
            </h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our premium facilities in detail
            </p>
          </motion.div>

          <div className="space-y-16">
            {detailedServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <h3 className="text-2xl md:text-3xl font-serif text-[#1e3a5f] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#c9a961] rounded-full flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
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
