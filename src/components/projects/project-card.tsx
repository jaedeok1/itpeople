import Link from 'next/link';
import { Calendar } from 'lucide-react';
import type { Project } from '@/types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ProjectCardProps {
  project: Project;
}

const statusConfig: Record<string, { color: string; bg: string; dot: string; pulse: boolean }> = {
  '모집중': { color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-900/30', dot: 'bg-emerald-500', pulse: true },
  '진행중': { color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-900/30', dot: 'bg-blue-500', pulse: false },
  '완료': { color: 'text-gray-500 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-700', dot: 'bg-gray-400', pulse: false },
};

const roleConfig: Record<string, { color: string; bg: string }> = {
  '개발자': { color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-100 dark:bg-blue-900/40' },
  '디자이너': { color: 'text-purple-700 dark:text-purple-300', bg: 'bg-purple-100 dark:bg-purple-900/40' },
  'PM': { color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-900/40' },
  '기획자': { color: 'text-orange-700 dark:text-orange-300', bg: 'bg-orange-100 dark:bg-orange-900/40' },
  '마케터': { color: 'text-pink-700 dark:text-pink-300', bg: 'bg-pink-100 dark:bg-pink-900/40' },
};

export function ProjectCard({ project }: ProjectCardProps) {
  const totalPositions = project.positions.reduce((acc, p) => acc + p.count, 0);
  const roles = [...new Set(project.positions.map((p) => p.role))];
  const statusCfg = statusConfig[project.status] ?? statusConfig['완료'];
  const confirmedCount = project.applicants.filter((a) => a.status === 'accepted').length;
  const progressPercent = totalPositions > 0 ? Math.min((confirmedCount / totalPositions) * 100, 100) : 0;
  const allSkills = [...new Set(project.positions.flatMap((p) => p.skills))].slice(0, 4);

  return (
    <Link href={`/projects/${project.id}`} className="group block h-full">
      <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/60 p-5 hover:border-purple-200 dark:hover:border-purple-700/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full flex flex-col">

        {/* 상단: 상태 + 리더 */}
        <div className="flex items-center justify-between mb-3">
          <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusCfg.bg} ${statusCfg.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot} ${statusCfg.pulse ? 'animate-pulse' : ''}`} />
            {project.status}
          </span>
          <span className="text-xs text-gray-400 truncate max-w-[90px]">{project.leaderName}</span>
        </div>

        {/* 제목 + 설명 */}
        <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-1.5 line-clamp-2 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* 역할 뱃지 */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {roles.map((role) => {
            const cfg = roleConfig[role] ?? { color: 'text-gray-600', bg: 'bg-gray-100' };
            return (
              <span
                key={role}
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}
              >
                {role}
              </span>
            );
          })}
        </div>

        {/* 모집 진행 바 */}
        {project.status !== '완료' && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
              <span>팀원 확정</span>
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {confirmedCount}/{totalPositions}명
                {project.applicants.length > 0 && (
                  <span className="text-purple-500 ml-1">· 지원 {project.applicants.length}명</span>
                )}
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* 하단: 날짜 + 스킬 */}
        <div className="pt-3.5 border-t border-gray-100 dark:border-gray-700/60">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2.5">
            <Calendar size={11} className="flex-shrink-0" />
            <span>
              {format(new Date(project.startDate), 'yy.MM.dd', { locale: ko })}
              {' – '}
              {format(new Date(project.endDate), 'yy.MM.dd', { locale: ko })}
            </span>
          </div>
          {allSkills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {allSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/60 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-600/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
