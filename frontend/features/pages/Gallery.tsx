"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/components/media/ImageWithFallback";

const heroImage = "https://images.unsplash.com/photo-1744782996368-dc5b7e697f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczODM3MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const fallbackImages = [
  {
    url: "https://images.unsplash.com/photo-1744782996368-dc5b7e697f4c?auto=format&fit=crop&q=80&w=1080",
    title: "Grand Lobby",
    category: "Interior",
  },
  {
    url: "https://images.unsplash.com/photo-1759223198981-661cadbbff36?auto=format&fit=crop&q=80&w=1080",
    title: "Luxury Suite",
    category: "Rooms",
  },
  {
    url: "https://images.unsplash.com/photo-1592901147824-212145b050cf?auto=format&fit=crop&q=80&w=1080",
    title: "Deluxe Room",
    category: "Rooms",
  },
  {
    url: "https://images.unsplash.com/photo-1768697358705-c1b60333da35?auto=format&fit=crop&q=80&w=1080",
    title: "Fine Dining Restaurant",
    category: "Dining",
  },
];

export function Gallery({ initialImages = [] }: { initialImages?: any[] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const galleryImages = initialImages.length > 0 ? initialImages.map(img => ({
    url: img.imageUrl,
    title: img.description || 'Gallery Image',
    category: img.category || 'General'
  })) : fallbackImages;

  const categories = ["All", ...Array.from(new Set(galleryImages.map((img: any) => img.category)))];

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
            {categories.map((category: any) => (
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
