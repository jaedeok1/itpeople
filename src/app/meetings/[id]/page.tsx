'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useDataStore } from '@/stores/data-store';
import { useAuthStore } from '@/stores/auth-store';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  Calendar,
  MapPin,
  Wifi,
  DollarSign,
  Users,
  ChevronLeft,
  Megaphone,
  Settings,
  XCircle,
  Plus,
  Share2,
  Clock,
  User,
} from 'lucide-react';
import Link from 'next/link';

const categoryConfig: Record<string, { color: string; bg: string }> = {
  '네트워킹': { color: 'text-blue-700', bg: 'bg-blue-50' },
  '스터디': { color: 'text-emerald-700', bg: 'bg-emerald-50' },
  '세미나': { color: 'text-purple-700', bg: 'bg-purple-50' },
  '해커톤': { color: 'text-orange-700', bg: 'bg-orange-50' },
  '기타': { color: 'text-gray-700', bg: 'bg-gray-100' },
};

export default function MeetingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const { toast } = useToast();
  const { meetings, initialize, joinMeeting, leaveMeeting, updateMeeting, addNotice, deleteMeeting } =
    useDataStore();

  const [showNoticeInput, setShowNoticeInput] = useState(false);
  const [noticeContent, setNoticeContent] = useState('');
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const meeting = meetings.find((m) => m.id === id);

  if (!meeting) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
          <Users size={28} className="text-gray-400" />
        </div>
        <h2 className="font-bold text-gray-900 dark:text-white mb-2">모임을 찾을 수 없습니다</h2>
        <p className="text-gray-500 mb-6 text-sm">삭제되었거나 존재하지 않는 모임입니다.</p>
        <Button variant="outline" onClick={() => router.push('/meetings')}>
          목록으로 돌아가기
        </Button>
      </div>
    );
  }

  const isParticipant = user ? meeting.participants.includes(user.id) : false;
  const isFull = meeting.participants.length >= meeting.maxParticipants;
  const isHost = user?.id === meeting.hostId;
  const catConfig = categoryConfig[meeting.category] ?? categoryConfig['기타'];

  const handleJoin = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    joinMeeting(meeting.id, user!.id);
    toast({ description: '모임 참여 신청이 완료되었습니다! 🎉' });
  };

  const handleLeave = () => {
    leaveMeeting(meeting.id, user!.id);
    toast({ description: '모임 참여를 취소했습니다.' });
  };

  const handleAddNotice = () => {
    if (!noticeContent.trim()) return;
    addNotice(meeting.id, noticeContent.trim());
    setNoticeContent('');
    setShowNoticeInput(false);
    toast({ description: '공지사항이 등록되었습니다.' });
  };

  const handleClose = () => {
    updateMeeting(meeting.id, { status: 'closed' });
    setShowCloseConfirm(false);
    toast({ description: '모임이 마감되었습니다.' });
  };

  const handleDelete = () => {
    deleteMeeting(meeting.id);
    toast({ description: '모임이 삭제되었습니다.' });
    router.push('/meetings');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: meeting.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ description: '링크가 클립보드에 복사되었습니다.' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-6 transition-colors"
      >
        <ChevronLeft size={16} /> 모임 목록
      </button>

      <div className="space-y-4">
        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catConfig.bg} ${catConfig.color}`}>
                  {meeting.category}
                </span>
                {meeting.type === 'online' ? (
                  <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 px-2.5 py-1 rounded-full font-medium">
                    <Wifi size={11} /> 온라인
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full font-medium">
                    <MapPin size={11} /> 오프라인
                  </span>
                )}
                {meeting.status === 'closed' || isFull ? (
                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                    마감
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                    모집중
                  </span>
                )}
              </div>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0"
                title="링크 공유"
              >
                <Share2 size={16} />
              </button>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              {meeting.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <User size={14} />
              <span>주최 {meeting.hostName}</span>
              <span>·</span>
              <Clock size={14} />
              <span>
                {format(new Date(meeting.createdAt), 'M월 d일 등록', { locale: ko })}
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="p-6 grid sm:grid-cols-2 gap-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30">
                <Calendar className="text-blue-600 dark:text-blue-400" size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">일시</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {format(new Date(meeting.date), 'yyyy년 M월 d일 (E)', { locale: ko })}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(meeting.date), 'HH:mm', { locale: ko })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30">
                <Users className="text-blue-600 dark:text-blue-400" size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">참여 현황</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {meeting.participants.length}/{meeting.maxParticipants}명 참여
                </p>
                <div className="mt-1 w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isFull ? 'bg-red-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min((meeting.participants.length / meeting.maxParticipants) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {meeting.type === 'offline' && meeting.location && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30">
                  <MapPin className="text-blue-600 dark:text-blue-400" size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">장소</p>
                  <p className="text-sm text-gray-900 dark:text-white">{meeting.location}</p>
                </div>
              </div>
            )}

            {meeting.type === 'online' && meeting.onlineUrl && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30">
                  <Wifi className="text-blue-600 dark:text-blue-400" size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">온라인 링크</p>
                  {isParticipant || isHost ? (
                    <a
                      href={meeting.onlineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 hover:underline truncate block max-w-[200px]"
                    >
                      {meeting.onlineUrl}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-400 italic">참여 후 확인 가능</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30">
                <DollarSign className="text-blue-600 dark:text-blue-400" size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">참가비</p>
                <p className={`text-sm font-medium ${meeting.hasFee ? 'text-gray-900 dark:text-white' : 'text-emerald-600'}`}>
                  {meeting.hasFee ? `${meeting.fee?.toLocaleString()}원` : '무료'}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">모임 소개</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-[15px]">
              {meeting.description}
            </p>
          </div>

          {/* Notices */}
          {meeting.notices.length > 0 && (
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Megaphone size={14} /> 공지사항
              </h2>
              <div className="space-y-2">
                {meeting.notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/40 rounded-xl p-4"
                  >
                    <span className="text-amber-500 flex-shrink-0 mt-0.5">📌</span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 dark:text-gray-200">{notice.content}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {format(new Date(notice.createdAt), 'M월 d일', { locale: ko })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Host - Add notice */}
          {isHost && showNoticeInput && (
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">공지사항 추가</h3>
              <textarea
                value={noticeContent}
                onChange={(e) => setNoticeContent(e.target.value)}
                placeholder="공지 내용을 입력하세요..."
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <div className="flex gap-2 mt-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setShowNoticeInput(false); setNoticeContent(''); }}
                >
                  취소
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleAddNotice}
                >
                  등록
                </Button>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="p-6">
            {isHost ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <Settings size={14} />
                    내가 주최한 모임
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowNoticeInput(!showNoticeInput)}
                    className="flex-1"
                  >
                    <Plus size={14} className="mr-1.5" />
                    공지 추가
                  </Button>
                  {meeting.status === 'open' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCloseConfirm(true)}
                      className="flex-1 text-orange-500 border-orange-200 hover:bg-orange-50"
                    >
                      <XCircle size={14} className="mr-1.5" />
                      모임 마감
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDelete}
                    className="text-red-500 border-red-200 hover:bg-red-50 flex-shrink-0"
                  >
                    삭제
                  </Button>
                </div>
                {showCloseConfirm && (
                  <div className="p-3 border border-orange-200 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                    <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                      모임을 마감하면 더 이상 신청을 받지 않습니다. 계속하시겠어요?
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setShowCloseConfirm(false)}>
                        취소
                      </Button>
                      <Button size="sm" onClick={handleClose} className="bg-orange-500 hover:bg-orange-600 text-white">
                        마감하기
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : isParticipant ? (
              <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                    참여 신청 완료
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLeave}
                  className="text-red-500 border-red-200 hover:bg-red-50"
                >
                  참여 취소
                </Button>
              </div>
            ) : (
              <Button
                className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 shadow-sm"
                onClick={handleJoin}
                disabled={meeting.status === 'closed' || isFull}
              >
                {meeting.status === 'closed' || isFull
                  ? '마감된 모임입니다'
                  : isLoggedIn
                  ? '참여 신청하기'
                  : '로그인 후 신청하기'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
