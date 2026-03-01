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
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import type { ProjectRole } from '@/types';

const roles: ProjectRole[] = ['개발자', '디자이너', 'PM', '기획자', '마케터'];

const schema = z.object({
  title: z.string().min(2, '프로젝트명은 2자 이상이어야 합니다'),
  description: z.string().min(20, '설명은 20자 이상이어야 합니다'),
  goal: z.string().min(10, '목표를 입력해주세요'),
  startDate: z.string().min(1, '시작일을 입력해주세요'),
  endDate: z.string().min(1, '종료일을 입력해주세요'),
});

type FormData = z.infer<typeof schema>;

interface Position {
  role: ProjectRole;
  count: number;
  skills: string;
  description: string;
}

export default function CreateProjectPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { toast } = useToast();
  const [positions, setPositions] = useState<Position[]>([
    { role: '개발자', count: 1, skills: '', description: '' },
  ]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const addPosition = () => {
    setPositions([...positions, { role: '개발자', count: 1, skills: '', description: '' }]);
  };

  const removePosition = (idx: number) => {
    setPositions(positions.filter((_, i) => i !== idx));
  };

  const updatePosition = (idx: number, key: keyof Position, value: any) => {
    setPositions(positions.map((p, i) => i === idx ? { ...p, [key]: value } : p));
  };

  const onSubmit = (data: FormData) => {
    toast({ description: '프로젝트가 등록되었습니다!' });
    router.push('/projects');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ChevronLeft size={16} /> 목록으로
      </button>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">프로젝트 등록</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 dark:text-white">기본 정보</h2>

          <div className="space-y-2">
            <Label htmlFor="title">프로젝트명 *</Label>
            <Input id="title" placeholder="프로젝트명을 입력하세요" {...register('title')} />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">프로젝트 소개 *</Label>
            <Textarea id="description" rows={3} placeholder="프로젝트를 소개해주세요" {...register('description')} />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">프로젝트 목표 *</Label>
            <Textarea id="goal" rows={2} placeholder="목표와 기대 성과를 입력해주세요" {...register('goal')} />
            {errors.goal && <p className="text-xs text-red-500">{errors.goal.message}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">시작일 *</Label>
              <Input id="startDate" type="date" {...register('startDate')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">종료일 *</Label>
              <Input id="endDate" type="date" {...register('endDate')} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 dark:text-white">모집 포지션</h2>
            <Button type="button" variant="outline" size="sm" onClick={addPosition}>
              <Plus size={14} className="mr-1" /> 포지션 추가
            </Button>
          </div>

          {positions.map((pos, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">포지션 {idx + 1}</span>
                {positions.length > 1 && (
                  <button type="button" onClick={() => removePosition(idx)} className="text-red-400 hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">역할</Label>
                  <Select value={pos.role} onValueChange={(v) => updatePosition(idx, 'role', v as ProjectRole)}>
                    <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">모집 인원</Label>
                  <Input
                    type="number"
                    min={1}
                    value={pos.count}
                    onChange={(e) => updatePosition(idx, 'count', Number(e.target.value))}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">필요 기술 (쉼표 구분)</Label>
                <Input
                  placeholder="React, TypeScript, Node.js"
                  value={pos.skills}
                  onChange={(e) => updatePosition(idx, 'skills', e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">역할 설명</Label>
                <Input
                  placeholder="해당 포지션의 주요 역할을 설명해주세요"
                  value={pos.description}
                  onChange={(e) => updatePosition(idx, 'description', e.target.value)}
                  className="text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
            취소
          </Button>
          <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
            프로젝트 등록
          </Button>
        </div>
      </form>
    </div>
  );
}
