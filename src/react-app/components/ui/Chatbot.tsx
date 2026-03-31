import { useState } from 'react';
import { MessageSquare, X, Send, Bot, Calendar, MapPin, Share2 } from 'lucide-react';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I am Cloud Media News AI. How can I assist you today?", sender: 'bot' },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput("");
    
    // Auto Response Simulation
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "I am processing your request using our LLM SDK. Would you like to book an appointment or check live locations?", sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-red-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-red-700 transition-all hover:scale-110 active:scale-95 group"
      >
        {isOpen ? <X /> : <MessageSquare className="animate-pulse" />}
        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-lg animate-bounce uppercase">Live AI Assistant</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[400px] max-h-[600px] h-[80vh] bg-white dark:bg-[#0F0F0F] rounded-3xl shadow-2xl overflow-hidden border dark:border-zinc-800 flex flex-col font-sans">
          {/* Header */}
          <div className="p-6 bg-red-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="w-8 h-8" />
              <div>
                <h4 className="font-extrabold text-lg uppercase tracking-tighter">CLOUD MEDIA AI</h4>
                <p className="text-[10px] font-medium opacity-80 uppercase tracking-widest flex items-center gap-1">
                   <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Generative AI SDK Active
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
          </div>

          {/* Quick Actions */}
          <div className="flex p-3 gap-2 border-b dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 overflow-x-auto no-scrollbar">
            <button className="flex-shrink-0 flex items-center gap-1 text-[11px] font-bold bg-white dark:bg-zinc-800 px-3 py-2 rounded-full border dark:border-zinc-700 shadow-sm hover:bg-red-50 transition-colors">
              <Calendar className="w-3 h-3 text-red-600" /> Book Appointment
            </button>
            <button className="flex-shrink-0 flex items-center gap-1 text-[11px] font-bold bg-white dark:bg-zinc-800 px-3 py-2 rounded-full border dark:border-zinc-700 shadow-sm hover:bg-red-50 transition-colors">
              <MapPin className="w-3 h-3 text-red-600" /> Nearby Studio
            </button>
            <button className="flex-shrink-0 flex items-center gap-1 text-[11px] font-bold bg-white dark:bg-zinc-800 px-3 py-2 rounded-full border dark:border-zinc-700 shadow-sm hover:bg-red-50 transition-colors">
              <Share2 className="w-3 h-3 text-red-600" /> Share Channel
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-4 rounded-2xl text-sm ${m.sender === 'user' ? 'bg-red-600 text-white rounded-tr-none shadow-md' : 'bg-zinc-100 dark:bg-zinc-800 dark:text-white rounded-tl-none border dark:border-zinc-700'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-6 border-t dark:border-zinc-800 flex gap-3">
            <input 
              type="text" 
              placeholder="How can we help? (Ask about bookings, locations...)" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-zinc-50 dark:bg-zinc-900 border dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-1 ring-red-600 transition-all text-sm dark:text-white"
            />
            <button onClick={handleSend} className="bg-red-600 text-white p-3 rounded-xl shadow-lg hover:shadow-red-500/20 active:scale-95 transition-all">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
