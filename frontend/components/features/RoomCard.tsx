"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Wifi,
  Coffee,
  Tv,
  Users,
  BedDouble,
  Maximize,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  ShowerHead,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/actions/button";
import { ImageWithFallback } from "@/components/media/ImageWithFallback";

interface RoomCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  features: string[];
  price: number;
  maxGuests: number;
  size?: string;
  bedType?: string;
  viewType?: string;
  occupancy?: string;
  tagline?: string;
  amenities?: string[];
  policies?: string[];
  gallery?: string[];
  locationNote?: string;
  isFeatured?: boolean;
  index?: number;
}

const featureIcons: Record<string, any> = {
  WiFi: Wifi,
  "Free WiFi": Wifi,
  Coffee: Coffee,
  "Coffee Maker": Coffee,
  TV: Tv,
  "Smart TV": Tv,
  "Work Desk": Tv,
  Minibar: Coffee,
  "Mini Bar": Coffee,
  Shower: ShowerHead,
  "Rain Shower": ShowerHead,
};

function getAmenityIcon(amenity: string) {
  const lower = amenity.toLowerCase();
  if (lower.includes("wifi")) return Wifi;
  if (lower.includes("tv")) return Tv;
  if (lower.includes("coffee")) return Coffee;
  if (lower.includes("mini")) return Coffee;
  if (lower.includes("shower")) return ShowerHead;
  return Wifi;
}

export function RoomCard({
  id,
  name,
  image,
  description,
  features,
  price,
  maxGuests,
  size = "30 m2",
  bedType = "King Bed",
  viewType = "City View",
  occupancy,
  tagline = "Includes breakfast and free Wi-Fi",
  amenities,
  policies,
  gallery,
  locationNote = "Bole Road, Addis Ababa",
  isFeatured = false,
  index = 0,
}: RoomCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const roomGallery = useMemo(() => {
    const images = gallery && gallery.length > 0 ? gallery : [image];
    return images;
  }, [gallery, image]);

  const roomAmenities = amenities && amenities.length > 0
    ? amenities
    : ["WiFi", "TV", "Minibar", "Rain Shower", "Coffee Maker"];

  const roomPolicies = policies && policies.length > 0
    ? policies
    : [
        "Check-in: 2:00 PM | Check-out: 12:00 PM",
        "Free cancellation up to 24 hours before arrival",
        "Extra bed available on request (additional fee may apply)",
      ];

  const occupancyLabel = occupancy || `${maxGuests} adults`;

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % roomGallery.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + roomGallery.length) % roomGallery.length);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-[#1e3a5f]/10"
      >
        <div className="relative overflow-hidden group">
          <ImageWithFallback
            src={image}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-[#c9a961] text-white px-4 py-2 rounded-md text-right">
            <span className="text-xs uppercase tracking-wide">Starting at</span>
            <span className="block text-xl font-semibold">${price}</span>
            <span className="text-xs">/ night</span>
          </div>
          {isFeatured && (
            <div className="absolute top-4 left-4 rounded-full bg-[#1e3a5f] text-white px-3 py-1 text-xs tracking-wide uppercase">
              Premium
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-xl text-[#1e3a5f] font-serif">{name}</h3>
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-1" />
              <span className="text-sm">{occupancyLabel}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <div className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-gray-700">
              <Maximize className="h-4 w-4 text-[#c9a961]" />
              <span>{size}</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-gray-700">
              <BedDouble className="h-4 w-4 text-[#c9a961]" />
              <span>{bedType}</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-gray-700">
              <Eye className="h-4 w-4 text-[#c9a961]" />
              <span>{viewType}</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-gray-700">
              <Users className="h-4 w-4 text-[#c9a961]" />
              <span>{occupancyLabel}</span>
            </div>
          </div>

          <p className="text-sm font-medium text-[#1e3a5f] mb-1">{tagline}</p>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {features.slice(0, 4).map((feature) => {
              const Icon = featureIcons[feature] || getAmenityIcon(feature);
              return (
                <div
                  key={feature}
                  className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                >
                  <Icon className="h-3 w-3" />
                  <span>{feature}</span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              className="bg-[#1e3a5f] hover:bg-[#2d5278] text-white"
              onClick={() => {
                setActiveImage(0);
                setIsDetailsOpen(true);
              }}
            >
              View Details
            </Button>
            <Button
              variant="outline"
              className="border-[#c9a961] text-[#c9a961] hover:bg-[#c9a961] hover:text-white"
              asChild
            >
              <Link href="/contact">Book Now</Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {isDetailsOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-serif text-[#1e3a5f]">{name}</h3>
              <button
                type="button"
                onClick={() => setIsDetailsOpen(false)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close room details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 md:p-6">
              <div className="relative rounded-xl overflow-hidden mb-4">
                <ImageWithFallback
                  src={roomGallery[activeImage]}
                  alt={`${name} image ${activeImage + 1}`}
                  className="w-full h-72 md:h-96 object-cover"
                />
                {roomGallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white hover:bg-black/60"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white hover:bg-black/60"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {roomGallery.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mb-6">
                  {roomGallery.map((img, idx) => (
                    <button
                      key={`${id}-thumb-${idx}`}
                      type="button"
                      onClick={() => setActiveImage(idx)}
                      className={`rounded-md overflow-hidden border ${idx === activeImage ? "border-[#c9a961]" : "border-transparent"}`}
                    >
                      <ImageWithFallback
                        src={img}
                        alt={`${name} thumbnail ${idx + 1}`}
                        className="h-14 w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-[#1e3a5f] mb-2">Room Overview</h4>
                  <p className="text-gray-600 mb-4">{description}</p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div><span className="font-medium">Size:</span> {size}</div>
                    <div><span className="font-medium">Bed:</span> {bedType}</div>
                    <div><span className="font-medium">View:</span> {viewType}</div>
                    <div><span className="font-medium">Max Occupancy:</span> {occupancyLabel}</div>
                    <div><span className="font-medium">Rate:</span> Starting at ${price}/night</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-[#1e3a5f] mb-2">Amenities</h4>
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {roomAmenities.map((amenity) => {
                      const AmenityIcon = getAmenityIcon(amenity);
                      return (
                        <div key={amenity} className="flex items-center gap-2 text-sm text-gray-700">
                          <AmenityIcon className="h-4 w-4 text-[#c9a961]" />
                          <span>{amenity}</span>
                        </div>
                      );
                    })}
                  </div>

                  <h4 className="text-lg font-semibold text-[#1e3a5f] mb-2">Room Policies</h4>
                  <div className="space-y-2">
                    {roomPolicies.map((policy, idx) => (
                      <p key={`${id}-policy-${idx}`} className="text-sm text-gray-600">
                        {policy}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-gray-100 pt-5">
                <div className="inline-flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-[#c9a961]" />
                  <span>{locationNote}</span>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://maps.google.com/?q=Ethio+Bernos+Hotel+Addis+Ababa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md border border-[#1e3a5f]/20 px-4 py-2 text-sm text-[#1e3a5f] hover:bg-gray-50"
                  >
                    View Map
                  </a>
                  <Button className="bg-[#1e3a5f] hover:bg-[#2d5278] text-white" asChild>
                    <Link href="/contact">Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
