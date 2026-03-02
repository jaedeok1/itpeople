import Link from 'next/link';
import { Users, MapPin, Wifi } from 'lucide-react';
import type { Meeting } from '@/types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface MeetingCardProps {
  meeting: Meeting;
}

const categoryConfig: Record<string, { color: string; bg: string }> = {
  '네트워킹': { color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-900/30' },
  '스터디': { color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
  '세미나': { color: 'text-purple-700 dark:text-purple-300', bg: 'bg-purple-50 dark:bg-purple-900/30' },
  '해커톤': { color: 'text-orange-700 dark:text-orange-300', bg: 'bg-orange-50 dark:bg-orange-900/30' },
  '기타': { color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-700' },
};

function getDDay(dateStr: string): { label: string; cls: string } {
  const meetingDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  meetingDate.setHours(0, 0, 0, 0);
  const diff = Math.round((meetingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { label: '종료', cls: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400' };
  if (diff === 0) return { label: 'D-Day', cls: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400' };
  if (diff <= 3) return { label: `D-${diff}`, cls: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' };
  return { label: `D-${diff}`, cls: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400' };
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  const isFull = meeting.participants.length >= meeting.maxParticipants;
  const remaining = meeting.maxParticipants - meeting.participants.length;
  const catConfig = categoryConfig[meeting.category] ?? categoryConfig['기타'];
  const dday = getDDay(meeting.date);
  const meetingDate = new Date(meeting.date);

  return (
    <Link href={`/meetings/${meeting.id}`} className="group block h-full">
      <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/60 p-5 hover:border-blue-200 dark:hover:border-blue-700/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full flex flex-col">

        {/* Top: 카테고리 + 온/오프라인 + D-day */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catConfig.bg} ${catConfig.color}`}>
              {meeting.category}
            </span>
            {meeting.type === 'online' ? (
              <span className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full font-medium">
                <Wifi size={10} /> 온라인
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full font-medium">
                <MapPin size={10} /> 오프라인
              </span>
            )}
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${
            isFull ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400' : dday.cls
          }`}>
            {isFull ? '마감' : dday.label}
          </span>
        </div>

        {/* 날짜 캘린더 위젯 + 제목 */}
        <div className="flex items-start gap-4 mb-4 flex-1">
          <div className="bg-gray-900 dark:bg-gray-100 rounded-xl px-3 py-2.5 text-center flex-shrink-0 min-w-[56px] shadow-sm">
            <div className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide leading-none mb-1">
              {format(meetingDate, 'MMM', { locale: ko })}
            </div>
            <div className="text-2xl font-bold text-white dark:text-gray-900 leading-none tabular-nums">
              {format(meetingDate, 'd')}
            </div>
            <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 leading-none">
              {format(meetingDate, 'E', { locale: ko })}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
              {meeting.title}
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
              {format(meetingDate, 'HH:mm')}
              {meeting.type === 'offline' && meeting.location && (
                <span> · {meeting.location.split(',')[0]}</span>
              )}
              <span> · {meeting.hasFee ? `${meeting.fee?.toLocaleString()}원` : '무료'}</span>
            </p>
          </div>
        </div>

        {/* 하단: 참여자 + 호스트 */}
        <div className="pt-3.5 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {Array.from({ length: Math.min(meeting.participants.length, 3) }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/60 dark:to-blue-800/60 border-2 border-white dark:border-gray-800 flex items-center justify-center text-[8px] font-bold text-blue-600 dark:text-blue-400"
                >
                  {i + 1}
                </div>
              ))}
              {meeting.participants.length === 0 && (
                <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <Users size={9} className="text-gray-400" />
                </div>
              )}
            </div>
            <span className={`text-xs font-medium ${
              isFull ? 'text-red-500' : remaining <= 3 && remaining > 0 ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {meeting.participants.length}/{meeting.maxParticipants}명
              {!isFull && remaining <= 3 && remaining > 0 && (
                <span className="ml-1">· {remaining}자리 남음</span>
              )}
            </span>
          </div>
          <span className="text-xs text-gray-400 truncate max-w-[80px]">{meeting.hostName}</span>
        </div>
      </div>
    </Link>
  );
}
