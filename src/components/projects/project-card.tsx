import Link from 'next/link';
import { Calendar, Users, ChevronRight } from 'lucide-react';
import type { Project } from '@/types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ProjectCardProps {
  project: Project;
}

const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  '모집중': { color: 'text-emerald-700', bg: 'bg-emerald-50', dot: 'bg-emerald-500' },
  '진행중': { color: 'text-blue-700', bg: 'bg-blue-50', dot: 'bg-blue-500' },
  '완료': { color: 'text-gray-600', bg: 'bg-gray-100', dot: 'bg-gray-400' },
};

const roleColors: Record<string, string> = {
  '개발자': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  '디자이너': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'PM': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  '기획자': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  '마케터': 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const totalPositions = project.positions.reduce((acc, p) => acc + p.count, 0);
  const roles = [...new Set(project.positions.map((p) => p.role))];
  const statusCfg = statusConfig[project.status];

  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/60 p-5 hover:border-purple-200 dark:hover:border-purple-700/50 hover:shadow-md transition-all duration-200 h-full flex flex-col">
        {/* Status */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusCfg.bg} ${statusCfg.color}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot} ${project.status === '모집중' ? 'animate-pulse' : ''}`} />
            {project.status}
          </span>
          <span className="text-xs text-gray-400">{project.leaderName}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-[15px] text-gray-900 dark:text-white mb-2 line-clamp-2 flex-1 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Roles */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {roles.map((role) => (
            <span
              key={role}
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleColors[role] ?? 'bg-gray-100 text-gray-600'}`}
            >
              {role}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="space-y-1.5 text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="flex-shrink-0" />
            <span>
              {format(new Date(project.startDate), 'yy.MM.dd', { locale: ko })} ~{' '}
              {format(new Date(project.endDate), 'yy.MM.dd', { locale: ko })}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={12} className="flex-shrink-0" />
            <span>
              {totalPositions}명 모집
              {project.applicants.length > 0 && (
                <span className="text-purple-500 ml-1">· 지원 {project.applicants.length}명</span>
              )}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3.5 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
          <div className="flex gap-1.5">
            {project.positions.slice(0, 3).map((pos, i) => (
              <div
                key={i}
                className="text-[10px] font-medium text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded"
              >
                {pos.skills[0]}
              </div>
            ))}
          </div>
          <ChevronRight
            size={14}
            className="text-gray-300 group-hover:text-purple-400 transition-colors"
          />
        </div>
      </div>
    </Link>
  );
}
