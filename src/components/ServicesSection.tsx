"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Map, Anchor, Users2, MessageCircle, Clock, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Anchor,
    title: "Cruise Experiences",
    description:
      "Set sail on the vacation of a lifetime. We find and book the perfect cruise for you — from Caribbean getaways to Mediterranean voyages — handling every detail from port to port.",
    color: "from-teal-500 to-teal-700",
    lightBg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    icon: Map,
    title: "Custom Trip Planning",
    description:
      "Tell us your dream destination, dates, and budget. We'll build a day-by-day itinerary tailored to your interests — from adventure to relaxation.",
    color: "from-sky-500 to-sky-700",
    lightBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    icon: Users2,
    title: "Group Travel",
    description:
      "Planning a trip for a group, family reunion, or corporate retreat? We coordinate every detail so everyone travels together, stress-free.",
    color: "from-emerald-500 to-emerald-700",
    lightBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
];

const perks = [
  { icon: MessageCircle, text: "Direct communication via WhatsApp or Email" },
  { icon: Clock, text: "Fast response times, typically within 24 hours" },
  { icon: Shield, text: "Trusted recommendations, no hidden fees" },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-500 text-sm font-semibold tracking-widest uppercase mb-3 block">
            What We Offer
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-sky-950 mb-5">
            Travel Services Built Around{" "}
            <span className="text-amber-500 italic">You</span>
          </h2>
          <p className="text-sky-600 text-lg max-w-2xl mx-auto">
            Whether you&apos;re a solo adventurer, a couple seeking romance, or
            a group chasing new horizons — we have a service to match.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={cardVariants}>
              <Card className="border-sky-100 hover:shadow-xl transition-shadow duration-300 h-full overflow-hidden group">
                <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                <CardContent className="p-8">
                  <div
                    className={`w-14 h-14 rounded-2xl ${service.lightBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className={service.iconColor} size={26} />
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-sky-950 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sky-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-sky-950 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-2">
              Always a real person on the other end
            </h3>
            <p className="text-sky-300">
              No bots, no call queues — just direct, personal service.
            </p>
          </div>
          <div className="flex flex-col gap-3 min-w-max">
            {perks.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sky-100">
                <Icon size={16} className="text-amber-400 shrink-0" />
                <span className="text-sm">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
