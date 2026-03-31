import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Globe, Shield, Briefcase, Info, FileText, ExternalLink, Satellite, Radio, Cpu, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '../ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-zinc-950' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Youtube, href: '#', label: 'Youtube', color: 'hover:bg-red-600' },
  ];

  const sections = [
    {
      title: "Protocol Hub",
      links: [
        { name: "About Network", path: "/about", icon: Info },
        { name: "Agent Careers", path: "/careers", icon: Briefcase },
        { name: "Intelligence Feed", path: "/news", icon: Radio },
        { name: "Strategic Partners", path: "/advertise", icon: ExternalLink },
      ]
    },
    {
      title: "Secure Access",
      links: [
        { name: "Data Privacy", path: "/privacy", icon: Shield },
        { name: "Master Terms", path: "/terms", icon: FileText },
        { name: "Encryption Keys", path: "/cookies", icon: Shield },
        { name: "Ethical Core", path: "/ethics", icon: Cpu },
      ]
    },
    {
      title: "Global Sectors",
      links: [
        { name: "IT & Startups", path: "/industry/it", icon: Globe },
        { name: "Hyper Finance", path: "/industry/finance", icon: Globe },
        { name: "Sports Pulse", path: "/industry/sports", icon: Globe },
        { name: "Global Health", path: "/industry/health", icon: Globe },
        { name: "Entertainment", path: "/industry/entertainment", icon: Globe },
        { name: "Web3 & Crypto", path: "/industry/crypto", icon: Globe },
      ]
    }
  ];

  const partners = [
    { name: "BBC News", logo: "https://upload.wikimedia.org/wikipedia/commons/e/eb/BBC.svg" },
    { name: "CNN", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/CNN.svg" },
    { name: "Reuters", logo: "https://upload.wikimedia.org/wikipedia/commons/0/07/Reuters_logo.svg" },
    { name: "Bloomberg", logo: "https://upload.wikimedia.org/wikipedia/commons/5/54/Bloomberg_logo.svg" }
  ];

  return (
    <footer className="relative mt-32 border-t-8 border-red-600 bg-zinc-950 text-white overflow-hidden selection:bg-red-600 selection:text-white">
      {/* Magic Background Nodes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[200px] pointer-events-none -mr-96 -mt-96"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none -ml-64 -mb-64"></div>
      
      {/* Global Intelligence Grid Overlay if possible or just more gradients */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent"></div>

      <div className="max-w-[1600px] mx-auto px-8 md:px-16 pt-24 pb-12 relative z-10">
        
        {/* Partner Ecosystem Module */}
        <div className="mb-32 space-y-12 bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/5 shadow-3xl">
           <div className="flex items-center gap-4 text-center">
              <div className="flex-1 h-[1px] bg-white/5"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">Global Synchronized Network</span>
              <div className="flex-1 h-[1px] bg-white/5"></div>
           </div>
           
           <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-30 hover:opacity-100 transition-all duration-1000 grayscale hover:grayscale-0">
              {partners.map((p) => (
                <img key={p.name} src={p.logo} alt={p.name} className="h-6 md:h-8 object-contain invert invert-brightness-200" />
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 md:gap-24">
          {/* Main Brand Profile */}
          <div className="lg:col-span-4 space-y-12">
            <Link to="/" className="inline-block group">
              <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
                CLOUD <br /> <span className="text-red-600">MEDIA</span> <span className="text-[12px] opacity-20 align-top ml-1">NETWORK</span>
              </span>
            </Link>
            
            <p className="text-zinc-500 text-sm font-bold leading-relaxed max-w-sm uppercase tracking-tight">
               Revolutionizing global journalism via high-fidelity agentic AI workflows. We process signals in 56+ languages including Telugu, Hindi, and English.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              {socialLinks.map((social, i) => (
                <motion.a 
                  key={i} 
                  href={social.href} 
                  whileHover={{ y: -8, scale: 1.1 }}
                  className={`w-14 h-14 flex items-center justify-center rounded-[1.5rem] bg-zinc-900 border border-white/5 hover:border-red-600/50 transition-all shadow-xl shadow-black/50 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            <div className="p-8 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-[2.5rem] border border-white/5 space-y-4 shadow-3xl hover:border-red-600/20 transition-all group">
               <h5 className="font-black text-[10px] uppercase tracking-[0.3em] text-red-600">Secure Comm Link</h5>
               <div className="flex gap-3">
                  <input type="email" placeholder="EMAIL ADDRESS" className="flex-1 bg-white/5 border-none rounded-xl px-5 py-3 text-[10px] font-black focus:ring-2 ring-red-600 outline-none uppercase placeholder:text-zinc-700" />
                  <button className="bg-white text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all transform active:scale-95 shadow-xl">UPLINK</button>
               </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-12">
            {sections.map((section) => (
              <div key={section.title} className="space-y-10">
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-700 flex items-center gap-3">
                   <div className="w-6 h-0.5 bg-red-600"></div>
                   {section.title}
                </h4>
                <ul className="space-y-6">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className="group flex items-center gap-4 text-zinc-500 hover:text-red-500 transition-all">
                        <div className="w-10 h-10 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all shadow-lg border border-white/5 group-hover:scale-110">
                           <link.icon className="w-4 h-4" />
                        </div>
                        <span className="uppercase tracking-[0.1em] text-[10px] font-black group-hover:tracking-[0.2em] transition-all">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Neural Hub Connect Module */}
        <div className="mt-32 p-12 bg-white/5 backdrop-blur-3xl rounded-[3.5rem] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-3xl overflow-hidden relative group">
           <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="relative z-10 flex items-center gap-10 text-center lg:text-left flex-col lg:flex-row">
              <div className="w-24 h-24 bg-red-600/10 rounded-[2.5rem] flex items-center justify-center border border-red-600/20 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                 <Satellite className="w-10 h-10 text-red-600 animate-pulse" />
              </div>
              <div className="space-y-3">
                 <h3 className="text-3xl font-black uppercase tracking-tighter">Global AI Network Active</h3>
                 <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest max-w-2xl leading-relaxed">
                    LangChain Orchestration + Multi-Agent Intelligence processing news in 56+ languages. 
                    Mission critical data verification active across Hyderabad, London, and Silicon Valley hubs.
                 </p>
              </div>
           </div>
           
           <div className="relative z-10 flex flex-wrap justify-center gap-6">
              <div className="px-8 py-5 bg-black/50 rounded-[1.5rem] border border-white/5 backdrop-blur-3xl space-y-1">
                 <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block">Core Protocols</span>
                 <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.2em]">FASTAPI | MCP | LangChain</span>
              </div>
              <div className="px-8 py-5 bg-black/50 rounded-[1.5rem] border border-white/5 backdrop-blur-3xl space-y-1">
                 <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block">Verification Engine</span>
                 <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.2em]">Playwright | Truth-Agents</span>
              </div>
           </div>
        </div>

        {/* Global Operational Status & Credits */}
        <div className="mt-32 pt-16 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-12">
           <div className="space-y-4 text-center lg:text-left">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-700">© {currentYear} CLOUDMEDIA INTELLIGENCE NETWORK. HIGH-FIDELITY SECURED.</p>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                 <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                 <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">
                   System designed and developed by <a href="https://www.guideitsol.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-white transition-colors underline decoration-2">www.guideitsol.com</a>
                 </p>
              </div>
           </div>

           <div className="flex flex-wrap items-center gap-10">
              <div className="flex items-center gap-4">
                 <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
                 <div className="w-3 h-3 bg-red-600 rounded-full absolute"></div>
                 <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">MCP Agent Synchronization Active</span>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                 <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">FastAPI Global Core Operational</span>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
}
