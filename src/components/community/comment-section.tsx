'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Comment, User } from '@/types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CornerDownRight } from 'lucide-react';

interface CommentSectionProps {
  comments: Comment[];
  user: User | null;
  onAddComment: (content: string, parentId?: string) => void;
}

export function CommentSection({ comments, user, onAddComment }: CommentSectionProps) {
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

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-gray-900 dark:text-white">댓글 {comments.length}개</h3>

      {/* Comment input */}
      {user ? (
        <div className="flex gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={user.profileImage} />
            <AvatarFallback className="text-xs bg-blue-100 text-blue-600">{user.nickname[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="댓글을 작성해주세요"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end">
              <Button size="sm" onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                댓글 작성
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center text-sm text-gray-500">
          댓글을 작성하려면 <a href="/login" className="text-blue-500 underline">로그인</a>이 필요합니다.
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-4">
        {topLevel.map((comment) => (
          <div key={comment.id}>
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={comment.authorImage} />
                <AvatarFallback className="text-xs bg-gray-100 text-gray-600">{comment.authorName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{comment.authorName}</span>
                  <span className="text-xs text-gray-400">
                    {format(new Date(comment.createdAt), 'M월 d일 HH:mm', { locale: ko })}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                {user && (
                  <button
                    onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                    className="mt-1 text-xs text-gray-400 hover:text-blue-500"
                  >
                    답글 달기
                  </button>
                )}
              </div>
            </div>

            {/* Replies */}
            {replies(comment.id).length > 0 && (
              <div className="ml-11 mt-3 space-y-3">
                {replies(comment.id).map((reply) => (
                  <div key={reply.id} className="flex gap-3">
                    <CornerDownRight size={14} className="text-gray-300 flex-shrink-0 mt-1" />
                    <Avatar className="h-7 w-7 flex-shrink-0">
                      <AvatarImage src={reply.authorImage} />
                      <AvatarFallback className="text-xs bg-gray-100 text-gray-600">{reply.authorName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{reply.authorName}</span>
                        <span className="text-xs text-gray-400">
                          {format(new Date(reply.createdAt), 'M월 d일 HH:mm', { locale: ko })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reply input */}
            {replyTo === comment.id && (
              <div className="ml-11 mt-3 flex gap-3">
                <Avatar className="h-7 w-7 flex-shrink-0">
                  <AvatarImage src={user?.profileImage} />
                  <AvatarFallback className="text-xs bg-blue-100 text-blue-600">{user?.nickname[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="답글을 작성해주세요"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={2}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button size="sm" variant="outline" onClick={() => setReplyTo(null)}>취소</Button>
                    <Button size="sm" onClick={() => handleReply(comment.id)} className="bg-blue-600 hover:bg-blue-700">
                      답글 달기
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
