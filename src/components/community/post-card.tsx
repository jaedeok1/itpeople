import Link from 'next/link';
import { Eye, Heart, MessageCircle } from 'lucide-react';
import type { Post } from '@/types';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface PostCardProps {
  post: Post;
}

const categoryConfig: Record<string, { color: string; bg: string }> = {
  '기술공유': { color: 'text-blue-700', bg: 'bg-blue-50' },
  '커리어': { color: 'text-purple-700', bg: 'bg-purple-50' },
  '트렌드': { color: 'text-emerald-700', bg: 'bg-emerald-50' },
  '질문': { color: 'text-orange-700', bg: 'bg-orange-50' },
  '자유': { color: 'text-gray-700', bg: 'bg-gray-100' },
};

export function PostCard({ post }: PostCardProps) {
  const catConfig = categoryConfig[post.category] ?? categoryConfig['자유'];
  const isHot = post.views > 500 || post.likes.length > 5;
  const isNew =
    new Date(post.createdAt).getTime() > Date.now() - 24 * 60 * 60 * 1000;

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: ko,
  });

  const preview = post.content
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/`{1,3}/g, '')
    .replace(/\n/g, ' ')
    .trim()
    .slice(0, 120);

  return (
    <Link href={`/community/${post.id}`} className="group block">
      <div className="bg-white dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700/60 p-4 sm:p-5 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-150">
        <div className="flex items-start gap-3">
          {/* Author avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 flex items-center justify-center text-sm font-bold text-blue-700 dark:text-blue-300 flex-shrink-0">
            {post.authorName[0]}
          </div>

          <div className="flex-1 min-w-0">
            {/* Category + badges */}
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${catConfig.bg} ${catConfig.color}`}
              >
                {post.category}
              </span>
              {isHot && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-600">
                  🔥 인기
                </span>
              )}
              {isNew && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                  NEW
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-[15px] text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
              {post.title}
            </h3>

            {/* Preview */}
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
              {preview}...
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  {post.authorName}
                </span>
                <span>·</span>
                <span>{timeAgo}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Eye size={11} />
                  {post.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={11} />
                  {post.likes.length}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={11} />
                  {post.comments.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
