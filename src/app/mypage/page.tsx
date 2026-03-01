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
import { mockMeetings, mockProjects, mockPosts } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { Users, BookOpen, Rocket, Edit2, Check } from 'lucide-react';

const profileSchema = z.object({
  nickname: z.string().min(2, '닉네임은 2자 이상이어야 합니다'),
  bio: z.string().optional(),
  field: z.string().optional(),
  skills: z.string().optional(),
});
type ProfileForm = z.infer<typeof profileSchema>;

export default function MyPage() {
  const router = useRouter();
  const { user, isLoggedIn, updateUser } = useAuthStore();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'meetings' | 'projects' | 'posts'>('meetings');

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: user?.nickname ?? '',
      bio: user?.bio ?? '',
      field: user?.field ?? '',
      skills: user?.skills.join(', ') ?? '',
    },
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) return null;

  const myMeetings = mockMeetings.filter((m) => m.participants.includes(user.id) || m.hostId === user.id);
  const myProjects = mockProjects.filter((p) => p.members.includes(user.id) || p.leaderId === user.id);
  const myPosts = mockPosts.filter((p) => p.authorId === user.id);

  const onSave = (data: ProfileForm) => {
    updateUser({
      nickname: data.nickname,
      bio: data.bio,
      field: data.field,
      skills: data.skills ? data.skills.split(',').map((s) => s.trim()).filter(Boolean) : [],
    });
    setIsEditing(false);
    toast({ description: '프로필이 저장되었습니다.' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">마이페이지</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-20 w-20 mb-3">
                <AvatarImage src={user.profileImage} alt={user.nickname} />
                <AvatarFallback className="text-xl bg-blue-100 text-blue-600">{user.nickname[0]}</AvatarFallback>
              </Avatar>
              {!isEditing ? (
                <>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">{user.nickname}</h2>
                  {user.field && <p className="text-sm text-blue-600 mt-0.5">{user.field}</p>}
                  {user.bio && <p className="text-sm text-gray-500 mt-2 leading-relaxed">{user.bio}</p>}
                  {user.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
                      {user.skills.map((skill) => (
                        <span key={skill} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  <Button variant="outline" size="sm" className="mt-4" onClick={() => setIsEditing(true)}>
                    <Edit2 size={14} className="mr-1" /> 프로필 수정
                  </Button>
                </>
              ) : (
                <form onSubmit={handleSubmit(onSave)} className="w-full space-y-3 text-left">
                  <div className="space-y-1">
                    <Label className="text-xs">닉네임</Label>
                    <Input {...register('nickname')} className="text-sm" />
                    {errors.nickname && <p className="text-xs text-red-500">{errors.nickname.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">직군</Label>
                    <Input placeholder="개발자, 디자이너, PM..." {...register('field')} className="text-sm" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">소개</Label>
                    <Textarea rows={3} placeholder="자기소개" {...register('bio')} className="text-sm" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">기술 스택 (쉼표 구분)</Label>
                    <Input placeholder="React, TypeScript..." {...register('skills')} className="text-sm" />
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm" className="flex-1" onClick={() => setIsEditing(false)}>
                      취소
                    </Button>
                    <Button type="submit" size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Check size={14} className="mr-1" /> 저장
                    </Button>
                  </div>
                </form>
              )}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-2">
              {[
                { label: '참여 모임', value: myMeetings.length, icon: Users },
                { label: '참여 프로젝트', value: myProjects.length, icon: Rocket },
                { label: '작성 게시글', value: myPosts.length, icon: BookOpen },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-500">
                    <Icon size={14} /> {label}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity tabs */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="flex border-b border-gray-100 dark:border-gray-700">
              {(['meetings', 'projects', 'posts'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'meetings' ? `모임 (${myMeetings.length})` : tab === 'projects' ? `프로젝트 (${myProjects.length})` : `게시글 (${myPosts.length})`}
                </button>
              ))}
            </div>

            <div className="p-4">
              {activeTab === 'meetings' && (
                <div className="space-y-3">
                  {myMeetings.length === 0 ? (
                    <p className="text-center text-gray-400 py-8">참여한 모임이 없습니다</p>
                  ) : (
                    myMeetings.map((m) => (
                      <a key={m.id} href={`/meetings/${m.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">{m.title}</p>
                          <p className="text-xs text-gray-400">{m.category} · {m.type === 'online' ? '온라인' : '오프라인'}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${m.hostId === user.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                          {m.hostId === user.id ? '주최' : '참여'}
                        </span>
                      </a>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="space-y-3">
                  {myProjects.length === 0 ? (
                    <p className="text-center text-gray-400 py-8">참여한 프로젝트가 없습니다</p>
                  ) : (
                    myProjects.map((p) => (
                      <a key={p.id} href={`/projects/${p.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">{p.title}</p>
                          <p className="text-xs text-gray-400">{p.status}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${p.leaderId === user.id ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                          {p.leaderId === user.id ? '리더' : '참여'}
                        </span>
                      </a>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'posts' && (
                <div className="space-y-3">
                  {myPosts.length === 0 ? (
                    <p className="text-center text-gray-400 py-8">작성한 게시글이 없습니다</p>
                  ) : (
                    myPosts.map((p) => (
                      <a key={p.id} href={`/community/${p.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div>
                          <p className="font-medium text-sm text-gray-900 dark:text-white line-clamp-1">{p.title}</p>
                          <p className="text-xs text-gray-400">{p.category} · 조회 {p.views} · 댓글 {p.comments.length}</p>
                        </div>
                      </a>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
