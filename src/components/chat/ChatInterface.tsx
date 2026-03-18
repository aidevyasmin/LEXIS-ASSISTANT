import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Send, Paperclip, Clock, Mic, MicOff, Shield, Award, User, LogIn, Phone } from 'lucide-react';
import { clients, appointments, payments, consultations } from '../../services/api';

type Message = {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  type?: 'text' | 'options' | 'input' | 'file' | 'slots' | 'links';
  options?: string[];
  slots?: any[];
  links?: { label: string, url: string, icon?: any }[];
};

const ChatInterface = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: "As-salamu alaykum! I am Lexis, the AI Assistant for Advocate Nisar Hussain. I'm here to help you schedule a professional consultation or guide you through our portal. How may I assist you today?",
      type: 'options',
      options: ['Book Consultation', 'Contact Office', 'Login to Portal']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [step, setStep] = useState(-1); // -1 means initial choice
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    caseType: '',
    caseDescription: '',
    clientId: '',
    appointmentId: ''
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: 'bot' | 'user', type: Message['type'] = 'text', extras: any = {}) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender,
      text,
      type,
      ...extras
    }]);
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userText = inputText;
    setInputText('');
    addMessage(userText, 'user');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      processInput(userText);
    }, 1000);
  };

  const processInput = async (text: string) => {
    // Initial Choice
    if (step === -1) {
      if (text.toLowerCase().includes('book') || text === 'Book Consultation') {
        addMessage("Excellent choice. To begin, may I have your full name?", 'bot', 'input');
        setStep(0);
      } else if (text.toLowerCase().includes('contact') || text === 'Contact Office') {
        addMessage("You can contact Advocate Nisar's office directly:", 'bot', 'links', {
          links: [
            { label: 'Call: 0321 4755492', url: 'tel:03214755492', icon: Phone },
            { label: 'Email: nisarpulc1234@gmail.com', url: 'mailto:nisarpulc1234@gmail.com', icon: Mail }
          ]
        });
        addMessage("Would you like to leave a message for us to call you back?", 'bot', 'options', {
          options: ['Yes, leave a message', 'No, thanks']
        });
        setStep(10); // Contact flow
      } else if (text.toLowerCase().includes('login') || text === 'Login to Portal') {
        addMessage("Redirecting you to the secure login portal...", 'bot');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        addMessage("I'm sorry, I didn't quite get that. Would you like to book a consultation, contact us, or login?", 'bot', 'options', {
          options: ['Book Consultation', 'Contact Office', 'Login to Portal']
        });
      }
      return;
    }

    // Contact Flow
    if (step >= 10) {
      if (step === 10) {
        if (text === 'Yes, leave a message') {
          addMessage("Please provide your name and phone number so we can reach out to you.", 'bot', 'input');
          setStep(11);
        } else {
          addMessage("Understood. Let me know if you need anything else!", 'bot', 'options', {
            options: ['Book Consultation', 'Login to Portal']
          });
          setStep(-1);
        }
      } else if (step === 11) {
        addMessage(`Thank you. We have received your request. Advocate Nisar will be notified at nisarpulc1234@gmail.com.`, 'bot');
        // Actually send a consultation request as a "Contact" method
        try {
          await consultations.createRequest({
            name: text,
            phone: 'Not provided', // Simplified
            message: 'User requested contact via Lexis Assistant.',
            method: 'PHONE'
          });
        } catch (e) { console.error(e); }
        setStep(-1);
      }
      return;
    }

    // Booking Flow
    switch (step) {
      case 0:
        setFormData(prev => ({ ...prev, fullName: text }));
        addMessage(`It is a pleasure, ${text}. May I have your phone number to proceed?`, 'bot', 'input');
        setStep(1);
        break;
      
      case 1:
        setFormData(prev => ({ ...prev, phone: text }));
        addMessage("Thank you. Please select the category that best describes your legal matter:", 'bot', 'options', {
          options: ['Civil Law', 'Criminal Defense', 'Family Law', 'Property Dispute', 'Corporate', 'Other']
        });
        setStep(2);
        break;

      case 2:
        let mappedType = 'OTHER';
        if (text === 'Civil Law') mappedType = 'CIVIL';
        else if (text === 'Criminal Defense') mappedType = 'CRIMINAL';
        else if (text === 'Family Law') mappedType = 'FAMILY';
        else if (text === 'Property Dispute') mappedType = 'PROPERTY';
        else if (text === 'Corporate') mappedType = 'CIVIL'; // Map corporate to civil or keep other
        
        setFormData(prev => ({ ...prev, caseType: mappedType }));
        addMessage("Understood. Please provide a brief description of your case for Advocate Nisar's review.", 'bot', 'input');
        setStep(3);
        break;

      case 3:
        const updatedData = { ...formData, caseDescription: text };
        setFormData(updatedData); 
        
        try {
          // 1. Create Client Intake
          const res = await clients.intake(updatedData);
          const newClientId = res.data.id;
          setFormData(prev => ({ ...prev, clientId: newClientId, caseDescription: text }));

          // 2. Also create a Consultation Request to trigger Email to Nisar
          await consultations.createRequest({
            name: formData.fullName,
            phone: formData.phone,
            caseType: formData.caseType,
            message: text,
            method: 'OFFICE VISIT'
          });

          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(10, 0, 0, 0);
          
          const tomorrowAfternoon = new Date(tomorrow);
          tomorrowAfternoon.setHours(14, 0, 0, 0);

          const dayAfter = new Date(tomorrow);
          dayAfter.setDate(dayAfter.getDate() + 1);
          dayAfter.setHours(11, 0, 0, 0);

          addMessage("Excellent. Your details have been securely recorded and Advocate Nisar has been notified. Please select a preferred time for your consultation:", 'bot', 'slots', {
            slots: [
              { id: 1, time: 'Tomorrow 10:00 AM', date: tomorrow.toLocaleDateString(), start: tomorrow.toISOString(), end: new Date(tomorrow.getTime() + 60*60*1000).toISOString() },
              { id: 2, time: 'Tomorrow 2:00 PM', date: tomorrowAfternoon.toLocaleDateString(), start: tomorrowAfternoon.toISOString(), end: new Date(tomorrowAfternoon.getTime() + 60*60*1000).toISOString() },
              { id: 3, time: 'Day After 11:00 AM', date: dayAfter.toLocaleDateString(), start: dayAfter.toISOString(), end: new Date(dayAfter.getTime() + 60*60*1000).toISOString() }
            ]
          });
          setStep(4);
        } catch (err: any) {
            console.error(err);
            const errorMsg = err.response?.data?.message || "I apologize, but there was an error processing your request.";
            addMessage(`${errorMsg} Please try again or call 0321 4755492.`, 'bot');
        }
        break;

      default:
        addMessage("For further assistance, please contact the office directly at 0321 4755492.", 'bot');
    }
  };

  const handleOptionClick = (option: string) => {
    addMessage(option, 'user');
    setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        processInput(option);
    }, 800);
  };

  const handleSlotSelect = async (slot: any) => {
    addMessage(`I would like to book: ${slot.time}`, 'user');
    setIsTyping(true);

    try {
        const appointmentData = {
            clientId: formData.clientId,
            slotStart: slot.start,
            slotEnd: slot.end,
            notes: "Premium Slot - Booked via Lexis AI"
        };
        const res = await appointments.create(appointmentData);
        const newApptId = res.data.id;
        setFormData(prev => ({ ...prev, appointmentId: newApptId }));

        setTimeout(() => {
            setIsTyping(false);
            addMessage("To finalize your reservation, a consultation fee of 1,000 PKR is required. Please upload a screenshot of your payment receipt (EasyPaisa/JazzCash).", 'bot', 'file');
            setStep(5);
        }, 1000);

    } catch (err) {
        setIsTyping(false);
        console.error(err);
        addMessage("That slot is no longer available. Please select another timing.", 'bot');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      addMessage(`[Receipt Uploaded: ${file.name}]`, 'user');
      setIsTyping(true);

      const formDataUpload = new FormData();
      formDataUpload.append('paymentProof', file);
      formDataUpload.append('clientId', formData.clientId);
      formDataUpload.append('appointmentId', formData.appointmentId);
      formDataUpload.append('amount', '1000');
      formDataUpload.append('currency', 'PKR');
      formDataUpload.append('method', 'EASYPAISA'); 
      formDataUpload.append('transactionId', 'TXN-' + Date.now()); 

      try {
        await payments.uploadProof(formDataUpload);
        setIsTyping(false);
        addMessage("Payment receipt received! Your consultation is now being verified. Advocate Nisar's team will contact you shortly on your phone.", 'bot');
        addMessage("You can now login to your portal to track your case and documents.", 'bot', 'options', {
            options: ['Login to Portal']
        });
        setStep(-1);
      } catch (err) {
        setIsTyping(false);
        console.error(err);
        addMessage("Upload failed. Please ensure the file is an image or PDF and try again.", 'bot', 'file');
      }
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-100 font-sans">
      <div className="bg-legal-blue text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <Shield className="w-5 h-5 text-legal-gold" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-legal-blue"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-sm tracking-wide">Lexis Assistant</span>
            <span className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">Secure Intake System</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
            <button onClick={() => navigate('/login')} className="p-2 hover:bg-white/10 rounded-full transition-all text-legal-gold" title="Login">
                <LogIn className="w-5 h-5" />
            </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom duration-300`}>
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-legal-blue text-white rounded-br-none shadow-legal-blue/20' 
                : 'bg-white text-legal-dark border border-slate-100 rounded-bl-none'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              
              {msg.type === 'options' && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {msg.options?.map(opt => (
                    <button key={opt} onClick={() => handleOptionClick(opt)} className="bg-slate-50 hover:bg-legal-gold hover:text-black text-legal-blue text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm transition-all border border-slate-200">
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {msg.type === 'links' && (
                <div className="mt-4 space-y-2">
                  {msg.links?.map(link => (
                    <a key={link.label} href={link.url} className="w-full flex items-center space-x-3 bg-white hover:bg-slate-50 p-3 rounded-sm border border-slate-200 transition-all group">
                        {link.icon && <link.icon className="w-4 h-4 text-legal-gold" />}
                        <span className="text-xs font-bold text-legal-blue">{link.label}</span>
                    </a>
                  ))}
                </div>
              )}

              {msg.type === 'slots' && (
                <div className="mt-4 space-y-2">
                  {msg.slots?.map(slot => (
                    <button key={slot.id} onClick={() => handleSlotSelect(slot)} className="w-full flex items-center justify-between bg-white hover:bg-slate-50 p-3 rounded-sm border border-slate-200 transition-all group">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-legal-gold group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-slate-700">{slot.time}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">{slot.date}</span>
                    </button>
                  ))}
                </div>
              )}

              {msg.type === 'file' && (
                <div className="mt-4">
                    <label className="cursor-pointer inline-flex items-center space-x-2 bg-legal-gold text-black px-6 py-2 rounded-sm transition-all text-[10px] font-bold uppercase tracking-widest hover:bg-white shadow-lg">
                        <Paperclip className="w-4 h-4" />
                        <span>Upload Proof</span>
                        <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileUpload} />
                    </label>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 rounded-bl-none shadow-sm">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-legal-gold rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-legal-gold rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-legal-gold rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100 flex items-center space-x-3">
        <button 
          onClick={toggleListening}
          className={`p-3 rounded-full transition-all ${isListening ? 'bg-red-50 text-red-600 shadow-inner' : 'bg-slate-50 text-slate-400 hover:text-legal-blue hover:bg-slate-100'}`}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
        <div className="flex-grow relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isListening ? "Listening..." : "How can we help?"}
            disabled={isTyping}
            className="w-full px-6 py-3 bg-white text-black border border-slate-200 rounded-full focus:ring-2 focus:ring-legal-gold focus:border-transparent focus:outline-none disabled:opacity-50 text-sm placeholder:text-slate-400"
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            className="absolute right-2 top-1.5 p-1.5 bg-legal-blue text-white rounded-full hover:bg-legal-gold hover:text-black disabled:opacity-30 disabled:hover:bg-legal-blue disabled:hover:text-white transition-all shadow-lg"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
