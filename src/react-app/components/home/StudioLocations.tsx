import { MapPin, Phone, Mail, Globe, Navigation, ExternalLink, Calendar, Users, Briefcase, Radio, Satellite, ShieldCheck, Map, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

export function StudioLocations() {
  const locations = [
    { name: "Global HQ - Tech Corridor", address: "One Cloud Plaza, Banjara Hills, Hyderabad, TS", phone: "+91 90000 12345", type: "Main Center", lat: "17.410313", lon: "78.435422" },
    { name: "European Hub - London City", address: "Canary Wharf, London, UK", phone: "+44 20 7946 0958", type: "EU Bureau", lat: "51.504937", lon: "-0.019448" },
    { name: "Americas Hub - New York", address: "5th Avenue, Manhattan, NY", phone: "+1 212 555 0123", type: "Newsroom", lat: "40.758896", lon: "-73.985130" },
  ];

  return (
    <div className="px-4 md:px-10 py-32 space-y-20 relative overflow-hidden bg-white dark:bg-black font-sans">
      {/* Magic Background Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/5 to-transparent pointer-events-none -z-10"></div>
      
      <div className="flex flex-col lg:flex-row gap-24 max-w-[1600px] mx-auto">
        {/* Map & Appointment Side */}
        <div className="flex-1 space-y-12">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
               <Badge className="bg-red-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border-none shadow-2xl shadow-red-900/20">
                  <Satellite className="w-4 h-4 mr-2 animate-pulse" /> TERRESTRIAL UPLINKS
               </Badge>
            </div>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] dark:text-white">
               Global Media <br /> 
               <span className="text-red-600">Infrastructure.</span>
            </h2>
            <p className="text-zinc-500 font-bold text-xl md:text-2xl max-w-3xl leading-tight uppercase tracking-tight">
               Experience high-fidelity journalism from our state-of-the-art neural newsrooms around the unified world.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video md:h-[700px] rounded-[4rem] overflow-hidden shadow-3xl border-4 border-white dark:border-zinc-800 group"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15228.375373809282!2d78.435422!3d17.410313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c88bc625e1%3A0x6b876a3e6a98f58d!2sBanjara%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1711890000000" 
              className="w-full h-full grayscale-[0.5] dark:grayscale-[0.9] hover:grayscale-0 transition-all duration-[2s] group-hover:scale-110" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
            
            <div className="absolute bottom-10 left-10 right-10 glassy p-10 rounded-[3.5rem] border border-white/20 shadow-3xl flex flex-col xl:flex-row items-center gap-10 backdrop-blur-3xl bg-white/60 dark:bg-black/60">
               <div className="flex items-center gap-6 group/badge">
                  <div className="w-16 h-16 bg-red-600 text-white rounded-3xl flex items-center justify-center shadow-2xl rotate-12 group-hover/badge:rotate-0 transition-transform duration-500">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-[0.3em] text-zinc-950 dark:text-white">Studio Mission</h4>
                    <p className="text-[10px] uppercase font-black text-red-600 animate-pulse mt-1">Request Secure Access</p>
                  </div>
               </div>
               
               <div className="flex-1 flex flex-col md:flex-row gap-5 w-full">
                  <Input type="text" placeholder="OPERATOR NAME" className="flex-1 bg-white/80 dark:bg-zinc-900/80 p-5 h-14 rounded-2xl border-none shadow-inner text-[10px] font-black uppercase tracking-widest outline-none" />
                  <Button className="h-14 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-10 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-red-600 hover:text-white transition-all active:scale-95 group/btn">
                    Book Pulse <ArrowRight className="ml-3 w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                  </Button>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Studio Info List */}
        <div className="w-full lg:w-[550px] space-y-10 flex flex-col">
          <div className="flex-1 space-y-8">
             {locations.map((loc, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                    <Card className="group relative overflow-hidden bg-zinc-50 dark:bg-zinc-950/40 rounded-[3.5rem] border-4 border-transparent hover:border-red-600/30 transition-all duration-700 shadow-xl hover:shadow-3xl hover:-translate-y-2 cursor-pointer">
                        <CardContent className="p-10">
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-red-600/5 rounded-full blur-3xl group-hover:bg-red-600/15 transition-all duration-1000"></div>
                            
                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping"></div>
                                    <span className="text-[10px] font-black uppercase text-red-600 tracking-[0.4em]">{loc.type}</span>
                                </div>
                                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-all">
                                    <Navigation className="w-4 h-4" />
                                </div>
                            </div>
                            
                            <h3 className="text-3xl font-black mb-6 dark:text-white group-hover:text-red-500 transition-colors tracking-tighter uppercase leading-none">{loc.name}</h3>
                            
                            <div className="space-y-5 mb-10 relative z-10">
                                <div className="flex items-start gap-4 text-xs text-zinc-500 font-bold leading-relaxed uppercase tracking-tight">
                                    <MapPin className="w-4 h-4 mt-0.5 text-red-600 shrink-0" />
                                    <span>{loc.address}</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-zinc-500 font-bold uppercase tracking-widest">
                                    <Phone className="w-4 h-4 text-red-600 shrink-0" />
                                    <span>{loc.phone}</span>
                                </div>
                            </div>
                            
                            <div className="pt-8 border-t border-zinc-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                                <button className="text-[10px] font-black uppercase text-zinc-950 dark:text-zinc-200 hover:text-red-600 transition-all flex items-center gap-2 group/link hover:tracking-widest">
                                    Scan Studio <ExternalLink className="w-3 h-3 group-hover/link:scale-125 transition-transform" />
                                </button>
                                <Button variant="ghost" className="w-full sm:w-auto h-12 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 text-[10px] font-black border border-zinc-200 dark:border-zinc-800 rounded-2xl uppercase hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all shadow-md active:scale-95">UPLINK_GPS</Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
             ))}
          </div>

          {/* Careers / Corporate Module */}
          <Card className="bg-zinc-950 rounded-[4rem] text-white p-12 space-y-10 shadow-3xl relative overflow-hidden group border-4 border-red-600/10">
             <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-red-600/20 transition-all duration-1000"></div>
             
             <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-red-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-none">MISSION_ACTIVE</Badge>
                    <Briefcase className="w-10 h-10 text-red-600" />
                </div>
                <div className="space-y-3">
                   <h4 className="text-4xl font-black uppercase tracking-tighter leading-none">Join the <br /> <span className="text-zinc-600">Revolution.</span></h4>
                   <p className="text-xs font-bold text-zinc-500 uppercase tracking-tight max-w-sm">We are deploying world-class journalists and AI architects to the signal frontlines.</p>
                </div>
                
                <Button className="w-full h-16 bg-white text-black hover:bg-red-600 hover:text-white rounded-[2rem] font-black uppercase text-xs tracking-widest transition-all shadow-2xl active:scale-95 group/careers">
                   EXPLORE DEPLOYMENTS <ChevronRight className="ml-2 w-4 h-4 group-hover/careers:translate-x-2 transition-all" />
                </Button>
                
                <div className="flex items-center gap-6 bg-white/5 p-6 rounded-[2.5rem] border border-white/5">
                   <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center border border-red-600/30">
                      <Users className="w-6 h-6 text-red-600" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Active Network</p>
                      <p className="text-xl font-black tracking-tighter uppercase whitespace-nowrap">125+ Strategic Nodes</p>
                   </div>
                </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
