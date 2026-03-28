import { ArrowRight, Book, Calendar, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const posts = [
    {
      id: "0",
      title: "Understanding Family Law in Pakistan",
      summary: "A comprehensive guide to divorce laws, child custody, and family disputes in the Pakistani legal system.",
      date: "March 5, 2026",
      author: "Nisar Hussain",
      category: "Family Law",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: "1",
      title: "Common Property Disputes and Solutions",
      summary: "Learn about the legal aspects of land ownership, transfer of property, and how to resolve common disputes effectively.",
      date: "February 28, 2026",
      author: "Nisar Hussain",
      category: "Property Law",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: "2",
      title: "Know Your Rights: Criminal Defense Basics",
      summary: "What to do if you're facing criminal charges. Understanding bail, trial procedures, and your fundamental legal rights.",
      date: "February 15, 2026",
      author: "Nisar Hussain",
      category: "Criminal Law",
      image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&auto=format&fit=crop&q=60"
    }
  ];

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async () => {
    if (!isValidEmail(email)) return;
    
    setIsSubscribing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store in localStorage as mock backend storage
    const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
    if (!subscriptions.includes(email)) {
      subscriptions.push(email);
      localStorage.setItem('newsletter_subscriptions', JSON.stringify(subscriptions));
    }
    
    setSubscribed(true);
    setIsSubscribing(false);
    setEmail('');
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-in slide-in-from-right duration-700">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-legal-blue mb-4">Legal Blog & Awareness</h1>
        <div className="w-24 h-1 bg-legal-gold mx-auto mb-6"></div>
        <p className="text-slate-600">
          Providing valuable legal insights and updates to help you navigate the Pakistani 
          legal landscape with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-sm shadow-lg overflow-hidden border border-slate-100 group">
            <div className="h-48 overflow-hidden relative cursor-pointer" onClick={() => navigate(`/blog/${post.id}`)}>
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute top-4 left-4 bg-legal-gold text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {post.category}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center space-x-4 text-xs text-slate-400 mb-4 uppercase tracking-widest">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{post.author}</span>
                </span>
              </div>
              
              <h2 
                className="text-xl font-serif font-bold text-legal-dark mb-3 group-hover:text-legal-blue transition-colors cursor-pointer"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                {post.title}
              </h2>
              
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                {post.summary}
              </p>
              
              <button 
                onClick={() => navigate(`/blog/${post.id}`)}
                className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-legal-blue hover:text-legal-gold transition-colors"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Subscription Section */}
      <div className="mt-20 border-y border-slate-200 py-16 flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
        <div className="max-w-md">
          <div className="flex items-center space-x-3 mb-4">
            <Book className="w-8 h-8 text-legal-gold" />
            <h3 className="text-2xl font-serif font-bold text-legal-blue">Stay Informed</h3>
          </div>
          <p className="text-slate-600 text-sm">
            Subscribe to our legal newsletter to receive the latest updates, legal tips, 
            and law awareness content directly in your inbox.
          </p>
        </div>
        
        <div className="w-full max-w-md">
          {subscribed ? (
            <div className="bg-green-50 text-green-700 p-4 border border-green-200 rounded-sm font-bold text-center animate-in fade-in zoom-in duration-300">
              Thank you for subscribing!
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <div className="flex">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="flex-grow p-4 bg-slate-50 border border-slate-200 outline-none focus:border-legal-blue"
                />
                <button 
                  disabled={!isValidEmail(email) || isSubscribing}
                  onClick={handleSubscribe}
                  className={`bg-legal-blue text-white px-8 font-bold uppercase tracking-widest text-xs transition-all ${
                    isValidEmail(email) && !isSubscribing ? 'hover:bg-black' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {isSubscribing ? 'Processing...' : 'Subscribe'}
                </button>
              </div>
              {!isValidEmail(email) && email.length > 0 && (
                <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Please enter a valid email address</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
