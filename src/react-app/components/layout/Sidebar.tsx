import { Home, Compass, PlaySquare, Clock, ThumbsUp, History, Film, Flame, Music2, Trophy, Newspaper, Clapperboard, Settings, HelpCircle, AlertCircle, Gamepad2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const sidebarItems = {
  main: [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Shorts', icon: Flame, path: '/shorts' },
    { name: 'Subscriptions', icon: PlaySquare, path: '/subscriptions' },
  ],
  library: [
    { name: 'History', icon: History, path: '/history' },
    { name: 'Your videos', icon: Film, path: '/your-videos' },
    { name: 'Watch later', icon: Clock, path: '/watch-later' },
    { name: 'Liked videos', icon: ThumbsUp, path: '/liked' },
  ],
  explore: [
    { name: 'Trending', icon: Flame, path: '/trending' },
    { name: 'Music', icon: Music2, path: '/music' },
    { name: 'Gaming', icon: Gamepad2, path: '/gaming' },
    { name: 'Sports', icon: Trophy, path: '/sports' },
    { name: 'News', icon: Newspaper, path: '/news' },
  ],
  footer: [
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'History', icon: AlertCircle, path: '/report' },
    { name: 'Help', icon: HelpCircle, path: '/help' },
    { name: 'Feedback', icon: AlertCircle, path: '/feedback' },
  ]
};

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  // Mini Sidebar (Collapsed)
  if (!isOpen) {
    return (
      <aside className="fixed left-0 top-[56px] w-[72px] h-[calc(100vh-56px)] bg-white dark:bg-[#0F0F0F] z-40 hidden lg:flex flex-col items-center pt-1 overflow-hidden">
        {sidebarItems.main.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`w-full flex flex-col items-center justify-center py-4 gap-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors ${
              location.pathname === item.path ? 'text-red-600 dark:text-white' : 'text-zinc-600 dark:text-[#AAAAAA]'
            }`}
          >
            <item.icon className={`w-6 h-6 ${location.pathname === item.path ? 'fill-current' : ''}`} />
            <span className="text-[10px] text-center">{item.name}</span>
          </Link>
        ))}
        {/* Aditional Mini Items */}
        <Link to="/you" className="w-full flex flex-col items-center justify-center py-4 gap-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors text-zinc-600 dark:text-[#AAAAAA]">
          <div className="w-6 h-6 rounded-full bg-red-600 text-[10px] text-white flex items-center justify-center font-bold">D</div>
          <span className="text-[10px]">You</span>
        </Link>
      </aside>
    );
  }

  // Full Sidebar (Expanded)
  return (
    <aside className="fixed left-0 top-[56px] w-[240px] h-[calc(100vh-56px)] bg-white dark:bg-[#0F0F0F] z-50 overflow-y-auto custom-scrollbar px-3 pt-2 group">
      <div className="space-y-4">
        {/* Main Section */}
        <div className="space-y-1">
          {sidebarItems.main.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-6 px-3 py-2 rounded-xl transition-colors ${
                location.pathname === item.path 
                  ? 'bg-black/5 dark:bg-white/10 font-medium' 
                  : 'hover:bg-black/5 dark:hover:bg-white/10'
              }`}
            >
              <item.icon className={`w-6 h-6 ${location.pathname === item.path ? 'fill-current' : ''}`} />
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </div>

        <hr className="border-black/10 dark:border-white/10 mx-1" />

        {/* Library Section */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-sm font-medium">You</div>
          {sidebarItems.library.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-6 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </div>

        <hr className="border-black/10 dark:border-white/10 mx-1" />

        {/* Explore Section */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-sm font-medium">Explore</div>
          {sidebarItems.explore.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-6 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </div>

        <hr className="border-black/10 dark:border-white/10 mx-1" />

        {/* Settings/Footer Section */}
        <div className="space-y-1 pb-4">
          {sidebarItems.footer.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-6 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="px-3 py-4 text-[12px] text-zinc-500 font-medium space-y-3 leading-tight opacity-70 group-hover:opacity-100 transition-opacity">
           <div className="flex flex-wrap gap-x-2">
              <span>About</span><span>Press</span><span>Copyright</span>
              <span>Contact us</span><span>Creator</span>
           </div>
           <div className="flex flex-wrap gap-x-2">
              <span>Terms</span><span>Privacy</span><span>Policy & Safety</span>
              <span>How YouTube works</span>
           </div>
           <p className="pt-2">© 2026 Google LLC</p>
        </div>
      </div>
    </aside>
  );
}
