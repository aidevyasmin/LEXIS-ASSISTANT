import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Calendar, Phone, Shield } from 'lucide-react';

const MobileNav = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const dashboardPath = user?.role === 'CLIENT' ? '/client-dashboard' : '/dashboard';

  const navItems = [
    { icon: <Home className="w-6 h-6" />, label: 'Home', path: '/' },
    { icon: <Briefcase className="w-6 h-6" />, label: 'Services', path: '/services' },
    { icon: <Calendar className="w-6 h-6" />, label: 'Book', path: '/consultation' },
    { icon: <Phone className="w-6 h-6" />, label: 'Contact', path: '/contact' },
    { icon: <Shield className="w-6 h-6" />, label: token ? 'Portal' : 'Login', path: token ? dashboardPath : '/login' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 flex justify-around items-center py-3 z-50 px-2 shadow-[0_-4px_10px_rgba(0,0,0,0.3)]">
      {navItems.map((item) => (
        <Link 
          key={item.label} 
          to={item.path} 
          className={`flex flex-col items-center space-y-1 ${location.pathname === item.path ? 'text-legal-gold' : 'text-slate-400'}`}
        >
          {item.icon}
          <span className="text-[10px] uppercase tracking-tighter font-bold">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default MobileNav;
