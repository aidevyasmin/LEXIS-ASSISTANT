import { useState, useEffect } from 'react';
import { cases, clients, documents, BASE_URL } from '../services/api';
import { Plus, Briefcase, Calendar, User, Search, Upload, File, Trash2, Phone, ExternalLink, Clock } from 'lucide-react';

const CaseManagement = () => {
  const [caseList, setCaseList] = useState<any[]>([]);
  const [clientList, setClientList] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  
  const [newCase, setNewCase] = useState({
    caseNumber: '',
    title: '',
    description: '',
    type: 'CIVIL',
    clientId: '',
    courtName: '',
    judgeName: '',
    opposingParty: '',
    opposingLawyer: '',
    nextHearingDate: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [casesRes, clientsRes] = await Promise.all([
        cases.getAll(),
        clients.getAll()
      ]);
      setCaseList(casesRes.data);
      setClientList(clientsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await cases.create(newCase);
      setShowAddForm(false);
      setNewCase({
        caseNumber: '',
        title: '',
        description: '',
        type: 'CIVIL',
        clientId: '',
        courtName: '',
        judgeName: '',
        opposingParty: '',
        opposingLawyer: '',
        nextHearingDate: ''
      });
      fetchData();
    } catch (err) {
      console.error('Error creating case:', err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, caseId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('caseId', caseId);
    formData.append('name', file.name);

    setUploading(true);
    try {
      await documents.upload(formData);
      // Refresh case list to show new documents
      fetchData();
      if (selectedCase && selectedCase.id === caseId) {
        const updatedCase = await cases.get(caseId);
        setSelectedCase(updatedCase.data);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload document.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (docId: string, caseId: string) => {
    if (!window.confirm('Delete this document?')) return;
    try {
      await documents.delete(docId);
      fetchData();
      if (selectedCase && selectedCase.id === caseId) {
        const updatedCase = await cases.get(caseId);
        setSelectedCase(updatedCase.data);
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const filteredCases = caseList.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.client?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-sm shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-serif font-bold text-legal-blue">Case Management</h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-1">Advocate Nisar Hussain Bhatti – Chamber Records</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-legal-blue text-white px-6 py-3 rounded-sm flex items-center space-x-2 hover:bg-black transition-all shadow-md font-bold uppercase tracking-widest text-xs"
        >
          <Plus className="w-5 h-5 text-legal-gold" />
          <span>{showAddForm ? 'Close Form' : 'New Case File'}</span>
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-8 rounded-sm shadow-xl border-t-4 border-legal-gold animate-in slide-in-from-top duration-300">
          <h2 className="text-xl font-serif font-bold mb-6 text-legal-blue uppercase tracking-tight">Register New Case File</h2>
          <form onSubmit={handleCreateCase} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2 lg:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Case Title</label>
              <input 
                type="text" placeholder="Title (e.g. State vs John Doe)" required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-1 focus:ring-legal-gold outline-none text-sm"
                value={newCase.title} onChange={e => setNewCase({...newCase, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Case Number</label>
              <input 
                type="text" placeholder="2026/CS/101" required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-1 focus:ring-legal-gold outline-none text-sm"
                value={newCase.caseNumber} onChange={e => setNewCase({...newCase, caseNumber: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Case Type</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-1 focus:ring-legal-gold outline-none text-sm font-bold text-slate-600"
                value={newCase.type} onChange={e => setNewCase({...newCase, type: e.target.value as any})}
              >
                <option value="CIVIL">Civil</option>
                <option value="CRIMINAL">Criminal</option>
                <option value="FAMILY">Family</option>
                <option value="PROPERTY">Property</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="space-y-2 lg:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Associated Client</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-1 focus:ring-legal-gold outline-none text-sm font-bold text-slate-600"
                value={newCase.clientId} onChange={e => setNewCase({...newCase, clientId: e.target.value})}
                required
              >
                <option value="">Select a registered client</option>
                {clientList.map(c => (
                  <option key={c.id} value={c.id}>{c.fullName} ({c.phone})</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Court Name</label>
              <input 
                type="text" placeholder="e.g. Session Court Lahore"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-1 focus:ring-legal-gold outline-none text-sm"
                value={newCase.courtName} onChange={e => setNewCase({...newCase, courtName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hon'ble Judge</label>
              <input 
                type="text" placeholder="Judge Name"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-1 focus:ring-legal-gold outline-none text-sm"
                value={newCase.judgeName} onChange={e => setNewCase({...newCase, judgeName: e.target.value})}
              />
            </div>
            <div className="space-y-2 lg:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Opposing Party</label>
              <input 
                type="text" placeholder="Name of Opposing Party"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-1 focus:ring-legal-gold outline-none text-sm"
                value={newCase.opposingParty} onChange={e => setNewCase({...newCase, opposingParty: e.target.value})}
              />
            </div>
            <div className="space-y-2 lg:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Opposing Counsel</label>
              <input 
                type="text" placeholder="Lawyer's Name"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-1 focus:ring-legal-gold outline-none text-sm"
                value={newCase.opposingLawyer} onChange={e => setNewCase({...newCase, opposingLawyer: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Hearing Date</label>
              <input 
                type="date"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-1 focus:ring-legal-gold outline-none text-sm font-bold text-slate-600"
                value={newCase.nextHearingDate} onChange={e => setNewCase({...newCase, nextHearingDate: e.target.value})}
              />
            </div>
            <div className="space-y-2 col-span-full">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Brief Case Summary</label>
              <textarea 
                placeholder="Key facts and initial status..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-1 focus:ring-legal-gold outline-none text-sm h-32 resize-none"
                value={newCase.description} onChange={e => setNewCase({...newCase, description: e.target.value})}
              />
            </div>
            <button type="submit" className="col-span-full bg-legal-blue text-white py-4 rounded-sm hover:bg-black transition-all font-bold uppercase tracking-widest text-xs shadow-lg">
              Generate Digital Case File
            </button>
          </form>
        </div>
      )}

      <div className="flex items-center space-x-3 bg-white px-6 py-4 rounded-sm border border-slate-100 shadow-sm">
        <Search className="w-5 h-5 text-legal-gold" />
        <input 
          type="text" placeholder="Search the archives by case title, number, or client..." 
          className="flex-grow focus:outline-none text-sm font-medium"
          value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full text-center py-20 text-slate-400 italic">Consulting chamber archives...</div>
        ) : filteredCases.length > 0 ? (
          filteredCases.map((c) => (
            <div key={c.id} className="bg-white rounded-sm shadow-lg border border-slate-200 hover:border-legal-gold transition-all flex flex-col group overflow-hidden">
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-50 rounded-sm group-hover:bg-legal-gold group-hover:text-black transition-colors">
                    <Briefcase className="w-6 h-6 text-legal-blue" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    c.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {c.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-serif font-bold text-legal-blue mb-1 truncate">{c.title}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{c.caseNumber}</p>
                
                <div className="space-y-4 mb-8 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <User className="w-4 h-4 text-legal-gold" />
                      <span className="font-bold uppercase tracking-tight">Client: {c.client?.fullName}</span>
                    </div>
                    <a href={`tel:${c.client?.phone}`} className="text-legal-blue hover:text-legal-gold transition-colors" title="Call Client">
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Calendar className="w-4 h-4 text-legal-gold" />
                    <span className="font-bold uppercase tracking-tight">Hearings: {c.hearings?.length || 0} Scheduled</span>
                  </div>
                  {c.hearings?.length > 0 && (
                    <div className="flex items-center space-x-2 text-legal-blue bg-blue-50 p-2 rounded-sm">
                      <Clock className="w-4 h-4" />
                      <span className="font-bold uppercase tracking-tight">Next: {new Date(c.hearings[0].hearingDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {/* Documents List */}
                {c.documents?.length > 0 && (
                  <div className="mb-6 space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Attached Documents</p>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {c.documents.map((doc: any) => (
                        <div key={doc.id} className="flex items-center justify-between bg-slate-50 p-2 rounded-sm text-[10px]">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <File className="w-3 h-3 text-legal-gold shrink-0" />
                            <span className="truncate font-bold text-slate-600">{doc.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <a href={`${BASE_URL}${doc.url}`} target="_blank" rel="noopener noreferrer" className="text-legal-blue hover:text-legal-gold">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <button onClick={() => handleDeleteDocument(doc.id, c.id)} className="text-red-400 hover:text-red-600">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto space-y-3">
                  <label className="cursor-pointer w-full border-2 border-dashed border-slate-200 text-slate-400 py-3 rounded-sm hover:border-legal-gold hover:text-legal-gold transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <Upload className="w-4 h-4" />
                    {uploading ? 'Archiving Document...' : 'Upload Case Document'}
                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, c.id)} disabled={uploading} />
                  </label>
                  <button className="w-full bg-slate-900 text-white py-3 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-md">
                    Explore Case Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-slate-400 italic">No case files matching your search query.</div>
        )}
      </div>
    </div>
  );
};

export default CaseManagement;

