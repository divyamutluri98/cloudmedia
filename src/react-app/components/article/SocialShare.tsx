import { useState } from 'react';
import { 
  Facebook, 
  Twitter, 
  Share2, 
  Link as LinkIcon, 
  Printer,
  CheckCircle
} from 'lucide-react';

interface SocialShareProps {
  title: string;
  slug: string;
  url?: string;
}

export function SocialShare({ title, slug, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || `${window.location.origin}/article/${slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  };

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`;

  return (
    <div className="sticky top-20">
      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
        Share this article
      </h3>
      
      <div className="flex flex-col gap-2">
        {/* Facebook */}
        <a
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors group"
        >
          <Facebook className="w-5 h-5" />
          <span className="font-medium">Facebook</span>
        </a>

        {/* Twitter/X */}
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors group"
        >
          <Twitter className="w-5 h-5" />
          <span className="font-medium">Twitter</span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors group"
        >
          <Share2 className="w-5 h-5" />
          <span className="font-medium">WhatsApp</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-3 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors group"
        >
          {copied ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-medium text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-5 h-5" />
              <span className="font-medium">Copy Link</span>
            </>
          )}
        </button>

        {/* Print */}
        <button
          onClick={handlePrint}
          className="flex items-center gap-3 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors group"
        >
          <Printer className="w-5 h-5" />
          <span className="font-medium">Print</span>
        </button>

        {/* Native Share (Mobile) */}
        {typeof navigator.share !== 'undefined' && (
          <button
            onClick={handleShareNative}
            className="flex items-center gap-3 px-4 py-3 bg-[#C8102E] hover:bg-red-700 text-white rounded-lg transition-colors group md:hidden"
          >
            <Share2 className="w-5 h-5" />
            <span className="font-medium">Share...</span>
          </button>
        )}
      </div>
    </div>
  );
}
