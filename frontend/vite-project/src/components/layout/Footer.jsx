import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-black text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <a
              href="/"
              className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-White text-xl">★</span>
              </div>
              <span className="text-white uppercase tracking-[0.3em] text-sm">
                MOA HOTEL PARADISE
              </span>
            </a>
            <p className="text-neutral-400 leading-relaxed">
              Erleben Sie unvergleichlichen Luxus und erstklassigen Service in
              unserem exquisiten 5-Sterne-Hotel.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="uppercase tracking-wider text-sm mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/rooms"
                  className="text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  Zimmer
                </Link>
              </li>

              <li>
                <Link
                  to="/Restaurant"
                  className="text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  Restaurant
                </Link>
              </li>
              <li>
                <Link
                  to="/Wellness"
                  className="text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  Wellness
                </Link>
              </li>

              <li>
                <Link
                  to="/gallery"
                  className="text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  Galerie
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="uppercase tracking-wider text-sm mb-6">Services</h3>
            <ul className="space-y-3">
              <li className="text-neutral-400">Restaurant & Bar</li>
              <li className="text-neutral-400"> Wellness & Spa</li>
              <li className="text-neutral-400">Fitness Center</li>
              <li className="text-neutral-400">Swimming Pool</li>
              <li className="text-neutral-400">Conference Rooms</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="uppercase tracking-wider text-sm mb-6">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                <span className="text-neutral-400">
                  Steinstrasse 123
                  <br />
                  40476 Düsseldorf, Deutschland
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <a
                  href="tel:+49301234567"
                  className="text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  +49 (0)30 123 456 789
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <a
                  href="mailto:info@moa-hotel.de"
                  className="text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  info@moa-hotel.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          <p className="text-neutral-500 text-sm">
            © 2024 MOA Hotel. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
