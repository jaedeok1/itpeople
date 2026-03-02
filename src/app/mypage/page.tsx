'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/stores/auth-store';
import { useDataStore } from '@/stores/data-store';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  BookOpen,
  Rocket,
  Edit2,
  Check,
  X,
  ChevronRight,
  Calendar,
  MessageCircle,
  Eye,
  Heart,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const profileSchema = z.object({
  nickname: z.string().min(2, '닉네임은 2자 이상이어야 합니다').max(20),
  bio: z.string().max(200).optional(),
  field: z.string().max(30).optional(),
  skills: z.string().optional(),
});
type ProfileForm = z.infer<typeof profileSchema>;

export default function MyPage() {
  const router = useRouter();
  const { user, isLoggedIn, updateUser } = useAuthStore();
  const { meetings, posts, projects, initialize } = useDataStore();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'meetings' | 'projects' | 'posts'>('meetings');

  useEffect(() => {
    if (!isLoggedIn) router.push('/login');
    initialize();
  }, [isLoggedIn, router, initialize]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: user?.nickname ?? '',
      bio: user?.bio ?? '',
      field: user?.field ?? '',
      skills: user?.skills.join(', ') ?? '',
    },
  });

  if (!isLoggedIn || !user) return null;

  const myMeetings = meetings.filter(
    (m) => m.participants.includes(user.id) || m.hostId === user.id
  );
  const myProjects = projects.filter(
    (p) => p.members.includes(user.id) || p.leaderId === user.id
  );
  const myPosts = posts.filter((p) => p.authorId === user.id && !p.isDraft);

  const onSave = (data: ProfileForm) => {
    updateUser({
      nickname: data.nickname,
      bio: data.bio,
      field: data.field,
      skills: data.skills ? data.skills.split(',').map((s) => s.trim()).filter(Boolean) : [],
    });
    setIsEditing(false);
    toast({ description: '프로필이 저장되었습니다 ✅' });
  };

  const handleCancelEdit = () => {
    reset({
      nickname: user.nickname,
      bio: user.bio ?? '',
      field: user.field ?? '',
      skills: user.skills.join(', '),
    });
    setIsEditing(false);
  };

  const fieldColors: Record<string, string> = {
    '개발자': 'bg-blue-100 text-blue-700',
    '디자이너': 'bg-purple-100 text-purple-700',
    'PM': 'bg-emerald-100 text-emerald-700',
    '기획자': 'bg-orange-100 text-orange-700',
    '마케터': 'bg-pink-100 text-pink-700',
    '운영': 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">마이페이지</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* Profile header */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-3 ring-4 ring-white dark:ring-gray-700 shadow-sm">
                <AvatarImage src={user.profileImage} alt={user.nickname} />
                <AvatarFallback className="text-xl font-bold bg-blue-600 text-white">
                  {user.nickname[0]}
                </AvatarFallback>
              </Avatar>
              {!isEditing ? (
                <>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">{user.nickname}</h2>
                  {user.field && (
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full mt-1.5 ${
                        fieldColors[user.field] ?? 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {user.field}
                    </span>
                  )}
                  {user.bio && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
                      {user.bio}
                    </p>
                  )}
                  {user.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
                      {user.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-800 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 h-8"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 size={13} className="mr-1.5" /> 프로필 수정
                  </Button>
                </>
              ) : (
                <div className="w-full text-left mt-1">
                  <p className="text-xs font-semibold text-gray-500 mb-3 text-center">프로필 수정 중</p>
                </div>
              )}
            </div>

            {/* Edit form */}
            {isEditing && (
              <div className="p-5">
                <form onSubmit={handleSubmit(onSave)} className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">닉네임 *</Label>
                    <Input {...register('nickname')} className="h-9 text-sm" />
                    {errors.nickname && (
                      <p className="text-xs text-red-500">{errors.nickname.message}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">직군</Label>
                    <Input
                      placeholder="개발자, 디자이너, PM..."
                      {...register('field')}
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">자기소개</Label>
                    <Textarea
                      rows={3}
                      placeholder="간단한 자기소개를 입력해주세요"
                      {...register('bio')}
                      className="text-sm resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">기술 스택</Label>
                    <Input
                      placeholder="React, TypeScript, Figma..."
                      {...register('skills')}
                      className="h-9 text-sm"
                    />
                    <p className="text-xs text-gray-400">쉼표(,)로 구분하여 입력</p>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={handleCancelEdit}
                    >
                      <X size={13} className="mr-1" /> 취소
                    </Button>
                    <Button type="submit" size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Check size={13} className="mr-1" /> 저장
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Stats */}
            <div className="border-t border-gray-100 dark:border-gray-700 p-4 space-y-2">
              {[
                { label: '참여 모임', value: myMeetings.length, icon: Users, href: '/meetings' },
                { label: '참여 프로젝트', value: myProjects.length, icon: Rocket, href: '/projects' },
                { label: '작성 게시글', value: myPosts.length, icon: BookOpen, href: '/community' },
              ].map(({ label, value, icon: Icon, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                >
                  <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Icon size={14} />
                    {label}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-gray-900 dark:text-white">{value}</span>
                    <ChevronRight size={12} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Account info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">계정 정보</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">이메일</span>
                <span className="text-gray-900 dark:text-white text-xs">{user.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">권한</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    user.role === 'admin'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {user.role === 'admin' ? '관리자' : '일반 회원'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity tabs */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="flex border-b border-gray-100 dark:border-gray-700">
              {(
                [
                  { key: 'meetings', label: '모임', count: myMeetings.length },
                  { key: 'projects', label: '프로젝트', count: myProjects.length },
                  { key: 'posts', label: '게시글', count: myPosts.length },
                ] as const
              ).map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 py-3.5 text-sm font-semibold transition-all border-b-2 ${
                    activeTab === key
                      ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                      : 'text-gray-400 border-transparent hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  {label}
                  <span
                    className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                      activeTab === key
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-400 dark:bg-gray-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              ))}
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {activeTab === 'meetings' && (
                <>
                  {myMeetings.length === 0 ? (
                    <div className="text-center py-16">
                      <Calendar size={36} className="text-gray-200 dark:text-gray-700 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm">참여한 모임이 없습니다</p>
                      <Button asChild variant="outline" size="sm" className="mt-4">
                        <Link href="/meetings">모임 찾아보기</Link>
                      </Button>
                    </div>
                  ) : (
                    myMeetings.map((m) => (
                      <Link
                        key={m.id}
                        href={`/meetings/${m.id}`}
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group"
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                            m.hostId === user.id
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                          }`}
                        >
                          <Calendar size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                            {m.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {m.category} · {format(new Date(m.date), 'M월 d일', { locale: ko })}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${
                            m.hostId === user.id
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {m.hostId === user.id ? '주최' : '참여'}
                        </span>
                      </Link>
                    ))
                  )}
                </>
              )}

              {activeTab === 'projects' && (
                <>
                  {myProjects.length === 0 ? (
                    <div className="text-center py-16">
                      <Rocket size={36} className="text-gray-200 dark:text-gray-700 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm">참여한 프로젝트가 없습니다</p>
                      <Button asChild variant="outline" size="sm" className="mt-4">
                        <Link href="/projects">프로젝트 찾아보기</Link>
                      </Button>
                    </div>
                  ) : (
                    myProjects.map((p) => (
                      <Link
                        key={p.id}
                        href={`/projects/${p.id}`}
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group"
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            p.leaderId === user.id
                              ? 'bg-purple-100 text-purple-600'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                          }`}
                        >
                          <Rocket size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                            {p.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">{p.status}</p>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${
                            p.leaderId === user.id
                              ? 'bg-purple-100 text-purple-600'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {p.leaderId === user.id ? '리더' : '팀원'}
                        </span>
                      </Link>
                    ))
                  )}
                </>
              )}

              {activeTab === 'posts' && (
                <>
                  {myPosts.length === 0 ? (
                    <div className="text-center py-16">
                      <BookOpen size={36} className="text-gray-200 dark:text-gray-700 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm">작성한 게시글이 없습니다</p>
                      <Button asChild variant="outline" size="sm" className="mt-4">
                        <Link href="/community/create">글 작성하기</Link>
                      </Button>
                    </div>
                  ) : (
                    myPosts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/community/${p.id}`}
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                          <BookOpen size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                            {p.title}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                            <span className="flex items-center gap-1"><Eye size={10} />{p.views.toLocaleString()}</span>
                            <span className="flex items-center gap-1"><Heart size={10} />{p.likes.length}</span>
                            <span className="flex items-center gap-1"><MessageCircle size={10} />{p.comments.length}</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {format(new Date(p.createdAt), 'M.d', { locale: ko })}
                        </span>
                      </Link>
                    ))
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
