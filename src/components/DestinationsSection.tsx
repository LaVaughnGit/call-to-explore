"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const destinations = [
  {
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    gradient: "from-sky-400 to-blue-600",
    emoji: "🏛️",
  },
  {
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    gradient: "from-emerald-400 to-teal-600",
    emoji: "🌺",
  },
  {
    name: "Maldives",
    country: "Indian Ocean",
    region: "Island",
    gradient: "from-cyan-400 to-sky-500",
    emoji: "🐠",
  },
  {
    name: "Machu Picchu",
    country: "Peru",
    region: "Americas",
    gradient: "from-emerald-600 to-green-800",
    emoji: "🏔️",
  },
  {
    name: "Safari Kenya",
    country: "Kenya",
    region: "Africa",
    gradient: "from-amber-400 to-orange-600",
    emoji: "🦁",
  },
  {
    name: "Amalfi Coast",
    country: "Italy",
    region: "Europe",
    gradient: "from-teal-400 to-sky-600",
    emoji: "⛵",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function DestinationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="destinations" className="py-24 bg-sky-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-teal-600 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Popular Destinations
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-sky-950 mb-5">
            Where Will You Go{" "}
            <span className="text-teal-600 italic">Next?</span>
          </h2>
          <p className="text-sky-600 text-lg max-w-2xl mx-auto">
            These are just a few of the incredible places we can take you.
            Don&apos;t see your dream destination? Just ask — we go anywhere.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {destinations.map((dest) => (
            <motion.div
              key={dest.name}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-sky-100">
                <div
                  className={`h-44 bg-gradient-to-br ${dest.gradient} flex items-center justify-center relative`}
                >
                  <span className="text-6xl">{dest.emoji}</span>
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs"
                    >
                      {dest.region}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-sky-950 mb-1">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sky-500">
                    <MapPin size={13} />
                    <span className="text-sm">{dest.country}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-sky-600 mb-4 text-lg">
            Have a destination in mind?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-lg shadow-teal-600/20"
          >
            <MapPin size={16} />
            Request a Custom Destination
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
