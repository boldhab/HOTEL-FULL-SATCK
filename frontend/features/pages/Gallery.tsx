"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/components/media/ImageWithFallback";

const heroImage = "https://images.unsplash.com/photo-1744782996368-dc5b7e697f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczODM3MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1744782996368-dc5b7e697f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczODM3MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Grand Lobby",
    category: "Interior",
  },
  {
    url: "https://images.unsplash.com/photo-1759223198981-661cadbbff36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb20lMjBzdWl0ZXxlbnwxfHx8fDE3NzM4OTMwMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Luxury Suite",
    category: "Rooms",
  },
  {
    url: "https://images.unsplash.com/photo-1592901147824-212145b050cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGRlbHV4ZSUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzczOTA3NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Deluxe Room",
    category: "Rooms",
  },
  {
    url: "https://images.unsplash.com/photo-1758448511255-ac2a24a135d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGV4ZWN1dGl2ZSUyMHN1aXRlJTIwbGl2aW5nfGVufDF8fHx8MTc3MzkyNTI5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Executive Suite",
    category: "Rooms",
  },
  {
    url: "https://images.unsplash.com/photo-1664780476492-fbb9fd277ce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHByZXNpZGVudGlhbCUyMHN1aXRlJTIwbHV4dXJ5fGVufDF8fHx8MTc3MzkyNTI5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Presidential Suite",
    category: "Rooms",
  },
  {
    url: "https://images.unsplash.com/photo-1768697358705-c1b60333da35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlc3RhdXJhbnQlMjBkaW5pbmclMjBlbGVnYW50fGVufDF8fHx8MTc3MzgxMjk3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Fine Dining Restaurant",
    category: "Dining",
  },
  {
    url: "https://images.unsplash.com/photo-1731080647266-85cf1bc27162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN3aW1taW5nJTIwcG9vbCUyMGx1eHVyeXxlbnwxfHx8fDE3NzM5MjUyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Infinity Pool",
    category: "Facilities",
  },
  {
    url: "https://images.unsplash.com/photo-1584536318461-2ee56bc042f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHNwYSUyMHdlbGxuZXNzJTIwY2VudGVyfGVufDF8fHx8MTc3MzkyNTI5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Spa & Wellness",
    category: "Facilities",
  },
  {
    url: "https://images.unsplash.com/photo-1769766407883-1645a93eed40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGV4dGVyaW9yJTIwYnVpbGRpbmclMjBuaWdodHxlbnwxfHx8fDE3NzM5MjUyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Hotel Exterior",
    category: "Exterior",
  },
  {
    url: "https://images.unsplash.com/photo-1669807164466-10a6584a067e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGZpdG5lc3MlMjBneW0lMjBtb2Rlcm58ZW58MXx8fHwxNzczOTI1Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Fitness Center",
    category: "Facilities",
  },
  {
    url: "https://images.unsplash.com/photo-1505845753232-f74a87b62db6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGNvbmZlcmVuY2UlMjByb29tJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzczOTI1Mjk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Conference Room",
    category: "Business",
  },
  {
    url: "https://images.unsplash.com/photo-1759038085950-1234ca8f5fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlY2VwdGlvbiUyMGRlc2slMjBjb25jaWVyZ2V8ZW58MXx8fHwxNzczOTI1Mjk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Reception Desk",
    category: "Interior",
  },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Rooms", "Dining", "Facilities", "Interior", "Exterior", "Business"];

  const filteredImages = filter === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === filter);

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="Gallery"
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
            Photo Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200"
          >
            Explore our stunning hotel through images
          </motion.p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full text-sm transition-all ${
                  filter === category
                    ? "bg-[#c9a961] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.url}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden rounded-lg group cursor-pointer aspect-[4/3]"
                  onClick={() => setSelectedImage(galleryImages.indexOf(image))}
                >
                  <ImageWithFallback
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white text-lg mb-1">{image.title}</h3>
                    <p className="text-gray-300 text-sm">{image.category}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-[#c9a961] transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              <X className="h-8 w-8" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#c9a961] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              aria-label="Previous"
            >
              <ChevronLeft className="h-12 w-12" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#c9a961] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next"
            >
              <ChevronRight className="h-12 w-12" />
            </button>

            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedImage].url}
                alt={galleryImages[selectedImage].title}
                className="w-full h-full object-contain"
              />
              <div className="text-center mt-4">
                <h3 className="text-white text-xl mb-1">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {galleryImages[selectedImage].category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
