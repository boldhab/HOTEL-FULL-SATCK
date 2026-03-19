"use client";

import Link from "next/link";
import { Wifi, Coffee, Tv, Users } from "lucide-react";
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
  index?: number;
}

const featureIcons: Record<string, any> = {
  "Free WiFi": Wifi,
  "Coffee Maker": Coffee,
  "Smart TV": Tv,
  "Work Desk": Tv,
  "Mini Bar": Coffee,
  "City View": Tv,
};

export function RoomCard({ id, name, image, description, features, price, maxGuests, index = 0 }: RoomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative overflow-hidden group">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-[#c9a961] text-white px-4 py-2 rounded-md">
          <span className="text-sm">From</span>
          <span className="block text-xl">${price}</span>
          <span className="text-xs">/ night</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl text-[#1e3a5f] font-serif">{name}</h3>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span className="text-sm">{maxGuests}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {features.slice(0, 4).map((feature) => {
            const Icon = featureIcons[feature] || Wifi;
            return (
              <div
                key={feature}
                className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
              >
                <Icon className="h-3 w-3" />
                <span>{feature}</span>
              </div>
            );
          })}
        </div>

        <Button
          className="w-full bg-[#1e3a5f] hover:bg-[#2d5278] text-white"
          asChild
        >
          <Link href="/contact">Book Now</Link>
        </Button>
      </div>
    </motion.div>
  );
}
