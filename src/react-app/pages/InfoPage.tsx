import { Layout } from "@/react-app/components/layout/Layout";
import { motion } from 'framer-motion';
import { LucideIcon, Globe } from 'lucide-react';

interface Section {
  title: string;
  content: string;
  icon?: LucideIcon;
}

interface InfoPageProps {
  title: string;
  description: string;
  sections: Section[];
  industryCards?: { title: string; desc: string; icon: LucideIcon }[];
}

export function InfoPage({ title, description, sections, industryCards }: InfoPageProps) {
  return (
    <Layout>
      <div className="min-h-screen pt-32 pb-20 px-8 bg-white/5 dark:bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Header Section */}
          <header className="text-center space-y-6 max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-black uppercase tracking-tighter"
            >
              {title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed"
            >
              {description}
            </motion.p>
          </header>

          {/* Feature Cards / Industry Cards */}
          {industryCards && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {industryCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 glassy rounded-[32px] space-y-4 border-white/5 hover:border-red-600/30 transition-all group shadow-2xl"
                >
                  <div className="w-14 h-14 rounded-2xl bg-red-600/10 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all shadow-lg">
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight">{card.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Detailed Sections */}
          <div className="space-y-16">
            {sections.map((section, i) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="w-full lg:w-1/2 glassy aspect-video rounded-[40px] flex items-center justify-center overflow-hidden border-white/5 relative group shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {section.icon ? <section.icon className="w-24 h-24 text-zinc-200 dark:text-zinc-800" /> : <Globe className="w-24 h-24 text-zinc-200 dark:text-zinc-800" />}
                </div>
                <div className="w-full lg:w-1/2 space-y-6">
                  <h2 className="text-4xl font-black uppercase tracking-tighter">{section.title}</h2>
                  <div className="space-y-4">
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                      {section.content}
                    </p>
                  </div>
                  <button className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all shadow-xl">
                    Explore Case Study
                  </button>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
