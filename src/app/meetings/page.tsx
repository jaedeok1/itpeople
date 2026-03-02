'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MeetingCard } from '@/components/meetings/meeting-card';
import { useDataStore } from '@/stores/data-store';
import { Search, Plus, SlidersHorizontal } from 'lucide-react';
import type { MeetingCategory, MeetingType } from '@/types';
import { useAuthStore } from '@/stores/auth-store';

const categories: MeetingCategory[] = ['네트워킹', '스터디', '세미나', '해커톤', '기타'];

export default function MeetingsPage() {
  const { meetings, initialize } = useDataStore();
  const { isLoggedIn } = useAuthStore();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<MeetingType | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<MeetingCategory | 'all'>('all');
  const [feeFilter, setFeeFilter] = useState<'all' | 'free' | 'paid'>('all');

  useEffect(() => {
    initialize();
  }, [initialize]);

  const filtered = meetings.filter((m) => {
    if (search && !m.title.toLowerCase().includes(search.toLowerCase()) && !m.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'all' && m.type !== typeFilter) return false;
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    if (feeFilter === 'free' && m.hasFee) return false;
    if (feeFilter === 'paid' && !m.hasFee) return false;
    return true;
  });

  const isFiltered =
    search || typeFilter !== 'all' || categoryFilter !== 'all' || feeFilter !== 'all';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">모임</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
            IT 전문가들과 함께하는 온/오프라인 모임
          </p>
        </div>
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm"
        >
          <Link href={isLoggedIn ? '/meetings/create' : '/login'}>
            <Plus size={15} className="mr-1.5" /> 모임 만들기
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/60 p-4 mb-6">
        {/* Search */}
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="모임 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 h-10"
          />
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mr-1">
            <SlidersHorizontal size={12} />
            <span>필터:</span>
          </div>

          {/* Type filter */}
          <div className="flex gap-1">
            {(['all', 'offline', 'online'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  typeFilter === t
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {t === 'all' ? '전체' : t === 'offline' ? '오프라인' : '온라인'}
              </button>
            ))}
          </div>

          <div className="w-px h-4 bg-gray-200 dark:bg-gray-600" />

          {/* Category filter */}
          <div className="flex gap-1 flex-wrap">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                categoryFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              전체
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  categoryFilter === c
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="w-px h-4 bg-gray-200 dark:bg-gray-600" />

          {/* Fee filter */}
          <div className="flex gap-1">
            {(['all', 'free', 'paid'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFeeFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  feeFilter === f
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {f === 'all' ? '전체' : f === 'free' ? '무료' : '유료'}
              </button>
            ))}
          </div>

          {isFiltered && (
            <button
              onClick={() => {
                setSearch('');
                setTypeFilter('all');
                setCategoryFilter('all');
                setFeeFilter('all');
              }}
              className="ml-auto text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              필터 초기화
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}개</span>의 모임
          {isFiltered && ' (필터 적용됨)'}
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <Search size={24} className="text-gray-400" />
          </div>
          <p className="font-medium text-gray-900 dark:text-white mb-1">검색 결과가 없습니다</p>
          <p className="text-sm text-gray-500">다른 검색어나 필터를 시도해보세요</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
    </div>
  );
}
