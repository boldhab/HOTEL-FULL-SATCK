"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export function ServiceCard({ icon: Icon, title, description, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-center group"
    >
      <div className="w-16 h-16 bg-[#c9a961]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c9a961] transition-colors duration-300">
        <Icon className="h-8 w-8 text-[#c9a961] group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-lg text-[#1e3a5f] mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
}
