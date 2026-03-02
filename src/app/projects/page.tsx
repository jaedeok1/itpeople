'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProjectCard } from '@/components/projects/project-card';
import { useDataStore } from '@/stores/data-store';
import { useAuthStore } from '@/stores/auth-store';
import { Search, Plus, SlidersHorizontal } from 'lucide-react';
import type { ProjectRole, ProjectStatus } from '@/types';

const roles: ProjectRole[] = ['개발자', '디자이너', 'PM', '기획자', '마케터'];

const roleColors: Record<string, string> = {
  '개발자': 'bg-blue-50 text-blue-600',
  '디자이너': 'bg-purple-50 text-purple-600',
  'PM': 'bg-emerald-50 text-emerald-600',
  '기획자': 'bg-orange-50 text-orange-600',
  '마케터': 'bg-pink-50 text-pink-600',
};

export default function ProjectsPage() {
  const { projects, initialize } = useDataStore();
  const { isLoggedIn } = useAuthStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [roleFilter, setRoleFilter] = useState<ProjectRole | 'all'>('all');

  useEffect(() => {
    initialize();
  }, [initialize]);

  const filtered = projects.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (roleFilter !== 'all' && !p.positions.some((pos) => pos.role === roleFilter)) return false;
    return true;
  });

  const isFiltered = search || statusFilter !== 'all' || roleFilter !== 'all';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">사이드 프로젝트</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
            아이디어를 함께 현실로 만들어 가세요
          </p>
        </div>
        <Button
          asChild
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-sm"
        >
          <Link href={isLoggedIn ? '/projects/create' : '/login'}>
            <Plus size={15} className="mr-1.5" /> 프로젝트 등록
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/60 p-4 mb-6">
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="프로젝트 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 h-10"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mr-1">
            <SlidersHorizontal size={12} />
            <span>상태:</span>
          </div>
          {(['all', '모집중', '진행중', '완료'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === s
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {s === 'all' ? '전체' : s}
            </button>
          ))}

          <div className="w-px h-4 bg-gray-200 dark:bg-gray-600" />

          <span className="text-xs text-gray-400">역할:</span>
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              roleFilter === 'all'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            전체
          </button>
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                roleFilter === r
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {r}
            </button>
          ))}

          {isFiltered && (
            <button
              onClick={() => { setSearch(''); setStatusFilter('all'); setRoleFilter('all'); }}
              className="ml-auto text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              필터 초기화
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}개</span>의 프로젝트
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <Search size={24} className="text-gray-400" />
          </div>
          <p className="font-medium text-gray-900 dark:text-white mb-1">프로젝트가 없습니다</p>
          <p className="text-sm text-gray-500">새로운 프로젝트를 등록해보세요!</p>
          <Button asChild className="mt-4 bg-purple-600 hover:bg-purple-700">
            <Link href="/projects/create">프로젝트 등록</Link>
          </Button>
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
