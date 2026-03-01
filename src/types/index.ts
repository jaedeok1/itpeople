export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  kakaoId: string;
  nickname: string;
  email: string;
  profileImage?: string;
  role: UserRole;
  bio?: string;
  skills: string[];
  field?: string;
  createdAt: string;
}

export type MeetingType = 'online' | 'offline';
export type MeetingCategory = '네트워킹' | '스터디' | '세미나' | '해커톤' | '기타';

export interface Meeting {
  id: string;
  title: string;
  description: string;
  type: MeetingType;
  category: MeetingCategory;
  date: string;
  location?: string;
  onlineUrl?: string;
  hasFee: boolean;
  fee?: number;
  maxParticipants: number;
  participants: string[]; // user ids
  hostId: string;
  hostName: string;
  notices: Notice[];
  createdAt: string;
  status: 'open' | 'closed';
}

export interface Notice {
  id: string;
  content: string;
  createdAt: string;
}

export type PostCategory = '기술공유' | '커리어' | '트렌드' | '질문' | '자유';

export interface Post {
  id: string;
  title: string;
  content: string;
  category: PostCategory;
  authorId: string;
  authorName: string;
  authorImage?: string;
  views: number;
  likes: string[]; // user ids
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  isDraft: boolean;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  parentId?: string; // 답글인 경우
  createdAt: string;
}

export type ProjectRole = '개발자' | '디자이너' | 'PM' | '기획자' | '마케터';
export type ProjectStatus = '모집중' | '진행중' | '완료';

export interface ProjectPosition {
  id: string;
  role: ProjectRole;
  count: number;
  skills: string[];
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  goal: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  leaderId: string;
  leaderName: string;
  positions: ProjectPosition[];
  applicants: ProjectApplicant[];
  members: string[]; // user ids
  createdAt: string;
}

export interface ProjectApplicant {
  id: string;
  userId: string;
  userName: string;
  positionId: string;
  role: ProjectRole;
  coverLetter: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
}
