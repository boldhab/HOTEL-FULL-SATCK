"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { RoomCard } from "@/components/features/RoomCard";
import { ImageWithFallback } from "@/components/media/ImageWithFallback";
import { useRef } from "react";
import type { PublicSettings } from "@/lib/settings";
import { 
  Wifi, 
  Tv, 
  Coffee, 
  Wine, 
  Bath, 
  Thermometer, 
  Briefcase, 
  Shield, 
  Sparkles,
  Clock,
  Calendar,
  Users,
  Bed,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const heroImage = "https://images.unsplash.com/photo-1759223198981-661cadbbff36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb20lMjBzdWl0ZXxlbnwxfHx8fDE3NzM4OTMwMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const roomPageImages = ["/images/room1.png", "/images/room2.png", "/images/room3.png", "/images/room4.png"];
const roomPageNames = ["ROOM1", "ROOM2", "ROOM3", "ROOM4"];
const ROOM_PAGE_LIMIT = 4;

// Fallback hardcoded rooms incase backend is down
const fallbackRooms = [
  {
    id: "1",
    name: "Deluxe King Room",
    image: "https://images.unsplash.com/photo-1592901147824-212145b050cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGRlbHV4ZSUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzczOTA3NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Experience refined comfort in our Deluxe King Room, featuring contemporary design and premium amenities for the discerning traveler.",
    features: ["Free WiFi", "Smart TV", "Coffee Maker", "Rain Shower"],
    price: 150,
    maxGuests: 2,
    size: "30 m2",
    bedType: "King Bed",
    viewType: "City View",
    occupancy: "2 adults + 1 child",
    tagline: "Includes breakfast and free Wi-Fi",
    amenities: ["WiFi", "Smart TV", "Minibar", "Rain Shower", "Coffee Maker"],
    policies: [
      "Check-in: 2:00 PM | Check-out: 12:00 PM",
      "Free cancellation up to 24 hours before arrival",
      "Extra bed available on request",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1592901147824-212145b050cf?auto=format&fit=crop&q=80&w=1080",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1080",
      "https://images.unsplash.com/photo-1551776235-dde6d4829808?auto=format&fit=crop&q=80&w=1080",
    ],
  },
  {
    id: "2",
    name: "Executive Twin Suite",
    image: "https://images.unsplash.com/photo-1592901147824-212145b050cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGRlbHV4ZSUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzczOTA3NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Perfect for business travelers, this spacious suite offers twin beds and a dedicated workspace for maximum productivity.",
    features: ["Free WiFi", "Smart TV", "Mini Bar", "Work Desk"],
    price: 250,
    maxGuests: 3,
    size: "42 m2",
    bedType: "Twin Beds",
    viewType: "Garden View",
    occupancy: "3 adults",
    tagline: "Suite comfort with lounge space and business-friendly setup",
    amenities: ["WiFi", "Smart TV", "Minibar", "Work Desk", "Rain Shower"],
    policies: [
      "Check-in: 2:00 PM | Check-out: 12:00 PM",
      "Non-smoking room",
      "Late checkout subject to availability",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1758448511255-ac2a24a135d7?auto=format&fit=crop&q=80&w=1080",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1080",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1080",
    ],
    isFeatured: true,
  },
  {
    id: "3",
    name: "Presidential Balcony Suite",
    image: "https://images.unsplash.com/photo-1664780476492-fbb9fd277ce8?auto=format&fit=crop&q=80&w=1080",
    description: "Our crown jewel featuring a private balcony with panoramic views, separate living area, and exclusive VIP amenities.",
    features: ["Free WiFi", "Smart TV", "Mini Bar", "Rain Shower"],
    price: 500,
    maxGuests: 4,
    size: "65 m2",
    bedType: "King Bed",
    viewType: "Balcony View",
    occupancy: "4 adults",
    tagline: "Premium suite with private balcony and elevated amenities",
    amenities: ["WiFi", "Smart TV", "Minibar", "Rain Shower", "Coffee Maker"],
    policies: [
      "Check-in: 2:00 PM | Check-out: 12:00 PM",
      "Free cancellation up to 48 hours before arrival",
      "Complimentary fruit basket on arrival",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1664780476492-fbb9fd277ce8?auto=format&fit=crop&q=80&w=1080",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1080",
      "https://images.unsplash.com/photo-1722794313028-a00700226fd7?auto=format&fit=crop&q=80&w=1080",
    ],
    isFeatured: true,
  },
  {
    id: "4",
    name: "Family Comfort Room",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1080",
    description: "A cozy family-friendly room with flexible bedding and generous floor space.",
    features: ["Free WiFi", "Smart TV", "Coffee Maker", "Work Desk"],
    price: 220,
    maxGuests: 4,
    size: "48 m2",
    bedType: "1 King + 1 Sofa Bed",
    viewType: "Courtyard View",
    occupancy: "2 adults + 2 children",
    tagline: "Ideal for family trips with extra space",
    amenities: ["WiFi", "Smart TV", "Coffee Maker", "Work Desk", "Mini Fridge"],
    policies: [
      "Check-in: 2:00 PM | Check-out: 12:00 PM",
      "Complimentary crib available on request",
      "Child-friendly amenities included",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1080",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1080",
      "https://images.unsplash.com/photo-1551776235-dde6d4829808?auto=format&fit=crop&q=80&w=1080",
    ],
  },
  {
    id: "5",
    name: "Garden View Deluxe",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1080",
    description: "Relaxing deluxe room overlooking the garden with warm interiors and modern comfort.",
    features: ["Free WiFi", "Smart TV", "Mini Bar", "Rain Shower"],
    price: 190,
    maxGuests: 2,
    size: "34 m2",
    bedType: "Queen Bed",
    viewType: "Garden View",
    occupancy: "2 adults",
    tagline: "Calm atmosphere with scenic garden views",
    amenities: ["WiFi", "Smart TV", "Minibar", "Rain Shower", "Tea Kettle"],
    policies: [
      "Check-in: 2:00 PM | Check-out: 12:00 PM",
      "Non-smoking room",
      "Late checkout subject to availability",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1080",
      "https://images.unsplash.com/photo-1592901147824-212145b050cf?auto=format&fit=crop&q=80&w=1080",
      "https://images.unsplash.com/photo-1758448511255-ac2a24a135d7?auto=format&fit=crop&q=80&w=1080",
    ],
  },
  {
    id: "6",
    name: "Business Premier Room",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1080",
    description: "Modern room tailored for business travelers with ergonomic workspace and fast connectivity.",
    features: ["Free WiFi", "Smart TV", "Work Desk", "Coffee Maker"],
    price: 280,
    maxGuests: 2,
    size: "38 m2",
    bedType: "King Bed",
    viewType: "City Skyline View",
    occupancy: "2 adults",
    tagline: "Business-ready comfort with premium amenities",
    amenities: ["WiFi", "Smart TV", "Work Desk", "Coffee Maker", "In-Room Safe"],
    policies: [
      "Check-in: 2:00 PM | Check-out: 12:00 PM",
      "Express check-in available",
      "Airport transfer available on request",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1080",
      "https://images.unsplash.com/photo-1664780476492-fbb9fd277ce8?auto=format&fit=crop&q=80&w=1080",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1080",
    ],
    isFeatured: true,
  },
];

const amenitiesList = [
  { icon: Wifi, name: "High-Speed WiFi", description: "Complimentary throughout the hotel" },
  { icon: Tv, name: "Smart TV", description: "55-inch with streaming services" },
  { icon: Bed, name: "Premium Bedding", description: "Luxury Egyptian cotton sheets" },
  { icon: Coffee, name: "Coffee/Tea Maker", description: "Premium selection" },
  { icon: Wine, name: "Mini Bar", description: "Stocked with refreshments" },
  { icon: Briefcase, name: "Work Desk", description: "Ergonomic workspace" },
  { icon: Shield, name: "In-Room Safe", description: "Secure your valuables" },
  { icon: Thermometer, name: "Climate Control", description: "Individual AC" },
  { icon: Bath, name: "Luxury Bathroom", description: "Rain shower & amenities" },
  { icon: Clock, name: "24/7 Service", description: "Room service available" },
];
const normalizePhoneHref = (value: string) => `tel:${value.replace(/[^\d+]/g, "")}`;

export function Rooms({
  initialRooms = [],
  currencyCode = "ETB",
  settings,
}: {
  initialRooms?: any[];
  currencyCode?: string;
  settings: PublicSettings;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const roomRecords = Array.isArray(initialRooms) ? initialRooms.slice(0, ROOM_PAGE_LIMIT) : [];
  const hasUsableRoomData = roomRecords.some((r: any) => {
    if (!r || typeof r !== "object") return false;
    return Boolean(r.name || r.description || r.price || r.capacity || (Array.isArray(r.images) && r.images.length > 0));
  });

  const displayRooms = hasUsableRoomData
    ? roomRecords.map((r: any, index: number) => {
        const fallbackRoom = fallbackRooms[index % fallbackRooms.length];
        const roomImage = roomPageImages[index % roomPageImages.length];
        const roomName = roomPageNames[index % roomPageNames.length];
        return {
          id: r.id || fallbackRoom.id,
          name: roomName,
          image: roomImage,
          description: r.description || fallbackRoom.description,
          features: Array.isArray(r.features) && r.features.length > 0 ? r.features : fallbackRoom.features,
          price: typeof r.price === "number" ? r.price : fallbackRoom.price,
          maxGuests: typeof r.capacity === "number" ? r.capacity : fallbackRoom.maxGuests,
          size: r.size || fallbackRoom.size,
          bedType: r.bedType || fallbackRoom.bedType,
          viewType: r.viewType || fallbackRoom.viewType,
          occupancy: r.occupancy || `${r.capacity || fallbackRoom.maxGuests} adults`,
          tagline: r.tagline || fallbackRoom.tagline,
          amenities: Array.isArray(r.amenities) && r.amenities.length > 0 ? r.amenities : fallbackRoom.amenities,
          policies: Array.isArray(r.policies) && r.policies.length > 0 ? r.policies : fallbackRoom.policies,
          gallery: [roomImage, ...(Array.isArray(r.images) && r.images.length > 0 ? r.images.filter((image: string) => image !== roomImage) : fallbackRoom.gallery.filter((image) => image !== roomImage))],
          isFeatured: typeof r.isFeatured === "boolean" ? r.isFeatured : Boolean(fallbackRoom.isFeatured),
        };
      })
    : fallbackRooms.slice(0, ROOM_PAGE_LIMIT).map((fallbackRoom, index) => {
        const roomImage = roomPageImages[index % roomPageImages.length];
        const roomName = roomPageNames[index % roomPageNames.length];
        return {
          ...fallbackRoom,
          name: roomName,
          image: roomImage,
          gallery: [roomImage, ...fallbackRoom.gallery.filter((image) => image !== roomImage)],
        };
      });

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale }}>
          <ImageWithFallback
            src={heroImage}
            alt="Luxury Hotel Rooms"
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
            className="inline-block mb-4"
          >
            <span className="px-4 py-1.5 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              Luxury Accommodations
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 tracking-tight"
          >
            Rooms & Suites
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
          >
            Discover unparalleled comfort and elegance in our thoughtfully designed accommodations
          </motion.p>

          {/* Quick Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#c9a961]" />
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wider text-gray-300">Check-In</p>
                  <p className="text-xl font-semibold text-white">2:00 PM</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-[#c9a961]" />
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wider text-gray-300">Check-Out</p>
                  <p className="text-xl font-semibold text-white">12:00 PM</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-[#c9a961]" />
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wider text-gray-300">Max Capacity</p>
                  <p className="text-xl font-semibold text-white">Up to 4 Guests</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/80 text-sm">Discover our rooms</span>
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

      {/* Rooms Grid */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#c9a961] text-sm font-semibold uppercase tracking-wider">
              Luxury Selection
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1e3a5f] mt-2 mb-4">
              Choose Your Perfect Stay
            </h2>
            <div className="w-20 h-0.5 bg-[#c9a961] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Each room is meticulously designed to provide the ultimate in comfort and style
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
            {displayRooms.map((room: any, index: number) => (
              <RoomCard key={room.id} {...room} currencyCode={currencyCode} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Room Features with Icons */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#c9a961] text-sm font-semibold uppercase tracking-wider">
              Premium Experience
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1e3a5f] mt-2 mb-4">
              World-Class Amenities
            </h2>
            <div className="w-20 h-0.5 bg-[#c9a961] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Every room is thoughtfully equipped to exceed your expectations
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {amenitiesList.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <motion.div
                  key={amenity.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-[#c9a961]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#c9a961]/20 transition-colors">
                    <Icon className="h-6 w-6 text-[#c9a961]" />
                  </div>
                  <h3 className="font-semibold text-[#1e3a5f] mb-2">{amenity.name}</h3>
                  <p className="text-sm text-gray-600">{amenity.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Exclusive Offers Banner */}
      <section className="py-20 bg-gradient-to-r from-[#1e3a5f] to-[#2c4a6f] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="h-12 w-12 text-[#c9a961] mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
                Exclusive Suite Benefits
              </h2>
              <p className="text-gray-200 text-lg mb-8">
                Book our Executive or Presidential Suites and enjoy VIP privileges including:
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {[
                  "Complimentary Airport Transfer",
                  "Priority Check-in/out",
                  "Executive Lounge Access",
                  "Daily Breakfast Buffet",
                  "Turndown Service",
                  "Welcome Amenities"
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="h-5 w-5 text-[#c9a961] flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#c9a961] hover:bg-[#b89851] text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold group"
              >
                Inquire About Upgrades
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
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
              Ready to Experience Luxury?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Secure your preferred room today and enjoy an unforgettable stay
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#c9a961] hover:bg-[#b58a4a] text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold group"
              >
                Book Your Stay
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={normalizePhoneHref(settings.contactPhone)}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#c9a961] text-[#c9a961] hover:bg-[#c9a961] hover:text-white rounded-full transition-all duration-300 font-semibold"
              >
                Call {settings.contactPhone}
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Best rate guaranteed when booking directly
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
