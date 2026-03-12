import { Award, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col space-y-16 py-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-legal-blue mb-6">About Nisar Hussain Bhatti – Advocate High Court</h1>
        <div className="w-24 h-1 bg-legal-gold mx-auto mb-8"></div>
        <p className="text-lg text-slate-700 leading-relaxed mb-8">
          Advocate Nisar Hussain Bhatti is a dedicated legal professional with over 9 years of 
          extensive experience in providing reliable and effective legal solutions across various 
          branches of law in Pakistan.
        </p>
      </section>

      {/* Experience Grid */}
      <section className="bg-legal-blue text-white py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 border border-white/20 rounded-sm">
            <Award className="w-12 h-12 text-legal-gold mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-1">9+ Years</h3>
            <p className="text-sm text-slate-300 uppercase tracking-widest">Professional Practice</p>
          </div>
          <div className="text-center p-6 border border-white/20 rounded-sm">
            <ShieldCheck className="w-12 h-12 text-legal-gold mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-1">High Success</h3>
            <p className="text-sm text-slate-300 uppercase tracking-widest">Client Satisfaction</p>
          </div>
          <div className="text-center p-6 border border-white/20 rounded-sm">
            <GraduationCap className="w-12 h-12 text-legal-gold mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-1">Expert Counsel</h3>
            <p className="text-sm text-slate-300 uppercase tracking-widest">Legal Expertise</p>
          </div>
          <div className="text-center p-6 border border-white/20 rounded-sm">
            <BookOpen className="w-12 h-12 text-legal-gold mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-1">Dedication</h3>
            <p className="text-sm text-slate-300 uppercase tracking-widest">Commitment to Justice</p>
          </div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-legal-dark">Professional Profile</h2>
            <p className="text-slate-700 leading-relaxed">
              Nisar Hussain Bhatti has established himself as a trusted legal advisor and fierce 
              litigator. His practice is built on the pillars of integrity, transparency, and a 
              unwavering commitment to his clients' rights.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Throughout his career, he has successfully handled complex matters in civil litigation, 
              family disputes, criminal defense, and property cases. His approach combines deep 
              legal knowledge with practical strategies to achieve the best possible outcomes for 
              those he represents.
            </p>
            <div className="bg-slate-50 p-6 border-l-4 border-legal-gold">
              <p className="italic text-legal-blue font-serif">
                "Justice delayed is justice denied. My goal is to provide swift, effective, and 
                affordable legal solutions for everyone."
              </p>
            </div>
          </div>
          <div className="bg-legal-blue p-8 rounded-sm shadow-2xl">
            <h3 className="text-xl font-bold text-legal-gold mb-6 uppercase tracking-widest">Specializations</h3>
            <ul className="space-y-4 text-white">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-legal-gold rounded-full"></div>
                <span>Civil Litigation & Appeals</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-legal-gold rounded-full"></div>
                <span>Family Law & Child Custody</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-legal-gold rounded-full"></div>
                <span>Criminal Defense Representative</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-legal-gold rounded-full"></div>
                <span>Property & Land Disputes</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-legal-gold rounded-full"></div>
                <span>Filer / Non-Filer Tax Return</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-legal-gold rounded-full"></div>
                <span>Corporate Legal Consultancy</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
