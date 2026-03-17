import { useState, useEffect, useRef } from 'react';
import { notes, cases, clients, dashboard } from '../services/api';
import { Plus, Search, FileText, Trash2, Save, X, User, Briefcase, Mic, MicOff, Calendar, Gavel, Clock } from 'lucide-react';

const Notepad = () => {
  const [noteList, setNoteList] = useState<any[]>([]);
  const [caseList, setCaseList] = useState<any[]>([]);
  const [clientList, setClientList] = useState<any[]>([]);
  const [upcomingHearings, setUpcomingHearings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [activeVoiceField, setActiveVoiceField] = useState<'content' | 'judgeRemarks' | null>(null);
  
  const [currentNote, setCurrentNote] = useState<any>({
    title: '',
    content: '',
    caseId: '',
    clientId: '',
    judgeRemarks: '',
    nextHearingDate: ''
  });

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [notesRes, casesRes, clientsRes, dashboardRes] = await Promise.all([
        notes.getAll(),
        cases.getAll(),
        clients.getAll(),
        dashboard.getOverview()
      ]);
      setNoteList(notesRes.data);
      setCaseList(casesRes.data);
      setClientList(clientsRes.data);
      setUpcomingHearings(dashboardRes.data.upcomingHearings || []);
    } catch (err) {
      console.error("Error fetching notes", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-save logic
  useEffect(() => {
    if (isEditing && currentNote.id) {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        handleAutoSave();
      }, 2000);
    }
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [currentNote.content, currentNote.judgeRemarks, currentNote.title]);

  const handleAutoSave = async () => {
    if (!currentNote.title || !currentNote.id) return;
    try {
      await notes.update(currentNote.id, currentNote);
      // Optional: Show a small "Saved" indicator
    } catch (err) {
      console.error("Auto-save failed", err);
    }
  };

  const handleSave = async () => {
    if (!currentNote.title || !currentNote.content) return;
    try {
      if (currentNote.id) {
        await notes.update(currentNote.id, currentNote);
      } else {
        await notes.create(currentNote);
      }
      setIsEditing(false);
      setCurrentNote({ title: '', content: '', caseId: '', clientId: '', judgeRemarks: '', nextHearingDate: '' });
      fetchData();
    } catch (err) {
      console.error("Error saving note", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await notes.delete(id);
      setIsEditing(false);
      setCurrentNote({ title: '', content: '', caseId: '', clientId: '', judgeRemarks: '', nextHearingDate: '' });
      fetchData();
    } catch (err) {
      console.error("Error deleting note", err);
    }
  };

  const startNew = () => {
    setCurrentNote({ title: '', content: '', caseId: '', clientId: '', judgeRemarks: '', nextHearingDate: '' });
    setIsEditing(true);
  };

  const editNote = (note: any) => {
    setCurrentNote({
      ...note,
      nextHearingDate: note.nextHearingDate ? new Date(note.nextHearingDate).toISOString().split('T')[0] : ''
    });
    setIsEditing(true);
  };

  const toggleVoice = (field: 'content' | 'judgeRemarks') => {
    if (isListening) {
      stopListening();
    } else {
      startListening(field);
    }
  };

  const startListening = (field: 'content' | 'judgeRemarks') => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setActiveVoiceField(field);
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      
      setCurrentNote((prev: any) => ({
        ...prev,
        [field]: transcript
      }));
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      stopListening();
    };

    recognition.onend = () => {
      setIsListening(false);
      setActiveVoiceField(null);
    };

    (window as any).recognition = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if ((window as any).recognition) {
      (window as any).recognition.stop();
    }
    setIsListening(false);
    setActiveVoiceField(null);
  };

  const filteredNotes = noteList.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)] gap-6 animate-in fade-in duration-500">
      {/* Sidebar: Note List & Upcoming Hearings */}
      <div className="w-full lg:w-80 flex flex-col gap-6">
        <div className="flex flex-col bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden h-1/2 lg:h-[60%]">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <button 
              onClick={startNew}
              className="w-full bg-legal-blue text-white py-3 rounded-sm flex items-center justify-center gap-2 hover:bg-black transition-all font-bold uppercase tracking-widest text-xs mb-4 shadow-md"
            >
              <Plus className="w-4 h-4 text-legal-gold" /> New Court Note
            </button>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search notes..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-legal-gold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-grow overflow-y-auto divide-y divide-slate-100">
            {isLoading ? (
              <p className="p-4 text-center text-slate-400 text-sm italic">Loading docket...</p>
            ) : filteredNotes.length > 0 ? (
              filteredNotes.map(note => (
                <div 
                  key={note.id} 
                  onClick={() => editNote(note)}
                  className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${currentNote?.id === note.id ? 'bg-slate-50 border-l-4 border-legal-gold' : 'border-l-4 border-transparent'}`}
                >
                  <h3 className="font-bold text-slate-800 truncate text-sm uppercase tracking-tight">{note.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-1">{note.content}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                    {note.nextHearingDate && (
                      <span className="text-[9px] bg-legal-gold/20 text-legal-blue px-2 py-0.5 rounded-full font-bold">
                        H: {new Date(note.nextHearingDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="p-8 text-center text-slate-400 text-sm italic">No records found.</p>
            )}
          </div>
        </div>

        {/* Upcoming Hearings Quick View */}
        <div className="flex flex-col bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden h-1/2 lg:h-[40%]">
          <div className="p-3 bg-legal-blue text-white flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-legal-gold" /> Upcoming Hearings
            </h3>
          </div>
          <div className="flex-grow overflow-y-auto divide-y divide-slate-50 p-2">
            {upcomingHearings.length > 0 ? upcomingHearings.map((h: any) => (
              <div key={h.id} className="p-3 hover:bg-slate-50 transition-colors">
                <p className="text-xs font-bold text-slate-800 truncate">{h.case?.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-legal-gold" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase">
                    {new Date(h.hearingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            )) : (
              <p className="text-[10px] text-slate-400 text-center py-6 italic">No upcoming dates.</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content: Editor */}
      <div className="flex-grow bg-white rounded-sm border border-slate-200 shadow-lg flex flex-col overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-legal-gold/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
        
        {isEditing ? (
          <div className="flex flex-col h-full relative z-10">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex-grow">
                <input 
                  type="text" 
                  placeholder="Case Title / Note Subject" 
                  className="bg-transparent text-2xl font-serif font-bold text-legal-blue focus:outline-none w-full placeholder:text-slate-300"
                  value={currentNote.title}
                  onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
                />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {currentNote.id ? `Last modified: ${new Date(currentNote.updatedAt).toLocaleString()}` : 'Drafting New Entry'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleSave} className="bg-legal-blue text-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-md">
                  <Save className="w-4 h-4 text-legal-gold" /> Save
                </button>
                <button onClick={() => setIsEditing(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-sm transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs bg-white">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm">
                <Briefcase className="w-4 h-4 text-legal-gold" />
                <select 
                  className="focus:outline-none bg-transparent w-full font-bold text-slate-600"
                  value={currentNote.caseId || ''}
                  onChange={(e) => setCurrentNote({...currentNote, caseId: e.target.value || null})}
                >
                  <option value="">Link to Case</option>
                  {caseList.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm">
                <User className="w-4 h-4 text-legal-gold" />
                <select 
                  className="focus:outline-none bg-transparent w-full font-bold text-slate-600"
                  value={currentNote.clientId || ''}
                  onChange={(e) => setCurrentNote({...currentNote, clientId: e.target.value || null})}
                >
                  <option value="">Link to Client</option>
                  {clientList.map(c => <option key={c.id} value={c.id}>{c.fullName}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm">
                <Calendar className="w-4 h-4 text-legal-gold" />
                <input 
                  type="date" 
                  className="focus:outline-none bg-transparent w-full font-bold text-slate-600"
                  value={currentNote.nextHearingDate || ''}
                  onChange={(e) => setCurrentNote({...currentNote, nextHearingDate: e.target.value})}
                  title="Next Hearing Date"
                />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm">
                <Gavel className="w-4 h-4 text-legal-gold" />
                <span className="font-bold text-slate-400 uppercase tracking-widest text-[9px]">Judge Remarks Attached</span>
              </div>
            </div>

            <div className="flex-grow flex flex-col p-8 space-y-6 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-legal-gold uppercase tracking-[0.2em]">Court Notes & Proceedings</label>
                  <button 
                    onClick={() => toggleVoice('content')}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                      activeVoiceField === 'content' && isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-500 hover:bg-legal-gold hover:text-black'
                    }`}
                  >
                    {activeVoiceField === 'content' && isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                    {activeVoiceField === 'content' && isListening ? 'Stop Listening' : 'Voice Input'}
                  </button>
                </div>
                <textarea 
                  className="w-full focus:outline-none resize-none text-slate-700 leading-relaxed font-serif text-lg min-h-[200px]"
                  placeholder="Record today's arguments and proceedings..."
                  value={currentNote.content}
                  onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})}
                />
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-legal-gold uppercase tracking-[0.2em]">Judge Remarks</label>
                  <button 
                    onClick={() => toggleVoice('judgeRemarks')}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                      activeVoiceField === 'judgeRemarks' && isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-500 hover:bg-legal-gold hover:text-black'
                    }`}
                  >
                    {activeVoiceField === 'judgeRemarks' && isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                    {activeVoiceField === 'judgeRemarks' && isListening ? 'Stop Listening' : 'Voice Input'}
                  </button>
                </div>
                <textarea 
                  className="w-full focus:outline-none resize-none text-slate-600 italic font-serif text-base min-h-[100px] bg-slate-50/50 p-4 border border-dashed border-slate-200"
                  placeholder="Record specific remarks made by the honorable judge..."
                  value={currentNote.judgeRemarks}
                  onChange={(e) => setCurrentNote({...currentNote, judgeRemarks: e.target.value})}
                />
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/30">
              <p className="text-[9px] text-slate-400 italic">
                {isListening ? "Listening... Speak clearly into the microphone." : "Notes are automatically saved to the secure cloud dockets."}
              </p>
              {currentNote.id && (
                <button 
                  onClick={() => handleDelete(currentNote.id)}
                  className="flex items-center gap-1 text-[10px] text-red-400 hover:text-red-600 font-bold uppercase tracking-widest transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Purge Record
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-slate-200">
            <Gavel className="w-24 h-24 mb-6 opacity-10 rotate-12" />
            <p className="text-xl font-serif font-bold text-slate-400 italic">Select a case file or start a new court note.</p>
            <p className="text-xs uppercase tracking-[0.3em] mt-4 font-bold text-slate-300">Nisar Hussain Bhatti – Advocate High Court</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notepad;

