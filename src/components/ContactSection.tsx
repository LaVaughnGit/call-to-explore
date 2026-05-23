"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MessageCircle, Send, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const WHATSAPP_NUMBER = "12407500335";
const EMAIL_ADDRESS = "hello@calltoexplore.com";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const mailtoHref = `mailto:${EMAIL_ADDRESS}?subject=Trip Inquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nDestination: ${form.destination}\n\nMessage:\n${form.message}`
  )}`;

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi! I'd like to plan a trip.\n\nName: ${form.name}\nDestination: ${form.destination}\n\nMessage: ${form.message}`
  )}`;

  return (
    <section id="contact" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-500 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Get In Touch
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-sky-950 mb-5">
            Let&apos;s Plan Your{" "}
            <span className="text-amber-500 italic">Journey</span>
          </h2>
          <p className="text-sky-600 text-lg max-w-2xl mx-auto">
            Fill out the form below and we&apos;ll reach out via your preferred
            method — Email or WhatsApp — to start building your trip together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sky-800 text-sm font-medium mb-1.5 block">
                  Your Name
                </label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  className="border-sky-200 focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-sky-800 text-sm font-medium mb-1.5 block">
                  Email Address
                </label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className="border-sky-200 focus:border-sky-400"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sky-800 text-sm font-medium mb-1.5 block">
                  Phone / WhatsApp
                </label>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="border-sky-200 focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-sky-800 text-sm font-medium mb-1.5 block">
                  Destination in Mind
                </label>
                <Input
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder="e.g. Bali, Greece, Anywhere!"
                  className="border-sky-200 focus:border-sky-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sky-800 text-sm font-medium mb-1.5 block">
                Tell us about your trip
              </label>
              <Textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Dates, group size, special requests, budget range..."
                className="border-sky-200 focus:border-sky-400 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={mailtoHref}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-sky-800 hover:bg-sky-700 text-white rounded-full flex-1 gap-2 justify-center"
                )}
              >
                <Mail size={16} />
                Send via Email
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex-1 gap-2 justify-center"
                )}
              >
                <MessageCircle size={16} />
                Send via WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 space-y-5"
          >
            <Card className="border-sky-100 bg-sky-50">
              <CardContent className="p-7">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-sky-950 mb-5">
                  How It Works
                </h3>
                <ol className="space-y-4">
                  {[
                    "Fill out the form with your travel details",
                    "We reach out within 24 hours to discuss your vision",
                    "We build your custom itinerary together",
                    "You travel — we handle the rest",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-sky-800 text-white rounded-full text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sky-700 text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="border-sky-100">
              <CardContent className="p-7 space-y-4">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-sky-950">
                  Reach Us Directly
                </h3>
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="flex items-center gap-3 text-sky-600 hover:text-sky-800 transition-colors group"
                >
                  <div className="w-9 h-9 bg-sky-100 rounded-full flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                    <Mail size={15} className="text-sky-700" />
                  </div>
                  <span className="text-sm">{EMAIL_ADDRESS}</span>
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-emerald-600 hover:text-emerald-800 transition-colors group"
                >
                  <div className="w-9 h-9 bg-emerald-50 rounded-full flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <MessageCircle size={15} className="text-emerald-600" />
                  </div>
                  <span className="text-sm">WhatsApp us anytime</span>
                </a>
                <div className="flex items-center gap-3 text-sky-500">
                  <div className="w-9 h-9 bg-amber-50 rounded-full flex items-center justify-center">
                    <MapPin size={15} className="text-amber-600" />
                  </div>
                  <span className="text-sm">We plan trips worldwide</span>
                </div>
              </CardContent>
            </Card>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4">
              <Send size={20} className="text-amber-500 shrink-0" />
              <p className="text-amber-800 text-sm">
                <span className="font-semibold">Quick response guaranteed.</span>{" "}
                Most inquiries get a reply within a few hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
