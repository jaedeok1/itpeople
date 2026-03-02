import Link from 'next/link';
import { Users, Calendar, MapPin, Wifi, DollarSign, ArrowUpRight } from 'lucide-react';
import type { Meeting } from '@/types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface MeetingCardProps {
  meeting: Meeting;
}

const categoryConfig: Record<string, { color: string; bg: string }> = {
  '네트워킹': { color: 'text-blue-700', bg: 'bg-blue-50' },
  '스터디': { color: 'text-emerald-700', bg: 'bg-emerald-50' },
  '세미나': { color: 'text-purple-700', bg: 'bg-purple-50' },
  '해커톤': { color: 'text-orange-700', bg: 'bg-orange-50' },
  '기타': { color: 'text-gray-700', bg: 'bg-gray-100' },
};

export function MeetingCard({ meeting }: MeetingCardProps) {
  const participantRatio = meeting.participants.length / meeting.maxParticipants;
  const isFull = participantRatio >= 1;
  const catConfig = categoryConfig[meeting.category] ?? categoryConfig['기타'];
  const remaining = meeting.maxParticipants - meeting.participants.length;

  return (
    <Link href={`/meetings/${meeting.id}`} className="group block">
      <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/60 p-5 hover:border-blue-200 dark:hover:border-blue-700/50 hover:shadow-md transition-all duration-200 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catConfig.bg} ${catConfig.color}`}
            >
              {meeting.category}
            </span>
            {meeting.type === 'online' ? (
              <span className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full font-medium">
                <Wifi size={10} /> 온라인
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full font-medium">
                <MapPin size={10} /> 오프라인
              </span>
            )}
          </div>
          {isFull && (
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full flex-shrink-0">
              마감
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 flex-1 text-[15px] leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {meeting.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
          {meeting.description}
        </p>

        {/* Meta */}
        <div className="space-y-1.5 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-gray-400 flex-shrink-0" />
            <span className="text-xs">
              {format(new Date(meeting.date), 'M월 d일 (E) HH:mm', { locale: ko })}
            </span>
          </div>
          {meeting.type === 'offline' && meeting.location && (
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-gray-400 flex-shrink-0" />
              <span className="text-xs truncate">{meeting.location.split(',')[0]}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <DollarSign size={13} className="text-gray-400 flex-shrink-0" />
            <span className="text-xs">
              {meeting.hasFee ? `${meeting.fee?.toLocaleString()}원` : '무료'}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3.5 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1.5">
              {Array.from({ length: Math.min(meeting.participants.length, 3) }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 border border-white dark:border-gray-800 flex items-center justify-center text-[9px] font-bold text-blue-600 dark:text-blue-400"
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <span className={`text-xs font-medium ${isFull ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
              {meeting.participants.length}/{meeting.maxParticipants}명
              {!isFull && remaining <= 3 && (
                <span className="text-orange-500 ml-1">({remaining}자리 남음)</span>
              )}
            </span>
          </div>
          <span className="text-xs text-gray-400">{meeting.hostName}</span>
        </div>
      </div>
    </Link>
  );
}
