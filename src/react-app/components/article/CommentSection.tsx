import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';
import { Skeleton } from '../ui/skeleton';
import { ThumbsUp, MessageSquare, Flag } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  article_id: string;
  parent_id?: string;
  likes_count: number;
  user?: {
    username: string;
    avatar_url?: string;
  };
}

interface CommentSectionProps {
  articleId: string;
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchComments();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`comments-${articleId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'comments', filter: `article_id=eq.${articleId}` },
        () => fetchComments()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [articleId]);

  const fetchComments = async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        user:profiles (username, avatar_url)
      `)
      .eq('article_id', articleId)
      .eq('status', 'approved')
      .is('parent_id', null)
      .order('created_at', { ascending: false });

    if (data && !error) {
      setComments(data);
    }
    setLoading(false);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to comment');
      return;
    }

    if (!newComment.trim()) return;

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('comments')
        .insert([{
          article_id: articleId,
          user_id: user.id,
          content: newComment.trim(),
          status: 'pending' // Requires moderation
        }]);

      if (error) throw error;

      setNewComment('');
      await fetchComments();
      alert('Comment submitted for moderation. Thank you!');
    } catch (err: any) {
      alert(err.message || 'Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!user) {
      alert('Please login to like comments');
      return;
    }

    try {
      const { error } = await supabase.rpc('like_comment', {
        comment_id: commentId,
        user_id: user.id
      });

      if (error) throw error;
      
      // Refresh comments to show updated like count
      await fetchComments();
    } catch (err: any) {
      console.error('Like failed:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare className="w-6 h-6" />
        Comments ({comments.length})
      </h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        {user ? (
          <div className="space-y-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:border-[#C8102E] transition-colors"
              disabled={submitting}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting || !newComment.trim()}
                className="px-6 py-2 bg-[#C8102E] hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <p className="text-gray-600 dark:text-gray-400">
              <a href="/login" className="text-[#C8102E] hover:underline font-medium">
                Login
              </a>{' '}
              to leave a comment
            </p>
          </div>
        )}
      </form>

      {/* Comments List */}
      {loading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              {/* Avatar */}
              <img
                src={comment.user?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user?.username || 'User')}`}
                alt={comment.user?.username || 'User'}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{comment.user?.username || 'Anonymous'}</span>
                    <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
                  </div>
                </div>

                <p className="text-gray-800 dark:text-gray-200 mb-3">{comment.content}</p>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-[#C8102E] transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{comment.likes_count || 0}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-[#C8102E] transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors ml-auto">
                    <Flag className="w-4 h-4" />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
