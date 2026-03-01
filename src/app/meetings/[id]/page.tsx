'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockMeetings } from '@/lib/mock-data';
import { useAuthStore } from '@/stores/auth-store';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, MapPin, Wifi, DollarSign, Users, ChevronLeft, Megaphone } from 'lucide-react';

export default function MeetingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const { toast } = useToast();
  const [meetings, setMeetings] = useState(mockMeetings);

  const meeting = meetings.find((m) => m.id === id);

  if (!meeting) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">모임을 찾을 수 없습니다.</p>
        <Button variant="outline" className="mt-4" onClick={() => router.back()}>돌아가기</Button>
      </div>
    );
  }

  const isParticipant = user ? meeting.participants.includes(user.id) : false;
  const isFull = meeting.participants.length >= meeting.maxParticipants;
  const isHost = user?.id === meeting.hostId;

  const handleJoin = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    if (isParticipant) return;

    setMeetings((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, participants: [...m.participants, user!.id] } : m
      )
    );
    toast({ description: '모임 참여 신청이 완료되었습니다!' });
  };

  const handleLeave = () => {
    setMeetings((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, participants: m.participants.filter((p) => p !== user!.id) } : m
      )
    );
    toast({ description: '모임 참여를 취소했습니다.' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ChevronLeft size={16} /> 목록으로
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
              {meeting.category}
            </span>
            {meeting.type === 'online' ? (
              <span className="flex items-center gap-1 text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                <Wifi size={12} /> 온라인
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                <MapPin size={12} /> 오프라인
              </span>
            )}
            {isFull && (
              <Badge variant="destructive" className="text-xs">마감</Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{meeting.title}</h1>
          <p className="text-sm text-gray-500">주최자: {meeting.hostName}</p>
        </div>

        {/* Info */}
        <div className="p-6 grid sm:grid-cols-2 gap-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="text-blue-500 flex-shrink-0" size={18} />
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">일시</p>
              <p className="text-gray-500">{format(new Date(meeting.date), 'yyyy년 M월 d일 (E) HH:mm', { locale: ko })}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Users className="text-blue-500 flex-shrink-0" size={18} />
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">참여자</p>
              <p className="text-gray-500">{meeting.participants.length}/{meeting.maxParticipants}명</p>
            </div>
          </div>
          {meeting.type === 'offline' && meeting.location && (
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="text-blue-500 flex-shrink-0" size={18} />
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">장소</p>
                <p className="text-gray-500">{meeting.location}</p>
              </div>
            </div>
          )}
          {meeting.type === 'online' && meeting.onlineUrl && (
            <div className="flex items-center gap-3 text-sm">
              <Wifi className="text-blue-500 flex-shrink-0" size={18} />
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">온라인 링크</p>
                <p className="text-blue-500 truncate">{meeting.onlineUrl}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3 text-sm">
            <DollarSign className="text-blue-500 flex-shrink-0" size={18} />
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">참가비</p>
              <p className="text-gray-500">{meeting.hasFee ? `${meeting.fee?.toLocaleString()}원` : '무료'}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-3">모임 소개</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">{meeting.description}</p>
        </div>

        {/* Notices */}
        {meeting.notices.length > 0 && (
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Megaphone size={16} /> 공지사항
            </h2>
            <div className="space-y-2">
              {meeting.notices.map((notice) => (
                <div key={notice.id} className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 text-sm">
                  <p className="text-gray-700 dark:text-gray-300">{notice.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {format(new Date(notice.createdAt), 'M월 d일', { locale: ko })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="p-6">
          {isHost ? (
            <div className="text-center text-sm text-gray-500 py-2">내가 주최한 모임입니다</div>
          ) : isParticipant ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-600 font-medium">✓ 참여 신청 완료</span>
              <Button variant="outline" size="sm" onClick={handleLeave}>참여 취소</Button>
            </div>
          ) : (
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleJoin}
              disabled={isFull}
            >
              {isFull ? '마감된 모임입니다' : isLoggedIn ? '참여 신청하기' : '로그인 후 신청하기'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
