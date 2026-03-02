import Link from 'next/link';
import { Eye, Heart, MessageCircle } from 'lucide-react';
import type { Post } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface PostCardProps {
  post: Post;
}

const categoryConfig: Record<string, { color: string; bg: string; border: string }> = {
  '기술공유': {
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    border: 'border-l-blue-400 dark:border-l-blue-600',
  },
  '커리어': {
    color: 'text-purple-700 dark:text-purple-300',
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    border: 'border-l-purple-400 dark:border-l-purple-600',
  },
  '트렌드': {
    color: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-900/30',
    border: 'border-l-emerald-400 dark:border-l-emerald-600',
  },
  '질문': {
    color: 'text-orange-700 dark:text-orange-300',
    bg: 'bg-orange-50 dark:bg-orange-900/30',
    border: 'border-l-orange-400 dark:border-l-orange-600',
  },
  '자유': {
    color: 'text-gray-600 dark:text-gray-400',
    bg: 'bg-gray-100 dark:bg-gray-700',
    border: 'border-l-gray-300 dark:border-l-gray-600',
  },
};

export function PostCard({ post }: PostCardProps) {
  const catConfig = categoryConfig[post.category] ?? categoryConfig['자유'];
  const isHot = post.views > 500 || post.likes.length > 5;
  const isNew = new Date(post.createdAt).getTime() > Date.now() - 24 * 60 * 60 * 1000;

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
      <div className={`bg-white dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700/60 border-l-4 ${catConfig.border} overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-150`}>
        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            {/* Author avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/50 dark:to-indigo-800/50 flex items-center justify-center text-sm font-bold text-blue-700 dark:text-blue-300 flex-shrink-0 shadow-sm">
              {post.authorName[0]}
            </div>

            <div className="flex-1 min-w-0">
              {/* 카테고리 + 뱃지 */}
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${catConfig.bg} ${catConfig.color}`}>
                  {post.category}
                </span>
                {isHot && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                    🔥 인기
                  </span>
                )}
                {isNew && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    NEW
                  </span>
                )}
              </div>

              {/* 제목 */}
              <h3 className="font-semibold text-base text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5">
                {post.title}
              </h3>

              {/* 미리보기 */}
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {preview}...
              </p>

              {/* 하단: 작성자 + 통계 */}
              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-700/60">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="font-medium text-gray-600 dark:text-gray-300">{post.authorName}</span>
                  <span className="text-gray-300 dark:text-gray-600">·</span>
                  <span>{timeAgo}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Eye size={11} />
                    {post.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <Heart size={11} />
                    {post.likes.length}
                  </span>
                  <span className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                    <MessageCircle size={11} />
                    {post.comments.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
