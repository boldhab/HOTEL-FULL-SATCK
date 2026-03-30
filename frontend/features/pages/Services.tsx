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
    icon: Users,
    title: "Meeting Hall",
    description: "Modern meeting halls with flexible layouts for conferences, workshops, and business gatherings.",
  },
  {
    icon: Sparkles,
    title: "Events",
    description: "Professional event hosting for weddings, celebrations, and corporate functions with dedicated coordination.",
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

  const detailLinkByTitle: Record<string, string> = {
    "free high-speed wifi": "#services-other",
    "fine dining restaurant": "#services-restaurant",
    "meeting hall": "#services-meeting",
    "events": "#services-events",
  };

  const quickAccessLinks = [
    { label: "Restaurant", href: "#services-restaurant" },
    { label: "Meeting Halls", href: "#services-meeting" },
    { label: "Weddings & Events", href: "#services-events" },
    { label: "Amenities", href: "#services-other" },
  ];

  const dishPhotos = [
    "/images/restorant_food1.png",
    "/images/restourant_food2.png",
    "/images/about_restorants.png",
    "/images/about_restorant.png",
    "/images/about_cafes.png",
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

  const meetingHallShowcase = [
    {
      title: "ATSE ZERAYACOB MEETING HALL (አጼ ዘርዐያዕቆብ አዳራሽ)",
      capacity: "Up to 150 persons with table",
      description:
        "Our largest and most elegant hall, ideal for congresses, major conferences, and large formal gatherings.",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "AJIMA MEETING HALL (አጅማ አዳራሽ)",
      capacity: "Up to 100 persons with table",
      description:
        "A balanced mid-size function hall designed for company programs, workshops, and professional events.",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "ELFEGNE MEETING HALL (እልፍኝ አዳራሽ)",
      capacity: "Up to 50 persons with table",
      description:
        "A focused intimate hall for smaller meetings, board sessions, and private business discussions.",
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1000&q=80",
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

      {/* Quick Jump */}
      <section className="sticky top-20 z-20 border-y border-[#d9e2ec] bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap justify-center gap-2">
            {quickAccessLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-[#1e3a5f]/15 bg-[#f4f8fc] px-4 py-2 text-sm font-medium text-[#1e3a5f] transition-colors hover:bg-[#1e3a5f] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section id="services-overview" className="scroll-mt-32 py-16 md:py-24 bg-white">
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
              <ServiceCard
                key={service.title}
                {...service}
                detailHref={detailLinkByTitle[String(service.title || "").trim().toLowerCase()]}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant / Dining */}
      <section id="services-restaurant" className="scroll-mt-32 py-16 md:py-24 bg-[#f8f8f8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">RESTAURANT &amp; BARS</h2>
              <div className="w-20 h-1 bg-[#c9a961] mb-6" />
              <div className="space-y-4 text-gray-700">
                <p>
                  Our Hotel brings the best of all the world&apos;s cuisine under one roof. Within bars and restaurants and cafe, you will never have to travel far to taste the best that Bernos has to offer.
                </p>
                <p>
                  In our restorant you get: Splendid breakfast buffet, freshly cut and prepared seasonal fruit, selection of cold meats and cheeses, hot zone with egg dishes to your liking, grilled vegetables, omelet, sausages, bread station, yoghurts, different juices, drinks station (soya drinks, skimmed milk, whole fat milk, sparkling water, still water, red wine, white wine, cava). We also have a coffee and tea station with express coffee.
                </p>
                <p>
                  Serving both Ethiopian and International cuisine as well as classic cocktails and inventive new concoctions provides a great atmosphere for a relaxed drink with friends after a long day of sight-seeing, shopping or business meetings. Comfortable, spacious restaurant. The lineal organization of the buffet stations facilitates visibility and accessibility.
                </p>
              </div>

              <div className="mt-5 bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-lg font-semibold text-[#1e3a5f] mb-3">Opening Hours</h3>
                <p className="text-sm text-gray-700">
                  Open From Sunday to Sunday: 7:00am to 11:00pm / Weekends and bank holidays: 7:00am to 11am
                </p>
                <p className="text-sm text-gray-700 mt-3">
                  <span className="font-semibold text-[#1e3a5f]">NOTE:</span> Food and specific dishes for celiac and lactose non tolerant guests. Tell us when you make your booking.
                </p>
              </div>

              <div className="mt-5 bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-lg font-semibold text-[#1e3a5f] mb-3">JANO BAR</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Lounge bar with a wide range of drinks, cocktails, mixers... It also has a hot and cold snack food area, soups, salads, sandwiches, house specialties.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "TYPE OF CUISINE", value: "Snack food" },
                    { label: "ATMOSPHERE", value: "modern" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border border-gray-200 bg-[#f8fbff] p-3">
                      <p className="text-xs uppercase text-gray-500">{item.label}</p>
                      <p className="text-sm font-semibold text-[#1e3a5f] mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-700 mt-4">
                  <span className="font-semibold text-[#1e3a5f]">NOTE:</span> Relax watching your favorite sporting event, always in a fresh and stylish ambience.
                </p>
              </div>

              <Link
                href="/contact?subject=dining"
                className="mt-5 inline-flex items-center justify-center px-6 py-3 bg-[#1e3a5f] hover:bg-[#16304f] text-white rounded-md transition-colors"
              >
                Inquire Restaurant &amp; Bars
              </Link>
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
      <section id="services-meeting" className="scroll-mt-32 py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 rounded-2xl border border-[#dfe6ee] bg-gradient-to-r from-[#f5f8fc] to-white p-6 md:p-8">
            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-3">Our Meeting Hall</h2>
                <div className="w-20 h-1 bg-[#c9a961] mb-4" />
                <p className="text-gray-600">Three professional halls with efficient support for workshops, conferences, and corporate gatherings.</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["150 PAX", "100 PAX", "50 PAX"].map((item) => (
                  <div key={item} className="rounded-xl border border-[#d9e2ec] bg-white p-4 text-center shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Capacity</p>
                    <p className="text-lg font-bold text-[#1e3a5f] mt-1">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-serif text-[#1e3a5f] mb-6 text-center">Meeting Halls Overview</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {meetingHallShowcase.map((hall, index) => (
                <motion.div
                  key={hall.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <ImageWithFallback
                    src={hall.image}
                    alt={hall.title}
                    className="h-52 w-full object-cover"
                  />
                  <div className="p-5">
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">Hall {String(index + 1).padStart(2, "0")}</p>
                    <h4 className="font-semibold text-[#1e3a5f] mb-2 leading-snug">{hall.title}</h4>
                    <span className="inline-flex items-center rounded-full bg-[#1e3a5f]/10 px-3 py-1 text-xs font-semibold text-[#1e3a5f] mb-3">
                      {hall.capacity}
                    </span>
                    <p className="text-sm text-gray-600">{hall.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-[#dfe6ee] bg-[#f8fbff] p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-sm md:text-base text-[#1e3a5f] font-medium">
                Need help selecting the right hall for your event size and format?
              </p>
              <Link
                href="/contact?subject=meeting"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#1e3a5f] hover:bg-[#16304f] text-white rounded-md transition-colors"
              >
                Book Meeting Hall
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events */}
      <section id="services-events" className="scroll-mt-32 py-16 md:py-24 bg-[#f8f8f8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">Weddings & Events</h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-4" />
            <p className="text-gray-600 max-w-4xl mx-auto">
              Ethio-Bernos Hotel offers personalized wedding and event experiences with elegant venues, chef-led catering, dedicated coordination, and comfortable guest accommodations.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#dfe6ee] bg-white p-6 md:p-7 shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#1e3a5f]/70 mb-2">Event Services</p>
              <h3 className="text-xl md:text-2xl font-serif text-[#1e3a5f] mb-5">Why Celebrate With Us</h3>
              <h4 className="text-sm font-semibold text-[#1e3a5f] mb-3">What You Get</h4>
              <div className="space-y-3">
                {[
                  "Private and beautifully decorated event spaces",
                  "Chef-led catering with custom menu planning",
                  "Dedicated event coordinator from planning to closing",
                  "Elegant venues for rehearsal dinners and receptions",
                  "Comfortable guest accommodations for families and groups",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#c9a961] flex-shrink-0" />
                    <p className="text-sm text-gray-700">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#f8fbff] border border-[#dfe6ee] p-4">
                  <h4 className="text-sm font-semibold text-[#1e3a5f] mb-2">Ideal For</h4>
                  <p className="text-sm text-gray-700">Weddings, honeymoons, rehearsal dinners, receptions, and private celebrations.</p>
                </div>
                <div className="rounded-xl bg-[#f8fbff] border border-[#dfe6ee] p-4">
                  <h4 className="text-sm font-semibold text-[#1e3a5f] mb-2">Planning Process</h4>
                  <p className="text-sm text-gray-700">Consultation, customization, execution, and on-site coordination from start to finish.</p>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-[#f3f7fb] border border-[#d7e2ef] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-sm text-[#1e3a5f] font-medium">
                  Let our team craft a personalized event experience that reflects your style and expectations.
                </p>
                <Link
                  href="/contact?subject=event"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#1e3a5f] hover:bg-[#16304f] text-white rounded-md transition-colors"
                >
                  Plan Your Event
                </Link>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {eventGallery.map((src, index) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={index === 0 ? "md:col-span-2" : ""}
                >
                  <ImageWithFallback src={src} alt="Past event at Ethio Bernos" className="h-56 w-full rounded-xl object-cover shadow-sm" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { label: "Events Hosted", value: "250+" },
              { label: "Guest Satisfaction", value: "4.8/5" },
              { label: "Planner Support", value: "Dedicated Team" },
            ].map((metric) => (
              <div key={metric.label} className="rounded-xl border border-[#dfe6ee] bg-white p-4 text-center shadow-sm">
                <p className="text-xs uppercase text-gray-500">{metric.label}</p>
                <p className="text-lg font-bold text-[#1e3a5f] mt-1">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Basic Amenities */}
      <section id="services-other" className="scroll-mt-32 py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">Basic Amenities</h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">Essential services that make every stay smooth, comfortable, and connected.</p>
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
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact?subject=amenities"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#1e3a5f] hover:bg-[#16304f] text-white rounded-md transition-colors"
            >
              Ask About Amenities
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-[#f8f8f8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">Service FAQ</h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-4" />
          </motion.div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                q: "How fast do you respond to event and meeting inquiries?",
                a: "Our team typically responds within 1 business hour during working time.",
              },
              {
                q: "Can I request custom menu options for events?",
                a: "Yes. Our chefs prepare customized menu plans for meetings, weddings, and private events.",
              },
              {
                q: "Do you provide setup support for meetings and conferences?",
                a: "Yes. We support layout setup, AV/IT assistance, and on-site coordination.",
              },
              {
                q: "What is your cancellation policy for service bookings?",
                a: "Cancellation terms depend on event size and package. Contact us for the exact policy.",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-[#1e3a5f] mb-2">{item.q}</h3>
                <p className="text-sm text-gray-600">{item.a}</p>
              </div>
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
