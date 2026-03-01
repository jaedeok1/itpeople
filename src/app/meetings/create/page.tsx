'use client';

import { useEffect } from 'react';
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
import { ChevronLeft } from 'lucide-react';

const schema = z.object({
  title: z.string().min(2, '모임명은 2자 이상이어야 합니다'),
  description: z.string().min(10, '설명은 10자 이상이어야 합니다'),
  type: z.enum(['online', 'offline']),
  category: z.enum(['네트워킹', '스터디', '세미나', '해커톤', '기타']),
  date: z.string().min(1, '날짜를 선택해주세요'),
  location: z.string().optional(),
  onlineUrl: z.string().optional(),
  hasFee: z.boolean(),
  fee: z.number().optional(),
  maxParticipants: z.number().min(2).max(500),
});

type FormData = z.infer<typeof schema>;

export default function CreateMeetingPage() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const { toast } = useToast();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'offline',
      category: '네트워킹',
      hasFee: false,
      maxParticipants: 20,
    },
  });

  const type = watch('type');
  const hasFee = watch('hasFee');

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const onSubmit = (data: FormData) => {
    toast({ description: '모임이 생성되었습니다!' });
    router.push('/meetings');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ChevronLeft size={16} /> 목록으로
      </button>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">모임 만들기</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 dark:text-white">기본 정보</h2>

          <div className="space-y-2">
            <Label htmlFor="title">모임명 *</Label>
            <Input id="title" placeholder="모임명을 입력하세요" {...register('title')} />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">모임 소개 *</Label>
            <Textarea id="description" rows={4} placeholder="모임 목적과 내용을 소개해주세요" {...register('description')} />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>모임 유형 *</Label>
              <div className="flex gap-2">
                {(['offline', 'online'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setValue('type', t)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                      type === t
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 text-gray-600 hover:border-blue-400'
                    }`}
                  >
                    {t === 'offline' ? '오프라인' : '온라인'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>카테고리 *</Label>
              <Select onValueChange={(v) => setValue('category', v as any)} defaultValue="네트워킹">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['네트워킹', '스터디', '세미나', '해커톤', '기타'].map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 dark:text-white">일시 및 장소</h2>

          <div className="space-y-2">
            <Label htmlFor="date">일시 *</Label>
            <Input id="date" type="datetime-local" {...register('date')} />
            {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
          </div>

          {type === 'offline' ? (
            <div className="space-y-2">
              <Label htmlFor="location">장소</Label>
              <Input id="location" placeholder="주소를 입력하세요" {...register('location')} />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="onlineUrl">온라인 링크</Label>
              <Input id="onlineUrl" placeholder="Zoom, Google Meet 등 링크" {...register('onlineUrl')} />
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 dark:text-white">참가 정보</h2>

          <div className="space-y-2">
            <Label htmlFor="maxParticipants">최대 참가 인원 *</Label>
            <Input
              id="maxParticipants"
              type="number"
              min={2}
              max={500}
              {...register('maxParticipants', { valueAsNumber: true })}
            />
          </div>

          <div className="space-y-3">
            <Label>참가비</Label>
            <div className="flex gap-2">
              {[false, true].map((v) => (
                <button
                  key={String(v)}
                  type="button"
                  onClick={() => setValue('hasFee', v)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                    hasFee === v
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 text-gray-600 hover:border-blue-400'
                  }`}
                >
                  {v ? '유료' : '무료'}
                </button>
              ))}
            </div>
            {hasFee && (
              <Input
                type="number"
                placeholder="참가비 금액 (원)"
                {...register('fee', { valueAsNumber: true })}
              />
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
            취소
          </Button>
          <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
            모임 만들기
          </Button>
        </div>
      </form>
    </div>
  );
}
