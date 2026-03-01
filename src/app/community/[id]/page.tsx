'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { mockPosts } from '@/lib/mock-data';
import { useAuthStore } from '@/stores/auth-store';
import { useToast } from '@/hooks/use-toast';
import { CommentSection } from '@/components/community/comment-section';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, Eye, Heart } from 'lucide-react';
import type { Comment } from '@/types';

const categoryColors: Record<string, string> = {
  '기술공유': 'bg-blue-100 text-blue-700',
  '커리어': 'bg-purple-100 text-purple-700',
  '트렌드': 'bg-green-100 text-green-700',
  '질문': 'bg-orange-100 text-orange-700',
  '자유': 'bg-gray-100 text-gray-700',
};

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [posts, setPosts] = useState(mockPosts);

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">게시글을 찾을 수 없습니다.</p>
        <Button variant="outline" className="mt-4" onClick={() => router.back()}>돌아가기</Button>
      </div>
    );
  }

  const isLiked = user ? post.likes.includes(user.id) : false;

  const handleLike = () => {
    if (!user) { router.push('/login'); return; }
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, likes: isLiked ? p.likes.filter((l) => l !== user.id) : [...p.likes, user.id] }
          : p
      )
    );
  };

  const handleAddComment = (content: string, parentId?: string) => {
    if (!user) return;
    const newComment: Comment = {
      id: `c_${Date.now()}`,
      content,
      authorId: user.id,
      authorName: user.nickname,
      authorImage: user.profileImage,
      parentId,
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, comments: [...p.comments, newComment] } : p
      )
    );
    toast({ description: '댓글이 등록되었습니다.' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ChevronLeft size={16} /> 목록으로
      </button>

      <article className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? ''}`}>
              {post.category}
            </span>
            <span className="text-xs text-gray-400">
              {format(new Date(post.createdAt), 'yyyy년 M월 d일', { locale: ko })}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm text-blue-600 font-medium">
                {post.authorName[0]}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{post.authorName}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span className="flex items-center gap-1"><Eye size={14} />{post.views}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {post.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold mt-6 mb-2 text-gray-900 dark:text-white">{line.replace('## ', '')}</h2>;
              if (line.startsWith('### ')) return <h3 key={i} className="text-base font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">{line.replace('### ', '')}</h3>;
              if (line.startsWith('- ') || line.startsWith('1. ')) return <li key={i} className="ml-4 text-gray-700 dark:text-gray-300">{line.replace(/^[-\d.] /, '')}</li>;
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed">{line}</p>;
            })}
          </div>
        </div>

        {/* Like */}
        <div className="px-6 pb-6">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
              isLiked
                ? 'bg-red-50 border-red-200 text-red-500'
                : 'border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-400'
            }`}
          >
            <Heart size={16} className={isLiked ? 'fill-red-500' : ''} />
            <span className="text-sm">{post.likes.length}</span>
          </button>
        </div>
      </article>

      {/* Comments */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
        <CommentSection
          comments={post.comments}
          user={user}
          onAddComment={handleAddComment}
        />
      </div>
    </div>
  );
}
