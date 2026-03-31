import { ReactNode, useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { BreakingTicker } from './BreakingTicker';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F0F0F] text-zinc-900 dark:text-white flex flex-col">
      {/* Optional Top Bar / Ticker if user still wants it, let's keep it but make it minimalist */}
      <BreakingTicker />
      
      {/* Header (Navbar) */}
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />
        
        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto overflow-x-hidden ${isSidebarOpen ? 'lg:pl-0' : 'pl-0'}`}>
          <div className="max-w-[2400px] mx-auto min-h-screen">
            {children}
            
            {/* Footer inside main to scroll with it */}
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

