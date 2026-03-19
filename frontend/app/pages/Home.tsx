"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight, Wifi, Utensils, Dumbbell, Sparkles, Car, Clock } from "lucide-react";
import { Button } from "@/app/components/ui/actions/button";
import { RoomCard } from "../components/RoomCard";
import { ServiceCard } from "../components/ServiceCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const heroImage = "https://images.unsplash.com/photo-1744782996368-dc5b7e697f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczODM3MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const aboutImage = "https://images.unsplash.com/photo-1769766407883-1645a93eed40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGV4dGVyaW9yJTIwYnVpbGRpbmclMjBuaWdodHxlbnwxfHx8fDE3NzM5MjUyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const gallery1 = "https://images.unsplash.com/photo-1768697358705-c1b60333da35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlc3RhdXJhbnQlMjBkaW5pbmclMjBlbGVnYW50fGVufDF8fHx8MTc3MzgxMjk3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const gallery2 = "https://images.unsplash.com/photo-1731080647266-85cf1bc27162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN3aW1taW5nJTIwcG9vbCUyMGx1eHVyeXxlbnwxfHx8fDE3NzM5MjUyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const gallery3 = "https://images.unsplash.com/photo-1584536318461-2ee56bc042f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHNwYSUyMHdlbGxuZXNzJTIwY2VudGVyfGVufDF8fHx8MTc3MzkyNTI5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const gallery4 = "https://images.unsplash.com/photo-1759038085950-1234ca8f5fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlY2VwdGlvbiUyMGRlc2slMjBjb25jaWVyZ2V8ZW58MXx8fHwxNzczOTI1Mjk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const featuredRooms = [
  {
    id: "1",
    name: "Deluxe Room",
    image: "https://images.unsplash.com/photo-1592901147824-212145b050cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGRlbHV4ZSUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzczOTA3NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Spacious room with modern amenities and stunning city views.",
    features: ["Free WiFi", "Smart TV", "Coffee Maker", "City View"],
    price: 150,
    maxGuests: 2,
  },
  {
    id: "2",
    name: "Executive Suite",
    image: "https://images.unsplash.com/photo-1758448511255-ac2a24a135d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGV4ZWN1dGl2ZSUyMHN1aXRlJTIwbGl2aW5nfGVufDF8fHx8MTc3MzkyNTI5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Luxurious suite with separate living area and premium amenities.",
    features: ["Free WiFi", "Work Desk", "Mini Bar", "City View"],
    price: 250,
    maxGuests: 3,
  },
  {
    id: "3",
    name: "Presidential Suite",
    image: "https://images.unsplash.com/photo-1664780476492-fbb9fd277ce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHByZXNpZGVudGlhbCUyMHN1aXRlJTIwbHV4dXJ5fGVufDF8fHx8MTc3MzkyNTI5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "The ultimate luxury experience with panoramic views and exclusive services.",
    features: ["Free WiFi", "Smart TV", "Mini Bar", "City View"],
    price: 500,
    maxGuests: 4,
  },
];

const services = [
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "High-speed internet access throughout the hotel",
  },
  {
    icon: Utensils,
    title: "Fine Dining",
    description: "World-class restaurant serving international cuisine",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "State-of-the-art gym equipment and personal trainers",
  },
  {
    icon: Sparkles,
    title: "Spa & Wellness",
    description: "Rejuvenating spa treatments and wellness programs",
  },
  {
    icon: Car,
    title: "Valet Parking",
    description: "Complimentary valet parking for all guests",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Round-the-clock concierge and room service",
  },
];

export function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="Ethioberno Hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6"
          >
            Experience Luxury<br />
            <span className="text-[#c9a961]">Redefined</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 text-gray-200"
          >
            Where elegance meets exceptional hospitality
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-[#c9a961] hover:bg-[#b89851] text-white px-8 py-6 text-lg"
              asChild
            >
              <Link href="/rooms">
                Explore Rooms
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About/USP Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ImageWithFallback
                src={aboutImage}
                alt="About Ethioberno Hotel"
                className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">
                Welcome to Ethioberno
              </h2>
              <div className="w-20 h-1 bg-[#c9a961] mb-6" />
              <p className="text-gray-700 mb-4 leading-relaxed">
                Nestled in the heart of Addis Ababa, Ethioberno Hotel offers an unparalleled blend 
                of modern luxury and traditional Ethiopian hospitality. Our commitment to excellence 
                ensures every guest experiences the finest in comfort and service.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                From our elegantly appointed rooms to our world-class amenities, every detail has 
                been carefully crafted to create an unforgettable stay.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl text-[#c9a961] mb-1">150+</div>
                  <div className="text-sm text-gray-600">Luxury Rooms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-[#c9a961] mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Service</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-[#c9a961] mb-1">5★</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
              <Button
                className="bg-[#1e3a5f] hover:bg-[#2d5278] text-white"
                asChild
              >
                <Link href="/about">
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4"
            >
              Our Rooms
            </motion.h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our collection of beautifully designed rooms and suites
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredRooms.map((room, index) => (
              <RoomCard key={room.id} {...room} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              className="border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white"
              asChild
            >
              <Link href="/rooms">
                View All Rooms
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services/Amenities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4"
            >
              Amenities & Services
            </motion.h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience world-class facilities and services designed for your comfort
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4"
            >
              Gallery
            </motion.h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take a visual tour of our stunning facilities
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[gallery1, gallery2, gallery3, gallery4].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg group cursor-pointer"
              >
                <ImageWithFallback
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              className="border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white"
              asChild
            >
              <Link href="/gallery">
                View Full Gallery
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section className="py-16 md:py-24 bg-[#1e3a5f] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                Special Offer
              </h2>
              <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-6" />
              <p className="text-xl mb-4">Save 20% on Extended Stays</p>
              <p className="text-gray-300 mb-8">
                Book 3 nights or more and enjoy an exclusive 20% discount on your stay. 
                Experience luxury for longer at Ethioberno Hotel.
              </p>
              <Button
                size="lg"
                className="bg-[#c9a961] hover:bg-[#b89851] text-white"
                asChild
              >
                <Link href="/contact">
                  Book Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
