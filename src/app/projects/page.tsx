'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProjectCard } from '@/components/projects/project-card';
import { mockProjects } from '@/lib/mock-data';
import { Search, Plus } from 'lucide-react';
import type { ProjectRole, ProjectStatus } from '@/types';

const roles: ProjectRole[] = ['개발자', '디자이너', 'PM', '기획자', '마케터'];

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [roleFilter, setRoleFilter] = useState<ProjectRole | 'all'>('all');

  const filtered = mockProjects.filter((p) => {
    if (search && !p.title.includes(search) && !p.description.includes(search)) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (roleFilter !== 'all' && !p.positions.some((pos) => pos.role === roleFilter)) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">사이드 프로젝트</h1>
          <p className="text-gray-500 mt-1">아이디어를 함께 현실로 만들어 가세요</p>
        </div>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/projects/create">
            <Plus size={16} className="mr-1" /> 프로젝트 등록
          </Link>
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 mb-6 space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="프로젝트 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1">
            {(['all', '모집중', '진행중', '완료'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === s
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {s === 'all' ? '전체' : s}
              </button>
            ))}
          </div>

          <div className="w-px bg-gray-200 dark:bg-gray-600" />

          <div className="flex gap-1 flex-wrap">
            <button
              onClick={() => setRoleFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                roleFilter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              전체 역할
            </button>
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  roleFilter === r
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">총 {filtered.length}개의 프로젝트</p>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-2">검색 결과가 없습니다</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
