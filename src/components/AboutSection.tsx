"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Globe, Heart, Star } from "lucide-react";

const stats = [
  { icon: Globe, value: "60+", label: "Destinations" },
  { icon: Heart, value: "100%", label: "Personal Service" },
  { icon: Star, value: "5★", label: "Client Rated" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 bg-sky-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-teal-600 text-sm font-semibold tracking-widest uppercase mb-3 block">
              About Us
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-sky-950 leading-tight mb-6">
              We Turn Wanderlust Into{" "}
              <span className="text-teal-600 italic">Reality</span>
            </h2>
            <p className="text-sky-700 text-lg leading-relaxed mb-5">
              Call to Explore is a boutique travel service built on a simple
              belief: every trip should feel personal. We work directly with you
              — one-on-one — to understand your travel dreams and build an
              itinerary that fits your style, budget, and timeline.
            </p>
            <p className="text-sky-700 leading-relaxed mb-8">
              No call centers, no cookie-cutter packages. Just a real person who
              loves travel, ready to coordinate every detail so you can focus on
              the experience itself.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-sky-800 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Get in Touch
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            {/* Quote card */}
            <div className="bg-white rounded-3xl p-8 shadow-md border border-sky-100 relative">
              <Quote className="text-amber-300 mb-4" size={32} />
              <p className="text-sky-800 text-lg leading-relaxed font-medium italic mb-4">
                "Travel isn't just about getting somewhere — it's about the
                memories you make along the way. We make sure every moment
                counts."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                  CE
                </div>
                <div>
                  <p className="text-sky-950 font-semibold text-sm">Call to Explore</p>
                  <p className="text-sky-500 text-xs">Your Personal Travel Planner</p>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 flex flex-col items-center text-center gap-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                    <Icon className="text-teal-600" size={20} />
                  </div>
                  <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-sky-950">
                    {value}
                  </span>
                  <span className="text-sky-500 text-xs font-medium">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
