import { ReactNode, useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F0F0F] flex flex-col font-roboto select-none transition-all duration-300">
      
      {/* Header (YouTube Style Navbar) */}
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex pt-[56px] min-h-screen overflow-hidden">
        {/* Navigation Control Hub (Dual-State Sidebar) */}
        <Sidebar isOpen={isSidebarOpen} />
        
        {/* Content Engine Hub (YouTube Architecture) */}
        <main className={`
          flex-1 transition-all duration-300 overflow-x-hidden
          ${isSidebarOpen ? 'lg:pl-[240px]' : 'lg:pl-[72px]'}
          bg-white dark:bg-[#0F0F0F]
        `}>
          <div className="w-full max-w-[2200px] mx-auto min-h-full pb-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
