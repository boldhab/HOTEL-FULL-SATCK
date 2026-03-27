"use client";

import { ArrowRight, LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  detailHref?: string;
  index?: number;
}

export function ServiceCard({ icon: Icon, title, description, detailHref, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 text-center group border border-transparent hover:border-[#c9a961]/30"
    >
      <motion.div
        className="w-16 h-16 bg-[#c9a961]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c9a961] transition-colors duration-300"
        whileHover={{ rotate: [0, -6, 6, 0], scale: 1.06 }}
        transition={{ duration: 0.45 }}
      >
        <Icon className="h-8 w-8 text-[#c9a961] group-hover:text-white transition-colors duration-300" />
      </motion.div>
      <h3 className="text-lg text-[#1e3a5f] mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed min-h-[72px]">{description}</p>
      {detailHref ? (
        <a
          href={detailHref}
          className="mt-5 inline-flex items-center justify-center gap-1 rounded-full border border-[#1e3a5f]/20 bg-[#f3f8ff] px-4 py-2 text-sm font-semibold text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white transition-colors"
        >
          View Detail
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      ) : null}
    </motion.div>
  );
}
