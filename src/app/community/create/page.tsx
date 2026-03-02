'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthStore } from '@/stores/auth-store';
import { useDataStore } from '@/stores/data-store';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Info } from 'lucide-react';
import type { Post } from '@/types';

const schema = z.object({
  title: z.string().min(2, '제목은 2자 이상이어야 합니다').max(100, '100자 이내로 입력해주세요'),
  content: z.string().min(20, '내용은 20자 이상이어야 합니다'),
  category: z.enum(['기술공유', '커리어', '트렌드', '질문', '자유']),
});

type FormData = z.infer<typeof schema>;

const categoryConfig: Record<string, { emoji: string; desc: string }> = {
  '기술공유': { emoji: '💻', desc: '기술 경험, 튜토리얼, 라이브러리 소개' },
  '커리어': { emoji: '🚀', desc: '취업, 이직, 커리어 고민' },
  '트렌드': { emoji: '📈', desc: '업계 동향, 새로운 기술 트렌드' },
  '질문': { emoji: '❓', desc: '기술적 질문, 커뮤니티에 물어보기' },
  '자유': { emoji: '💬', desc: '자유로운 이야기' },
};

export default function CreatePostPage() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const { addPost, initialize } = useDataStore();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('기술공유');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { category: '기술공유' },
  });

  const content = watch('content', '');

  useEffect(() => {
    if (!isLoggedIn) router.push('/login');
    initialize();
  }, [isLoggedIn, router, initialize]);

  if (!isLoggedIn || !user) return null;

  const onSubmit = (data: FormData) => {
    const now = new Date().toISOString();
    const post: Post = {
      id: `p_${Date.now()}`,
      title: data.title,
      content: data.content,
      category: data.category,
      authorId: user.id,
      authorName: user.nickname,
      authorImage: user.profileImage,
      views: 0,
      likes: [],
      comments: [],
      createdAt: now,
      updatedAt: now,
      isDraft: false,
    };

    addPost(post);
    toast({ description: '게시글이 등록되었습니다! ✅' });
    router.push(`/community/${post.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-6 transition-colors"
      >
        <ChevronLeft size={16} /> 커뮤니티
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">글 쓰기</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {user.nickname}님의 경험과 생각을 나눠주세요
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* 카테고리 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
          <Label className="text-sm font-semibold mb-3 block">카테고리 선택 *</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(categoryConfig).map(([cat, { emoji, desc }]) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setValue('category', cat as any);
                  setSelectedCategory(cat);
                }}
                className={`flex flex-col items-start gap-1 p-3 rounded-xl border-2 text-left transition-all ${
                  selectedCategory === cat
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <span className="text-lg">{emoji}</span>
                <span className={`text-sm font-semibold ${selectedCategory === cat ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                  {cat}
                </span>
                <span className="text-[10px] text-gray-400 leading-tight">{desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 제목 + 내용 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              placeholder="독자가 읽고 싶게 만드는 제목을 써주세요"
              {...register('title')}
              className="h-11 text-base"
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="content">내용 *</Label>
              <span className="text-xs text-gray-400">{content.length}자</span>
            </div>
            <Textarea
              id="content"
              rows={18}
              placeholder={`내용을 작성해주세요.\n\nMarkdown 기본 문법을 지원합니다:\n## 큰 제목\n### 작은 제목\n- 목록 항목\n1. 번호 목록`}
              className="resize-none font-mono text-sm leading-relaxed"
              {...register('content')}
            />
            {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
          </div>

          <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Info size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Markdown 형식 지원: ## 제목, - 목록, **굵게**, `코드` 등
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-12"
            onClick={() => router.back()}
          >
            취소
          </Button>
          <Button
            type="submit"
            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 font-semibold"
            disabled={isSubmitting}
          >
            게시하기
          </Button>
        </div>
      </form>
    </div>
  );
}
