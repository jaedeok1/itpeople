'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/auth-store';
import { useDataStore } from '@/stores/data-store';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft } from 'lucide-react';

const schema = z.object({
  title: z.string().min(2, '제목은 2자 이상').max(100),
  content: z.string().min(20, '내용은 20자 이상'),
  category: z.enum(['기술공유', '커리어', '트렌드', '질문', '자유']),
});

type FormData = z.infer<typeof schema>;

const categoryConfig: Record<string, { emoji: string }> = {
  '기술공유': { emoji: '💻' },
  '커리어': { emoji: '🚀' },
  '트렌드': { emoji: '📈' },
  '질문': { emoji: '❓' },
  '자유': { emoji: '💬' },
};

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const { posts, updatePost, initialize } = useDataStore();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('기술공유');

  useEffect(() => {
    if (!isLoggedIn) router.push('/login');
    initialize();
  }, [isLoggedIn, router, initialize]);

  const post = posts.find((p) => p.id === id);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post?.title ?? '',
      content: post?.content ?? '',
      category: post?.category ?? '기술공유',
    },
  });

  useEffect(() => {
    if (post) {
      setSelectedCategory(post.category);
    }
  }, [post]);

  if (!isLoggedIn || !user) return null;

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">게시글을 찾을 수 없습니다.</p>
      </div>
    );
  }

  if (post.authorId !== user.id) {
    router.push(`/community/${id}`);
    return null;
  }

  const onSubmit = (data: FormData) => {
    updatePost(id, {
      title: data.title,
      content: data.content,
      category: data.category,
    });
    toast({ description: '게시글이 수정되었습니다.' });
    router.push(`/community/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-6 transition-colors"
      >
        <ChevronLeft size={16} /> 돌아가기
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">게시글 수정</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* 카테고리 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
          <Label className="text-sm font-semibold mb-3 block">카테고리</Label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryConfig).map(([cat, { emoji }]) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setValue('category', cat as any);
                  setSelectedCategory(cat);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-300'
                }`}
              >
                {emoji} {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
          <div className="space-y-2">
            <Label>제목 *</Label>
            <Input {...register('title')} className="h-11 text-base" />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>내용 *</Label>
            <Textarea rows={18} className="resize-none font-mono text-sm" {...register('content')} />
            {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="outline" className="flex-1 h-12" onClick={() => router.back()}>
            취소
          </Button>
          <Button type="submit" className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 font-semibold">
            수정 완료
          </Button>
        </div>
      </form>
    </div>
  );
}
