'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDataStore } from '@/stores/data-store';
import { useAuthStore } from '@/stores/auth-store';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  ChevronLeft,
  Calendar,
  Users,
  Target,
  Check,
  X,
  Clock,
  ChevronDown,
  ChevronUp,
  Share2,
  Trash2,
  User,
} from 'lucide-react';
import type { ProjectApplicant } from '@/types';

const applySchema = z.object({
  positionId: z.string().min(1, '지원할 포지션을 선택해주세요'),
  coverLetter: z.string().min(30, '자기소개는 30자 이상 작성해주세요'),
});
type ApplyForm = z.infer<typeof applySchema>;

const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  '모집중': { color: 'text-emerald-700', bg: 'bg-emerald-50', dot: 'bg-emerald-500' },
  '진행중': { color: 'text-blue-700', bg: 'bg-blue-50', dot: 'bg-blue-500' },
  '완료': { color: 'text-gray-600', bg: 'bg-gray-100', dot: 'bg-gray-400' },
};

const roleColors: Record<string, string> = {
  '개발자': 'bg-blue-100 text-blue-700',
  '디자이너': 'bg-purple-100 text-purple-700',
  'PM': 'bg-emerald-100 text-emerald-700',
  '기획자': 'bg-orange-100 text-orange-700',
  '마케터': 'bg-pink-100 text-pink-700',
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const { toast } = useToast();
  const {
    projects,
    initialize,
    applyToProject,
    updateApplicantStatus,
    updateProject,
    deleteProject,
  } = useDataStore();

  const [showApplyForm, setShowApplyForm] = useState(false);
  const [showApplicants, setShowApplicants] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const project = projects.find((p) => p.id === id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ApplyForm>({
    resolver: zodResolver(applySchema),
  });

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
          <Target size={28} className="text-gray-400" />
        </div>
        <h2 className="font-bold text-gray-900 dark:text-white mb-2">프로젝트를 찾을 수 없습니다</h2>
        <Button variant="outline" onClick={() => router.push('/projects')}>
          목록으로 돌아가기
        </Button>
      </div>
    );
  }

  const hasApplied = user ? project.applicants.some((a) => a.userId === user.id) : false;
  const isLeader = user?.id === project.leaderId;
  const statusCfg = statusConfig[project.status];
  const pendingApplicants = project.applicants.filter((a) => a.status === 'pending');

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

    applyToProject(project.id, applicant);
    setShowApplyForm(false);
    toast({ description: '지원서가 제출되었습니다! 리더의 검토를 기다려주세요 🎉' });
  };

  const handleApplicantDecision = (
    applicantId: string,
    decision: 'accepted' | 'rejected'
  ) => {
    updateApplicantStatus(project.id, applicantId, decision);
    toast({
      description:
        decision === 'accepted'
          ? '지원자를 수락했습니다. 팀원으로 추가됩니다! ✅'
          : '지원자를 거절했습니다.',
    });
  };

  const handleStatusChange = (status: '모집중' | '진행중' | '완료') => {
    updateProject(project.id, { status });
    toast({ description: `프로젝트 상태가 "${status}"로 변경되었습니다.` });
  };

  const handleDelete = () => {
    deleteProject(project.id);
    toast({ description: '프로젝트가 삭제되었습니다.' });
    router.push('/projects');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: project.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ description: '링크가 복사되었습니다.' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-6 transition-colors"
      >
        <ChevronLeft size={16} /> 프로젝트 목록
      </button>

      <div className="space-y-4">
        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-start justify-between gap-4 mb-4">
              <span
                className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusCfg.bg} ${statusCfg.color}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot} ${project.status === '모집중' ? 'animate-pulse' : ''}`}
                />
                {project.status}
              </span>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Share2 size={15} />
              </button>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              {project.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <User size={14} />
              <span>리더 {project.leaderName}</span>
              <span>·</span>
              <Clock size={14} />
              <span>{format(new Date(project.createdAt), 'M월 d일 등록', { locale: ko })}</span>
            </div>
          </div>

          {/* Meta Grid */}
          <div className="p-6 md:p-8 grid sm:grid-cols-2 gap-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-900/30">
                <Calendar className="text-purple-600 dark:text-purple-400" size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">기간</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {format(new Date(project.startDate), 'yyyy.MM.dd', { locale: ko })}
                </p>
                <p className="text-sm text-gray-500">
                  ~ {format(new Date(project.endDate), 'yyyy.MM.dd', { locale: ko })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-900/30">
                <Users className="text-purple-600 dark:text-purple-400" size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">현황</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  팀원 {project.members.length}명
                </p>
                <p className="text-sm text-gray-500">
                  지원 {project.applicants.length}명
                  {pendingApplicants.length > 0 && (
                    <span className="text-orange-500 ml-1">({pendingApplicants.length}명 검토 대기)</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">프로젝트 소개</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-[15px]">
              {project.description}
            </p>
          </div>

          {/* Goal */}
          <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Target size={12} /> 프로젝트 목표
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-[15px]">
              {project.goal}
            </p>
          </div>

          {/* Positions */}
          <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">모집 포지션</h2>
            <div className="space-y-3">
              {project.positions.map((pos) => (
                <div
                  key={pos.id}
                  className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/40 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${roleColors[pos.role] ?? 'bg-gray-100 text-gray-600'}`}
                    >
                      {pos.role}
                    </span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {pos.count}명 모집
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{pos.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {pos.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-white dark:bg-gray-700 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-700 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leader: Applicant management */}
          {isLeader && project.applicants.length > 0 && (
            <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setShowApplicants(!showApplicants)}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Users size={12} /> 지원자 관리
                  {pendingApplicants.length > 0 && (
                    <span className="text-xs font-bold text-orange-500 normal-case bg-orange-50 px-1.5 py-0.5 rounded-full">
                      {pendingApplicants.length}명 대기
                    </span>
                  )}
                </h2>
                {showApplicants ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </button>

              {showApplicants && (
                <div className="mt-4 space-y-3">
                  {project.applicants.map((applicant) => (
                    <div
                      key={applicant.id}
                      className={`rounded-xl border p-4 ${
                        applicant.status === 'pending'
                          ? 'border-orange-200 bg-orange-50/50 dark:border-orange-800/40 dark:bg-orange-900/10'
                          : applicant.status === 'accepted'
                          ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800/40 dark:bg-emerald-900/10'
                          : 'border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-semibold text-sm text-gray-900 dark:text-white">
                              {applicant.userName}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                roleColors[applicant.role] ?? 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {applicant.role}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                applicant.status === 'pending'
                                  ? 'bg-orange-100 text-orange-600'
                                  : applicant.status === 'accepted'
                                  ? 'bg-emerald-100 text-emerald-600'
                                  : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {applicant.status === 'pending'
                                ? '대기중'
                                : applicant.status === 'accepted'
                                ? '수락됨'
                                : '거절됨'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400">
                            {format(new Date(applicant.appliedAt), 'M월 d일 지원', { locale: ko })}
                          </p>
                        </div>
                        {applicant.status === 'pending' && (
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleApplicantDecision(applicant.id, 'accepted')}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                            >
                              <Check size={12} /> 수락
                            </button>
                            <button
                              onClick={() => handleApplicantDecision(applicant.id, 'rejected')}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                            >
                              <X size={12} /> 거절
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="bg-white dark:bg-gray-700/50 rounded-lg p-3 mt-2">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">자기소개</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {applicant.coverLetter}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="p-6 md:p-8">
            {isLeader ? (
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-between">
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    내가 리더인 프로젝트
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {(['모집중', '진행중', '완료'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border-2 transition-all ${
                        project.status === s
                          ? 'border-purple-600 bg-purple-600 text-white'
                          : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-purple-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                  <button
                    onClick={handleDelete}
                    className="px-3 py-2 rounded-lg text-xs font-medium text-red-500 border-2 border-red-200 hover:bg-red-50 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 size={12} /> 삭제
                  </button>
                </div>
              </div>
            ) : hasApplied ? (
              <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                    지원 완료 · 결과를 기다려주세요
                  </span>
                </div>
              </div>
            ) : (
              <Button
                className="w-full h-12 text-base font-semibold bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  if (!isLoggedIn) { router.push('/login'); return; }
                  setShowApplyForm(true);
                }}
                disabled={project.status !== '모집중'}
              >
                {project.status !== '모집중'
                  ? '모집이 마감되었습니다'
                  : isLoggedIn
                  ? '지원하기'
                  : '로그인 후 지원하기'}
              </Button>
            )}
          </div>
        </div>

        {/* Apply form */}
        {showApplyForm && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 md:p-8">
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">지원서 작성</h2>
            <p className="text-sm text-gray-500 mb-6">
              {project.title}에 지원합니다
            </p>
            <form onSubmit={handleSubmit(onApply)} className="space-y-5">
              <div className="space-y-2">
                <Label>지원 포지션 *</Label>
                <Select onValueChange={(v) => setValue('positionId', v)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="포지션을 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {project.positions.map((pos) => (
                      <SelectItem key={pos.id} value={pos.id}>
                        {pos.role} ({pos.count}명 모집)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.positionId && (
                  <p className="text-xs text-red-500">{errors.positionId.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter">자기소개 / 지원 동기 *</Label>
                <Textarea
                  id="coverLetter"
                  rows={8}
                  placeholder="본인의 관련 경험과 이 프로젝트에 지원하는 이유를 구체적으로 작성해주세요 (최소 30자)"
                  className="resize-none text-sm leading-relaxed"
                  {...register('coverLetter')}
                />
                {errors.coverLetter && (
                  <p className="text-xs text-red-500">{errors.coverLetter.message}</p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-12"
                  onClick={() => setShowApplyForm(false)}
                >
                  취소
                </Button>
                <Button type="submit" className="flex-1 h-12 bg-purple-600 hover:bg-purple-700 font-semibold">
                  지원서 제출
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
