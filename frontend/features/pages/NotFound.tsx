"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/actions/button";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-9xl font-serif text-[#c9a961] mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">
              Page Not Found
            </h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto mb-6" />
            <p className="text-gray-600 text-lg mb-8">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-[#c9a961] hover:bg-[#b89851] text-white"
              asChild
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
