
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white/80">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">TicketTurtle</h3>
            <p className="mb-6 text-sm">
              Your premier travel agency for flights, hotels, and complete travel packages.
              We make travel simple and enjoyable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors inline-block py-1">Home</Link>
              </li>
              <li>
                <Link to="/flights" className="hover:text-white transition-colors inline-block py-1">Flights</Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-white transition-colors inline-block py-1">Hotels</Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-white transition-colors inline-block py-1">Packages</Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors inline-block py-1">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors inline-block py-1">Contact</a>
              </li>
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Top Destinations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors inline-block py-1">Paris, France</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors inline-block py-1">Tokyo, Japan</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors inline-block py-1">Bali, Indonesia</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors inline-block py-1">New York, USA</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors inline-block py-1">Dubai, UAE</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors inline-block py-1">Sydney, Australia</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                <span>123 Travel Street, City, Country</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <span>+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <span>info@ticketturtle.com</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-white/10 my-8" />

        <div className="text-center text-sm">
          <p>&copy; {currentYear} TicketTurtle. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
