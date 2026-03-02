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
import { useDataStore } from '@/stores/data-store';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Calendar, MapPin, Wifi, DollarSign, Users } from 'lucide-react';
import type { Meeting } from '@/types';

const schema = z.object({
  title: z.string().min(2, '모임명은 2자 이상이어야 합니다').max(60, '60자 이내로 입력해주세요'),
  description: z.string().min(10, '설명은 10자 이상이어야 합니다'),
  type: z.enum(['online', 'offline']),
  category: z.enum(['네트워킹', '스터디', '세미나', '해커톤', '기타']),
  date: z.string().min(1, '날짜를 선택해주세요'),
  location: z.string().optional(),
  onlineUrl: z.string().optional(),
  hasFee: z.boolean(),
  fee: z.number().optional(),
  maxParticipants: z.number().min(2, '최소 2명').max(500, '최대 500명'),
});

type FormData = z.infer<typeof schema>;

export default function CreateMeetingPage() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const { addMeeting, initialize } = useDataStore();
  const { toast } = useToast();

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
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
    if (!isLoggedIn) router.push('/login');
    initialize();
  }, [isLoggedIn, router, initialize]);

  if (!isLoggedIn || !user) return null;

  const onSubmit = (data: FormData) => {
    const meeting: Meeting = {
      id: `m_${Date.now()}`,
      title: data.title,
      description: data.description,
      type: data.type,
      category: data.category,
      date: data.date,
      location: data.type === 'offline' ? data.location : undefined,
      onlineUrl: data.type === 'online' ? data.onlineUrl : undefined,
      hasFee: data.hasFee,
      fee: data.hasFee ? data.fee : undefined,
      maxParticipants: data.maxParticipants,
      participants: [user.id],
      hostId: user.id,
      hostName: user.nickname,
      notices: [],
      createdAt: new Date().toISOString(),
      status: 'open',
    };

    addMeeting(meeting);
    toast({ description: '모임이 생성되었습니다! 🎉' });
    router.push(`/meetings/${meeting.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-6 transition-colors"
      >
        <ChevronLeft size={16} /> 목록으로
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">모임 만들기</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">IT인들과 함께할 모임을 만들어보세요</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* 기본 정보 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
            기본 정보
          </h2>

          <div className="space-y-2">
            <Label htmlFor="title">모임명 <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              placeholder="어떤 모임인지 한눈에 알 수 있게 써주세요"
              {...register('title')}
              className="h-11"
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">모임 소개 <span className="text-red-500">*</span></Label>
            <Textarea
              id="description"
              rows={5}
              placeholder="모임 목적, 내용, 대상을 자세히 소개해주세요"
              {...register('description')}
              className="resize-none"
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>모임 유형 <span className="text-red-500">*</span></Label>
              <div className="flex gap-2">
                {(['offline', 'online'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setValue('type', t)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium border-2 transition-all ${
                      type === t
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {t === 'offline' ? <MapPin size={14} /> : <Wifi size={14} />}
                    {t === 'offline' ? '오프라인' : '온라인'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>카테고리 <span className="text-red-500">*</span></Label>
              <Select onValueChange={(v) => setValue('category', v as any)} defaultValue="네트워킹">
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['네트워킹', '스터디', '세미나', '해커톤', '기타'].map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* 일시 및 장소 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
            일시 및 장소
          </h2>

          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-1.5">
              <Calendar size={13} /> 일시 <span className="text-red-500">*</span>
            </Label>
            <Input id="date" type="datetime-local" {...register('date')} className="h-11" />
            {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
          </div>

          {type === 'offline' ? (
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-1.5">
                <MapPin size={13} /> 장소
              </Label>
              <Input
                id="location"
                placeholder="상세 주소를 입력하세요 (예: 서울 강남구 테헤란로 123)"
                {...register('location')}
                className="h-11"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="onlineUrl" className="flex items-center gap-1.5">
                <Wifi size={13} /> 온라인 링크
              </Label>
              <Input
                id="onlineUrl"
                placeholder="Zoom, Google Meet, Discord 링크"
                {...register('onlineUrl')}
                className="h-11"
              />
            </div>
          )}
        </div>

        {/* 참가 정보 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">3</span>
            참가 정보
          </h2>

          <div className="space-y-2">
            <Label htmlFor="maxParticipants" className="flex items-center gap-1.5">
              <Users size={13} /> 최대 참가 인원 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="maxParticipants"
              type="number"
              min={2}
              max={500}
              {...register('maxParticipants', { valueAsNumber: true })}
              className="h-11"
            />
            {errors.maxParticipants && (
              <p className="text-xs text-red-500">{errors.maxParticipants.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-1.5">
              <DollarSign size={13} /> 참가비
            </Label>
            <div className="flex gap-2">
              {[false, true].map((v) => (
                <button
                  key={String(v)}
                  type="button"
                  onClick={() => setValue('hasFee', v)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium border-2 transition-all ${
                    hasFee === v
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-300'
                  }`}
                >
                  {v ? '유료' : '무료'}
                </button>
              ))}
            </div>
            {hasFee && (
              <div>
                <Input
                  type="number"
                  placeholder="참가비 금액 (원)"
                  {...register('fee', { valueAsNumber: true })}
                  className="h-11"
                />
                <p className="text-xs text-gray-400 mt-1.5">* 실제 결제 기능은 별도 진행됩니다</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
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
            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            disabled={isSubmitting}
          >
            모임 만들기
          </Button>
        </div>
      </form>
    </div>
  );
}
