"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Globe, Star, Users } from "lucide-react";

const stats = [
  { icon: Globe, value: "50+", label: "Destinations" },
  { icon: Users, value: "200+", label: "Happy Travelers" },
  { icon: Star, value: "5★", label: "Average Rating" },
  { icon: Heart, value: "100%", label: "Personalized" },
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
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-sky-800 to-teal-700 rounded-3xl p-10 text-white text-center shadow-xl">
              <Globe size={56} className="mx-auto mb-4 opacity-90" />
              <p className="font-[family-name:var(--font-playfair)] text-2xl font-semibold italic">
                &ldquo;The world is a book, and those who do not travel read
                only one page.&rdquo;
              </p>
              <p className="mt-4 text-sky-200 text-sm">— Saint Augustine</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="bg-white border border-sky-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <Icon className="mx-auto mb-2 text-teal-600" size={22} />
                  <div className="text-2xl font-bold text-sky-900">{value}</div>
                  <div className="text-sky-500 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
