import { Home, TrendingUp, Music2, Trophy, Newspaper, Clapperboard, Flame, Clock, ThumbsUp, PlaySquare, History } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const sidebarItems = {
  main: [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Shorts', icon: Flame, path: '/shorts' },
    { name: 'Subscriptions', icon: PlaySquare, path: '/subscriptions' },
  ],
  library: [
    { name: 'History', icon: History, path: '/history' },
    { name: 'Your videos', icon: Clapperboard, path: '/your-videos' },
    { name: 'Watch later', icon: Clock, path: '/watch-later' },
    { name: 'Liked videos', icon: ThumbsUp, path: '/liked' },
  ],
  explore: [
    { name: 'Trending', icon: TrendingUp, path: '/trending' },
    { name: 'News', icon: Newspaper, path: '/news' },
    { name: 'Sport', icon: Trophy, path: '/sport' },
    { name: 'Entertainment', icon: Music2, path: '/entertainment' },
  ]
};

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-[60] lg:hidden transition-opacity" 
          onClick={() => {}} 
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 lg:top-[56px] left-0 h-full lg:h-[calc(100vh-56px)] 
        bg-white dark:bg-[#0F0F0F] z-[70] lg:z-40 border-r dark:border-none 
        transition-transform duration-300 ease-in-out overflow-y-auto no-scrollbar
        ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'}
      `}>
        <div className={`p-3 space-y-4 ${!isOpen && 'lg:items-center'}`}>
          {/* Main Section */}
          <div className="space-y-1">
            {sidebarItems.main.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-5 px-3 py-2.5 rounded-xl transition-all ${
                  location.pathname === item.path 
                    ? 'bg-red-50 text-red-600 dark:bg-white/10 dark:text-white font-bold' 
                    : 'hover:bg-gray-100 dark:hover:bg-zinc-800/50'
                } ${!isOpen && 'lg:justify-center lg:px-0'}`}
              >
                <item.icon className="w-[24px] h-[24px] flex-shrink-0" />
                <span className={`text-[13px] ${!isOpen && 'lg:hidden'}`}>{item.name}</span>
              </Link>
            ))}
          </div>

          <hr className="dark:border-zinc-800" />

          {/* Library Section */}
          <div className="space-y-1">
            <div className={`flex items-center gap-2 px-3 py-1 mb-1 ${!isOpen && 'lg:hidden'}`}>
              <span className="text-sm font-black uppercase tracking-widest text-zinc-400">Library</span>
            </div>
            {sidebarItems.library.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-5 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800/50 transition-all ${
                  !isOpen && 'lg:justify-center lg:px-0'
                }`}
              >
                <item.icon className="w-[24px] h-[24px] flex-shrink-0" />
                <span className={`text-[13px] ${!isOpen && 'lg:hidden'}`}>{item.name}</span>
              </Link>
            ))}
          </div>

          <hr className="dark:border-zinc-800" />

          {/* Explore Section */}
          <div className="space-y-1">
            <div className={`flex items-center gap-2 px-3 py-1 mb-1 ${!isOpen && 'lg:hidden'}`}>
              <span className="text-sm font-black uppercase tracking-widest text-zinc-400">Explore</span>
            </div>
            {sidebarItems.explore.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-5 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800/50 transition-all ${
                  !isOpen && 'lg:justify-center lg:px-0'
                }`}
              >
                <item.icon className="w-[24px] h-[24px] flex-shrink-0" />
                <span className={`text-[13px] ${!isOpen && 'lg:hidden'}`}>{item.name}</span>
              </Link>
            ))}
          </div>

          {isOpen && (
            <>
              <hr className="dark:border-zinc-800" />

              <div className="p-3 text-[10px] text-zinc-500 font-bold space-y-4 uppercase tracking-tighter">
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <span>About</span>
                  <span>Contact</span>
                  <span>Copyright</span>
                  <span>Privacy</span>
                </div>
                <p>© 2026 Cloud Media News</p>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

