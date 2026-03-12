import { useState } from 'react';
import { Book, Search, Download, ExternalLink, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../services/api';

const LawLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const books = [
    { 
      id: 'ppc', 
      title: 'Pakistan Penal Code (PPC)', 
      author: 'Government of Pakistan', 
      year: '1860', 
      size: '2.4 MB', 
      type: 'PDF',
      url: 'https://www.fmu.gov.pk/docs/laws/Pakistan-Penal-Code.pdf',
      localPath: '/uploads/library/ppc.pdf'
    },
    { 
      id: 'crpc', 
      title: 'Code of Criminal Procedure (CrPC)', 
      author: 'Government of Pakistan', 
      year: '1898', 
      size: '3.1 MB', 
      type: 'PDF',
      url: 'https://fmu.gov.pk/docs/laws/Code_of_criminal_procedure_1898.pdf',
      localPath: '/uploads/library/crpc.pdf'
    },
    { 
      id: 'cpc', 
      title: 'Civil Procedure Code (CPC)', 
      author: 'Government of Pakistan', 
      year: '1908', 
      size: '2.8 MB', 
      type: 'PDF',
      url: 'https://punjabcode.punjab.gov.pk/uploads/articles/Act_V_of_1908.pdf',
      localPath: '/uploads/library/cpc.pdf'
    },
    { 
      id: 'constitution', 
      title: 'Constitution of Pakistan', 
      author: 'Constituent Assembly', 
      year: '1973', 
      size: '1.5 MB', 
      type: 'PDF',
      url: 'https://pabalochistan.gov.pk/wp-content/uploads/2024/12/Constitution.pdf',
      localPath: '/uploads/library/constitution.pdf'
    },
    { 
      id: 'qso', 
      title: 'Qanun-e-Shahadat Order (QSO)', 
      author: 'Presidential Order', 
      year: '1984', 
      size: '1.2 MB', 
      type: 'PDF',
      url: 'https://punjabpolice.gov.pk/system/files/qanun-e-shahadat-order-1984.pdf',
      localPath: '/uploads/library/qso.pdf'
    },
    { 
      id: 'limitation', 
      title: 'Limitation Act', 
      author: 'Government of Pakistan', 
      year: '1908', 
      size: '0.8 MB', 
      type: 'PDF',
      url: 'https://khalidzafar.com/wp-content/uploads/2016/01/Limitation-Act-1908.pdf',
      localPath: '/uploads/library/limitation.pdf'
    },
    { 
      id: 'specific_relief', 
      title: 'Specific Relief Act', 
      author: 'Government of Pakistan', 
      year: '1877', 
      size: '0.7 MB', 
      type: 'PDF',
      url: 'https://www.fmu.gov.pk/docs/laws/Specific_Relief_Act_1877.pdf',
      localPath: '/uploads/library/specific_relief.pdf'
    },
    { 
      id: 'family_courts', 
      title: 'Family Courts Act', 
      author: 'Government of Pakistan', 
      year: '1964', 
      size: '0.9 MB', 
      type: 'PDF',
      url: 'https://fmu.gov.pk/docs/laws/Family_Courts_Act_1964.pdf',
      localPath: '/uploads/library/family_courts.pdf'
    },
  ];

  const handleView = (book: any) => {
    const url = book.url || (BASE_URL + book.localPath);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = (book: any) => {
    const url = book.url || (BASE_URL + book.localPath);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = `${book.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 bg-white p-8 rounded-sm shadow-sm border border-slate-100">
        <div className="flex items-center space-x-4">
          <div className="bg-legal-blue p-3 rounded-sm shadow-lg">
            <Book className="w-8 h-8 text-legal-gold" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-legal-blue">Digital Law Library</h1>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-1">Nisar Hussain Bhatti – Reference Collection</p>
          </div>
        </div>
        <div className="relative flex-grow max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for legal acts or documents..." 
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-1 focus:ring-legal-gold outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white group rounded-sm shadow-lg border border-slate-200 hover:border-legal-gold transition-all overflow-hidden flex flex-col">
            <div className="p-8 flex-grow">
              <div className="w-12 h-12 bg-slate-50 rounded-sm flex items-center justify-center mb-6 group-hover:bg-legal-gold group-hover:text-black transition-colors">
                <Shield className="w-6 h-6 text-legal-blue" />
              </div>
              <h3 className="text-lg font-serif font-bold text-legal-blue mb-2 leading-tight h-14 overflow-hidden">{book.title}</h3>
              <div className="space-y-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <p>Enacted: {book.year}</p>
                <p>Source: {book.author}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{book.size} • {book.type}</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleDownload(book)}
                  className="p-2 text-legal-blue hover:text-legal-gold transition-colors" 
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleView(book)}
                  className="p-2 text-legal-blue hover:text-legal-gold transition-colors" 
                  title="View Online"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-legal-blue p-12 rounded-sm text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-full bg-legal-gold/5 -skew-x-12 -translate-x-20"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-serif font-bold text-white">Advanced Search & AI Analysis</h2>
          <p className="text-slate-300">
            Need to find a specific section or want an AI-powered explanation of a legal clause? 
            Use our AI Assistant for instant cross-referencing and summaries.
          </p>
          <Link to="/ai-assistant" className="inline-block px-10 py-4 bg-legal-gold text-black font-bold rounded-sm uppercase tracking-widest text-xs hover:bg-white transition-all">
            Consult AI Assistant
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LawLibrary;
