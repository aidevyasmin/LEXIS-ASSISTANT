import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Muhammad Ali",
      role: "Business Owner",
      content: "Advocate Nisar Hussain provided exceptional legal advice regarding my property dispute. His expertise and dedication were evident from the first meeting.",
      rating: 5
    },
    {
      name: "Sajid Mahmood",
      role: "Client",
      content: "I am extremely grateful for the professional handling of my family case. The results exceeded my expectations, and the process was handled with great sensitivity.",
      rating: 5
    },
    {
      name: "Zainab Bibi",
      role: "Individual Client",
      content: "Very professional and trustworthy. Highly recommended for any civil litigation matters. He explains everything clearly and honestly.",
      rating: 5
    },
    {
      name: "Kamran Khan",
      role: "Corporate Client",
      content: "Nisar Hussain's legal consultancy has been invaluable for our company's compliance and contract matters. A true professional in every sense.",
      rating: 5
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-legal-blue mb-4">Client Testimonials</h1>
        <div className="w-24 h-1 bg-legal-gold mx-auto mb-6"></div>
        <p className="text-slate-600">
          Hear from our clients about their experiences with our legal services. We take pride 
          in our commitment to excellence and client satisfaction.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-8 rounded-sm shadow-xl border border-slate-100 relative overflow-hidden group hover:border-legal-gold transition-all duration-300">
            <Quote className="absolute -top-2 -right-2 w-24 h-24 text-slate-50 group-hover:text-legal-gold/5 transition-colors" />
            
            <div className="flex space-x-1 mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-legal-gold text-legal-gold" />
              ))}
            </div>

            <p className="text-slate-700 italic mb-6 leading-relaxed relative z-10">
              "{review.content}"
            </p>

            <div className="flex items-center space-x-4 border-t border-slate-100 pt-6">
              <div className="w-12 h-12 bg-legal-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
                {review.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-legal-dark">{review.name}</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-20 bg-legal-blue text-white p-12 rounded-sm text-center max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <h2 className="text-3xl font-serif font-bold mb-4 relative z-10">Ready to Get Professional Help?</h2>
        <p className="text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
          Join our list of satisfied clients today. Schedule your consultation and let us 
          provide you with the legal expertise you deserve.
        </p>
        <a 
          href="/consultation" 
          className="inline-block bg-legal-gold text-black px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all relative z-10"
        >
          Book Your Appointment
        </a>
      </div>
    </div>
  );
};

export default Testimonials;
