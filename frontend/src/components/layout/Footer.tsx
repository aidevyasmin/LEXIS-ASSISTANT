import { Link } from 'react-router-dom';
import { Gavel, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 text-white font-serif font-bold text-xl">
              <Gavel className="w-8 h-8 text-legal-gold" />
              <span>Nisar Hussain Bhatti – Advocate High Court</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Providing professional legal services with integrity and dedication. 
              Over 9 years of legal practice in Pakistan.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/16y9FZLgy8/" target="_blank" rel="noopener noreferrer" className="hover:text-legal-gold transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="https://x.com/NISARHUSSAIN47" target="_blank" rel="noopener noreferrer" className="hover:text-legal-gold transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="https://instagram.com/nisarbhatti773" target="_blank" rel="noopener noreferrer" className="hover:text-legal-gold transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="https://tiktok.com/@nisarbhatti773" target="_blank" rel="noopener noreferrer" className="hover:text-legal-gold transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01-.01 2.62-.02 5.24-.02 7.86-.19 2.03-1.05 4.01-2.61 5.31-1.68 1.41-3.95 2.02-6.14 1.83-2.19-.19-4.25-1.34-5.46-3.19-1.21-1.85-1.45-4.21-.65-6.26.79-2.04 2.66-3.6 4.75-4.04v4.08c-.6.13-1.18.44-1.59.89-.52.57-.75 1.34-.64 2.1.1 1.01.81 1.89 1.77 2.15.96.26 2.03-.04 2.7-.82.49-.57.69-1.33.64-2.07l.02-13.82z"/></svg>
              </a>
              <a href="https://wa.me/923214755492" target="_blank" rel="noopener noreferrer" className="hover:text-legal-gold transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-legal-gold transition-colors">About Advocate</Link></li>
              <li><Link to="/services" className="hover:text-legal-gold transition-colors">Legal Services</Link></li>
              <li><Link to="/consultation" className="hover:text-legal-gold transition-colors">Book Consultation</Link></li>
              <li><Link to="/blog" className="hover:text-legal-gold transition-colors">Legal Blog</Link></li>
              <li><Link to="/testimonials" className="hover:text-legal-gold transition-colors">Client Reviews</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Legal Services</h3>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-legal-gold transition-colors cursor-pointer">Family Law</li>
              <li className="hover:text-legal-gold transition-colors cursor-pointer">Civil Litigation</li>
              <li className="hover:text-legal-gold transition-colors cursor-pointer">Criminal Defense</li>
              <li className="hover:text-legal-gold transition-colors cursor-pointer">Property Disputes</li>
              <li className="hover:text-legal-gold transition-colors cursor-pointer">Tax Return Filing</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Get In Touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-legal-gold shrink-0" />
                <span>Office No. 53/54 Hajvery Complex Lahore, Pakistan</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-legal-gold shrink-0" />
                <span>0321 4755492</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-legal-gold shrink-0" />
                <span>nisarpulc1234@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Advocate Nisar Hussain Bhatti. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-slate-500">App Developed by Yasmin Nisar</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-[10px] text-slate-600 max-w-3xl mx-auto italic">
          Disclaimer: This application and its AI features provide general information only and do not constitute 
          formal legal advice. No attorney-client relationship is formed until a formal agreement is signed.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
