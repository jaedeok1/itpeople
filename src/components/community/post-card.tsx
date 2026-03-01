import Link from 'next/link';
import { Eye, Heart, MessageCircle } from 'lucide-react';
import type { Post } from '@/types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface PostCardProps {
  post: Post;
}

const categoryColors: Record<string, string> = {
  '기술공유': 'bg-blue-100 text-blue-700',
  '커리어': 'bg-purple-100 text-purple-700',
  '트렌드': 'bg-green-100 text-green-700',
  '질문': 'bg-orange-100 text-orange-700',
  '자유': 'bg-gray-100 text-gray-700',
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/community/${post.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? categoryColors['자유']}`}>
            {post.category}
          </span>
          <span className="text-xs text-gray-400">
            {format(new Date(post.createdAt), 'M월 d일', { locale: ko })}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5 line-clamp-2">{post.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
          {post.content.replace(/[#*`]/g, '').slice(0, 100)}...
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600">
              {post.authorName[0]}
            </div>
            <span className="text-xs text-gray-500">{post.authorName}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Eye size={12} />{post.views}</span>
            <span className="flex items-center gap-1"><Heart size={12} />{post.likes.length}</span>
            <span className="flex items-center gap-1"><MessageCircle size={12} />{post.comments.length}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
