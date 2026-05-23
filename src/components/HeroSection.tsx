"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import WorldMapHero from "./WorldMapHero";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-sky-800 to-teal-700" />

      <WorldMapHero />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sky-50 to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <MapPin className="text-amber-400" size={18} />
          <span className="text-amber-300 text-sm font-medium tracking-widest uppercase">
            Custom Travel Experiences
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
        >
          Your Dream Trip{" "}
          <span className="text-amber-400 italic">Awaits</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sky-100 text-lg md:text-xl leading-relaxed mb-7 max-w-2xl mx-auto"
        >
          Tell us where you want to go — we handle every detail. From hidden
          gems to iconic destinations, we craft journeys that are uniquely
          yours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-amber-400 hover:bg-amber-300 text-sky-950 font-bold rounded-full px-8 py-6 text-base shadow-lg shadow-amber-400/30"
            )}
          >
            Plan My Trip
          </a>
          <a
            href="#destinations"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/40 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base bg-transparent"
            )}
          >
            Explore Destinations
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white flex flex-col items-center gap-1 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.a>
    </section>
  );
}
