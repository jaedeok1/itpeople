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
import { ChevronLeft, Plus, Trash2, Target, Calendar, Users } from 'lucide-react';
import type { ProjectRole, Project, ProjectPosition } from '@/types';

const roles: ProjectRole[] = ['개발자', '디자이너', 'PM', '기획자', '마케터'];

const schema = z.object({
  title: z.string().min(2, '프로젝트명은 2자 이상').max(80),
  description: z.string().min(20, '프로젝트 소개는 20자 이상'),
  goal: z.string().min(10, '목표를 입력해주세요'),
  startDate: z.string().min(1, '시작일을 입력해주세요'),
  endDate: z.string().min(1, '종료일을 입력해주세요'),
});

type FormData = z.infer<typeof schema>;

interface PositionInput {
  role: ProjectRole;
  count: number;
  skills: string;
  description: string;
}

export default function CreateProjectPage() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const { addProject, initialize } = useDataStore();
  const { toast } = useToast();
  const [positions, setPositions] = useState<PositionInput[]>([
    { role: '개발자', count: 1, skills: '', description: '' },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!isLoggedIn) router.push('/login');
    initialize();
  }, [isLoggedIn, router, initialize]);

  if (!isLoggedIn || !user) return null;

  const addPosition = () => {
    setPositions([...positions, { role: '개발자', count: 1, skills: '', description: '' }]);
  };

  const removePosition = (idx: number) => {
    setPositions(positions.filter((_, i) => i !== idx));
  };

  const updatePosition = (idx: number, key: keyof PositionInput, value: string | number) => {
    setPositions(positions.map((p, i) => (i === idx ? { ...p, [key]: value } : p)));
  };

  const onSubmit = (data: FormData) => {
    const projectPositions: ProjectPosition[] = positions.map((p, i) => ({
      id: `pos_${Date.now()}_${i}`,
      role: p.role,
      count: p.count,
      skills: p.skills.split(',').map((s) => s.trim()).filter(Boolean),
      description: p.description,
    }));

    const project: Project = {
      id: `pr_${Date.now()}`,
      title: data.title,
      description: data.description,
      goal: data.goal,
      startDate: data.startDate,
      endDate: data.endDate,
      status: '모집중',
      leaderId: user.id,
      leaderName: user.nickname,
      positions: projectPositions,
      applicants: [],
      members: [user.id],
      createdAt: new Date().toISOString(),
    };

    addProject(project);
    toast({ description: '프로젝트가 등록되었습니다! 🚀' });
    router.push(`/projects/${project.id}`);
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">프로젝트 등록</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          함께 만들어갈 팀원을 모집해보세요
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* 기본 정보 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">1</span>
            기본 정보
          </h2>

          <div className="space-y-2">
            <Label htmlFor="title">프로젝트명 *</Label>
            <Input
              id="title"
              placeholder="어떤 프로젝트인지 알 수 있는 이름"
              {...register('title')}
              className="h-11"
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">프로젝트 소개 *</Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="어떤 서비스/제품을 만드는지, 왜 만드는지 소개해주세요"
              {...register('description')}
              className="resize-none"
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal" className="flex items-center gap-1.5">
              <Target size={13} /> 프로젝트 목표 *
            </Label>
            <Textarea
              id="goal"
              rows={2}
              placeholder="달성하고 싶은 목표와 기대 성과를 구체적으로 작성해주세요"
              {...register('goal')}
              className="resize-none"
            />
            {errors.goal && <p className="text-xs text-red-500">{errors.goal.message}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center gap-1.5">
                <Calendar size={13} /> 시작일 *
              </Label>
              <Input id="startDate" type="date" {...register('startDate')} className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate" className="flex items-center gap-1.5">
                <Calendar size={13} /> 종료일 *
              </Label>
              <Input id="endDate" type="date" {...register('endDate')} className="h-11" />
            </div>
          </div>
        </div>

        {/* 모집 포지션 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              모집 포지션
            </h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addPosition}
              className="h-8"
            >
              <Plus size={13} className="mr-1" /> 추가
            </Button>
          </div>

          <div className="space-y-3">
            {positions.map((pos, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3 border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Users size={14} className="text-gray-400" />
                    포지션 {idx + 1}
                  </span>
                  {positions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePosition(idx)}
                      className="text-red-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">역할</Label>
                    <Select
                      value={pos.role}
                      onValueChange={(v) => updatePosition(idx, 'role', v as ProjectRole)}
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((r) => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">모집 인원</Label>
                    <Input
                      type="number"
                      min={1}
                      max={10}
                      value={pos.count}
                      onChange={(e) => updatePosition(idx, 'count', Number(e.target.value))}
                      className="h-9 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">필요 기술 (쉼표로 구분)</Label>
                  <Input
                    placeholder="예: React, TypeScript, Node.js"
                    value={pos.skills}
                    onChange={(e) => updatePosition(idx, 'skills', e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">역할 설명</Label>
                  <Input
                    placeholder="이 포지션에서 주로 맡게 될 업무"
                    value={pos.description}
                    onChange={(e) => updatePosition(idx, 'description', e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
              </div>
            ))}
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
            className="flex-1 h-12 bg-purple-600 hover:bg-purple-700 font-semibold"
            disabled={isSubmitting}
          >
            프로젝트 등록
          </Button>
        </div>
      </form>
    </div>
  );
}
