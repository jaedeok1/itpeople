'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MeetingCard } from '@/components/meetings/meeting-card';
import { mockMeetings } from '@/lib/mock-data';
import { Search, Plus } from 'lucide-react';
import type { MeetingCategory, MeetingType } from '@/types';

const categories: MeetingCategory[] = ['네트워킹', '스터디', '세미나', '해커톤', '기타'];

export default function MeetingsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<MeetingType | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<MeetingCategory | 'all'>('all');
  const [feeFilter, setFeeFilter] = useState<'all' | 'free' | 'paid'>('all');

  const filtered = mockMeetings.filter((m) => {
    if (search && !m.title.includes(search) && !m.description.includes(search)) return false;
    if (typeFilter !== 'all' && m.type !== typeFilter) return false;
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    if (feeFilter === 'free' && m.hasFee) return false;
    if (feeFilter === 'paid' && !m.hasFee) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">모임</h1>
          <p className="text-gray-500 mt-1">IT 전문가들과 함께하는 온/오프라인 모임</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/meetings/create">
            <Plus size={16} className="mr-1" /> 모임 만들기
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 mb-6 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="모임 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap gap-2">
          {/* Type filter */}
          <div className="flex gap-1">
            {(['all', 'offline', 'online'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  typeFilter === t
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {t === 'all' ? '전체' : t === 'offline' ? '오프라인' : '온라인'}
              </button>
            ))}
          </div>

          <div className="w-px bg-gray-200 dark:bg-gray-600" />

          {/* Category filter */}
          <div className="flex gap-1 flex-wrap">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              전체
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  categoryFilter === c
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="w-px bg-gray-200 dark:bg-gray-600" />

          {/* Fee filter */}
          <div className="flex gap-1">
            {(['all', 'free', 'paid'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFeeFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  feeFilter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {f === 'all' ? '전체' : f === 'free' ? '무료' : '유료'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <p className="text-sm text-gray-500 mb-4">총 {filtered.length}개의 모임</p>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-2">검색 결과가 없습니다</p>
          <p className="text-sm">다른 검색어나 필터를 시도해보세요</p>
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
