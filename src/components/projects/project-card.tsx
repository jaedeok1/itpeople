import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users } from 'lucide-react';
import type { Project } from '@/types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ProjectCardProps {
  project: Project;
}

const statusColors: Record<string, string> = {
  '모집중': 'bg-green-100 text-green-700',
  '진행중': 'bg-blue-100 text-blue-700',
  '완료': 'bg-gray-100 text-gray-600',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const totalPositions = project.positions.reduce((acc, p) => acc + p.count, 0);
  const roles = [...new Set(project.positions.map((p) => p.role))];

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-200 h-full flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[project.status]}`}>
            {project.status}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{project.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {roles.map((role) => (
            <span key={role} className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
              {role}
            </span>
          ))}
        </div>

        <div className="space-y-1.5 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{format(new Date(project.startDate), 'yyyy.MM.dd', { locale: ko })} ~ {format(new Date(project.endDate), 'yyyy.MM.dd', { locale: ko })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={14} />
            <span>모집 {totalPositions}명</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <span className="text-xs text-gray-400">{project.leaderName}</span>
          <span className="text-xs text-gray-400">지원 {project.applicants.length}명</span>
        </div>
      </div>
    </Link>
  );
}
