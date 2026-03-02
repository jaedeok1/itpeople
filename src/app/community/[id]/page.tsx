'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useDataStore } from '@/stores/data-store';
import { useAuthStore } from '@/stores/auth-store';
import { useToast } from '@/hooks/use-toast';
import { CommentSection } from '@/components/community/comment-section';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  ChevronLeft,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Edit2,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import type { Comment } from '@/types';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const categoryConfig: Record<string, { color: string; bg: string }> = {
  '기술공유': { color: 'text-blue-700', bg: 'bg-blue-50' },
  '커리어': { color: 'text-purple-700', bg: 'bg-purple-50' },
  '트렌드': { color: 'text-emerald-700', bg: 'bg-emerald-50' },
  '질문': { color: 'text-orange-700', bg: 'bg-orange-50' },
  '자유': { color: 'text-gray-700', bg: 'bg-gray-100' },
};

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const { posts, initialize, likePost, addComment, deleteComment, incrementViews, deletePost } =
    useDataStore();

  const [hasIncrementedView, setHasIncrementedView] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (id && !hasIncrementedView) {
      incrementViews(id);
      setHasIncrementedView(true);
    }
  }, [id, hasIncrementedView, incrementViews]);

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
          <MessageCircle size={28} className="text-gray-400" />
        </div>
        <h2 className="font-bold text-gray-900 dark:text-white mb-2">게시글을 찾을 수 없습니다</h2>
        <p className="text-gray-500 mb-6 text-sm">삭제되었거나 존재하지 않는 게시글입니다.</p>
        <Button variant="outline" onClick={() => router.push('/community')}>
          목록으로 돌아가기
        </Button>
      </div>
    );
  }

  const isLiked = user ? post.likes.includes(user.id) : false;
  const isAuthor = user?.id === post.authorId;
  const catConfig = categoryConfig[post.category] ?? categoryConfig['자유'];

  const handleLike = () => {
    if (!user) { router.push('/login'); return; }
    likePost(post.id, user.id);
    if (!isLiked) toast({ description: '좋아요를 눌렀습니다 ❤️' });
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
    addComment(post.id, newComment);
    toast({ description: '댓글이 등록되었습니다.' });
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(post.id, commentId);
    toast({ description: '댓글이 삭제되었습니다.' });
  };

  const handleDelete = () => {
    deletePost(post.id);
    toast({ description: '게시글이 삭제되었습니다.' });
    router.push('/community');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ description: '링크가 클립보드에 복사되었습니다.' });
    }
  };

  // Simple markdown renderer
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## '))
        return (
          <h2 key={i} className="text-xl font-bold mt-8 mb-3 text-gray-900 dark:text-white">
            {line.replace('## ', '')}
          </h2>
        );
      if (line.startsWith('### '))
        return (
          <h3 key={i} className="text-lg font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-200">
            {line.replace('### ', '')}
          </h3>
        );
      if (line.startsWith('- '))
        return (
          <li key={i} className="ml-4 text-gray-700 dark:text-gray-300 mb-1 list-disc">
            {line.replace('- ', '')}
          </li>
        );
      if (/^\d+\.\s/.test(line))
        return (
          <li key={i} className="ml-4 text-gray-700 dark:text-gray-300 mb-1 list-decimal">
            {line.replace(/^\d+\.\s/, '')}
          </li>
        );
      if (line.startsWith('```'))
        return <div key={i} className="font-mono text-xs text-gray-400">{line}</div>;
      if (line.trim() === '') return <div key={i} className="h-3" />;
      return (
        <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-1">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-6 transition-colors"
      >
        <ChevronLeft size={16} /> 커뮤니티
      </button>

      <article className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-4">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700">
          {/* Category + Actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catConfig.bg} ${catConfig.color}`}>
                {post.category}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="공유"
              >
                <Share2 size={15} />
              </button>
              {isAuthor && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                      <MoreHorizontal size={15} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/community/${post.id}/edit`} className="flex items-center gap-2 cursor-pointer">
                        <Edit2 size={13} /> 수정하기
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer flex items-center gap-2"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      <Trash2 size={13} /> 삭제하기
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 flex items-center justify-center text-sm font-bold text-blue-700 dark:text-blue-300">
                {post.authorName[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {post.authorName}
                </p>
                <p className="text-xs text-gray-400">
                  {format(new Date(post.createdAt), 'yyyy년 M월 d일', { locale: ko })}
                  {post.updatedAt !== post.createdAt && ' (수정됨)'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Eye size={13} />{post.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Heart size={13} />{post.likes.length}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={13} />{post.comments.length}
              </span>
            </div>
          </div>
        </div>

        {/* Delete confirm */}
        {showDeleteConfirm && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-900/40">
            <p className="text-sm text-red-700 dark:text-red-300 mb-3">
              정말 이 게시글을 삭제하시겠어요? 이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                취소
              </Button>
              <Button
                size="sm"
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                삭제하기
              </Button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8 min-h-[200px]">
          <div className="prose prose-sm dark:prose-invert max-w-none text-[15px] leading-relaxed">
            {renderContent(post.content)}
          </div>
        </div>

        {/* Like */}
        <div className="px-6 md:px-8 pb-6 border-t border-gray-100 dark:border-gray-700 pt-5 flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border-2 font-medium text-sm transition-all ${
              isLiked
                ? 'bg-red-50 border-red-200 text-red-500 dark:bg-red-900/20 dark:border-red-800'
                : 'border-gray-200 dark:border-gray-600 text-gray-500 hover:border-red-200 hover:text-red-400 hover:bg-red-50/50'
            }`}
          >
            <Heart size={16} className={isLiked ? 'fill-red-500' : ''} />
            <span>{post.likes.length}</span>
          </button>
          <span className="text-sm text-gray-400">이 글이 도움이 됐나요?</span>
        </div>
      </article>

      {/* Comments */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 md:p-8">
        <CommentSection
          comments={post.comments}
          user={user}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
        />
      </div>
    </div>
  );
}
