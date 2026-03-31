import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { NewsGrid } from '../components/home/NewsGrid';
import { CategoryStrip } from '../components/home/CategoryStrip';
import { AIPulse } from '../components/home/AIPulse';
import { StudioLocations } from '../components/home/StudioLocations';
import { motion } from 'framer-motion';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-white dark:bg-[#0F0F0F]">
        {/* Category Filter Hub (YouTube Style) */}
        <CategoryStrip 
          selected={selectedCategory} 
          onSelect={setSelectedCategory} 
        />
        
        {/* Main YouTube Clone Video Feed */}
        <main className="flex-1 w-full max-w-screen-2xl mx-auto">
          <NewsGrid />
          
          {/* High-Fidelity Intelligence Sections (Scroll Down) */}
          <div className="px-4 py-20 space-y-32">
             <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="pt-12 border-t border-black/10 dark:border-white/10"
             >
                <div className="flex items-center gap-4 mb-10 px-4">
                   <div className="w-1 h-10 bg-red-600 rounded-full" />
                   <h2 className="text-[24px] font-bold uppercase tracking-tighter">Global AI Pulse</h2>
                </div>
                <AIPulse />
             </motion.div>

             <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="pt-12 border-t border-black/10 dark:border-white/10"
             >
                <div className="flex items-center gap-4 mb-10 px-4">
                   <div className="w-1 h-10 bg-red-600 rounded-full" />
                   <h2 className="text-[24px] font-bold uppercase tracking-tighter">Strategic Hub Locations</h2>
                </div>
                <StudioLocations />
             </motion.div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
