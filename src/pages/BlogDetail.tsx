import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();

  const posts = [
    {
      id: "0",
      title: "Understanding Family Law in Pakistan",
      content: `
        Family law in Pakistan is a complex interplay of religious principles and statutory laws. 
        The primary legislation governing family matters for Muslims is the Muslim Family Laws Ordinance, 1961.

        ### Divorce Laws (Talaq and Khula)
        Under Pakistani law, a husband can pronounce Talaq, but it must be registered with the Union Council. 
        For wives, the right to 'Khula' is available through the family courts if they can no longer live 
        with their husband within the limits prescribed by Allah.

        ### Child Custody (Hizanat)
        The welfare of the minor is the paramount consideration in custody cases. Generally, the mother 
        is entitled to hizanat (custody) of her male child until he is 7 years old and of her female 
        child until she attains puberty, subject to certain conditions.

        ### Maintenance (Nafaqa)
        A husband is legally bound to maintain his wife during the subsistence of marriage and the children 
        until they reach maturity.
      `,
      date: "March 5, 2026",
      author: "Nisar Hussain",
      category: "Family Law",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: "1",
      title: "Common Property Disputes and Solutions",
      content: `
        Property disputes are among the most common legal issues in Pakistan, often leading to 
        lengthy litigation in civil courts.

        ### Land Ownership Verification
        Before purchasing any property, it is crucial to verify the 'Fard' (record of rights) 
        from the Patwari or the relevant housing authority (like LDA or DHA).

        ### Transfer of Property
        Property can be transferred through Sale Deeds, Gift Deeds (Hiba), or Inheritance. 
        Each must be properly registered under the Registration Act, 1908.

        ### Stay Orders
        In case of an illegal attempt to occupy property, a 'Stay Order' or 'Temporary Injunction' 
        can be sought from the civil court to maintain the status quo.
      `,
      date: "February 28, 2026",
      author: "Nisar Hussain",
      category: "Property Law",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: "2",
      title: "Know Your Rights: Criminal Defense Basics",
      content: `
        Understanding your fundamental rights is essential when dealing with the criminal justice system.

        ### Right to Legal Counsel
        Every person accused of an offense has the right to be defended by a legal practitioner 
        of their choice.

        ### Bail (Zamanat)
        Bail is a fundamental right in non-bailable offenses unless there are reasonable grounds 
        to believe the accused is guilty of an offense punishable by death or life imprisonment. 
        Bail-before-arrest (Pre-arrest bail) is also a unique feature of the Pakistani legal system.

        ### FIR (First Information Report)
        The FIR is the starting point of a criminal investigation. It is the duty of the police 
        to register an FIR if a cognizable offense is reported.
      `,
      date: "February 15, 2026",
      author: "Nisar Hussain",
      category: "Criminal Law",
      image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&auto=format&fit=crop&q=60"
    }
  ];

  const post = posts.find(p => p.id === id) || posts[0];

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="flex items-center space-x-2 text-slate-500 hover:text-legal-blue transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Blog</span>
        </Link>

        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-[400px] object-cover rounded-sm shadow-xl mb-10" 
        />

        <div className="flex items-center space-x-6 text-sm text-slate-400 mb-6 uppercase tracking-widest border-b border-slate-100 pb-6">
          <span className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-legal-gold" />
            <span>{post.date}</span>
          </span>
          <span className="flex items-center space-x-2">
            <User className="w-4 h-4 text-legal-gold" />
            <span>{post.author}</span>
          </span>
          <span className="bg-legal-gold/20 text-legal-blue px-3 py-1 rounded-full text-[10px] font-bold">
            {post.category}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-legal-blue mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-lg font-serif italic">
          {post.content.split('\n').map((paragraph, i) => {
            if (paragraph.startsWith('###')) {
              return <h3 key={i} className="text-2xl font-bold text-legal-dark mt-8 mb-4 not-italic font-sans">{paragraph.replace('###', '')}</h3>;
            }
            return <p key={i}>{paragraph}</p>;
          })}
        </div>

        <div className="mt-16 p-8 bg-legal-blue text-white rounded-sm flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Need legal assistance regarding this?</h3>
            <p className="text-slate-300 text-sm">Consult with Advocate Nisar Hussain Bhatti today.</p>
          </div>
          <Link to="/contact" className="bg-legal-gold text-black px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-lg">
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
