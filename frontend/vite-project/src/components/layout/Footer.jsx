import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("footer");

  return (
    <footer id="contact" className="bg-[#f7efe7] text-slate-900">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <a
              href="/"
              className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <span className="text-slate-900 text-xl">★</span>
              </div>
              <span className="text-black uppercase tracking-[0.3em] text-sm">
                MOA HOTEL PARADISE
              </span>
            </a>
            <p className="text-slate-700 leading-relaxed">{t("brandText")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="uppercase tracking-wider text-sm mb-6">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-slate-700 hover:text-rose-500 transition-colors"
                >
                  {t("links.home")}
                </Link>
              </li>

              <li>
                <Link
                  to="/rooms"
                  className="text-slate-700 hover:text-rose-500 transition-colors"
                >
                  {t("links.rooms")}
                </Link>
              </li>

              <li>
                <Link
                  to="/restaurant"
                  className="text-slate-700 hover:text-rose-500 transition-colors"
                >
                  {t("links.restaurant")}
                </Link>
              </li>

              <li>
                <Link
                  to="/wellness"
                  className="text-slate-700 hover:text-rose-500 transition-colors"
                >
                  {t("links.wellness")}
                </Link>
              </li>

              <li>
                <Link
                  to="/gallery"
                  className="text-slate-700 hover:text-rose-500 transition-colors"
                >
                  {t("links.gallery")}
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-slate-700 hover:text-rose-500 transition-colors"
                >
                  {t("links.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="uppercase tracking-wider text-sm mb-6">
              {t("services.title")}
            </h3>
            <ul className="space-y-3">
              <li className="text-slate-700">{t("services.items.restaurantBar")}</li>
              <li className="text-slate-700">{t("services.items.wellnessSpa")}</li>
              <li className="text-slate-700">{t("services.items.fitness")}</li>
              <li className="text-slate-700">{t("services.items.pool")}</li>
              <li className="text-slate-700">{t("services.items.conference")}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="uppercase tracking-wider text-sm mb-6">
              {t("contact.title")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0 mt-1" />
                <span className="text-slate-700">
                  {t("contact.addressLine1")}
                  <br />
                  {t("contact.addressLine2")}
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <a
                  href="tel:+49301234567"
                  className="text-slate-700 hover:text-rose-500 transition-colors"
                >
                  {t("contact.phone")}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <a
                  href="mailto:info@moa-hotel.de"
                  className="text-slate-700 hover:text-rose-500 transition-colors"
                >
                  {t("contact.email")}
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
              className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:border-rose-500 hover:text-rose-500 transition-colors"
              aria-label="Facebook"
              title="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:border-rose-500 hover:text-rose-500 transition-colors"
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:border-rose-500 hover:text-rose-500 transition-colors"
              aria-label="Twitter"
              title="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          <p className="text-neutral-500 text-sm">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
