"use client";

import { motion } from "motion/react";
import { Award, Users, Heart, Target } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const heroImage = "https://images.unsplash.com/photo-1769766407883-1645a93eed40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGV4dGVyaW9yJTIwYnVpbGRpbmclMjBuaWdodHxlbnwxfHx8fDE3NzM5MjUyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const lobbyImage = "https://images.unsplash.com/photo-1744782996368-dc5b7e697f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczODM3MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const restaurantImage = "https://images.unsplash.com/photo-1768697358705-c1b60333da35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlc3RhdXJhbnQlMjBkaW5pbmclMjBlbGVnYW50fGVufDF8fHx8MTc3MzgxMjk3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const poolImage = "https://images.unsplash.com/photo-1731080647266-85cf1bc27162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN3aW1taW5nJTIwcG9vbCUyMGx1eHVyeXxlbnwxfHx8fDE3NzM5MjUyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const spaImage = "https://images.unsplash.com/photo-1584536318461-2ee56bc042f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHNwYSUyMHdlbGxuZXNzJTIwY2VudGVyfGVufDF8fHx8MTc3MzkyNTI5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const gymImage = "https://images.unsplash.com/photo-1669807164466-10a6584a067e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGZpdG5lc3MlMjBneW0lMjBtb2Rlcm58ZW58MXx8fHwxNzczOTI1Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function About() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="About Ethioberno Hotel"
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
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200"
          >
            Discover the story behind Ethioberno Hotel
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">
                Our Story
              </h2>
              <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-6" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-gray-700 leading-relaxed"
            >
              <p>
                Founded in 2010, Ethioberno Hotel has become a landmark of luxury and hospitality 
                in Addis Ababa. Our journey began with a simple vision: to create a haven where 
                travelers from around the world could experience the perfect blend of modern 
                comfort and authentic Ethiopian warmth.
              </p>
              <p>
                Over the years, we have grown to become one of the most sought-after destinations 
                for both business and leisure travelers. Our commitment to excellence has earned 
                us numerous accolades and the trust of thousands of satisfied guests.
              </p>
              <p>
                Today, Ethioberno Hotel stands as a testament to our dedication to providing 
                unparalleled service, luxurious accommodations, and memorable experiences. Every 
                member of our team is passionate about ensuring your stay exceeds expectations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="w-16 h-16 bg-[#c9a961]/10 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-[#c9a961]" />
              </div>
              <h3 className="text-2xl font-serif text-[#1e3a5f] mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide world-class hospitality services that exceed our guests' expectations 
                through personalized attention, exceptional comfort, and genuine Ethiopian warmth. 
                We strive to create memorable experiences that inspire our guests to return and 
                share their stories.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="w-16 h-16 bg-[#c9a961]/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-[#c9a961]" />
              </div>
              <h3 className="text-2xl font-serif text-[#1e3a5f] mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be recognized as the premier luxury hotel in Ethiopia, setting new standards 
                in hospitality excellence. We envision a future where Ethioberno Hotel is 
                synonymous with luxury, innovation, and authentic Ethiopian culture on the 
                global stage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">
              Our Core Values
            </h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Excellence",
                description: "We pursue excellence in every detail, ensuring the highest standards of quality and service.",
              },
              {
                icon: Users,
                title: "Guest-Centric",
                description: "Our guests are at the heart of everything we do. Their satisfaction is our success.",
              },
              {
                icon: Heart,
                title: "Integrity",
                description: "We conduct our business with honesty, transparency, and ethical practices.",
              },
              {
                icon: Target,
                title: "Innovation",
                description: "We continuously evolve and embrace new ways to enhance the guest experience.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-[#c9a961]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-10 w-10 text-[#c9a961]" />
                </div>
                <h3 className="text-xl text-[#1e3a5f] mb-3">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">
              Our Facilities
            </h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our world-class amenities and facilities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { image: lobbyImage, title: "Elegant Lobby" },
              { image: restaurantImage, title: "Fine Dining Restaurant" },
              { image: poolImage, title: "Infinity Pool" },
              { image: spaImage, title: "Luxury Spa" },
              { image: gymImage, title: "Modern Fitness Center" },
              { image: heroImage, title: "Hotel Exterior" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg group cursor-pointer"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h3 className="text-white text-xl p-6 w-full">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-[#1e3a5f] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "150+", label: "Luxury Rooms" },
              { number: "10+", label: "Years of Excellence" },
              { number: "50K+", label: "Happy Guests" },
              { number: "100+", label: "Dedicated Staff" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl text-[#c9a961] mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
