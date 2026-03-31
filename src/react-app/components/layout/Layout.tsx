import { ReactNode, useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-zinc-900 dark:text-[#f1f1f1] flex flex-col font-sans">
      
      {/* Header (Navbar) */}
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1 h-[calc(100vh-56px)] overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth bg-[#f9f9f9] dark:bg-[#0f0f0f]">
          <div className="w-full h-full max-w-[2400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
