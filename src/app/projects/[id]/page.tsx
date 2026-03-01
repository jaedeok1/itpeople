'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockProjects } from '@/lib/mock-data';
import { useAuthStore } from '@/stores/auth-store';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, Calendar, Users, Target } from 'lucide-react';
import type { ProjectApplicant } from '@/types';

const applySchema = z.object({
  positionId: z.string().min(1, '지원할 포지션을 선택해주세요'),
  coverLetter: z.string().min(30, '자기소개는 30자 이상 작성해주세요'),
});
type ApplyForm = z.infer<typeof applySchema>;

const statusColors: Record<string, string> = {
  '모집중': 'bg-green-100 text-green-700',
  '진행중': 'bg-blue-100 text-blue-700',
  '완료': 'bg-gray-100 text-gray-600',
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const { toast } = useToast();
  const [projects, setProjects] = useState(mockProjects);
  const [showApplyForm, setShowApplyForm] = useState(false);

  const project = projects.find((p) => p.id === id);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ApplyForm>({
    resolver: zodResolver(applySchema),
  });

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">프로젝트를 찾을 수 없습니다.</p>
        <Button variant="outline" className="mt-4" onClick={() => router.back()}>돌아가기</Button>
      </div>
    );
  }

  const hasApplied = user ? project.applicants.some((a) => a.userId === user.id) : false;
  const isLeader = user?.id === project.leaderId;

  const onApply = (data: ApplyForm) => {
    if (!user) return;
    const position = project.positions.find((p) => p.id === data.positionId);
    if (!position) return;

    const applicant: ProjectApplicant = {
      id: `app_${Date.now()}`,
      userId: user.id,
      userName: user.nickname,
      positionId: data.positionId,
      role: position.role,
      coverLetter: data.coverLetter,
      status: 'pending',
      appliedAt: new Date().toISOString(),
    };

    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, applicants: [...p.applicants, applicant] } : p
      )
    );
    setShowApplyForm(false);
    toast({ description: '지원서가 제출되었습니다!' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ChevronLeft size={16} /> 목록으로
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[project.status]}`}>
              {project.status}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h1>
          <p className="text-sm text-gray-500">리더: {project.leaderName}</p>
        </div>

        <div className="p-6 grid sm:grid-cols-2 gap-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="text-purple-500 flex-shrink-0" size={18} />
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">기간</p>
              <p className="text-gray-500">
                {format(new Date(project.startDate), 'yyyy.MM.dd', { locale: ko })} ~{' '}
                {format(new Date(project.endDate), 'yyyy.MM.dd', { locale: ko })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Users className="text-purple-500 flex-shrink-0" size={18} />
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">지원자</p>
              <p className="text-gray-500">{project.applicants.length}명 지원</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-3">프로젝트 소개</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.description}</p>
        </div>

        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Target size={16} /> 프로젝트 목표
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.goal}</p>
        </div>

        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">모집 포지션</h2>
          <div className="space-y-3">
            {project.positions.map((pos) => (
              <div key={pos.id} className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-purple-700 dark:text-purple-300">{pos.role}</span>
                  <span className="text-sm text-gray-500">{pos.count}명</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{pos.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {pos.skills.map((skill) => (
                    <span key={skill} className="text-xs bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {isLeader ? (
            <div className="text-center text-sm text-gray-500 py-2">내가 리더인 프로젝트입니다</div>
          ) : hasApplied ? (
            <div className="text-center text-sm text-green-600 font-medium py-2">✓ 지원 완료</div>
          ) : (
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => {
                if (!isLoggedIn) { router.push('/login'); return; }
                setShowApplyForm(true);
              }}
              disabled={project.status !== '모집중'}
            >
              {project.status !== '모집중' ? '모집이 완료되었습니다' : isLoggedIn ? '지원하기' : '로그인 후 지원하기'}
            </Button>
          )}
        </div>
      </div>

      {/* Apply form */}
      {showApplyForm && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-5">지원서 작성</h2>
          <form onSubmit={handleSubmit(onApply)} className="space-y-4">
            <div className="space-y-2">
              <Label>지원 포지션 *</Label>
              <Select onValueChange={(v) => setValue('positionId', v)}>
                <SelectTrigger><SelectValue placeholder="포지션 선택" /></SelectTrigger>
                <SelectContent>
                  {project.positions.map((pos) => (
                    <SelectItem key={pos.id} value={pos.id}>
                      {pos.role} ({pos.count}명)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.positionId && <p className="text-xs text-red-500">{errors.positionId.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetter">자기소개 / 지원 동기 *</Label>
              <Textarea
                id="coverLetter"
                rows={6}
                placeholder="본인의 경험과 해당 프로젝트에 지원하는 이유를 작성해주세요"
                {...register('coverLetter')}
              />
              {errors.coverLetter && <p className="text-xs text-red-500">{errors.coverLetter.message}</p>}
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setShowApplyForm(false)}>
                취소
              </Button>
              <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                지원서 제출
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
