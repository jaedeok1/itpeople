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
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Save } from 'lucide-react';

const schema = z.object({
  title: z.string().min(2, '제목은 2자 이상이어야 합니다'),
  content: z.string().min(20, '내용은 20자 이상이어야 합니다'),
  category: z.enum(['기술공유', '커리어', '트렌드', '질문', '자유']),
});

type FormData = z.infer<typeof schema>;

export default function CreatePostPage() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const { toast } = useToast();
  const [isDraft, setIsDraft] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { category: '기술공유' },
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const onSubmit = (data: FormData) => {
    toast({ description: isDraft ? '임시 저장되었습니다.' : '게시글이 등록되었습니다!' });
    router.push('/community');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ChevronLeft size={16} /> 목록으로
      </button>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">글 쓰기</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
          <div className="space-y-2">
            <Label>카테고리 *</Label>
            <Select onValueChange={(v) => setValue('category', v as any)} defaultValue="기술공유">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {['기술공유', '커리어', '트렌드', '질문', '자유'].map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">제목 *</Label>
            <Input id="title" placeholder="제목을 입력하세요" {...register('title')} />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">내용 *</Label>
            <Textarea
              id="content"
              rows={15}
              placeholder="내용을 작성해주세요. Markdown 형식을 지원합니다 (## 제목, - 목록 등)"
              className="font-mono text-sm"
              {...register('content')}
            />
            {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => { setIsDraft(true); handleSubmit(onSubmit)(); }}
          >
            <Save size={16} /> 임시 저장
          </Button>
          <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => setIsDraft(false)}>
            게시하기
          </Button>
        </div>
      </form>
    </div>
  );
}
