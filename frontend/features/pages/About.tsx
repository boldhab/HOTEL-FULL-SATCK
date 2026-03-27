"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Award, Users, Heart, Target, Sparkles, Clock, Shield, Star, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/components/media/ImageWithFallback";
import { useRef } from "react";

const heroImage = "https://images.unsplash.com/photo-1769766407883-1645a93eed40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGV4dGVyaW9yJTIwYnVpbGRpbmclMjBuaWdodHxlbnwxfHx8fDE3NzM5MjUyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const lobbyImage = "https://images.unsplash.com/photo-1744782996368-dc5b7e697f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczODM3MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const restaurantImage = "https://images.unsplash.com/photo-1768697358705-c1b60333da35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlc3RhdXJhbnQlMjBkaW5pbmclMjBlbGVnYW50fGVufDF8fHx8MTc3MzgxMjk3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const poolImage = "https://images.unsplash.com/photo-1731080647266-85cf1bc27162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN3aW1taW5nJTIwcG9vbCUyMGx1eHVyeXxlbnwxfHx8fDE3NzM5MjUyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const spaImage = "https://images.unsplash.com/photo-1584536318461-2ee56bc042f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHNwYSUyMHdlbGxuZXNzJTIwY2VudGVyfGVufDF8fHx8MTc3MzkyNTI5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const gymImage = "https://images.unsplash.com/photo-1669807164466-10a6584a067e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGZpdG5lc3MlMjBneW0lMjBtb2Rlcm58ZW58MXx8fHwxNzczOTI1Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function About() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <div className="pt-20 overflow-hidden">
      {/* Hero Section with Parallax */}
      <section ref={targetRef} className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale }}>
          <ImageWithFallback
            src={heroImage}
            alt="Ethio Bernos Hotel"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </motion.div>

        <motion.div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto" style={{ opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-1.5 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              Welcome to Excellence
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 tracking-tight"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
          >
            Discover the legacy of luxury and authentic Ethiopian hospitality
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/80 text-sm">Scroll to explore</span>
            <div className="w-[2px] h-12 bg-white/30 relative overflow-hidden">
              <motion.div
                animate={{ y: [0, 36] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-3 bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Our Story with Modern Layout */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[#c9a961] text-sm font-semibold uppercase tracking-wider">
                  Our Heritage
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1e3a5f] mt-2 mb-4">
                  A Legacy of
                  <span className="block text-[#c9a961]">Luxury & Hospitality</span>
                </h2>
                <div className="w-20 h-0.5 bg-[#c9a961] mb-6" />
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Founded in <span className="font-semibold text-[#1e3a5f]">2010</span>, Ethio Bernos Hotel has redefined luxury hospitality in Addis Ababa, becoming a sanctuary where modern sophistication meets authentic Ethiopian warmth.
                </p>
                <p>
                  What began as a vision to create an unparalleled hospitality experience has grown into one of Ethiopia's most prestigious addresses. Our journey is marked by an unwavering commitment to excellence, attention to detail, and a deep respect for Ethiopian culture and traditions.
                </p>
                <p>
                  Today, we stand as a beacon of luxury, having welcomed over <span className="font-semibold text-[#1e3a5f]">50,000+ guests</span> from around the world. Each stay is a testament to our dedication to creating unforgettable experiences that resonate long after departure.
                </p>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#c9a961]" />
                  <span className="text-sm text-gray-600">15+ Years Excellence</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#c9a961]" />
                  <span className="text-sm text-gray-600">Luxury Redefined</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={lobbyImage}
                  alt="Ethio Bernos Hotel Lobby"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-[#c9a961]/30 rounded-full -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-[#c9a961]/30 rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Modern Cards */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#c9a961] text-sm font-semibold uppercase tracking-wider">
              Our Purpose
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1e3a5f] mt-2">
              Mission & Vision
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a961]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-8 lg:p-10">
                <div className="w-20 h-20 bg-[#c9a961]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-10 w-10 text-[#c9a961]" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-serif text-[#1e3a5f] mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To deliver unparalleled hospitality experiences through personalized service, 
                  meticulous attention to detail, and genuine Ethiopian warmth. We are committed 
                  to exceeding expectations and creating lasting memories for every guest.
                </p>
                <div className="mt-6 flex items-center gap-2 text-[#c9a961] group-hover:gap-3 transition-all">
                  <span className="text-sm font-medium">Our Commitment</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a961]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-8 lg:p-10">
                <div className="w-20 h-20 bg-[#c9a961]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-10 w-10 text-[#c9a961]" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-serif text-[#1e3a5f] mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To set new benchmarks in Ethiopian hospitality by becoming the premier luxury 
                  destination where global travelers discover authentic Ethiopian culture, 
                  innovative service, and timeless elegance.
                </p>
                <div className="mt-6 flex items-center gap-2 text-[#c9a961] group-hover:gap-3 transition-all">
                  <span className="text-sm font-medium">Our Aspiration</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values - Enhanced */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#c9a961] text-sm font-semibold uppercase tracking-wider">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1e3a5f] mt-2 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide our actions and define our character
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Excellence",
                description: "We pursue perfection in every detail, setting new standards in hospitality.",
                color: "from-amber-500 to-orange-500",
              },
              {
                icon: Users,
                title: "Guest-Centric",
                description: "Our guests are family. Their satisfaction is our ultimate reward.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Shield,
                title: "Integrity",
                description: "We operate with unwavering honesty, transparency, and ethical conduct.",
                color: "from-emerald-500 to-teal-500",
              },
              {
                icon: Sparkles,
                title: "Innovation",
                description: "We embrace creativity and continuously elevate the guest experience.",
                color: "from-purple-500 to-pink-500",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a961]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1e3a5f] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid - Enhanced */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#c9a961] text-sm font-semibold uppercase tracking-wider">
              World-Class Amenities
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1e3a5f] mt-2 mb-4">
              Our Facilities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience unparalleled luxury across our meticulously designed spaces
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { image: lobbyImage, title: "Grand Lobby", description: "Elegant welcome experience" },
              { image: restaurantImage, title: "Fine Dining", description: "Culinary excellence" },
              { image: poolImage, title: "Infinity Pool", description: "Serene relaxation" },
              { image: spaImage, title: "Luxury Spa", description: "Rejuvenation sanctuary" },
              { image: gymImage, title: "Fitness Center", description: "State-of-the-art equipment" },
              { image: heroImage, title: "Exterior", description: "Architectural masterpiece" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-2xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Modern */}
      <section className="py-20 md:py-28 bg-[#1e3a5f] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
              Our Impact in Numbers
            </h2>
            <div className="w-20 h-0.5 bg-[#c9a961] mx-auto" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {[
              { number: "150+", label: "Luxury Rooms", suffix: "Exquisite accommodations" },
              { number: "15+", label: "Years Excellence", suffix: "Since 2010" },
              { number: "50K+", label: "Happy Guests", suffix: "And counting" },
              { number: "100+", label: "Dedicated Staff", suffix: "Passionate team members" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-[#c9a961] mb-2 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-gray-300 text-xs uppercase tracking-wider">{stat.suffix}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">
              Experience the Ethio Bernos Difference
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Join us and discover why we're Addis Ababa's premier luxury destination
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-[#c9a961] text-white rounded-full font-semibold hover:bg-[#b58a4a] transition-all duration-300 transform hover:scale-105 shadow-lg">
                Book Your Stay
              </button>
              <button className="px-8 py-3 border-2 border-[#c9a961] text-[#c9a961] rounded-full font-semibold hover:bg-[#c9a961] hover:text-white transition-all duration-300">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}