import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, ExternalLink, CheckCircle } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const BC_OFFICES = [
    { city: "Vancouver", address: "1055 West Georgia Street, Suite 2400", phone: "(604) 555-0100", email: "vancouver@pacificedge.ca" },
    { city: "Victoria", address: "1512 Fort Street, Suite 200", phone: "(250) 555-0300", email: "victoria@pacificedge.ca" },
    { city: "Richmond", address: "4500 Kingsway, Suite 150", phone: "(604) 555-0400", email: "richmond@pacificedge.ca" },
  ];

  const QUICK_LINKS = [
    { label: "Search Homes", href: "/listings" },
    { label: "Communities", href: "/neighbourhoods" },
    { label: "Our Team", href: "/agents" },
    { label: "Sell", href: "/sell" },
    { label: "Buy", href: "/buy" },
    { label: "Rent", href: "/rent" },
  ];

  const SERVICES = [
    { label: "Home Buying", href: "/buy" },
    { label: "Home Selling", href: "/sell" },
    { label: "Property Valuation", href: "/sell/valuation" },
    { label: "Mortgage Calculator", href: "/calculator" },
    { label: "Renting", href: "/rent" },
    { label: "Investment", href: "/investing" },
  ];

  return (
    <footer className="bg-[#5E312B] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            {/* FOOTER LOGO — change "60px" to resize */}
            <div className="mb-6">
              <img
                src="/harpreet-logo-footer.png"
                alt="Harpreet Dhillon — Planet Group Realty Inc."
                style={{ height: "250", width: "auto", objectFit: "contain" }}
              />
            </div>
            <p className="text-white/65 text-sm mb-6 leading-relaxed">
              Harpreet Dhillon — your trusted partner for real estate in Surrey, Langley, Abbotsford, and across the Fraser Valley.
              15+ years of experience delivering results for BC families.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#AC7E71]/20 text-[#C99C8E] text-xs rounded-full">
                <CheckCircle className="w-3 h-3" /> Licensed in BC
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#AC7E71]/20 text-[#C99C8E] text-xs rounded-full">
                <CheckCircle className="w-3 h-3" /> 5-Star Reviews
              </span>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-sm hover:bg-[#7A463E] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-sm hover:bg-[#7A463E] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-sm hover:bg-[#7A463E] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-sm hover:bg-[#7A463E] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-300 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {SERVICES.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-300 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-4 mb-6">
              {BC_OFFICES.slice(0, 2).map((office) => (
                <div key={office.city} className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#AC7E71] mt-0.5" />
                  <div>
                    <p className="font-medium text-white">{office.city}</p>
                    <p className="text-sm text-gray-400">{office.address}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 text-sm mb-6">
              <a href="tel:+16045550200" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <Phone className="w-4 h-4" /> (604) 555-0200
              </a>
              <a href="mailto:info@pacificedge.ca" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <Mail className="w-4 h-4" /> info@pacificedge.ca
              </a>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-sm text-gray-300 mb-2">Stay updated with new BC listings</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-4 py-2 bg-white/10 rounded-l-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#AC7E71]"
                />
                <button className="px-4 py-2 bg-[#AC7E71] rounded-r-lg font-medium text-sm hover:bg-[#9A6B5D] transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            </div>
            <p className="text-sm text-white/40">
              © {currentYear} Harpreet Dhillon — Planet Group Realty Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}