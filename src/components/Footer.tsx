import { Compass, Mail, MessageCircle, Heart } from "lucide-react";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Destinations", href: "#destinations" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sky-950 text-sky-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <Compass className="text-amber-400" size={26} />
              <span className="font-[family-name:var(--font-playfair)] text-white text-lg font-bold">
                Call to Explore
              </span>
            </a>
            <p className="text-sky-400 text-sm leading-relaxed">
              Custom travel experiences crafted around you. Tell us where you
              want to go — we&apos;ll take care of the rest.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sky-400 hover:text-amber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:call2exp@gmail.com"
                  className="flex items-center gap-2 text-sky-400 hover:text-white text-sm transition-colors"
                >
                  <Mail size={14} />
                  call2exp@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/12407500335"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sky-400 hover:text-white text-sm transition-colors"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sky-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sky-500 text-sm">
            &copy; {year} Call to Explore. All rights reserved.
          </p>
          <p className="text-sky-500 text-sm flex items-center gap-1">
            Made with <Heart size={12} className="text-amber-400" /> for
            travelers everywhere
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href="mailto:call2exp@gmail.com?subject=Test%20Email%20%E2%80%94%20Call%20to%20Explore&body=This%20is%20a%20test%20email%20to%20confirm%20call2exp%40gmail.com%20is%20working."
            className="text-xs text-sky-700 hover:text-amber-400 underline underline-offset-2 transition-colors"
          >
            Send test email to call2exp@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
