import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../services/api';
import Button from '../components/ui/Button';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Auto-login if token exists (handled by ProtectedRoute mostly, but good here too)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role === 'CLIENT') {
        navigate('/client-dashboard');
      } else if (user.role) {
        navigate('/dashboard');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await auth.login({ email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      const user = response.data.user;
      if (user.role === 'CLIENT') {
        navigate('/client-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] animate-in fade-in duration-500">
      <div className="bg-white p-10 rounded-sm shadow-2xl w-full max-w-md border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-legal-gold"></div>
        <h2 className="text-3xl font-serif font-bold text-legal-blue mb-2 text-center">Secure Portal</h2>
        <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Nisar Hussain Bhatti – Advocate High Court</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
                placeholder="advocate@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="text-center mb-4">
            <Link to="/register" className="text-sm text-slate-500 hover:text-legal-blue transition-colors">
              New client? <span className="text-legal-blue font-bold border-b border-legal-blue">Register here</span>
            </Link>
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>

        </form>
      </div>
    </div>
  );
};

export default Login;
