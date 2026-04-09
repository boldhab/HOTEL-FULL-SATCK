"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  ChevronRight, Wifi, Utensils, Dumbbell, Sparkles, Car, Clock, 
  Star, Users, Award, ArrowRight, MapPin, Phone, Mail, 
  Calendar, Heart, Bath, Coffee, Tv, GlassWater
} from "lucide-react";
import { Button } from "@/components/ui/actions/button";
import { RoomCard } from "@/components/features/RoomCard";
import { ServiceCard } from "@/components/features/ServiceCard";
import { ImageWithFallback } from "@/components/media/ImageWithFallback";
import { useState, useEffect, useRef } from "react";
import type { PublicSettings } from "@/lib/settings";

const heroImage = "/images/service_hero1.png";
const aboutImage = "/images/about_hotel.png";
const overviewRoomImages = ["/images/room1.png", "/images/room2.png", "/images/room3.png", "/images/room4.png"];
const overviewRoomNames = ["ROOM1", "ROOM2", "ROOM3", "ROOM4"];

const fallbackRooms = [
  {
    id: "1",
    name: "Deluxe King Room",
    image: "https://images.unsplash.com/photo-1592901147824-212145b050cf?auto=format&fit=crop&q=80&w=1080",
    description: "Spacious room with modern amenities and stunning city views.",
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
    image: "https://images.unsplash.com/photo-1758448511255-ac2a24a135d7?auto=format&fit=crop&q=80&w=1080",
    description: "Luxurious suite with separate living area and premium amenities.",
    features: ["Free WiFi", "Work Desk", "Mini Bar", "Rain Shower"],
    price: 250,
    maxGuests: 3,
    size: "42 m2",
    bedType: "Twin Beds",
    viewType: "Garden View",
    occupancy: "3 adults",
    tagline: "Spacious suite with lounge area and work desk",
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
    description: "The ultimate luxury experience with panoramic views and exclusive services.",
    features: ["Free WiFi", "Smart TV", "Mini Bar", "Rain Shower"],
    price: 500,
    maxGuests: 4,
    size: "65 m2",
    bedType: "King Bed",
    viewType: "Balcony View",
    occupancy: "4 adults",
    tagline: "Premium suite with balcony and private lounge",
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

const fallbackServices = [
  {
    icon: Wifi,
    title: "Free High-Speed WiFi",
    description:
      "Stay connected with complimentary high-speed internet access throughout the hotel premises",
    detailHref: "/services#services-other",
  },
  {
    icon: Utensils,
    title: "Fine Dining Restaurant",
    description:
      "World-class restaurant serving international and local cuisine prepared by expert chefs",
    detailHref: "/services#services-restaurant",
  },
  {
    icon: Users,
    title: "Meeting Hall",
    description:
      "Modern meeting halls with flexible layouts for conferences, workshops, and business gatherings.",
    detailHref: "/services#services-meeting",
  },
  {
    icon: Calendar,
    title: "Events",
    description:
      "Professional event hosting for weddings, celebrations, and corporate functions with dedicated coordination.",
    detailHref: "/services#services-events",
  },
];

const defaultGallery = [
  "/images/overview_gallery1.png",
  "/images/overview_gallery2.png",
  "/images/overview_gallery3.png",
  "/images/overview_gallery4.png",
];
const HOME_ROOM_LIMIT = 4;
const normalizePhoneHref = (value: string) => `tel:${value.replace(/[^\d+]/g, "")}`;

export function Home({
  initialData = { rooms: [], gallery: [], services: [] },
  currencyCode = "ETB",
  settings,
}: {
  initialData?: any;
  currencyCode?: string;
  settings: PublicSettings;
}) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLElement>(null);
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const roomRecords = Array.isArray(initialData.rooms)
    ? [...initialData.rooms]
        .sort((a: any, b: any) => {
          const aTime = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bTime = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bTime - aTime;
        })
      .slice(0, HOME_ROOM_LIMIT)
    : [];
  const hasUsableRoomData = roomRecords.some((r: any) => {
    if (!r || typeof r !== "object") return false;
    return Boolean(r.name || r.description || r.price || r.capacity || (Array.isArray(r.images) && r.images.length > 0));
  });

  const displayRooms = hasUsableRoomData
    ? fallbackRooms.slice(0, HOME_ROOM_LIMIT).map((fallbackRoom, index) => {
        const r = roomRecords[index];
        const overviewImage = overviewRoomImages[index % overviewRoomImages.length];
        const overviewName = overviewRoomNames[index % overviewRoomNames.length];
        if (!r || typeof r !== "object") {
          return {
            ...fallbackRoom,
            name: overviewName,
            image: overviewImage,
            gallery: [overviewImage, ...fallbackRoom.gallery.filter((image) => image !== overviewImage)],
          };
        }

        return {
          id: r.id || fallbackRoom.id,
          name: overviewName,
          image: overviewImage,
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
          gallery: [overviewImage, ...(Array.isArray(r.images) && r.images.length > 0 ? r.images.filter((image: string) => image !== overviewImage) : fallbackRoom.gallery.filter((image) => image !== overviewImage))],
          isFeatured: typeof r.isFeatured === "boolean" ? r.isFeatured : Boolean(fallbackRoom.isFeatured),
        };
      })
    : fallbackRooms.slice(0, HOME_ROOM_LIMIT).map((fallbackRoom, index) => {
        const overviewImage = overviewRoomImages[index % overviewRoomImages.length];
        const overviewName = overviewRoomNames[index % overviewRoomNames.length];
        return {
          ...fallbackRoom,
          name: overviewName,
          image: overviewImage,
          gallery: [overviewImage, ...fallbackRoom.gallery.filter((image) => image !== overviewImage)],
        };
      });

  const displayGallery = initialData.gallery?.length >= 4 
    ? initialData.gallery.slice(0, 4).map((g: any) => g.imageUrl)
    : defaultGallery;

  const iconMap: Record<string, any> = { 'Wifi': Wifi, 'Utensils': Utensils, 'Dumbbell': Dumbbell, 'Sparkles': Sparkles, 'Car': Car, 'Clock': Clock };
  const serviceSectionLinkByTitle: Record<string, string> = {
    "free high-speed wifi": "/services#services-other",
    "fine dining restaurant": "/services#services-restaurant",
    "meeting hall": "/services#services-meeting",
    "events": "/services#services-events",
  };
  
  const displayServices = initialData.services?.length > 0
    ? initialData.services.slice(0, 6).map((s: any) => ({
        icon: s.icon && iconMap[s.icon] ? iconMap[s.icon] : Sparkles,
        title: s.title,
        description: s.description,
        detailHref:
          s.detailHref ||
          serviceSectionLinkByTitle[String(s.title || "").trim().toLowerCase()] ||
          "/services",
      }))
    : fallbackServices;

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Traveler",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "Exceptional service and luxurious accommodations. The staff went above and beyond to make my stay memorable."
    },
    {
      name: "Michael Chen",
      role: "Family Vacationer",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      text: "Perfect family getaway! The kids loved the pool, and we enjoyed the amazing dining options."
    },
    {
      name: "Emma Williams",
      role: "Frequent Guest",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      text: "My go-to hotel in the city. Consistent quality, beautiful rooms, and outstanding hospitality."
    }
  ];

  const faqItems = [
    {
      question: "What time is check-in and check-out?",
      answer: "Check-in starts at 2:00 PM and check-out is at 12:00 PM. Early check-in and late check-out can be arranged based on availability."
    },
    {
      question: "Do you offer airport pickup and drop-off?",
      answer: "Yes. We provide airport transfer service on request. Please share your flight details in advance so our team can arrange it smoothly."
    },
    {
      question: "Is breakfast included with the room?",
      answer: "Most room packages include complimentary breakfast. You can confirm inclusions while booking or contact us for package details."
    },
    {
      question: "Is free WiFi available in all rooms?",
      answer: "Yes. High-speed WiFi is available in all guest rooms and common areas throughout the hotel."
    },
    {
      question: "Can I book rooms for events or group stays?",
      answer: "Absolutely. We host business events, family gatherings, and group reservations with tailored room and service options."
    },
    {
      question: "How can I contact the hotel quickly?",
      answer: `You can call us directly at ${settings.contactPhone} or use the contact page for booking, event, and service inquiries.`
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ opacity, scale }}
        >
          <ImageWithFallback
            src={heroImage}
            alt="Ethio Bernos Hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="absolute top-20 sm:top-24 lg:top-24 left-0 right-0 z-20 px-4"
        >
          <div className="container mx-auto">
            <div className="mx-auto max-w-5xl rounded-2xl border border-white/20 bg-black/35 backdrop-blur-md px-3 py-3 md:px-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-1.5 text-white">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs sm:text-sm tracking-[0.18em] text-[#c9a961] uppercase">{settings.hotelName}</span>
                    <span className="h-1 w-1 rounded-full bg-white/70" />
                    <span className="text-xs sm:text-sm text-white/85">Trusted by travelers in Debre Birhan</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center text-[#c9a961]">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold text-white">4.8</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/90">
                      <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#c9a961]" />
                      <span>412 verified reviews</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/90">
                      <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#c9a961]" />
                      <span>{settings.hotelAddress}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(settings.hotelAddress || settings.hotelName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-white transition hover:bg-white/20"
                  >
                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#c9a961]" />
                    View Map
                  </a>
                  <a
                    href={normalizePhoneHref(settings.contactPhone)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a961] px-3 py-1.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-[#b89851]"
                  >
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Call Hotel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-44 sm:pt-48 md:pt-52 lg:pt-56">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-5 sm:mb-6 leading-[1.08] tracking-tight text-balance"
          >
            Experience Luxury
            <br />
            <span className="text-[#c9a961] relative inline-block">
              Redefined
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-[3px] bg-[#c9a961]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Where elegance meets exceptional hospitality in the heart of Debre Birhan
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#c9a961] hover:bg-[#b89851] text-white px-8 py-6 text-base sm:text-lg rounded-full min-w-[180px] group relative overflow-hidden"
              asChild
            >
              <Link href="/rooms">
                <span className="relative z-10 flex items-center">
                  Explore Rooms
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                  >
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/80 text-white hover:bg-white hover:text-[#1e3a5f] px-8 py-6 text-base sm:text-lg rounded-full min-w-[180px] backdrop-blur-sm bg-white/5"
              asChild
            >
              <Link href="/contact">
                Book Now
                <Calendar className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white rounded-full mt-2 animate-bounce" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About/USP Section with Enhanced Design */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a961]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1e3a5f]/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={aboutImage}
                  alt="About Ethio Bernos Hotel"
                  className="w-full h-[500px] md:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-[#c9a961] text-white p-6 rounded-2xl shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm">Years of Excellence</div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="inline-block px-4 py-1 bg-[#c9a961]/10 rounded-full mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-[#c9a961] text-sm font-medium">About Us</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-[#1e3a5f] mb-4 leading-tight">
                Welcome to <br />
                <span className="text-[#c9a961]">Ethio Bernos</span>
              </h2>
              
              <div className="w-24 h-1 bg-gradient-to-r from-[#c9a961] to-transparent mb-8" />
              
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Nestled in the heart of Debre Birhan, Ethio Bernos Hotel offers an unparalleled blend 
                of modern luxury and traditional Ethiopian hospitality. Our commitment to excellence 
                ensures every guest experiences the finest in comfort and service.
              </p>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                From our elegantly appointed rooms to our world-class amenities, every detail has 
                been carefully crafted to create an unforgettable stay that exceeds expectations.
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { number: "150+", label: "Luxury Rooms", icon: Users },
                  { number: "24/7", label: "Premium Service", icon: Clock },
                  { number: "5★", label: "Guest Rating", icon: Star }
                ].map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    className="text-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    whileHover={{ y: -5 }}
                  >
                    <stat.icon className="w-6 h-6 text-[#c9a961] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[#1e3a5f] mb-1">{stat.number}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              
              <Button
                className="bg-[#1e3a5f] hover:bg-[#2d5278] text-white group relative overflow-hidden"
                asChild
              >
                <Link href="/about">
                  <span className="relative z-10 flex items-center">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Rooms with Enhanced Cards */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#c9a961] font-semibold text-sm uppercase tracking-wider">Luxury Accommodations</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1e3a5f] mt-2 mb-4">
              Choose Your Perfect Stay
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#c9a961] to-transparent mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Browse room types with size, bed options, views, occupancy, and instant access to full details.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {displayRooms.map((room: any, index: number) => (
              <RoomCard key={room.id} {...room} currencyCode={currencyCode} index={index} />
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              className="border-[#c9a961] text-[#c9a961] hover:bg-[#c9a961] hover:text-white px-8 py-6 group"
              asChild
            >
              <Link href="/rooms">
                View All Rooms
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services/Amenities with Modern Cards */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a961]/5 via-transparent to-[#1e3a5f]/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#c9a961] font-semibold text-sm uppercase tracking-wider">World-Class Facilities</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1e3a5f] mt-2 mb-4">
              Amenities & Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#c9a961] to-transparent mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Experience world-class facilities and services designed for your ultimate comfort
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {displayServices.map((service: any, index: number) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview with Enhanced Layout */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#c9a961] font-semibold text-sm uppercase tracking-wider">Visual Journey</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1e3a5f] mt-2 mb-4">
              Our Gallery
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#c9a961] to-transparent mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Take a visual tour of our stunning facilities and elegant spaces
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {displayGallery.map((img: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-2xl group cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <ImageWithFallback
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <motion.div 
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center"
                  initial={false}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="bg-white rounded-full p-3"
                  >
                    <ArrowRight className="w-6 h-6 text-[#1e3a5f]" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              className="border-[#c9a961] text-[#c9a961] hover:bg-[#c9a961] hover:text-white px-8 py-6 group"
              asChild
            >
              <Link href="/gallery">
                View Full Gallery
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#c9a961] font-semibold text-sm uppercase tracking-wider">Guest Experiences</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1e3a5f] mt-2 mb-4">
              What Our Guests Say
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#c9a961] to-transparent mx-auto mb-6" />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: idx === activeTestimonial ? 1 : 0,
                  x: idx === activeTestimonial ? 0 : 50,
                  display: idx === activeTestimonial ? "block" : "none"
                }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#c9a961]">
                      <ImageWithFallback
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <motion.div 
                      className="absolute -top-2 -right-2 bg-[#c9a961] rounded-full p-1"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Star className="w-4 h-4 text-white fill-current" />
                    </motion.div>
                  </div>
                </div>
                <div className="text-4xl text-[#c9a961] mb-4">"</div>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed italic">
                  {testimonial.text}
                </p>
                <div className="font-bold text-[#1e3a5f] text-lg">{testimonial.name}</div>
                <div className="text-gray-500">{testimonial.role}</div>
              </motion.div>
            ))}
            
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <Button 
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === activeTestimonial ? "w-8 bg-[#c9a961]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-28 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f6f1] to-white" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#c9a961] font-semibold text-sm uppercase tracking-wider">Need Help?</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1e3a5f] mt-2 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#c9a961] to-transparent mx-auto mb-5" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Quick answers about booking, services, and your stay at Ethio Bernos Hotel.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid gap-4">
            {faqItems.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-[#1e3a5f]/10 bg-white shadow-sm p-6 md:p-7"
              >
                <h3 className="text-lg md:text-xl font-semibold text-[#1e3a5f] mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 mb-4">Still have a question?</p>
            <Button
              className="bg-[#1e3a5f] hover:bg-[#2d5278] text-white"
              asChild
            >
              <Link href="/contact">
                Contact Our Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
