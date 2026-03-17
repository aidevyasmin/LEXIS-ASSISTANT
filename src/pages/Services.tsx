import { Gavel, Scale, Shield, Users, Home, Briefcase, FileText, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: "Family Law",
      desc: "Compassionate and effective representation in divorce, child custody, maintenance, and family disputes. We prioritize your family's future.",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Civil Cases",
      desc: "Expert handling of civil litigation, including contract disputes, recovery suits, and representation in all civil courts.",
      icon: Scale,
      color: "text-indigo-600"
    },
    {
      title: "Criminal Defense",
      desc: "Professional defense in criminal matters, including bail applications, trials, and appeals. Protecting your fundamental rights.",
      icon: Shield,
      color: "text-red-600"
    },
    {
      title: "Property & Land Disputes",
      desc: "Legal assistance in property matters, land ownership verification, stay orders, and resolution of complex real estate disputes.",
      icon: Home,
      color: "text-green-600"
    },
    {
      title: "Legal Consultation",
      desc: "Professional legal advice for individuals and businesses. Get clarity on your legal position before taking action.",
      icon: Briefcase,
      color: "text-yellow-600"
    },
    {
      title: "Document Drafting",
      desc: "Expert drafting of legal notices, agreements, affidavits, and various legal documents with precision and legal validity.",
      icon: FileText,
      color: "text-slate-600"
    },
    {
      title: "Corporate Law",
      desc: "Consultancy for business registration, compliance, and legal frameworks for local and international corporate clients.",
      icon: Landmark,
      color: "text-purple-600"
    },
    {
      title: "Appeals & Revisions",
      desc: "Handling complex legal appeals and revisions in higher courts to ensure justice is served through the proper legal process.",
      icon: Gavel,
      color: "text-legal-blue"
    },
    {
      title: "Filer / Non-Filer Tax Return",
      desc: "Professional tax return filing services for both individuals and businesses. We handle documentation for filers and non-filers to ensure legal compliance.",
      icon: Landmark,
      color: "text-green-600"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-legal-blue mb-4">Legal Services</h1>
        <div className="w-24 h-1 bg-legal-gold mx-auto mb-6"></div>
        <p className="text-slate-600">
          We provide a wide range of professional legal services tailored to meet the specific 
          needs of our clients. Our goal is to provide reliable and effective legal solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-8 rounded-sm shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div className={`w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-6`}>
              <service.icon className={`w-7 h-7 ${service.color}`} />
            </div>
            <h3 className="text-xl font-bold text-legal-dark mb-4">{service.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-grow">
              {service.desc}
            </p>
            <Link 
              to="/consultation" 
              className="text-xs font-bold uppercase tracking-widest text-legal-blue hover:text-legal-gold flex items-center mt-auto"
            >
              Request Consultation <Gavel className="w-3 h-3 ml-2" />
            </Link>
          </div>
        ))}
      </div>

      {/* Trust Banner */}
      <div className="mt-20 bg-slate-900 text-white p-12 rounded-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full bg-legal-gold/10 -skew-x-12 translate-x-20"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-3xl font-serif font-bold mb-4">Unwavering Commitment to Justice</h2>
            <p className="text-slate-400">
              Each case is handled with the highest level of professionalism and confidentiality. 
              Our 9+ years of experience ensures that you receive the best possible legal representation.
            </p>
          </div>
          <div className="flex shrink-0">
            <Link 
              to="/contact" 
              className="px-10 py-4 bg-legal-gold text-black font-bold rounded-sm uppercase tracking-widest text-xs hover:bg-white transition-all"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
