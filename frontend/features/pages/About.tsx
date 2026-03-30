"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Award, Users, Heart, Target, Sparkles, Clock, Shield, Star, ChevronRight, Coffee, Utensils, Hotel, Calendar, Quote, MapPin, Phone, Mail, Globe, Instagram, Facebook, Twitter } from "lucide-react";
import { ImageWithFallback } from "@/components/media/ImageWithFallback";
import { useRef } from "react";

const hotelImage = "/images/about_hotel.png";
const cafesImage = "/images/about_cafes.png";
const restourantsImage = "/images/about_restorant.png";
const restourantsImage1 = "/images/about_restorants.png";
const eventImage = "/images/about_event.png";

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
      {/* Hero Section with Enhanced Parallax */}
      <section ref={targetRef} className="relative h-[38vh] md:h-[44vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale }}>
          <ImageWithFallback
            src={hotelImage}
            alt="Ethio Bernos Hotel"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </motion.div>

        <motion.div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto" style={{ opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <span className="px-5 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/20 transition-all">
              Welcome to Excellence
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif mb-4 tracking-[0.02em] leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-[#e4d6b5] drop-shadow-[0_4px_14px_rgba(0,0,0,0.45)]"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block text-sm md:text-base text-[#f5f1e8] max-w-3xl mx-auto leading-relaxed font-medium px-5 py-3 rounded-full border border-white/25 bg-black/25 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
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
            <span className="text-white/80 text-sm tracking-wider">Scroll to explore</span>
            <div className="w-[2px] h-16 bg-white/30 relative overflow-hidden rounded-full">
              <motion.div
                animate={{ y: [0, 64] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-4 bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Our Story with Modern Layout */}
      <section className="py-28 md:py-40 bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50/30 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-12 h-[2px] bg-[#c9a961]" />
                  <span className="text-[#c9a961] text-sm font-semibold uppercase tracking-wider">
                    Our Heritage
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1e3a5f] mb-6 leading-tight">
                  A Legacy of
                  <span className="block text-[#c9a961] mt-2">Luxury & Hospitality</span>
                </h2>
                <div className="w-24 h-1 bg-[#c9a961] mb-8" />
              </div>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg font-medium text-gray-800">
                  We have the pleasure to introduce our hotel services and facilities to prominent individuals, organization and international communities who would be interested to spent their quality time at luxurious hotel and travelers from and to would be staying here comfortably as long as they needed it.
                </p>
                <p>
                  Ethio-bernos hotel Got the name from the highlanders wealthier men wear so called BERNOS. It is a wool cloak-like garment and hood woven in one piece, worn by Ethiopian highlanders. the wealthier men of Menz "wear the bernos, a tailored cape made of dark wool." The bernos was frequently worn by the elite highlanders. Today, average citizens sometimes wear it in traditional ceremonies and at special occasions. Social status is indicated by the garment's decorative pattern.
                </p>
                <p>
                  Ethio bernos hotel surunded by many historical attractions & places. we are located about 130 kms from the capital city addis at the northen side on the road to Mekele. Our facilities include guest rooms, bar and restaurants, functional halls, traditional coffee house. We have compliments from various entities, that our cultural dishes and restaurant have good repetition so the hotel is serving quality food for a meeting, wedding, parties, etc. at a large capacities.
                </p>
                <div className="bg-amber-50/50 p-6 rounded-2xl border-l-4 border-[#c9a961]">
                  <Quote className="h-8 w-8 text-[#c9a961] mb-3 opacity-50" />
                  <p className="text-gray-700 italic">
                    We aim to offer you comfortable surroundings great food and excellent services to make your stay truly enjoyable. We look forward to welcoming you soon.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-8 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#c9a961]/10 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-[#c9a961]" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">15+ Years Excellence</div>
                    <div className="text-xs text-gray-500">Since 2010</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#c9a961]/10 rounded-full flex items-center justify-center">
                    <Star className="h-5 w-5 text-[#c9a961]" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Luxury Redefined</div>
                    <div className="text-xs text-gray-500">Premium Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={hotelImage}
                  alt="Ethio Bernos Hotel Lobby"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-8 -left-8 w-40 h-40 border-2 border-[#c9a961]/20 rounded-full -z-10" />
              <div className="absolute -top-8 -right-8 w-40 h-40 border-2 border-[#c9a961]/20 rounded-full -z-10" />
              <div className="absolute top-1/2 -left-4 w-20 h-20 bg-[#c9a961]/10 rounded-full blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Modern Cards */}
      <section className="py-28 md:py-40 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-[#c9a961]" />
              <span className="text-[#c9a961] text-sm font-semibold uppercase tracking-wider">
                Our Purpose
              </span>
              <div className="w-12 h-[2px] bg-[#c9a961]" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1e3a5f] mt-2">
              Mission & Vision
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a961]/10 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c9a961]/5 to-transparent rounded-bl-full" />
                <div className="p-10 lg:p-12">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#c9a961] to-[#b58a4a] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <Target className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-serif text-[#1e3a5f] mb-4">
                    Our Mission
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    To deliver unparalleled hospitality experiences through personalized service, 
                    meticulous attention to detail, and genuine Ethiopian warmth. We are committed 
                    to exceeding expectations and creating lasting memories for every guest.
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-[#c9a961] group-hover:gap-3 transition-all cursor-pointer">
                    <span className="text-sm font-medium tracking-wider">OUR COMMITMENT</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a961]/10 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c9a961]/5 to-transparent rounded-bl-full" />
                <div className="p-10 lg:p-12">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#c9a961] to-[#b58a4a] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <Sparkles className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-serif text-[#1e3a5f] mb-4">
                    Our Vision
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    To set new benchmarks in Ethiopian hospitality by becoming the premier luxury 
                    destination where global travelers discover authentic Ethiopian culture, 
                    innovative service, and timeless elegance.
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-[#c9a961] group-hover:gap-3 transition-all cursor-pointer">
                    <span className="text-sm font-medium tracking-wider">OUR ASPIRATION</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values - Enhanced with Icons */}
      <section className="py-28 md:py-40 bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-50/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-[#c9a961]" />
              <span className="text-[#c9a961] text-sm font-semibold uppercase tracking-wider">
                What We Stand For
              </span>
              <div className="w-12 h-[2px] bg-[#c9a961]" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1e3a5f] mt-2 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide our actions and define our character
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Excellence",
                description: "We pursue perfection in every detail, setting new standards in hospitality.",
                gradient: "from-amber-500 to-orange-500",
                color: "#c9a961"
              },
              {
                icon: Users,
                title: "Guest-Centric",
                description: "Our guests are family. Their satisfaction is our ultimate reward.",
                gradient: "from-blue-500 to-cyan-500",
                color: "#3b82f6"
              },
              {
                icon: Shield,
                title: "Integrity",
                description: "We operate with unwavering honesty, transparency, and ethical conduct.",
                gradient: "from-emerald-500 to-teal-500",
                color: "#10b981"
              },
              {
                icon: Sparkles,
                title: "Innovation",
                description: "We embrace creativity and continuously elevate the guest experience.",
                gradient: "from-purple-500 to-pink-500",
                color: "#a855f7"
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className={`w-20 h-20 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <value.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#1e3a5f] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c9a961] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Gallery with Interactive Cards */}
      <section className="py-28 md:py-40 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-[#c9a961]" />
              <span className="text-[#c9a961] text-sm font-semibold uppercase tracking-wider">
                World-Class Amenities
              </span>
              <div className="w-12 h-[2px] bg-[#c9a961]" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1e3a5f] mt-2 mb-4">
              Our Facilities
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience unparalleled luxury across our meticulously designed spaces
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { image: cafesImage, title: "Cafés", description: "Warm spaces for coffee and conversation", icon: Coffee },
              { image: restourantsImage, title: "Restaurants", description: "Delicious local and international dining", icon: Utensils },
              { image: hotelImage, title: "Luxury Hotel", description: "Comfortable stays with quality service", icon: Hotel },
              { image: eventImage, title: "Event Spaces", description: "Memorable celebrations and gatherings", icon: Calendar },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-xl"
              >
                <div className="relative h-80 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-0 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="h-5 w-5 text-[#c9a961]" />
                    <h3 className="text-white text-2xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Counter Animation */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-[#c9a961]" />
              <span className="text-[#c9a961] text-sm font-semibold uppercase tracking-wider">
                Our Impact in Numbers
              </span>
              <div className="w-12 h-[2px] bg-[#c9a961]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1e3a5f] mb-4">
              By The Numbers
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {[
              { number: 150, label: "Luxury Rooms", suffix: "Exquisite accommodations", suffix2: "Spaces" },
              { number: 15, label: "Years Excellence", suffix: "Since 2010", suffix2: "Of Service" },
              { number: 50, label: "Happy Guests", suffix: "And counting", suffix2: "Thousand+" },
              { number: 100, label: "Dedicated Staff", suffix: "Passionate team", suffix2: "Members" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="text-6xl md:text-7xl font-bold text-[#c9a961] mb-3 tracking-tight">
                  {stat.number}+
                </div>
                <div className="text-[#1e3a5f] font-semibold text-lg mb-1">{stat.label}</div>
                <div className="text-gray-500 text-sm">{stat.suffix}</div>
                <div className="text-gray-400 text-xs mt-1">{stat.suffix2}</div>
                <div className="w-12 h-[2px] bg-[#c9a961]/30 mx-auto mt-4 group-hover:w-24 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[#1e3a5f] to-[#0a2a4a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
              Experience the Ethio Bernos Difference
            </h2>
            <p className="text-gray-300 text-xl mb-12">
              Join us and discover why we're Addis Ababa's premier luxury destination
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button className="px-10 py-4 bg-[#c9a961] text-white rounded-full font-semibold hover:bg-[#b58a4a] transition-all duration-300 transform hover:scale-105 shadow-xl text-lg">
                Book Your Stay
              </button>
              <button className="px-10 py-4 border-2 border-[#c9a961] text-[#c9a961] rounded-full font-semibold hover:bg-[#c9a961] hover:text-white transition-all duration-300 text-lg">
                Contact Us
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="flex items-center justify-center gap-3 text-white">
                <MapPin className="h-5 w-5 text-[#c9a961]" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-white">
                <Phone className="h-5 w-5 text-[#c9a961]" />
                <span>+251 123 456 789</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-white">
                <Mail className="h-5 w-5 text-[#c9a961]" />
                <span>info@ethiobernos.com</span>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#c9a961] transition-all cursor-pointer">
                <Facebook className="h-5 w-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#c9a961] transition-all cursor-pointer">
                <Twitter className="h-5 w-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#c9a961] transition-all cursor-pointer">
                <Instagram className="h-5 w-5 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
