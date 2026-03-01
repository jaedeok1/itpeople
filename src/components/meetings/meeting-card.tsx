import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, MapPin, Wifi, DollarSign } from 'lucide-react';
import type { Meeting } from '@/types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface MeetingCardProps {
  meeting: Meeting;
}

const categoryColors: Record<string, string> = {
  '네트워킹': 'bg-blue-100 text-blue-700',
  '스터디': 'bg-green-100 text-green-700',
  '세미나': 'bg-purple-100 text-purple-700',
  '해커톤': 'bg-orange-100 text-orange-700',
  '기타': 'bg-gray-100 text-gray-700',
};

export function MeetingCard({ meeting }: MeetingCardProps) {
  const participantRatio = meeting.participants.length / meeting.maxParticipants;
  const isFull = participantRatio >= 1;

  return (
    <Link href={`/meetings/${meeting.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200 h-full flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[meeting.category] ?? categoryColors['기타']}`}>
            {meeting.category}
          </span>
          <div className="flex items-center gap-1.5">
            {meeting.type === 'online' ? (
              <span className="flex items-center gap-1 text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                <Wifi size={12} /> 온라인
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                <MapPin size={12} /> 오프라인
              </span>
            )}
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 flex-1">
          {meeting.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
          {meeting.description}
        </p>

        <div className="space-y-1.5 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{format(new Date(meeting.date), 'M월 d일 (E) HH:mm', { locale: ko })}</span>
          </div>
          {meeting.type === 'offline' && meeting.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span className="truncate">{meeting.location}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <DollarSign size={14} />
            <span>{meeting.hasFee ? `${meeting.fee?.toLocaleString()}원` : '무료'}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm">
            <Users size={14} className="text-gray-400" />
            <span className={isFull ? 'text-red-500 font-medium' : 'text-gray-500'}>
              {meeting.participants.length}/{meeting.maxParticipants}명
              {isFull && ' (마감)'}
            </span>
          </div>
          <span className="text-xs text-gray-400">{meeting.hostName}</span>
        </div>
      </div>
    </Link>
  );
}
