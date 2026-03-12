import { Link, useNavigate } from 'react-router-dom';
import { Gavel, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Consultation', path: '/consultation' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-serif font-bold tracking-tight">
          <Gavel className="w-8 h-8 text-legal-gold" />
          <div className="flex flex-col leading-tight">
            <span className="text-white text-base md:text-lg">Nisar Hussain Bhatti</span>
            <span className="text-[10px] uppercase tracking-widest text-legal-gold font-bold">Advocate High Court</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6 text-[10px] font-bold uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="hover:text-legal-gold transition-colors">
              {link.name}
            </Link>
          ))}
          
          {token ? (
            <div className="flex items-center space-x-4 border-l border-slate-700 ml-4 pl-4 text-[10px] font-bold">
              <Link to="/dashboard" className="hover:text-legal-gold transition-colors">Dashboard</Link>
              <Link to="/cases" className="hover:text-legal-gold transition-colors">Cases</Link>
              <Link to="/notes" className="hover:text-legal-gold transition-colors">Notepad</Link>
              <Link to="/ai-assistant" className="hover:text-legal-gold transition-colors">Lexis AI</Link>
              <Link to="/library" className="hover:text-legal-gold transition-colors">Library</Link>
              <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition-colors ml-2">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-legal-gold hover:bg-white text-black px-6 py-2 rounded-sm transition-all text-[10px] uppercase tracking-[0.2em] font-bold ml-4 shadow-lg">
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-slate-800 absolute top-full left-0 w-full border-t border-slate-700 shadow-2xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4 space-y-4 text-sm font-medium uppercase tracking-wider">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="hover:text-legal-gold transition-colors py-2 border-b border-slate-700/50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {token ? (
              <>
                <Link to="/dashboard" className="hover:text-legal-gold transition-colors py-2 border-b border-slate-700/50" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <Link to="/cases" className="hover:text-legal-gold transition-colors py-2 border-b border-slate-700/50" onClick={() => setIsMenuOpen(false)}>Cases</Link>
                <Link to="/notes" className="hover:text-legal-gold transition-colors py-2 border-b border-slate-700/50" onClick={() => setIsMenuOpen(false)}>Notepad</Link>
                <Link to="/ai-assistant" className="hover:text-legal-gold transition-colors py-2 border-b border-slate-700/50" onClick={() => setIsMenuOpen(false)}>Lexis AI</Link>
                <Link to="/library" className="hover:text-legal-gold transition-colors py-2 border-b border-slate-700/50" onClick={() => setIsMenuOpen(false)}>Library</Link>
                <button onClick={handleLogout} className="text-red-400 flex items-center space-x-2 py-4">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-legal-gold text-black text-center py-3 rounded-sm font-bold mt-2" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
