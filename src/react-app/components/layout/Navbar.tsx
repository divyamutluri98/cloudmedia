import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, Bell, Mic, Moon, Sun, Video } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";

export function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-[56px] bg-white dark:bg-[#0F0F0F] border-b border-black/10 dark:border-white/10 z-[100] px-4 flex items-center justify-between">
      {/* Left: Menu & Logo */}
      <div className="flex items-center gap-4 min-w-[160px]">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onMenuClick}
          className="rounded-full hover:bg-black/5 dark:hover:bg-white/10"
        >
          <Menu className="w-6 h-6" />
        </Button>
        <Link to="/" className="flex items-center gap-1 group">
          <img src="/favicon.png" className="w-8 h-8 object-contain" alt="CMN" />
          <span className="text-[20px] font-bold tracking-tighter dark:text-white flex items-center">
            Cloud<span className="text-red-600">Media</span>
          </span>
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-[720px] items-center gap-4 px-4">
        <form onSubmit={handleSearch} className="flex flex-1 items-center">
          <div className="flex flex-1 items-center bg-white dark:bg-[#121212] border border-[#CCCCCC] dark:border-[#303030] rounded-l-full px-4 py-1.5 focus-within:border-blue-500 shadow-inner group transition-all">
             <div className="w-8 hidden group-focus-within:flex items-center justify-start">
                <Search className="w-4 h-4 text-zinc-400" />
             </div>
             <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-[16px] dark:text-white placeholder-zinc-500"
             />
          </div>
          <button className="px-5 py-2 bg-[#F8F8F8] dark:bg-[#222222] border border-l-0 border-[#CCCCCC] dark:border-[#303030] rounded-r-full hover:bg-[#EAEAEA] dark:hover:bg-[#333333] transition-colors shadow-sm">
            <Search className="w-5 h-5 text-zinc-600 dark:text-white" />
          </button>
        </form>
        <Button variant="outline" size="icon" className="rounded-full bg-[#F8F8F8] dark:bg-[#121212] border-none hover:bg-black/5 dark:hover:bg-white/10">
          <Mic className="w-5 h-5" />
        </Button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="hidden sm:flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 dark:hover:bg-white/10" title="Create">
            <Video className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 dark:hover:bg-white/10" title="Notifications">
             <div className="relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 text-[10px] text-white flex items-center justify-center rounded-full border-2 border-white dark:border-[#0F0F0F]">9+</span>
             </div>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full hover:bg-black/5 dark:hover:bg-white/10">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
        
        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer ml-2">
           D
        </div>
      </div>
    </nav>
  );
}
