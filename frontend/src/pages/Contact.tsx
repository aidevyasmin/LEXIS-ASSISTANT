import { MapPin, Phone, Mail, MessageSquare, Clock, Globe, Facebook, Twitter, Instagram } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-legal-blue mb-4">Contact Our Office</h1>
        <div className="w-24 h-1 bg-legal-gold mx-auto mb-6"></div>
        <p className="text-slate-600">
          Professional legal assistance is just a message or call away. Reach out to 
          Advocate Nisar Hussain Bhatti today for a confidential consultation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-sm shadow-lg border border-slate-100 group hover:border-legal-gold transition-colors">
              <Phone className="w-8 h-8 text-legal-gold mb-4" />
              <h3 className="text-lg font-bold text-legal-dark mb-2 uppercase tracking-widest text-sm">Call Us</h3>
              <p className="text-slate-500 text-sm mb-4">Direct line for urgent inquiries and appointments.</p>
              <a href="tel:03214755492" className="text-legal-blue font-bold hover:text-legal-gold transition-colors">0321 4755492</a>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-lg border border-slate-100 group hover:border-legal-gold transition-colors">
              <MessageSquare className="w-8 h-8 text-legal-gold mb-4" />
              <h3 className="text-lg font-bold text-legal-dark mb-2 uppercase tracking-widest text-sm">WhatsApp</h3>
              <p className="text-slate-500 text-sm mb-4">Quick messages and document sharing.</p>
              <a href="https://wa.me/03214755492" className="text-legal-blue font-bold hover:text-legal-gold transition-colors">Chat on WhatsApp</a>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-lg border border-slate-100 group hover:border-legal-gold transition-colors">
              <Mail className="w-8 h-8 text-legal-gold mb-4" />
              <h3 className="text-lg font-bold text-legal-dark mb-2 uppercase tracking-widest text-sm">Email Us</h3>
              <p className="text-slate-500 text-sm mb-4">Send us your case details and documents.</p>
              <a href="mailto:nisarpulc1234@gmail.com" className="text-legal-blue font-bold hover:text-legal-gold transition-colors break-all text-xs">nisarpulc1234@gmail.com</a>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-lg border border-slate-100 group hover:border-legal-gold transition-colors">
              <Clock className="w-8 h-8 text-legal-gold mb-4" />
              <h3 className="text-lg font-bold text-legal-dark mb-2 uppercase tracking-widest text-sm">Office Hours</h3>
              <p className="text-slate-500 text-sm mb-1 font-bold">Mon - Sat: 9AM - 5PM</p>
              <p className="text-slate-400 text-xs italic">Closed on Sundays & Public Holidays</p>
            </div>
          </div>

          <div className="bg-legal-blue text-white p-8 rounded-sm shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-legal-gold/10 rounded-full -mr-16 -mt-16"></div>
            <div className="flex items-start space-x-4 relative z-10">
              <MapPin className="w-10 h-10 text-legal-gold shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">Office Locations</h3>
                <div className="space-y-6">
                  <div className="border-l-2 border-legal-gold pl-4">
                    <p className="font-bold text-legal-gold text-xs uppercase tracking-widest mb-1">Lahore Office</p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Office No. 53/54 Hajvery Complex Lahore.
                    </p>
                  </div>
                  <div className="border-l-2 border-slate-500 pl-4">
                    <p className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-1">Nankana Sahib Office</p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      District Courts, Nankana Sahib, Punjab.
                    </p>
                  </div>
                </div>
                <div className="mt-8 flex items-center space-x-2 text-legal-gold font-bold text-sm">
                  <Globe className="w-4 h-4" />
                  <span>Serving Clients Across Pakistan</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-legal-gold mb-6">Connect With Us</h3>
              <div className="flex space-x-6">
                <a href="https://www.facebook.com/share/16y9FZLgy8/" target="_blank" rel="noopener noreferrer" className="hover:text-legal-gold transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://tiktok.com/@nisarbhatti773" target="_blank" rel="noopener noreferrer" className="hover:text-legal-gold transition-colors flex items-center">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
                <a href="https://x.com/NISARHUSSAIN47" target="_blank" rel="noopener noreferrer" className="hover:text-legal-gold transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://instagram.com/nisarbhatti773" target="_blank" rel="noopener noreferrer" className="hover:text-legal-gold transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder / Form Integration */}
        <div className="flex flex-col space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-200 h-64 rounded-sm shadow-inner relative flex items-center justify-center overflow-hidden border border-slate-300">
              <div className="absolute inset-0 opacity-20 grayscale">
                <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=60" className="w-full h-full object-cover" alt="Map pattern" />
              </div>
              <div className="relative z-10 text-center space-y-3 p-4">
                <MapPin className="w-8 h-8 text-legal-blue mx-auto" />
                <p className="font-bold text-legal-dark uppercase tracking-widest text-[9px]">Lahore Office, Hajvery Complex</p>
                <a 
                  href="https://www.google.com/maps/search/Hajvery+Complex+Lahore" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-legal-blue text-white px-4 py-2 rounded-sm text-[9px] font-bold uppercase tracking-widest hover:bg-black transition-all"
                >
                  Lahore Map
                </a>
              </div>
            </div>
            <div className="bg-slate-200 h-64 rounded-sm shadow-inner relative flex items-center justify-center overflow-hidden border border-slate-300">
              <div className="absolute inset-0 opacity-20 grayscale">
                <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=60" className="w-full h-full object-cover" alt="Map pattern" />
              </div>
              <div className="relative z-10 text-center space-y-3 p-4">
                <MapPin className="w-8 h-8 text-legal-blue mx-auto" />
                <p className="font-bold text-legal-dark uppercase tracking-widest text-[9px]">District Courts, Nankana Sahib</p>
                <a 
                  href="https://www.google.com/maps/search/District+Courts+Nankana+Sahib" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-legal-blue text-white px-4 py-2 rounded-sm text-[9px] font-bold uppercase tracking-widest hover:bg-black transition-all"
                >
                  Nankana Map
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-sm shadow-lg border border-slate-100">
            <h3 className="text-xl font-serif font-bold text-legal-blue mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="w-full p-3 bg-slate-50 border border-slate-200 outline-none focus:border-legal-gold text-sm" />
                <input type="email" placeholder="Your Email" className="w-full p-3 bg-slate-50 border border-slate-200 outline-none focus:border-legal-gold text-sm" />
              </div>
              <input type="text" placeholder="Subject" className="w-full p-3 bg-slate-50 border border-slate-200 outline-none focus:border-legal-gold text-sm" />
              <textarea rows={4} placeholder="Your Message" className="w-full p-3 bg-slate-50 border border-slate-200 outline-none focus:border-legal-gold text-sm"></textarea>
              <button className="w-full bg-legal-blue text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-black transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
