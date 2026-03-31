import { Brain, Cpu, Database, Network, TrendingUp, Zap, Radio, Binary, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

export function AIPulse() {
  const metrics = [
    { label: 'Neural Processing', value: 94.8, icon: Brain, color: 'text-red-600' },
    { label: 'Global Confidence', value: 88.2, icon: Cpu, color: 'text-blue-500' },
    { label: 'Fact-Check Sync', value: 99.9, icon: Database, color: 'text-green-500' },
    { label: 'Signal Clarity', value: 91.5, icon: Network, color: 'text-amber-500' },
  ];

  return (
    <div className="px-4 md:px-10 py-24 relative overflow-hidden bg-black text-white">
      {/* Magic Background Gradient */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[200px] pointer-events-none -mr-96 -mt-96 transition-all duration-1000"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none -ml-64 -mb-64"></div>
      
      {/* Floating Magic Particles (CSS) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
         {[...Array(20)].map((_, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.5, 1, 0.5], x: [0, Math.random() * 100, 0], y: [0, Math.random() * 100, 0] }}
               transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
               className="absolute w-1 h-1 bg-white rounded-full"
               style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            />
         ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row items-end justify-between gap-10">
           <div className="space-y-6 max-w-2xl">
              <Badge className="bg-red-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2 border-none">
                 <Sparkles className="w-3.5 h-3.5 animate-bounce" /> NEURAL ACTIVE CORE
              </Badge>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] font-display">
                 The AI <span className="text-red-600">Pulse</span> <span className="block text-zinc-800">Intelligence Engine</span>
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl font-bold uppercase tracking-tight leading-relaxed">
                 Real-time verification metrics and global sentiment analysis driven by 24 independent LLM agents cross-referencing global satcom signals.
              </p>
           </div>
           
           <div className="bg-zinc-900 border border-white/5 p-10 rounded-[3rem] space-y-4 hover:scale-110 transition-transform duration-700 shadow-3xl shadow-red-600/10 active:rotate-1">
              <div className="flex items-center gap-3">
                 <Radio className="w-6 h-6 text-red-600 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Live Telemetry</span>
              </div>
              <div className="flex items-baseline gap-2">
                 <span className="text-5xl font-black text-white font-tech tracking-wider">2.2</span>
                 <span className="text-xs font-black text-zinc-600 uppercase">Petabytes/sec</span>
              </div>
              <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-loose">
                 Global Signal Throughput <br /> Capacity Reached: <span className="text-green-500 font-tech">OPTIMAL</span>
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10, rotate: index % 2 === 0 ? 2 : -2 }}
            >
              <Card className="bg-zinc-950 border-white/5 h-full rounded-[2.5rem] group hover:border-red-600/30 transition-all duration-500 relative overflow-hidden backdrop-blur-3xl">
                 <div className="absolute top-0 right-0 h-full w-[2px] bg-red-600/5 group-hover:bg-red-600/20 transition-colors"></div>
                 
                 <CardHeader className="pt-10 px-8 pb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-900 border border-white/5 shadow-inner mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700`}>
                       <metric.icon className={`w-7 h-7 ${metric.color} group-hover:animate-pulse`} />
                    </div>
                    <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-red-500 transition-colors">
                       {metric.label}
                    </CardTitle>
                 </CardHeader>
                 
                 <CardContent className="px-8 pb-10 space-y-6">
                    <div className="flex items-baseline gap-2">
                       <span className="text-4xl font-black text-white font-tech tracking-wider">{metric.value}%</span>
                       <span className="text-[10px] font-black text-zinc-700 uppercase">SIGNAL</span>
                    </div>
                    
                    <div className="space-y-3">
                       <Progress value={metric.value} className="h-1.5 bg-zinc-900 border-none dark:bg-zinc-800" />
                       <div className="flex justify-between text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                          <span className="font-tech">Latency: 2ms</span>
                          <span className="text-green-500 font-tech">SYNCHRONIZED</span>
                       </div>
                    </div>
                 </CardContent>
                 
                 {/* Shine Hover Effect */}
                 <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="pt-20 border-t border-white/5">
           <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex items-center gap-6">
                 <div className="p-5 bg-zinc-900 border border-white/5 rounded-3xl animate-pulse">
                    <Binary className="w-8 h-8 text-blue-500" />
                 </div>
                 <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">Model Deployment</span>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-white font-tech tracking-widest">CLOUDMEDIA-X-V3.9</h3>
                 </div>
              </div>
              
              <div className="flex-1 h-[1px] bg-white/5 hidden lg:block"></div>
              
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-zinc-500">
                 <span className="text-white">STATUS:</span>
                 <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"
                 />
                 <span className="text-zinc-600 font-tech text-[10px]">MISSION READY</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
