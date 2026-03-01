'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PostCard } from '@/components/community/post-card';
import { mockPosts } from '@/lib/mock-data';
import { Search, Plus } from 'lucide-react';
import type { PostCategory } from '@/types';

const categories: PostCategory[] = ['기술공유', '커리어', '트렌드', '질문', '자유'];

export default function CommunityPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<PostCategory | 'all'>('all');
  const [sort, setSort] = useState<'latest' | 'popular'>('latest');

  const filtered = mockPosts
    .filter((p) => {
      if (p.isDraft) return false;
      if (search && !p.title.includes(search) && !p.content.includes(search)) return false;
      if (category !== 'all' && p.category !== category) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'popular') return b.views - a.views;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">지식 공유 커뮤니티</h1>
          <p className="text-gray-500 mt-1">IT 전문가들이 만드는 지식의 바다</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/community/create">
            <Plus size={16} className="mr-1" /> 글 쓰기
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 mb-6 space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="게시글 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex gap-1 flex-wrap">
            <button
              onClick={() => setCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                category === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              전체
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  category === c
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex gap-1">
            {(['latest', 'popular'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  sort === s
                    ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {s === 'latest' ? '최신순' : '인기순'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">총 {filtered.length}개의 게시글</p>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-2">검색 결과가 없습니다</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
