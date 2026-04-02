"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { 
  Wifi, Utensils, Dumbbell, Sparkles, Car, Clock, Wine, 
  UtensilsCrossed, Waves, Users, Coffee, Shirt, X, 
  ArrowRight, Calendar, Star, Award, ChevronRight,
  Phone, Mail, MapPin, ExternalLink, Heart, Check,
  Shield, Gift, Globe, Camera, Music, Sun, Moon, Leaf
} from "lucide-react";
import { ServiceCard } from "@/components/features/ServiceCard";
import { ImageWithFallback } from "@/components/media/ImageWithFallback";

const heroImage = "/images/service_hero.png";

const fallbackMainServices = [
  {
    icon: Wifi,
    title: "Free High-Speed WiFi",
    description: "Stay connected with complimentary high-speed internet access throughout the hotel premises",
    gradient: "from-blue-50 to-indigo-50",
  },
  {
    icon: Utensils,
    title: "Fine Dining Restaurant",
    description: "World-class restaurant serving international and local cuisine prepared by expert chefs",
    gradient: "from-amber-50 to-orange-50",
  },
  {
    icon: Users,
    title: "Meeting Hall",
    description: "Modern meeting halls with flexible layouts for conferences, workshops, and business gatherings.",
    gradient: "from-emerald-50 to-teal-50",
  },
  {
    icon: Sparkles,
    title: "Events",
    description: "Professional event hosting for weddings, celebrations, and corporate functions with dedicated coordination.",
    gradient: "from-purple-50 to-pink-50",
  },
];

type MeetingHall = {
  title: string;
  capacity: string;
  description: string;
  image: string;
  features: string[];
  details: string;
  idealFor: string[];
};

export function Services({ initialServices = [] }: { initialServices?: any[] }) {
  const [showRestaurantDetails, setShowRestaurantDetails] = useState(false);
  const [selectedMeetingHall, setSelectedMeetingHall] = useState<MeetingHall | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const iconMap: Record<string, any> = {
    'Wifi': Wifi, 'Utensils': Utensils, 'Dumbbell': Dumbbell,
    'Sparkles': Sparkles, 'Car': Car, 'Clock': Clock, 'Wine': Wine,
    'UtensilsCrossed': UtensilsCrossed, 'Waves': Waves, 'Users': Users,
    'Coffee': Coffee, 'Shirt': Shirt,
  };

  const displayServices = initialServices.length > 0 ? initialServices.map((s) => ({
    icon: s.icon && iconMap[s.icon] ? iconMap[s.icon] : Sparkles,
    title: s.title,
    description: s.description
  })) : fallbackMainServices;

  const detailLinkByTitle: Record<string, string> = {
    "free high-speed wifi": "#services-other",
    "fine dining restaurant": "#services-restaurant",
    "meeting hall": "#services-meeting",
    "events": "#services-events",
  };

  const quickAccessLinks = [
    { label: "Gourmet Dining", href: "#services-restaurant", icon: Utensils },
    { label: "Meeting Halls", href: "#services-meeting", icon: Users },
    { label: "Weddings & Events", href: "#services-events", icon: Sparkles },
    { label: "Amenities", href: "#services-other", icon: Wifi },
  ];

  const dishPhotos = [
    "/images/restorant_food1.png",
    "/images/restourant_food2.png",
    "/images/about_restorants.png",
    "/images/about_restorant.png",
    "/images/about_cafes.png",
  ];

  const eventGallery = [
    "/images/about_event.png",
    "/images/gallery_1.png",
    "/images/meeting_hall1.png",
  ];

  const amenityHighlights = [
    { icon: Wifi, title: "Free Wi-Fi", description: "Reliable internet coverage in rooms, lobby, and dining areas.", color: "text-blue-600" },
    { icon: Car, title: "Secure Parking", description: "24/7 secure on-site parking for guests and event visitors.", color: "text-emerald-600" },
    { icon: Coffee, title: "Premium Room Service", description: "Gourmet food and beverages available directly to your room.", color: "text-amber-600" },
    { icon: Clock, title: "24/7 Concierge", description: "Dedicated front desk support at any time for all your needs.", color: "text-purple-600" },
    { icon: Shield, title: "Security", description: "24-hour surveillance and security personnel ensuring your safety.", color: "text-red-600" },
    { icon: Gift, title: "Welcome Amenities", description: "Personalized welcome gifts and complimentary refreshments.", color: "text-pink-600" },
    { icon: Sun, title: "Rooftop Terrace", description: "Breathtaking city views from our exclusive rooftop lounge.", color: "text-orange-600" },
    { icon: Leaf, title: "Eco-Friendly", description: "Sustainable practices and green initiatives throughout.", color: "text-green-600" },
  ];

  const meetingHallShowcase: MeetingHall[] = [
    {
      title: "Grand Ballroom",
      capacity: "Up to 300 persons",
      description: "Our magnificent ballroom featuring crystal chandeliers, advanced acoustics, and flexible configurations for grand celebrations and corporate galas.",
      image: "/images/meeting_hall1.png",
      features: ["4K Projection", "Premium Sound System", "Stage Lighting", "Dance Floor"],
      details: "The Grand Ballroom offers a premium setting with elegant decor, generous floor space, and customizable seating arrangements to match your event style and flow.",
      idealFor: ["Weddings", "Corporate Galas", "Large Conferences", "Award Ceremonies"],
    },
    {
      title: "Executive Conference Hall",
      capacity: "Up to 120 persons",
      description: "A sophisticated mid-size venue equipped with cutting-edge technology, ideal for corporate meetings, training sessions, and professional seminars.",
      image: "/images/meeting_hall2.png",
      features: ["HD Video Wall", "Conference Mic System", "Whiteboard", "Breakout Rooms"],
      details: "This hall is designed for focused, productive sessions with excellent visibility, audio clarity, and flexible setups for workshops or board-level presentations.",
      idealFor: ["Team Trainings", "Product Launches", "Workshops", "Business Seminars"],
    },
    {
      title: "Boardroom Suite",
      capacity: "Up to 25 persons",
      description: "An exclusive, intimate setting for high-level board meetings, executive discussions, and private business negotiations.",
      image: "/images/meeting_hall3.png",
      features: ["Smart Board", "Video Conferencing", "Catering Service", "Privacy Screens"],
      details: "The Boardroom Suite delivers privacy and premium comfort for confidential discussions, with dedicated in-room service and modern collaboration tools.",
      idealFor: ["Executive Meetings", "Private Negotiations", "Strategy Sessions", "VIP Briefings"],
    },
  ];

  const faqs = [
    { q: "How quickly do you respond to event inquiries?", a: "Our dedicated events team responds within 30 minutes during business hours, ensuring your planning process moves forward smoothly." },
    { q: "Can I customize menus for my event?", a: "Absolutely! Our executive chefs work closely with you to create personalized menus that reflect your taste and accommodate all dietary requirements." },
    { q: "What AV equipment is provided?", a: "All meeting halls come equipped with state-of-the-art AV equipment including projectors, screens, sound systems, and complimentary high-speed WiFi." },
    { q: "What's your cancellation policy?", a: "We offer flexible cancellation terms based on event size and lead time. Contact our events team for a personalized proposal." },
  ];

  const culinaryFeatures = [
    { icon: Coffee, title: "Breakfast Buffet", description: "Extensive international breakfast spread" },
    { icon: Wine, title: "Wine Cellar", description: "Curated selection of local and international wines" },
    { icon: Utensils, title: "Live Stations", description: "Interactive cooking stations with expert chefs" },
    { icon: Globe, title: "Global Cuisine", description: "Authentic dishes from around the world" },
  ];

  const eventStats = [
    { value: "350+", label: "Events Hosted", icon: Calendar },
    { value: "4.9/5", label: "Client Rating", icon: Star },
    { value: "100%", label: "Satisfaction", icon: Heart },
    { value: "15+", label: "Years Experience", icon: Award },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Enhanced Parallax */}
      <section ref={heroRef} className="relative h-[80vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <ImageWithFallback
            src={heroImage}
            alt="Hotel Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </motion.div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-6 border border-white/30"
            >
              Excellence in Every Detail
            </motion.span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight">
              Services & <span className="text-[#c9a961]">Amenities</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Where luxury meets functionality — every service thoughtfully curated for your comfort and delight
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#services-overview"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a961] hover:bg-[#b89851] rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="font-semibold">Explore Services</span> 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all duration-300 border border-white/50"
            >
              <span className="font-semibold">Contact Us</span>
            </Link>
          </motion.div>
        </div>
        
        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div 
              className="w-1.5 h-2 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Enhanced Quick Navigation */}
      <section className="sticky top-20 z-30 bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-3">
            {quickAccessLinks.map((item, idx) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-[#c9a961] hover:bg-[#c9a961] hover:text-white hover:shadow-lg overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#c9a961] to-[#e4c28e] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <item.icon className="relative z-10 w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">{item.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Grid with Premium Cards */}
      <section id="services-overview" className="scroll-mt-32 py-24 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-sm uppercase tracking-wider text-[#c9a961] font-semibold"
            >
              What We Offer
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1e3a5f] mb-4 mt-2">
              Our Signature Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#c9a961] to-[#e4c28e] mx-auto mb-6 rounded-full" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Comprehensive amenities designed to exceed your expectations and create unforgettable experiences
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayServices.map((service: any, index: number) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard
                  {...service}
                  detailHref={detailLinkByTitle[String(service.title || "").trim().toLowerCase()]}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Restaurant Section with Glassmorphism */}
      <section id="services-restaurant" className="scroll-mt-32 py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-100 via-orange-50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-100 via-yellow-50 to-transparent rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm uppercase tracking-wider text-[#c9a961] font-semibold">Culinary Excellence</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1e3a5f] mb-4 mt-2">
                Restaurant & Bars
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#c9a961] to-[#e4c28e] mb-6 rounded-full" />
              
              <div className="space-y-5 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Experience culinary artistry at its finest. Our award-winning restaurant brings together global flavors and local traditions under one roof.
                </p>
                <div className="grid grid-cols-2 gap-3 my-6">
                  {culinaryFeatures.map((feature) => (
                    <div key={feature.title} className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                      <feature.icon className="w-5 h-5 text-[#c9a961]" />
                      <div>
                        <p className="text-sm font-semibold text-[#1e3a5f]">{feature.title}</p>
                        <p className="text-xs text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border-l-4 border-[#c9a961] shadow-lg">
                  <p className="italic text-gray-700">
                    "Serving both Ethiopian and International cuisine with classic cocktails and inventive concoctions in an elegant atmosphere perfect for any occasion."
                  </p>
                  <p className="mt-3 text-sm font-semibold text-[#c9a961]">— Executive Chef</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowRestaurantDetails(true)}
                  className="group inline-flex items-center gap-2 px-8 py-3 bg-[#c9a961] hover:bg-[#b89851] text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                >
                  <span>View Details</span> 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="/contact?subject=dining"
                  className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white rounded-full transition-all duration-300"
                >
                  Make a Reservation
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {dishPhotos.map((src, index) => (
                <motion.div
                  key={src}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className={`${index === 0 ? "col-span-2" : ""} overflow-hidden rounded-2xl shadow-xl group`}
                >
                  <ImageWithFallback
                    src={src}
                    alt="Dining service dish"
                    className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Meeting Halls Section */}
      <section id="services-meeting" className="scroll-mt-32 py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-wider text-[#c9a961] font-semibold">Professional Spaces</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1e3a5f] mb-4 mt-2">
              Premier Meeting Halls
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#c9a961] to-[#e4c28e] mx-auto mb-6 rounded-full" />
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Three versatile venues equipped with cutting-edge technology and supported by our dedicated events team for flawless execution
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {meetingHallShowcase.map((hall, index) => (
              <motion.div
                key={hall.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-72 overflow-hidden">
                  <ImageWithFallback
                    src={hall.image}
                    alt={hall.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-semibold">{hall.capacity}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-[#c9a961] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Premium
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-[#1e3a5f] mb-2">{hall.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{hall.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {hall.features.map((feature) => (
                      <span key={feature} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedMeetingHall(hall)}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1e3a5f] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#16304f]"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl bg-gradient-to-r from-[#1e3a5f] via-[#2c4e7a] to-[#1e3a5f] p-8 text-center shadow-xl"
          >
            <p className="text-white text-xl mb-4 font-semibold">Need assistance selecting the perfect venue?</p>
            <Link
              href="/contact?subject=meeting"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#c9a961] hover:bg-[#b89851] text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Book a Consultation <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Events Section with Stats */}
      <section id="services-events" className="scroll-mt-32 py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-wider text-[#c9a961] font-semibold">Celebrate in Style</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1e3a5f] mb-4 mt-2">
              Weddings & Events
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#c9a961] to-[#e4c28e] mx-auto mb-6 rounded-full" />
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Create unforgettable memories with our bespoke event planning, elegant venues, and exceptional service
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {eventStats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: idx * 0.1, type: "spring" }}
                    className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-lg transition-shadow"
                  >
                    <stat.icon className="w-6 h-6 text-[#c9a961] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#1e3a5f]">{stat.value}</p>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-serif text-[#1e3a5f]">Why Choose Us</h3>
                <div className="space-y-3">
                  {[
                    "Breathtaking venues with customizable layouts",
                    "Award-winning culinary team creating bespoke menus",
                    "Dedicated wedding and event coordinators",
                    "State-of-the-art lighting and sound systems",
                    "Luxury accommodation packages for guests",
                    "Comprehensive photography and videography services",
                  ].map((point) => (
                    <motion.div 
                      key={point} 
                      className="flex items-start gap-3 group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="mt-1 w-5 h-5 rounded-full bg-[#c9a961] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700 group-hover:text-[#1e3a5f] transition-colors">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact?subject=event"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#1e3a5f] hover:bg-[#16304f] text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
              >
                Plan Your Event <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {eventGallery.map((src, index) => (
                <motion.div
                  key={src}
                  whileHover={{ scale: 1.05 }}
                  className={`${index === 0 ? "col-span-2" : ""} overflow-hidden rounded-2xl shadow-xl group`}
                >
                  <ImageWithFallback
                    src={src}
                    alt="Past event at Ethio Bernos"
                    className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Amenities Grid */}
      <section id="services-other" className="scroll-mt-32 py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-wider text-[#c9a961] font-semibold">Essential Comforts</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1e3a5f] mb-4 mt-2">
              Premium Amenities
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#c9a961] to-[#e4c28e] mx-auto mb-6 rounded-full" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Experience unparalleled comfort with our carefully curated selection of premium amenities
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenityHighlights.map((amenity, index) => (
              <motion.div
                key={amenity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a961]/0 to-[#c9a961]/0 group-hover:from-[#c9a961]/5 group-hover:to-[#c9a961]/10 transition-all duration-300" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1e3a5f] to-[#2c4e7a] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <amenity.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2">{amenity.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{amenity.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section with Better Styling */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-wider text-[#c9a961] font-semibold">Common Questions</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1e3a5f] mb-4 mt-2">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#c9a961] to-[#e4c28e] mx-auto rounded-full" />
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((item, index) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-[#1e3a5f] text-lg">{item.q}</span>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full bg-[#c9a961]/10 flex items-center justify-center"
                  >
                    <ChevronRight className="w-5 h-5 text-[#c9a961]" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: activeFaq === index ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    {item.a}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section with Parallax */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/95 via-[#1e3a5f]/90 to-[#1e3a5f]/95" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
                Ready to Experience Excellence?
              </h2>
              <div className="w-24 h-1 bg-[#c9a961] mx-auto mb-6 rounded-full" />
              <p className="text-gray-200 text-lg mb-10 leading-relaxed">
                Book your stay today and immerse yourself in our world-class amenities and services. 
                Let us craft an unforgettable experience tailored just for you.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#c9a961] hover:bg-[#b89851] text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <span className="font-semibold">Book Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#1e3a5f] rounded-full transition-all duration-300"
                >
                  <span className="font-semibold">Contact Us</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Restaurant Details Modal with Better Design */}
      {showRestaurantDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Restaurant details"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowRestaurantDetails(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between rounded-t-2xl">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif text-[#1e3a5f]">Restaurant & Bars</h3>
                <p className="text-sm text-gray-500 mt-1">Culinary Excellence at Your Service</p>
              </div>
              <button
                type="button"
                onClick={() => setShowRestaurantDetails(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {dishPhotos.slice(0, 4).map((src, index) => (
                  <div key={src} className={index === 0 ? "col-span-2" : ""}>
                    <ImageWithFallback
                      src={src}
                      alt="Restaurant detail"
                      className="h-48 w-full rounded-xl object-cover shadow-md"
                    />
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 space-y-4">
                <h4 className="text-xl font-semibold text-[#1e3a5f] flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#c9a961]" />
                  Dining Experience
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Our Hotel brings the best of the world's cuisine under one roof. Within bars and restaurants and cafe, you will never have to travel far to taste the best that Bernos has to offer.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  In our restaurant you get: Splendid breakfast buffet, freshly cut and prepared seasonal fruit, selection of cold meats and cheeses, hot zone with egg dishes to your liking, grilled vegetables, omelet, sausages, bread station, yoghurts, different juices, drinks station, coffee and tea station with express coffee.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-[#1e3a5f] mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#c9a961]" />
                    Opening Hours
                  </h4>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Daily:</span> 7:00 AM - 11:00 PM
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    <span className="font-semibold">Weekends & Holidays:</span> 7:00 AM - 11:00 PM
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-[#1e3a5f]">Note:</span> Special dietary accommodations available upon request
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-[#1e3a5f] mb-3 flex items-center gap-2">
                    <Wine className="w-4 h-4 text-[#c9a961]" />
                    Jano Bar
                  </h4>
                  <p className="text-sm text-gray-700 mb-4">
                    Lounge bar with a wide range of drinks, cocktails, mixers... It also has a hot and cold snack food area, soups, salads, sandwiches, house specialties.
                  </p>
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs uppercase text-gray-500">Type of Cuisine</p>
                      <p className="text-sm font-semibold text-[#1e3a5f]">Snack Food & Cocktails</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs uppercase text-gray-500">Atmosphere</p>
                      <p className="text-sm font-semibold text-[#1e3a5f]">Modern & Relaxed</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-4 pt-3 border-t border-gray-200">
                    <span className="font-semibold text-[#1e3a5f]">Note:</span> Enjoy live sports events in a fresh and stylish ambience
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Meeting Hall Details Modal */}
      {selectedMeetingHall && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedMeetingHall.title} details`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedMeetingHall(null)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-gray-200 bg-white p-6 rounded-t-2xl">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#c9a961]">Meeting Hall Detail</p>
                <h3 className="text-2xl md:text-3xl font-serif text-[#1e3a5f] mt-1">{selectedMeetingHall.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{selectedMeetingHall.capacity}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMeetingHall(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <ImageWithFallback
                src={selectedMeetingHall.image}
                alt={selectedMeetingHall.title}
                className="h-64 w-full rounded-2xl object-cover shadow-md"
              />

              <div className="rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 p-6">
                <p className="text-gray-700 leading-relaxed">{selectedMeetingHall.details}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-[#1e3a5f] mb-3">Included Features</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMeetingHall.features.map((feature) => (
                    <span key={feature} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-[#1e3a5f] mb-3">Best For</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedMeetingHall.idealFor.map((useCase) => (
                    <div key={useCase} className="flex items-center gap-2 rounded-xl bg-amber-50 p-3">
                      <Check className="w-4 h-4 text-[#c9a961]" />
                      <p className="text-sm text-gray-700">{useCase}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/contact?subject=meeting"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1e3a5f] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#16304f]"
                >
                  Reserve This Hall
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedMeetingHall(null)}
                  className="inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
