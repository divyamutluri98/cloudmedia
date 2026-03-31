import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Skeleton } from '../ui/skeleton';
import { Camera, Calendar, ArrowRight, Aperture, Sparkles, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface PhotoGallery {
  id: string;
  title: string;
  slug: string;
  cover_image?: string;
  images?: string[];
  published_at: string;
}

const FALLBACK_GALLERIES = [
  {
    id: 'g1',
    title: 'Visual Focus: Inside the New Generative AI Data Centers',
    slug: 'ai-data-centers-visual',
    cover_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800',
    images: ['1', '2', '3', '4', '5'],
    published_at: new Date().toISOString()
  },
  {
    id: 'g2',
    title: 'Autonomous Transit: The Next Decade in Motion',
    slug: 'autonomous-transit-decade',
    cover_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800',
    images: ['1', '2', '3', '4'],
    published_at: new Date().toISOString()
  },
  {
    id: 'g3',
    title: 'Future Heritage: Redefining Modern Urban Architecture',
    slug: 'future-heritage-architecture',
    cover_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800',
    images: ['1', '2', '3', '4', '5', '6'],
    published_at: new Date().toISOString()
  }
];

export function GallerySection() {
  const [galleries, setGalleries] = useState<PhotoGallery[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('photo_gallery')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(6);

      if (data && !error && data.length > 0) {
        setGalleries(data as any);
      } else {
        setGalleries(FALLBACK_GALLERIES as any);
      }
    } catch {
      setGalleries(FALLBACK_GALLERIES as any);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <div className="p-4 md:p-10 space-y-12 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-left">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter flex items-center gap-3">
                <Aperture className="w-8 h-8 text-red-600 animate-spin-slow" />
                Signal Scope
            </h2>
            <p className="text-xs font-black text-zinc-500 uppercase tracking-[0.4em] ml-1">
                Visual Intelligence & Field Focus <span className="text-red-600 mx-2">●</span> Captured Signals
            </p>
        </div>
        <Link
          to="/gallery"
          className="group text-xs font-black uppercase text-red-600 hover:tracking-[0.2em] transition-all bg-red-50 dark:bg-red-950/20 px-6 py-3 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/30 flex items-center gap-2"
        >
          View All Portfolios <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="border-none bg-transparent shadow-none">
              <Skeleton className="aspect-[4/5] w-full rounded-[3.5rem] mb-4" />
              <Skeleton className="h-6 w-3/4 rounded-full" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {galleries.map((gallery, index) => (
              <motion.div
                key={gallery.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <Link to={`/gallery/${gallery.slug}`} className="group">
                  <Card className="relative aspect-[4/5] overflow-hidden rounded-[3rem] border-4 border-white/5 dark:border-white/5 bg-zinc-950 shadow-3xl hover:shadow-[0_40px_80px_-20px_rgba(200,16,46,0.3)] transition-all duration-700 hover:-translate-y-4">
                    <CardContent className="p-0 h-full">
                        <motion.img
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 10, ease: "easeOut" }}
                          src={gallery.cover_image || 'https://via.placeholder.com/800x1200'}
                          alt={gallery.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                        
                        {/* Image count badge */}
                        <div className="absolute top-8 right-8">
                             <Badge variant="secondary" className="bg-white/10 backdrop-blur-3xl text-white px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] border border-white/10 shadow-2xl group-hover:bg-red-600 transition-colors">
                                <ImageIcon className="w-3 h-3 mr-2" />
                                {gallery.images?.length || 0} SIG_CHANNELS
                             </Badge>
                        </div>

                        {/* Content overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-10 space-y-6">
                          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                             <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                             HYPER-FIELD FOCUS
                             <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping ml-auto"></span>
                          </div>
                          
                          <h3 className="text-2xl md:text-3xl font-black text-white leading-[1.1] group-hover:text-red-500 transition-colors tracking-tighter uppercase line-clamp-3">
                            {gallery.title}
                          </h3>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                             <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase">
                                <Calendar className="w-4 h-4 text-red-600" />
                                {formatDate(gallery.published_at)}
                             </div>
                             <div className="text-[10px] font-black text-white uppercase flex items-center gap-2 group-hover:tracking-widest transition-all">
                                Expand <ArrowRight className="w-4 h-4 text-red-600" />
                             </div>
                          </div>
                        </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
