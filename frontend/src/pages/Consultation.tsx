import { useState } from 'react';
import { Send, Phone, MessageSquare, Clock, Loader2 } from 'lucide-react';
import { consultations } from '../services/api';

const Consultation = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    caseType: 'Civil Case',
    message: '',
    method: 'Office Visit'
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await consultations.createRequest(formData);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Consultation Booking Error:', err);
      setError(err.response?.data?.message || 'Failed to book consultation. Please try again or call 0321 4755492.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
        <div className="bg-white p-12 rounded-sm shadow-2xl border-t-4 border-legal-gold">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-legal-blue mb-4">Request Received!</h2>
          <p className="text-slate-600 mb-8">
            Thank you for reaching out, {formData.name}. Advocate Nisar Hussain's office will 
            contact you shortly at {formData.phone} to confirm your {formData.method} appointment.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="bg-legal-blue text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-black transition-all"
          >
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-in slide-in-from-bottom duration-500">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-serif font-bold text-legal-blue mb-4">Book a Consultation</h1>
        <div className="w-24 h-1 bg-legal-gold mx-auto mb-6"></div>
        <p className="text-slate-600">
          Take the first step towards resolving your legal matters. Fill out the form below, 
          and our team will get in touch to schedule your professional consultation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-sm shadow-xl border border-slate-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-legal-gold outline-none transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-legal-gold outline-none transition-all"
                  placeholder="03xx xxxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Case Type</label>
                <select 
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-legal-gold outline-none transition-all"
                  value={formData.caseType}
                  onChange={(e) => setFormData({...formData, caseType: e.target.value})}
                >
                  <option>Civil Case</option>
                  <option>Criminal Defense</option>
                  <option>Family Dispute</option>
                  <option>Property Matter</option>
                  <option>Legal Advice</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Consultation Method</label>
                <select 
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-legal-gold outline-none transition-all"
                  value={formData.method}
                  onChange={(e) => setFormData({...formData, method: e.target.value})}
                >
                  <option>Office Visit</option>
                  <option>Online/Phone Call</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Brief Message / Case Description</label>
              <textarea 
                rows={4}
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-legal-gold outline-none transition-all"
                placeholder="Briefly describe your legal concern..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-legal-blue text-white py-4 font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center space-x-2"
            >
              <Clock className="w-5 h-5" />
              <span>Schedule Consultation</span>
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-legal-blue text-white p-8 rounded-sm shadow-lg">
            <h3 className="text-lg font-bold text-legal-gold mb-4 uppercase tracking-widest">Why Choose Us?</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="mt-1"><ShieldCheckIcon /></div>
                <div>
                  <h4 className="font-bold text-sm">Strict Confidentiality</h4>
                  <p className="text-xs text-slate-300">Your information is protected by attorney-client privilege.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-1"><ExpertiseIcon /></div>
                <div>
                  <h4 className="font-bold text-sm">Expert Analysis</h4>
                  <p className="text-xs text-slate-300">Get a professional assessment of your case options.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-1"><QuickIcon /></div>
                <div>
                  <h4 className="font-bold text-sm">Quick Response</h4>
                  <p className="text-xs text-slate-300">We typically respond within 24 hours of inquiry.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 p-8 rounded-sm border border-slate-200">
            <h3 className="text-legal-dark font-serif font-bold text-lg mb-4">Direct Help</h3>
            <div className="space-y-4">
              <a href="tel:03214755492" className="flex items-center space-x-3 text-slate-600 hover:text-legal-blue transition-colors">
                <Phone className="w-5 h-5 text-legal-gold" />
                <span className="font-bold">0321 4755492</span>
              </a>
              <a href="https://wa.me/03214755492" className="flex items-center space-x-3 text-slate-600 hover:text-legal-blue transition-colors">
                <MessageSquare className="w-5 h-5 text-legal-gold" />
                <span className="font-bold">WhatsApp Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShieldCheckIcon = () => (
  <svg className="w-5 h-5 text-legal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const ExpertiseIcon = () => (
  <svg className="w-5 h-5 text-legal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const QuickIcon = () => (
  <svg className="w-5 h-5 text-legal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default Consultation;
