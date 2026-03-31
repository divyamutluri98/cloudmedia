import { Link } from 'react-router-dom';
import { Twitter, Facebook, Linkedin, Globe } from 'lucide-react';

interface AuthorBioProps {
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorBio?: string;
  authorSocialLinks?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
}

export function AuthorBio({ 
  authorId, 
  authorName, 
  authorAvatar, 
  authorBio,
  authorSocialLinks 
}: AuthorBioProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 my-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* Avatar */}
        <Link to={`/author/${authorId}`} className="flex-shrink-0">
          <img
            src={authorAvatar || 'https://via.placeholder.com/100x100'}
            alt={authorName}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#C8102E]"
          />
        </Link>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <Link to={`/author/${authorId}`}>
              <h3 className="text-xl font-bold hover:text-[#C8102E] transition-colors">
                {authorName}
              </h3>
            </Link>
            
            {/* Social Links */}
            {authorSocialLinks && (
              <div className="flex gap-2">
                {authorSocialLinks.twitter && (
                  <a
                    href={authorSocialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {authorSocialLinks.facebook && (
                  <a
                    href={authorSocialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {authorSocialLinks.linkedin && (
                  <a
                    href={authorSocialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-700 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {authorSocialLinks.website && (
                  <a
                    href={authorSocialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 transition-colors"
                    aria-label="Website"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {authorBio && (
            <p className="text-gray-700 dark:text-gray-300 mb-3">{authorBio}</p>
          )}

          <Link
            to={`/author/${authorId}`}
            className="inline-block text-[#C8102E] font-medium hover:underline"
          >
            View all articles by {authorName} →
          </Link>
        </div>
      </div>
    </div>
  );
}
