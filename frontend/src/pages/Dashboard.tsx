import { useEffect, useState } from 'react';
import { dashboard } from '../services/api';
import { Users, Briefcase, Calendar, DollarSign, Clock, ChevronRight, Shield, Award, Plus, Gavel } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dashboard.getOverview();
        setData(res.data);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-legal-light">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-legal-blue"></div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Clients', value: data?.totalClients || 0, icon: Users, color: 'text-legal-blue', bg: 'bg-blue-50' },
    { label: 'Active Cases', value: data?.activeCases || 0, icon: Briefcase, color: 'text-legal-gold', bg: 'bg-yellow-50' },
    { label: 'Upcoming Hearings', value: data?.upcomingHearings?.length || 0, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Revenue', value: `${data?.totalRevenue || 0} PKR`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-legal-gold mb-2">
            <Award className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Premium Practice Management</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-legal-blue mb-1">Advocate Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back, Advocate Nisar Hussain Bhatti. Your chamber is operational.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-sm shadow-sm border border-slate-100 text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Session</p>
          <p className="text-sm font-bold text-legal-dark">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-sm shadow-lg border-b-4 border-transparent hover:border-legal-gold transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 ${stat.bg} ${stat.color} rounded-sm shadow-inner group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <Shield className="w-4 h-4 text-slate-100" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-legal-blue">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Hearings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-sm shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-legal-blue text-white">
              <h2 className="text-xl font-serif font-bold flex items-center gap-3">
                <Gavel className="w-6 h-6 text-legal-gold" />
                Court Hearing Schedule
              </h2>
              <Link to="/cases" className="text-xs text-legal-gold hover:text-white font-bold uppercase tracking-widest transition-colors">Manage Cases</Link>
            </div>
            <div className="divide-y divide-slate-50 bg-slate-50/30">
              {data?.upcomingHearings?.length > 0 ? data.upcomingHearings.map((hearing: any) => (
                <div key={hearing.id} className="p-6 hover:bg-white transition-all flex items-center justify-between border-l-4 border-transparent hover:border-legal-gold">
                  <div className="flex items-center gap-6">
                    <div className="text-center min-w-[70px] p-3 bg-white rounded-sm shadow-sm border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{new Date(hearing.hearingDate).toLocaleString('en-US', { month: 'short' })}</p>
                      <p className="text-2xl font-serif font-bold text-legal-blue">{new Date(hearing.hearingDate).getDate()}</p>
                    </div>
                    <div>
                      <p className="font-bold text-legal-dark text-lg">{hearing.case?.title}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 font-medium">
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-legal-gold" /> {new Date(hearing.hearingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        <span className="uppercase tracking-widest">{hearing.purpose || 'General Hearing'}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-legal-gold transition-colors" />
                </div>
              )) : (
                <div className="p-20 text-center text-slate-300">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-10" />
                  <p className="font-serif italic">No upcoming hearings found in the docket.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white rounded-sm shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h2 className="text-sm font-bold text-legal-blue flex items-center gap-2 uppercase tracking-widest">
                <Clock className="w-5 h-5 text-legal-gold" />
                Appointments
              </h2>
              <span className="bg-legal-blue text-white text-[10px] px-2 py-0.5 rounded-full font-bold">LIVE</span>
            </div>
            <div className="p-6 space-y-4">
              {data?.upcomingAppointments?.length > 0 ? data.upcomingAppointments.map((appt: any) => (
                <div key={appt.id} className="p-5 rounded-sm border-l-2 border-legal-gold bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                  <p className="font-bold text-legal-dark text-sm">{appt.clientFullName}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{new Date(appt.slotStart).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </div>
              )) : (
                <div className="text-center py-10">
                  <p className="text-slate-400 text-xs italic">No pending client consultations.</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="premium-gradient rounded-sm p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-legal-gold/10 rounded-full -mr-16 -mt-16"></div>
            <h3 className="font-bold mb-6 text-legal-gold uppercase tracking-[0.2em] text-[10px] relative z-10">Administrative Actions</h3>
            <div className="grid grid-cols-1 gap-4 relative z-10">
              <Link to="/cases" className="bg-white/10 hover:bg-white/20 p-4 rounded-sm transition-all text-xs font-bold uppercase tracking-[0.15em] flex items-center justify-between border border-white/5">
                New Case File <Plus className="w-4 h-4 text-legal-gold" />
              </Link>
              <Link to="/notes" className="bg-white/10 hover:bg-white/20 p-4 rounded-sm transition-all text-xs font-bold uppercase tracking-[0.15em] flex items-center justify-between border border-white/5">
                Legal Research <Plus className="w-4 h-4 text-legal-gold" />
              </Link>
              <Link to="/ai-assistant" className="bg-legal-gold text-black p-4 rounded-sm transition-all text-xs font-bold uppercase tracking-[0.15em] flex items-center justify-between shadow-lg">
                Consult Lexis AI <Sparkles className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sparkles = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M3 5h4"/><path d="M21 17v4"/><path d="M19 19h4"/>
  </svg>
);

export default Dashboard;
