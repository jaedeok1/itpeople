import type { User, Meeting, Post, Project } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    kakaoId: '111111',
    nickname: '김민준',
    email: 'minjun@example.com',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=minjun',
    role: 'member',
    bio: '풀스택 개발자 3년차. React, Node.js, PostgreSQL을 주로 사용합니다.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    field: '개발자',
    createdAt: '2026-01-10T09:00:00Z',
  },
  {
    id: 'u2',
    kakaoId: '222222',
    nickname: '이서연',
    email: 'seoyeon@example.com',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=seoyeon',
    role: 'member',
    bio: 'UX/UI 디자이너. 사용자 중심 디자인을 추구합니다.',
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    field: '디자이너',
    createdAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'u3',
    kakaoId: '333333',
    nickname: '박준혁',
    email: 'junhyuk@example.com',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=junhyuk',
    role: 'member',
    bio: 'PM 5년차. B2B SaaS 서비스 기획 경험 다수.',
    skills: ['기획', 'Jira', 'SQL', '데이터분석'],
    field: 'PM',
    createdAt: '2026-01-20T09:00:00Z',
  },
  {
    id: 'u4',
    kakaoId: '444444',
    nickname: '최하은',
    email: 'haeun@example.com',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=haeun',
    role: 'admin',
    bio: '서비스 운영자',
    skills: [],
    field: '운영',
    createdAt: '2025-12-01T09:00:00Z',
  },
];

export const mockMeetings: Meeting[] = [
  {
    id: 'm1',
    title: 'React 최신 트렌드 스터디',
    description: 'React 19의 새로운 기능들을 함께 공부하고 실습해봅니다. Server Components, Actions, use() 훅 등을 다룰 예정입니다.',
    type: 'offline',
    category: '스터디',
    date: '2026-03-15T14:00:00Z',
    location: '서울 강남구 테헤란로 123, 스터디룸 3호',
    hasFee: true,
    fee: 5000,
    maxParticipants: 10,
    participants: ['u1', 'u2'],
    hostId: 'u1',
    hostName: '김민준',
    notices: [
      { id: 'n1', content: '노트북 꼭 지참해주세요!', createdAt: '2026-03-10T10:00:00Z' },
    ],
    createdAt: '2026-03-01T09:00:00Z',
    status: 'open',
  },
  {
    id: 'm2',
    title: 'IT 종사자 네트워킹 파티',
    description: '개발자, 디자이너, PM 등 다양한 IT 직군의 분들과 자유롭게 네트워킹하는 자리입니다. 음료 및 간식 제공!',
    type: 'offline',
    category: '네트워킹',
    date: '2026-03-20T18:00:00Z',
    location: '서울 마포구 홍대입구역 근처 카페',
    hasFee: true,
    fee: 10000,
    maxParticipants: 30,
    participants: ['u1', 'u2', 'u3'],
    hostId: 'u2',
    hostName: '이서연',
    notices: [],
    createdAt: '2026-03-02T09:00:00Z',
    status: 'open',
  },
  {
    id: 'm3',
    title: 'AI/ML 트렌드 세미나',
    description: '2026년 AI/ML 최신 트렌드와 실제 업무 적용 사례를 공유합니다. LLM, RAG, Fine-tuning 등을 다룹니다.',
    type: 'online',
    category: '세미나',
    date: '2026-03-25T19:00:00Z',
    onlineUrl: 'https://zoom.us/j/example',
    hasFee: false,
    maxParticipants: 100,
    participants: ['u1', 'u3'],
    hostId: 'u3',
    hostName: '박준혁',
    notices: [],
    createdAt: '2026-03-03T09:00:00Z',
    status: 'open',
  },
  {
    id: 'm4',
    title: '주말 해커톤: 사회문제 해결',
    description: '48시간 동안 사회문제를 기술로 해결하는 아이디어를 개발합니다. 팀 빌딩부터 발표까지!',
    type: 'offline',
    category: '해커톤',
    date: '2026-04-05T10:00:00Z',
    location: '서울 종로구 창업센터',
    hasFee: false,
    maxParticipants: 40,
    participants: ['u2'],
    hostId: 'u2',
    hostName: '이서연',
    notices: [],
    createdAt: '2026-03-05T09:00:00Z',
    status: 'open',
  },
  {
    id: 'm5',
    title: 'TypeScript 심화 스터디',
    description: 'TypeScript의 고급 타입 시스템(Generic, Conditional Types, Template Literal Types 등)을 심도 있게 학습합니다.',
    type: 'online',
    category: '스터디',
    date: '2026-03-18T20:00:00Z',
    onlineUrl: 'https://discord.gg/example',
    hasFee: false,
    maxParticipants: 15,
    participants: ['u1'],
    hostId: 'u1',
    hostName: '김민준',
    notices: [],
    createdAt: '2026-03-04T09:00:00Z',
    status: 'open',
  },
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    title: 'Next.js 15 App Router 실전 경험 공유',
    content: `Next.js 15가 출시된 지 몇 달이 지났는데, 실제로 프로덕션에 적용해보면서 느낀 점을 공유합니다.

## 좋았던 점

### 1. Turbopack 안정화
이전에는 실험적 기능이었던 Turbopack이 드디어 안정화되었습니다. 빌드 속도가 체감상 3배 이상 빨라진 것 같아요.

### 2. Server Actions
서버 액션을 사용하면 API Route를 따로 만들지 않아도 서버 로직을 직접 호출할 수 있어서 코드가 훨씬 간결해졌습니다.

## 아쉬웠던 점

캐싱 동작이 기존과 많이 달라져서 초반에 혼란스러웠습니다. fetch의 기본 캐싱 정책이 변경되어 마이그레이션 시 주의가 필요합니다.

전반적으로 만족스럽고, 새 프로젝트라면 Next.js 15 + App Router를 추천합니다!`,
    category: '기술공유',
    authorId: 'u1',
    authorName: '김민준',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=minjun',
    views: 342,
    likes: ['u2', 'u3'],
    comments: [
      {
        id: 'c1',
        content: '저도 최근에 마이그레이션했는데 캐싱 때문에 고생 많이 했어요 ㅠㅠ 공유 감사합니다!',
        authorId: 'u2',
        authorName: '이서연',
        createdAt: '2026-03-01T15:00:00Z',
      },
      {
        id: 'c2',
        content: 'Server Actions 사용 예시도 올려주실 수 있나요?',
        authorId: 'u3',
        authorName: '박준혁',
        createdAt: '2026-03-01T16:00:00Z',
      },
      {
        id: 'c3',
        content: '네! 다음 포스팅에서 다룰게요 :)',
        authorId: 'u1',
        authorName: '김민준',
        parentId: 'c2',
        createdAt: '2026-03-01T17:00:00Z',
      },
    ],
    createdAt: '2026-03-01T12:00:00Z',
    updatedAt: '2026-03-01T12:00:00Z',
    isDraft: false,
  },
  {
    id: 'p2',
    title: 'IT PM으로 3년, 배운 것들',
    content: `PM으로 3년을 보내면서 느낀 점과 배운 것들을 정리해봤습니다.

## 가장 중요한 것: 커뮤니케이션

기술보다 커뮤니케이션이 더 중요합니다. 개발자, 디자이너, 경영진 각각의 언어로 소통할 수 있어야 합니다.

## 데이터 기반 의사결정

느낌으로 결정하지 말고, 항상 데이터를 근거로 제시하세요. GA, Mixpanel, SQL 쿼리 등을 적극 활용하고 있습니다.

## 우선순위 설정

모든 기능을 다 만들 수 없습니다. RICE 스코어링이나 ICE 프레임워크를 활용해서 우선순위를 명확히 하세요.`,
    category: '커리어',
    authorId: 'u3',
    authorName: '박준혁',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=junhyuk',
    views: 521,
    likes: ['u1', 'u2'],
    comments: [
      {
        id: 'c4',
        content: '정말 공감되는 내용이에요. 특히 커뮤니케이션 부분!',
        authorId: 'u1',
        authorName: '김민준',
        createdAt: '2026-03-02T10:00:00Z',
      },
    ],
    createdAt: '2026-03-02T09:00:00Z',
    updatedAt: '2026-03-02T09:00:00Z',
    isDraft: false,
  },
  {
    id: 'p3',
    title: '2026년 UI/UX 디자인 트렌드 정리',
    content: `올해 주목해야 할 UI/UX 트렌드를 정리했습니다.

## 1. AI 네이티브 인터페이스
AI가 UX의 핵심 레이어로 자리잡고 있습니다. 자연어 검색, AI 추천 등이 기본이 되어가고 있어요.

## 2. 모션 디자인의 미니멀화
과도한 애니메이션보다 의미 있는 마이크로인터랙션이 트렌드입니다.

## 3. 접근성(Accessibility) 강조
WCAG 가이드라인 준수가 선택이 아닌 필수가 되어가고 있습니다.`,
    category: '트렌드',
    authorId: 'u2',
    authorName: '이서연',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=seoyeon',
    views: 289,
    likes: ['u1'],
    comments: [],
    createdAt: '2026-03-03T10:00:00Z',
    updatedAt: '2026-03-03T10:00:00Z',
    isDraft: false,
  },
  {
    id: 'p4',
    title: 'React Query v5로 마이그레이션하면서 겪은 것들',
    content: `TanStack Query v5로 마이그레이션하면서 변경된 점과 주의사항을 공유합니다.

## 주요 변경사항

1. \`useQuery\` 파라미터가 객체 형식으로 통일
2. \`isLoading\` → \`isPending\` 이름 변경
3. \`onSuccess/onError\` 콜백 제거 → useEffect로 대체

## 마이그레이션 팁

한 번에 다 바꾸려하지 말고, 파일 하나씩 점진적으로 바꾸는 게 좋습니다.`,
    category: '기술공유',
    authorId: 'u1',
    authorName: '김민준',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=minjun',
    views: 198,
    likes: ['u3'],
    comments: [],
    createdAt: '2026-03-04T11:00:00Z',
    updatedAt: '2026-03-04T11:00:00Z',
    isDraft: false,
  },
  {
    id: 'p5',
    title: '사이드 프로젝트 팀원 구하는 팁',
    content: `사이드 프로젝트를 여러 개 진행하면서 팀원 구하는 노하우를 정리했습니다.

## 프로젝트 설명을 명확하게

막연한 아이디어보다 구체적인 MVP 범위, 기술 스택, 기간을 미리 정해서 공유하면 지원율이 높아집니다.

## 역할과 기여도를 미리 정하기

나중에 갈등이 생기지 않도록 각자의 역할과 의사결정 방식을 초반에 합의하세요.

## 첫 미팅에서 케미 확인하기

스킬도 중요하지만 함께 일하는 방식이 맞는지 확인하는 게 더 중요합니다.`,
    category: '커리어',
    authorId: 'u3',
    authorName: '박준혁',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=junhyuk',
    views: 445,
    likes: ['u1', 'u2'],
    comments: [
      {
        id: 'c5',
        content: '정말 도움이 되는 글이에요! 역할 정하기 부분에서 많이 공감합니다.',
        authorId: 'u2',
        authorName: '이서연',
        createdAt: '2026-03-05T13:00:00Z',
      },
    ],
    createdAt: '2026-03-05T09:00:00Z',
    updatedAt: '2026-03-05T09:00:00Z',
    isDraft: false,
  },
];

export const mockProjects: Project[] = [
  {
    id: 'pr1',
    title: '개발자 포트폴리오 공유 플랫폼',
    description: '개발자들이 자신의 프로젝트와 기술 스택을 쉽게 공유하고, 피드백을 받을 수 있는 플랫폼입니다.',
    goal: '3개월 안에 MVP를 출시하고 100명의 초기 사용자 확보',
    startDate: '2026-04-01',
    endDate: '2026-06-30',
    status: '모집중',
    leaderId: 'u3',
    leaderName: '박준혁',
    positions: [
      {
        id: 'pos1',
        role: '개발자',
        count: 2,
        skills: ['React', 'TypeScript', 'Node.js'],
        description: 'Next.js 기반 프론트엔드 및 백엔드 개발',
      },
      {
        id: 'pos2',
        role: '디자이너',
        count: 1,
        skills: ['Figma', 'UI/UX'],
        description: '서비스 전반의 UI/UX 디자인',
      },
    ],
    applicants: [],
    members: ['u3'],
    createdAt: '2026-03-01T09:00:00Z',
  },
  {
    id: 'pr2',
    title: 'IT 스터디 매칭 앱',
    description: '관심사와 수준이 맞는 스터디원을 자동으로 매칭해주는 모바일 앱입니다.',
    goal: '6개월 안에 앱 출시 및 500명 사용자 달성',
    startDate: '2026-04-15',
    endDate: '2026-10-15',
    status: '모집중',
    leaderId: 'u1',
    leaderName: '김민준',
    positions: [
      {
        id: 'pos3',
        role: '개발자',
        count: 1,
        skills: ['React Native', 'Firebase'],
        description: '모바일 앱 개발 (iOS/Android)',
      },
      {
        id: 'pos4',
        role: 'PM',
        count: 1,
        skills: ['기획', '데이터분석'],
        description: '서비스 기획 및 매칭 알고리즘 설계',
      },
      {
        id: 'pos5',
        role: '디자이너',
        count: 1,
        skills: ['Figma', 'Mobile UI'],
        description: '모바일 앱 UI/UX 디자인',
      },
    ],
    applicants: [
      {
        id: 'app1',
        userId: 'u2',
        userName: '이서연',
        positionId: 'pos5',
        role: '디자이너',
        coverLetter: '모바일 앱 디자인 경험이 3년 있습니다. Figma로 여러 앱을 디자인했습니다.',
        status: 'pending',
        appliedAt: '2026-03-02T10:00:00Z',
      },
    ],
    members: ['u1'],
    createdAt: '2026-03-02T09:00:00Z',
  },
  {
    id: 'pr3',
    title: '로컬 맛집 큐레이션 서비스',
    description: '동네 숨은 맛집을 IT인들이 직접 발굴하고 공유하는 소셜 큐레이션 서비스입니다.',
    goal: '3개월 안에 웹 서비스 런칭',
    startDate: '2026-05-01',
    endDate: '2026-07-31',
    status: '모집중',
    leaderId: 'u2',
    leaderName: '이서연',
    positions: [
      {
        id: 'pos6',
        role: '개발자',
        count: 2,
        skills: ['Next.js', 'Supabase'],
        description: '풀스택 개발',
      },
      {
        id: 'pos7',
        role: '마케터',
        count: 1,
        skills: ['SNS 마케팅', '콘텐츠 제작'],
        description: '서비스 홍보 및 사용자 획득 전략',
      },
    ],
    applicants: [],
    members: ['u2'],
    createdAt: '2026-03-03T09:00:00Z',
  },
];
