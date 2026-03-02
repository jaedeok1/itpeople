'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Comment, User } from '@/types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CornerDownRight, Trash2, MessageCircle } from 'lucide-react';

interface CommentSectionProps {
  comments: Comment[];
  user: User | null;
  onAddComment: (content: string, parentId?: string) => void;
  onDeleteComment?: (commentId: string) => void;
}

export function CommentSection({
  comments,
  user,
  onAddComment,
  onDeleteComment,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const topLevel = comments.filter((c) => !c.parentId);
  const replies = (parentId: string) => comments.filter((c) => c.parentId === parentId);

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment.trim());
    setNewComment('');
  };

  const handleReply = (parentId: string) => {
    if (!replyContent.trim()) return;
    onAddComment(replyContent.trim(), parentId);
    setReplyContent('');
    setReplyTo(null);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    action: () => void
  ) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <MessageCircle size={16} className="text-gray-400" />
        댓글 {comments.length}개
      </h3>

      {/* Comment input */}
      {user ? (
        <div className="flex gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={user.profileImage} />
            <AvatarFallback className="text-xs bg-blue-100 text-blue-600 font-semibold">
              {user.nickname.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="댓글을 작성해주세요 (Ctrl+Enter로 전송)"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
              rows={3}
              className="resize-none text-sm"
            />
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!newComment.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                댓글 작성
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            댓글을 작성하려면{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium underline">
              로그인
            </a>
            이 필요합니다.
          </p>
        </div>
      )}

      {/* Comments list */}
      {topLevel.length === 0 ? (
        <div className="text-center py-8">
          <MessageCircle size={32} className="text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-400">첫 번째 댓글을 남겨보세요!</p>
        </div>
      ) : (
        <div className="space-y-5 divide-y divide-gray-100 dark:divide-gray-700">
          {topLevel.map((comment) => (
            <div key={comment.id} className="pt-4 first:pt-0">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={comment.authorImage} />
                  <AvatarFallback className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold">
                    {comment.authorName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {comment.authorName}
                      </span>
                      <span className="text-xs text-gray-400">
                        {format(new Date(comment.createdAt), 'M월 d일 HH:mm', { locale: ko })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {user && (
                        <button
                          onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                          className="text-xs text-gray-400 hover:text-blue-500 transition-colors px-1.5 py-0.5 rounded"
                        >
                          답글
                        </button>
                      )}
                      {user?.id === comment.authorId && onDeleteComment && (
                        <button
                          onClick={() => onDeleteComment(comment.id)}
                          className="text-xs text-gray-300 hover:text-red-400 transition-colors p-0.5 rounded"
                          title="댓글 삭제"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>

              {/* Replies */}
              {replies(comment.id).length > 0 && (
                <div className="ml-11 mt-3 space-y-3">
                  {replies(comment.id).map((reply) => (
                    <div key={reply.id} className="flex gap-2">
                      <CornerDownRight size={13} className="text-gray-300 dark:text-gray-600 flex-shrink-0 mt-1.5" />
                      <Avatar className="h-6 w-6 flex-shrink-0">
                        <AvatarImage src={reply.authorImage} />
                        <AvatarFallback className="text-[9px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold">
                          {reply.authorName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-semibold text-gray-900 dark:text-white">
                              {reply.authorName}
                            </span>
                            <span className="text-xs text-gray-400">
                              {format(new Date(reply.createdAt), 'M월 d일 HH:mm', { locale: ko })}
                            </span>
                          </div>
                          {user?.id === reply.authorId && onDeleteComment && (
                            <button
                              onClick={() => onDeleteComment(reply.id)}
                              className="text-xs text-gray-300 hover:text-red-400 transition-colors p-0.5 rounded"
                            >
                              <Trash2 size={11} />
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply input */}
              {replyTo === comment.id && (
                <div className="ml-11 mt-3 flex gap-2">
                  <Avatar className="h-6 w-6 flex-shrink-0">
                    <AvatarImage src={user?.profileImage} />
                    <AvatarFallback className="text-[9px] bg-blue-100 text-blue-600 font-semibold">
                      {user?.nickname[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Textarea
                      placeholder="답글을 작성해주세요 (Ctrl+Enter로 전송)"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, () => handleReply(comment.id))}
                      rows={2}
                      className="resize-none text-sm"
                      autoFocus
                    />
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => { setReplyTo(null); setReplyContent(''); }}
                      >
                        취소
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleReply(comment.id)}
                        disabled={!replyContent.trim()}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        답글 달기
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
