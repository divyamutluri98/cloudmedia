import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Eye, Clock, TrendingUp, Radio, Signal, Wifi, Zap } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Skeleton } from '../ui/skeleton';
import { LATEST_NEWS } from '../../data/initialNews';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface Video {
  id: string;
  title: string;
  slug: string;
  thumbnail_url?: string;
  video_url: string;
  duration?: string;
  views_count: number;
  published_at: string;
}

export function VideoSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(6);

      if (data && !error && data.length > 0) {
        setVideos(data as any);
      } else {
        const fallbacks = LATEST_NEWS.slice(2, 6).map(a => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
          thumbnail_url: a.featured_image,
          video_url: "#",
          duration: "4:35",
          views_count: a.views_count,
          published_at: a.published_at || new Date().toISOString()
        }));
        setVideos(fallbacks as any);
      }
    } catch {
       const fallbacks = LATEST_NEWS.slice(2, 6).map(a => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
          thumbnail_url: a.featured_image,
          video_url: "#",
          duration: "3:45",
          views_count: 500,
          published_at: new Date().toISOString()
        }));
        setVideos(fallbacks as any);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="px-4 md:px-10 py-24 space-y-12 relative overflow-hidden">
      {/* Magic Background Gradient */}
      <div className="absolute top-1/2 left-0 w-full h-[300px] bg-red-600/5 blur-[120px] -z-10 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-left">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter flex items-center gap-3">
                <Radio className="w-8 h-8 text-red-600 animate-pulse" />
                Video Briefings
            </h2>
            <p className="text-xs font-black text-zinc-500 uppercase tracking-[0.4em] ml-1">
                Audio-Visual Intelligence Reports <span className="text-red-600 mx-2">●</span> Original Signals
            </p>
        </div>
        <Link
          to="/videos"
          className="group text-xs font-black uppercase text-red-600 hover:tracking-[0.2em] transition-all bg-red-50 dark:bg-red-950/20 px-6 py-3 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/30 flex items-center gap-2"
        >
          View All Content <Signal className="w-4 h-4 group-hover:scale-125 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <AnimatePresence mode="popLayout">
          {loading ? (
             [...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6">
                   <Skeleton className="aspect-video w-full md:w-64 rounded-[2rem] shrink-0" />
                   <div className="flex-1 space-y-4 pt-2">
                       <Skeleton className="h-4 w-1/3 rounded-full" />
                       <Skeleton className="h-6 w-full rounded-full" />
                       <Skeleton className="h-4 w-1/2 rounded-full" />
                   </div>
                </div>
             ))
          ) : (
            videos.map((video, index) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Link to={`/article/${video.slug}`} className="group block h-full">
                  <Card className="h-full relative overflow-hidden bg-white/40 dark:bg-black/20 backdrop-blur-3xl rounded-[3rem] border-4 border-white/5 dark:border-white/5 transition-all duration-700 hover:shadow-3xl hover:-translate-y-2 hover:border-red-600/20 shadow-2xl">
                    <CardContent className="p-8 flex flex-col md:flex-row gap-8 h-full">
                       <div className="relative aspect-video md:w-80 rounded-[2.5rem] overflow-hidden bg-zinc-950 shrink-0 shadow-2xl group/thumb">
                          <img
                            src={video.thumbnail_url || `https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=640`}
                            alt={video.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-3xl scale-75 group-hover/thumb:scale-100 transition-transform">
                                <PlayCircle className="w-10 h-10 text-red-600 fill-current" />
                             </div>
                          </div>
                          <div className="absolute bottom-5 right-5 bg-black/80 backdrop-blur-3xl text-white text-[10px] font-black px-3 py-1.5 rounded-xl border border-white/10 tracking-[0.2em] shadow-xl">
                             {video.duration || '3:45'}
                          </div>
                       </div>
                       
                       <div className="flex flex-col justify-between py-2 flex-1 space-y-6">
                          <div className="space-y-4">
                             <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="bg-red-600 text-white text-[8px] font-black uppercase tracking-[0.2em] border-none px-3 py-1 rounded-lg">
                                   <Zap className="w-3 h-3 mr-1" /> ORIGIN
                                </Badge>
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                   <Wifi className="w-3.5 h-3.5 text-zinc-600" /> SAT_CONNECTED
                                </span>
                             </div>
                             <h3 className="text-2xl md:text-3xl font-black leading-[1.1] uppercase tracking-tighter group-hover:text-red-600 transition-colors dark:text-white line-clamp-3 line-clamp-2">
                               {video.title}
                             </h3>
                          </div>
                          
                          <div className="flex items-center gap-8 pt-4 border-t border-zinc-200/50 dark:border-white/5">
                             <div className="flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase">
                                <Eye className="w-3.5 h-3.5 text-red-600" />
                                {video.views_count.toLocaleString()} Pulse
                             </div>
                             <div className="flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase">
                                <Clock className="w-3.5 h-3.5 text-red-600" />
                                {formatDate(video.published_at)}
                             </div>
                          </div>
                       </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
