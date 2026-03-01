'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { mockMeetings, mockPosts, mockProjects, mockUsers } from '@/lib/mock-data';
import { Users, BookOpen, Rocket, Calendar, TrendingUp, Shield } from 'lucide-react';

type AdminTab = 'dashboard' | 'meetings' | 'posts' | 'projects' | 'members';

export default function AdminPage() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) return null;

  if (user.role !== 'admin') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <Shield size={48} className="text-gray-300 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">접근 권한이 없습니다</h1>
        <p className="text-gray-500">관리자 계정으로 로그인해주세요.</p>
      </div>
    );
  }

  const stats = [
    { label: '전체 회원', value: mockUsers.length, icon: Users, color: 'text-blue-500 bg-blue-50' },
    { label: '전체 모임', value: mockMeetings.length, icon: Calendar, color: 'text-green-500 bg-green-50' },
    { label: '전체 게시글', value: mockPosts.length, icon: BookOpen, color: 'text-purple-500 bg-purple-50' },
    { label: '전체 프로젝트', value: mockProjects.length, icon: Rocket, color: 'text-orange-500 bg-orange-50' },
  ];

  const tabs: { key: AdminTab; label: string }[] = [
    { key: 'dashboard', label: '대시보드' },
    { key: 'meetings', label: '모임 관리' },
    { key: 'posts', label: '게시글 관리' },
    { key: 'projects', label: '프로젝트 관리' },
    { key: 'members', label: '회원 관리' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-red-100 rounded-lg">
          <Shield size={20} className="text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">관리자</h1>
          <p className="text-sm text-gray-500">플랫폼 운영 현황을 관리합니다</p>
        </div>
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 mb-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-1">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === key
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
                <div className={`inline-flex p-2 rounded-lg ${color} mb-3`}>
                  <Icon size={18} />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp size={16} /> 최근 가입 회원
              </h3>
              <div className="space-y-3">
                {mockUsers.slice(0, 3).map((u) => (
                  <div key={u.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600">
                        {u.nickname[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{u.nickname}</p>
                        <p className="text-xs text-gray-400">{u.field}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                      {u.role === 'admin' ? '관리자' : '회원'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar size={16} /> 최근 모임
              </h3>
              <div className="space-y-3">
                {mockMeetings.slice(0, 3).map((m) => (
                  <div key={m.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1">{m.title}</p>
                      <p className="text-xs text-gray-400">{m.category} · {m.participants.length}/{m.maxParticipants}명</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${m.status === 'open' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {m.status === 'open' ? '모집중' : '완료'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meetings management */}
      {activeTab === 'meetings' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">제목</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">카테고리</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">유형</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">참여</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockMeetings.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{m.title}</td>
                  <td className="px-4 py-3 text-gray-500">{m.category}</td>
                  <td className="px-4 py-3 text-gray-500">{m.type === 'online' ? '온라인' : '오프라인'}</td>
                  <td className="px-4 py-3 text-gray-500">{m.participants.length}/{m.maxParticipants}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${m.status === 'open' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {m.status === 'open' ? '모집중' : '완료'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Posts management */}
      {activeTab === 'posts' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">제목</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">카테고리</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">작성자</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">조회</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">댓글</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockPosts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-xs truncate">{p.title}</td>
                  <td className="px-4 py-3 text-gray-500">{p.category}</td>
                  <td className="px-4 py-3 text-gray-500">{p.authorName}</td>
                  <td className="px-4 py-3 text-gray-500">{p.views}</td>
                  <td className="px-4 py-3 text-gray-500">{p.comments.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Projects management */}
      {activeTab === 'projects' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">제목</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">리더</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">상태</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">지원자</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockProjects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-xs truncate">{p.title}</td>
                  <td className="px-4 py-3 text-gray-500">{p.leaderName}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === '모집중' ? 'bg-green-100 text-green-600' : p.status === '진행중' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{p.applicants.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Members management */}
      {activeTab === 'members' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">이름</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">이메일</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">직군</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">권한</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">가입일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600">
                        {u.nickname[0]}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{u.nickname}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{u.email}</td>
                  <td className="px-4 py-3 text-gray-500">{u.field ?? '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                      {u.role === 'admin' ? '관리자' : '일반 회원'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
