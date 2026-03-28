import ChatInterface from '../components/chat/ChatInterface';
import { Gavel, Scale, Shield, Clock, Award, Star, Phone, MessageSquare, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col animate-in fade-in duration-1000">
      {/* Premium Hero Section */}
      <section className="relative premium-gradient text-white pt-20 pb-40 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-legal-gold/5 -skew-x-12 transform translate-x-32 hidden lg:block"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-legal-light to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-3/5 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-legal-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <Star className="w-4 h-4 fill-legal-gold" /> Premier Legal Services
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-tight">
              Nisar Hussain Bhatti <br />
              <span className="gold-text italic underline decoration-legal-gold/30 underline-offset-8">Advocate High Court</span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              Providing Professional Legal Services with <span className="text-white font-bold">9+ Years of Experience</span> in Handling Civil, Family, Criminal, and Property Matters.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-6">
              <Link to="/consultation" className="px-8 py-4 gold-bg hover:bg-white text-black font-bold rounded-sm transition-all shadow-xl flex items-center gap-2 uppercase tracking-widest text-xs">
                <Clock className="w-4 h-4" /> Book Consultation
              </Link>
              <Link to="/legal-assistant" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-sm transition-all shadow-xl flex items-center gap-2 uppercase tracking-widest text-xs animate-pulse">
                <MessageSquare className="w-4 h-4" /> Live AI Chat
              </Link>
              <Link to="/services" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-sm transition-all border border-white/20 flex items-center gap-2 uppercase tracking-widest text-xs">
                <Gavel className="w-4 h-4 text-legal-gold" /> View Services
              </Link>
            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start space-x-8 text-slate-400">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-legal-gold" />
                <span className="text-xs uppercase tracking-widest font-bold">Trusted Advisor</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-legal-gold" />
                <span className="text-xs uppercase tracking-widest font-bold">9+ Years Exp</span>
              </div>
            </div>
          </div>

          <div className="lg:w-2/5 w-full relative">
            <div className="absolute inset-0 bg-legal-gold/20 blur-3xl rounded-full"></div>
            <div className="relative p-2 bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl">
              <div className="bg-slate-900 rounded-xl overflow-hidden">
                <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Lexis AI Assistant</span>
                </div>
                <ChatInterface />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Introduction Bar */}
      <section className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="bg-white rounded-sm shadow-2xl border border-slate-100 p-10 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-8 md:pb-0">
              <Gavel className="w-16 h-16 text-legal-gold mb-4" />
              <h3 className="text-lg font-bold text-legal-blue uppercase tracking-widest">Commitment</h3>
            </div>
            <div className="md:w-3/4 space-y-4">
              <h2 className="text-2xl font-serif font-bold text-legal-dark">Dedicated to Justice & Excellence</h2>
              <p className="text-slate-600 leading-relaxed">
                Nisar Hussain Bhatti is a dedicated advocate with more than 9 years of professional experience. 
                His mission is to provide reliable and effective legal solutions while protecting clients' rights 
                with integrity, transparency, and deep legal expertise in Pakistani statutes.
              </p>
              <Link to="/about" className="inline-flex items-center text-legal-blue font-bold text-sm uppercase tracking-widest hover:text-legal-gold transition-colors">
                Read Full Profile <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Feature Categories */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h3 className="text-xs font-bold text-legal-gold uppercase tracking-[0.4em] mb-4">Core Expertise</h3>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-legal-dark">Specialized Legal Solutions</h2>
          <div className="w-24 h-1 bg-legal-gold mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Family Law', desc: 'Expertise in divorce, child custody, and complex family disputes.', icon: Scale },
            { title: 'Civil Litigation', desc: 'Professional representation in civil suits and property matters.', icon: Gavel },
            { title: 'Criminal Defense', desc: 'Protecting your rights with robust criminal defense strategies.', icon: Shield },
            { title: 'Legal Advice', desc: 'Professional consultation for business and individual legal needs.', icon: MessageSquare },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-sm shadow-lg border-b-4 border-transparent hover:border-legal-gold transition-all group">
              <item.icon className="w-10 h-10 text-legal-blue mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-legal-dark mb-3">{item.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{item.desc}</p>
              <Link to="/services" className="text-xs font-bold uppercase tracking-widest text-legal-blue hover:text-legal-gold flex items-center">
                Learn More <ChevronRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="bg-legal-blue text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-serif font-bold">Need Immediate Legal Assistance?</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
            Connect directly via WhatsApp or call for a professional consultation regarding your case.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <a href="tel:03214755492" className="px-10 py-4 bg-white text-legal-blue font-bold rounded-sm hover:bg-legal-gold hover:text-black transition-all flex items-center gap-3 uppercase tracking-widest text-xs">
              <Phone className="w-5 h-5" /> Call Now
            </a>
            <a href="https://wa.me/03214755492" className="px-10 py-4 border-2 border-legal-gold text-legal-gold font-bold rounded-sm hover:bg-legal-gold hover:text-black transition-all flex items-center gap-3 uppercase tracking-widest text-xs">
              <MessageSquare className="w-5 h-5" /> WhatsApp Message
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
