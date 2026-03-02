'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PostCard } from '@/components/community/post-card';
import { useDataStore } from '@/stores/data-store';
import { useAuthStore } from '@/stores/auth-store';
import { Search, Plus, Flame, Clock, SlidersHorizontal } from 'lucide-react';
import type { PostCategory } from '@/types';

const categories: PostCategory[] = ['기술공유', '커리어', '트렌드', '질문', '자유'];

const categoryConfig: Record<string, { emoji: string }> = {
  '기술공유': { emoji: '💻' },
  '커리어': { emoji: '🚀' },
  '트렌드': { emoji: '📈' },
  '질문': { emoji: '❓' },
  '자유': { emoji: '💬' },
};

export default function CommunityPage() {
  const { posts, initialize } = useDataStore();
  const { isLoggedIn } = useAuthStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<PostCategory | 'all'>('all');
  const [sort, setSort] = useState<'latest' | 'popular'>('latest');

  useEffect(() => {
    initialize();
  }, [initialize]);

  const filtered = posts
    .filter((p) => {
      if (p.isDraft) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.content.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== 'all' && p.category !== category) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'popular') return b.views - a.views;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  // Top 3 popular posts for the hot section
  const hotPosts = [...posts]
    .filter((p) => !p.isDraft)
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">커뮤니티</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
            IT 전문가들이 만드는 지식의 바다
          </p>
        </div>
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm"
        >
          <Link href={isLoggedIn ? '/community/create' : '/login'}>
            <Plus size={15} className="mr-1.5" /> 글 쓰기
          </Link>
        </Button>
      </div>

      {/* 인기 게시글 */}
      {sort === 'latest' && !search && category === 'all' && (
        <div className="mb-8 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/20 rounded-2xl border border-orange-100 dark:border-orange-900/40 p-5">
          <h2 className="text-sm font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2 mb-3">
            <Flame size={15} className="fill-orange-500 text-orange-500" />
            이번 주 인기글
          </h2>
          <div className="space-y-2">
            {hotPosts.map((post, i) => (
              <Link
                key={post.id}
                href={`/community/${post.id}`}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
              >
                <span className={`text-xl font-black tabular-nums w-6 text-center ${
                  i === 0 ? 'text-orange-500' : i === 1 ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {post.authorName} · 조회 {post.views.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/60 p-4 mb-5">
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="게시글 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 h-10"
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex gap-1 flex-wrap">
            <button
              onClick={() => setCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                category === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              전체
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  category === c
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {categoryConfig[c]?.emoji} {c}
              </button>
            ))}
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => setSort('latest')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                sort === 'latest'
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Clock size={11} /> 최신순
            </button>
            <button
              onClick={() => setSort('popular')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                sort === 'popular'
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Flame size={11} /> 인기순
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}개</span>의 게시글
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <Search size={24} className="text-gray-400" />
          </div>
          <p className="font-medium text-gray-900 dark:text-white mb-1">게시글이 없습니다</p>
          <p className="text-sm text-gray-500">첫 번째 게시글을 작성해보세요</p>
          <Button asChild className="mt-4 bg-blue-600 hover:bg-blue-700">
            <Link href="/community/create">글 쓰기</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
