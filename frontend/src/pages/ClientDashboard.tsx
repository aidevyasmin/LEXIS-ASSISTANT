import { useEffect, useState } from 'react';
import { dashboard, BASE_URL } from '../services/api';
import { Briefcase, Calendar, Clock, ChevronRight, Shield, Bell, FileText, ExternalLink } from 'lucide-react';

const ClientDashboard = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dashboard.getClientOverview();
        setData(res.data);
      } catch (err) {
        console.error("Failed to load client dashboard", err);
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

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold text-legal-blue mb-4">No Profile Found</h2>
        <p className="text-slate-500">Please contact the advocate's office to link your account to your case files.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-legal-gold mb-2">
            <Shield className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Secure Client Access</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-legal-blue mb-1">Welcome, {data.fullName}</h1>
          <p className="text-slate-500 text-sm">Monitor your case progress and upcoming court dates.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-sm shadow-sm border border-slate-100 text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Update</p>
          <p className="text-sm font-bold text-legal-dark">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Cases */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-sm shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-legal-blue text-white">
              <h2 className="text-xl font-serif font-bold flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-legal-gold" />
                My Case Files
              </h2>
            </div>
            <div className="divide-y divide-slate-50 bg-slate-50/30">
              {data.cases?.length > 0 ? data.cases.map((c: any) => (
                <div key={c.id} className="p-8 hover:bg-white transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-legal-dark mb-1">{c.title}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.caseNumber} • {c.type}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{c.status}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-legal-gold uppercase tracking-widest flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" /> Next Hearing
                      </h4>
                      {c.hearings?.length > 0 ? (
                        <div className="bg-slate-50 p-4 rounded-sm border border-slate-100">
                          <p className="font-bold text-legal-blue">{new Date(c.hearings[0].hearingDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">{c.hearings[0].purpose || 'General Hearing'}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic">No hearings scheduled yet.</p>
                      )}
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-legal-gold uppercase tracking-widest flex items-center gap-2">
                        <Bell className="w-3.5 h-3.5" /> Recent Updates
                      </h4>
                      {c.notes?.length > 0 ? (
                        <div className="space-y-2">
                          <p className="text-xs text-slate-600 line-clamp-3 italic">"{c.notes[0].content}"</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Updated: {new Date(c.notes[0].updatedAt).toLocaleDateString()}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic">No recent updates from the advocate.</p>
                      )}
                    </div>
                  </div>

                  {/* Case Documents */}
                  {c.documents?.length > 0 && (
                    <div className="space-y-3 pt-6 border-t border-slate-100">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available Documents</h4>
                      <div className="flex flex-wrap gap-3">
                        {c.documents.map((doc: any) => (
                          <a 
                            key={doc.id} 
                            href={`${BASE_URL}${doc.url}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-sm text-[10px] font-bold text-legal-blue hover:border-legal-gold transition-colors shadow-sm"
                          >
                            <FileText className="w-3.5 h-3.5 text-legal-gold" />
                            {doc.name}
                            <ExternalLink className="w-3 h-3 text-slate-300" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )) : (
                <div className="p-20 text-center text-slate-300">
                  <Briefcase className="w-16 h-16 mx-auto mb-4 opacity-10" />
                  <p className="font-serif italic text-lg">No case records associated with your account.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: Appointments & Contact */}
        <div className="space-y-8">
          <div className="bg-white rounded-sm shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h2 className="text-sm font-bold text-legal-blue flex items-center gap-2 uppercase tracking-widest">
                <Clock className="w-5 h-5 text-legal-gold" />
                Consultations
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {data.appointments?.length > 0 ? data.appointments.map((appt: any) => (
                <div key={appt.id} className="p-5 rounded-sm border-l-2 border-legal-gold bg-slate-50">
                  <p className="font-bold text-legal-dark text-sm">{appt.status} Appointment</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{new Date(appt.slotStart).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </div>
              )) : (
                <div className="text-center py-10">
                  <p className="text-slate-400 text-xs italic">No upcoming consultations.</p>
                  <a href="/consultation" className="mt-4 inline-block text-[10px] font-bold text-legal-blue uppercase tracking-widest hover:text-legal-gold underline underline-offset-4">Schedule Now</a>
                </div>
              )}
            </div>
          </div>

          <div className="premium-gradient rounded-sm p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-legal-gold/10 rounded-full -mr-16 -mt-16"></div>
            <h3 className="font-bold mb-6 text-legal-gold uppercase tracking-[0.2em] text-[10px] relative z-10">Direct Chamber Support</h3>
            <div className="space-y-4 relative z-10">
              <p className="text-xs text-slate-300 leading-relaxed">Need urgent assistance or have questions about your case status?</p>
              <a href="https://wa.me/923214755492" target="_blank" rel="noopener noreferrer" className="w-full bg-legal-gold text-black p-4 rounded-sm transition-all text-xs font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-3 shadow-lg">
                <Shield className="w-4 h-4" /> Message Advocate
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
