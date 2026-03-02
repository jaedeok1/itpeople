import type { User, Meeting, Post, Project } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    kakaoId: '111111',
    nickname: '김민준',
    email: 'minjun@example.com',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=minjun',
    role: 'member',
    bio: '풀스택 개발자 5년차. React, Node.js, PostgreSQL을 주로 사용하며, 오픈소스 기여를 즐깁니다.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Next.js'],
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
    bio: 'UX/UI 디자이너 4년차. 사용자 중심 디자인과 모션 디자인을 추구합니다. Figma 전문가.',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Motion Design'],
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
    bio: 'PM 6년차. B2B SaaS 서비스 기획 경험 다수. 데이터 기반 의사결정을 중요하게 생각합니다.',
    skills: ['기획', 'Jira', 'SQL', '데이터분석', 'Notion', 'A/B 테스트'],
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
    bio: '서비스 운영자. IT인들의 놀이터를 만들어가는 사람입니다.',
    skills: ['운영', '커뮤니티 관리'],
    field: '운영',
    createdAt: '2025-12-01T09:00:00Z',
  },
  {
    id: 'u5',
    kakaoId: '555555',
    nickname: '정다은',
    email: 'daeun@example.com',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=daeun',
    role: 'member',
    bio: '백엔드 개발자 3년차. Go, Kubernetes, 마이크로서비스 아키텍처를 좋아합니다.',
    skills: ['Go', 'Kubernetes', 'Docker', 'AWS', 'Redis'],
    field: '개발자',
    createdAt: '2026-02-01T09:00:00Z',
  },
  {
    id: 'u6',
    kakaoId: '666666',
    nickname: '한승우',
    email: 'seungwoo@example.com',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=seungwoo',
    role: 'member',
    bio: '스타트업 3곳 경험의 기획자. 0→1 제품 출시를 좋아합니다.',
    skills: ['기획', 'Figma', 'SQL', '스타트업', 'Growth Hacking'],
    field: '기획자',
    createdAt: '2026-02-10T09:00:00Z',
  },
];

export const mockMeetings: Meeting[] = [
  {
    id: 'm1',
    title: 'React 19 & Next.js 16 딥다이브 스터디',
    description: 'React 19의 Server Components, Actions, use() 훅과 Next.js 16의 새로운 기능들을 함께 공부하고 실습해봅니다. 각자 담당 파트를 정해 발표하는 방식으로 진행합니다.',
    type: 'offline',
    category: '스터디',
    date: '2026-03-15T14:00:00Z',
    location: '서울 강남구 테헤란로 123, 스터디룸 3호 (강남역 3번 출구)',
    hasFee: true,
    fee: 5000,
    maxParticipants: 10,
    participants: ['u1', 'u2', 'u5'],
    hostId: 'u1',
    hostName: '김민준',
    notices: [
      { id: 'n1', content: '노트북 필수 지참! 개발환경 미리 세팅해오세요 (Node 20+, pnpm)', createdAt: '2026-03-10T10:00:00Z' },
      { id: 'n2', content: '당일 카카오톡 단체방에서 장소 공유 예정입니다', createdAt: '2026-03-12T14:00:00Z' },
    ],
    createdAt: '2026-03-01T09:00:00Z',
    status: 'open',
  },
  {
    id: 'm2',
    title: 'IT 종사자 봄 네트워킹 파티 🌸',
    description: '개발자, 디자이너, PM 등 다양한 IT 직군의 분들과 자유롭게 네트워킹하는 자리입니다. 음료 및 간식 제공! 명함 챙겨오세요. 서로의 경험을 나누고 새로운 인연을 만들어봐요.',
    type: 'offline',
    category: '네트워킹',
    date: '2026-03-20T18:30:00Z',
    location: '서울 마포구 연남동 일대 (상세 장소 신청자 단톡방 공유)',
    hasFee: true,
    fee: 10000,
    maxParticipants: 30,
    participants: ['u1', 'u2', 'u3', 'u6'],
    hostId: 'u2',
    hostName: '이서연',
    notices: [],
    createdAt: '2026-03-02T09:00:00Z',
    status: 'open',
  },
  {
    id: 'm3',
    title: '2026 AI/ML 트렌드 세미나: LLM부터 에이전트까지',
    description: '2026년 AI/ML 최신 트렌드와 실제 업무 적용 사례를 공유합니다. LLM 파인튜닝, RAG 시스템 구축, AI 에이전트 개발 등을 다룹니다. Q&A 세션도 충분히 준비되어 있습니다.',
    type: 'online',
    category: '세미나',
    date: '2026-03-25T19:00:00Z',
    onlineUrl: 'https://zoom.us/j/itpeople-seminar',
    hasFee: false,
    maxParticipants: 100,
    participants: ['u1', 'u3', 'u5', 'u6'],
    hostId: 'u3',
    hostName: '박준혁',
    notices: [
      { id: 'n3', content: '세미나 30분 전 입장 가능합니다. Zoom 링크는 당일 이메일로 발송됩니다.', createdAt: '2026-03-20T09:00:00Z' },
    ],
    createdAt: '2026-03-03T09:00:00Z',
    status: 'open',
  },
  {
    id: 'm4',
    title: '48시간 해커톤: 사회문제 기술 해결',
    description: '48시간 동안 사회문제를 기술로 해결하는 아이디어를 개발합니다. 팀 빌딩, 아이디어 구체화, 프로토타입 개발, 최종 발표까지 함께합니다. 우수팀 시상 및 스폰서 상품 있습니다!',
    type: 'offline',
    category: '해커톤',
    date: '2026-04-05T10:00:00Z',
    location: '서울 종로구 낙원동 창업허브 (2층)',
    hasFee: false,
    maxParticipants: 40,
    participants: ['u2', 'u5'],
    hostId: 'u2',
    hostName: '이서연',
    notices: [],
    createdAt: '2026-03-05T09:00:00Z',
    status: 'open',
  },
  {
    id: 'm5',
    title: 'TypeScript 고급 패턴 스터디',
    description: 'TypeScript의 고급 타입 시스템(Generic, Conditional Types, Template Literal Types, Discriminated Union 등)을 심도 있게 학습합니다. 실무에서 쓸 수 있는 패턴 위주로 다룹니다.',
    type: 'online',
    category: '스터디',
    date: '2026-03-18T20:00:00Z',
    onlineUrl: 'https://discord.gg/itpeople-ts-study',
    hasFee: false,
    maxParticipants: 15,
    participants: ['u1', 'u6'],
    hostId: 'u1',
    hostName: '김민준',
    notices: [],
    createdAt: '2026-03-04T09:00:00Z',
    status: 'open',
  },
  {
    id: 'm6',
    title: 'Kubernetes & DevOps 실습 워크샵',
    description: 'AWS EKS로 실제 서비스를 배포하고 운영하는 방법을 배웁니다. Helm, ArgoCD, 모니터링(Prometheus/Grafana)까지 풀 스택 DevOps를 경험해보세요.',
    type: 'offline',
    category: '스터디',
    date: '2026-04-12T13:00:00Z',
    location: '서울 강서구 마곡동 LG사이언스파크 (실습실)',
    hasFee: true,
    fee: 15000,
    maxParticipants: 20,
    participants: ['u5'],
    hostId: 'u5',
    hostName: '정다은',
    notices: [],
    createdAt: '2026-03-06T09:00:00Z',
    status: 'open',
  },
  {
    id: 'm7',
    title: 'UI/UX 포트폴리오 리뷰 세션',
    description: '현직 UX 디자이너들이 포트폴리오를 리뷰해드립니다. 취업 준비 중이거나 포트폴리오 개선을 원하시는 분 모두 환영합니다. 인당 20분씩 1:1 피드백을 받을 수 있습니다.',
    type: 'online',
    category: '세미나',
    date: '2026-03-28T14:00:00Z',
    onlineUrl: 'https://meet.google.com/itpeople-uxreview',
    hasFee: false,
    maxParticipants: 8,
    participants: ['u2'],
    hostId: 'u2',
    hostName: '이서연',
    notices: [],
    createdAt: '2026-03-07T09:00:00Z',
    status: 'open',
  },
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    title: 'Next.js 16 App Router 6개월 사용기 - 실무에서 느낀 점들',
    content: `Next.js 16를 실제 프로덕션에 적용하고 6개월이 지났습니다. 좋았던 점과 힘들었던 점을 솔직하게 공유합니다.

## 좋았던 점

### 1. Turbopack 완전 안정화
이전 버전에서 실험적 기능이었던 Turbopack이 드디어 완전히 안정화되었습니다. 체감상 HMR 속도가 3~4배 빨라졌고, 콜드 스타트도 훨씬 빠릅니다. 대규모 모노레포 프로젝트에서 특히 체감이 큰 편입니다.

### 2. Server Actions의 성숙
서버 액션을 사용하면 API Route를 따로 만들지 않아도 서버 로직을 컴포넌트에서 직접 호출할 수 있어서 코드가 훨씬 간결해졌습니다. 특히 폼 처리할 때 클라이언트 로직이 많이 줄었어요.

### 3. 병렬 라우트(Parallel Routes)
모달을 URL 기반으로 관리하거나, 사이드바와 메인 컨텐츠를 독립적으로 로딩할 때 아주 편합니다.

## 아쉬웠던 점

### 1. 캐싱 동작 변경
fetch의 기본 캐싱 정책이 no-cache로 변경되어서 마이그레이션 시 많이 헷갈렸습니다. ISR을 사용하려면 명시적으로 revalidate를 설정해야 합니다.

### 2. 학습 곡선
Server/Client 컴포넌트 경계를 처음에 잘 몰라서 'use client'를 남발하는 실수를 많이 했습니다.

전반적으로 만족스럽고, 새 프로젝트라면 Next.js 16 + App Router를 강력히 추천합니다!`,
    category: '기술공유',
    authorId: 'u1',
    authorName: '김민준',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=minjun',
    views: 1247,
    likes: ['u2', 'u3', 'u5'],
    comments: [
      {
        id: 'c1',
        content: '저도 최근에 마이그레이션했는데 캐싱 때문에 고생 정말 많이 했어요 ㅠㅠ 공유 감사합니다!',
        authorId: 'u2',
        authorName: '이서연',
        createdAt: '2026-03-01T15:00:00Z',
      },
      {
        id: 'c2',
        content: 'Server Actions 사용 예시도 올려주실 수 있나요? 아직 어색해서요.',
        authorId: 'u3',
        authorName: '박준혁',
        createdAt: '2026-03-01T16:00:00Z',
      },
      {
        id: 'c3',
        content: '네! 다음 포스팅에서 Server Actions 실전 예시 다룰게요 :)',
        authorId: 'u1',
        authorName: '김민준',
        parentId: 'c2',
        createdAt: '2026-03-01T17:00:00Z',
      },
      {
        id: 'c4',
        content: 'Turbopack 관련해서 monorepo에서는 어떻게 설정하셨나요?',
        authorId: 'u5',
        authorName: '정다은',
        createdAt: '2026-03-02T09:00:00Z',
      },
    ],
    createdAt: '2026-03-01T12:00:00Z',
    updatedAt: '2026-03-01T12:00:00Z',
    isDraft: false,
  },
  {
    id: 'p2',
    title: 'IT PM으로 6년, 솔직하게 털어놓는 이야기',
    content: `PM으로 6년을 보내면서 느낀 점과 배운 것들, 그리고 실수했던 것들을 정리해봤습니다.

## 가장 중요한 것: 커뮤니케이션

기술보다 커뮤니케이션이 압도적으로 중요합니다. 개발자, 디자이너, 경영진 각각의 언어로 소통할 수 있어야 합니다. "지연이 됩니다"와 "비즈니스 임팩트가 X원입니다"는 전혀 다른 메시지입니다.

## 데이터 기반 의사결정 (진짜로)

"느낌상 사용자들이 이걸 원할 것 같아요"는 절대 안 됩니다. GA, Mixpanel, 실제 유저 인터뷰, SQL 쿼리로 항상 근거를 대세요. 내가 틀릴 수 있음을 항상 인정하는 자세가 중요합니다.

## 우선순위 설정의 어려움

모든 기능을 다 만들 수 없습니다. RICE 스코어링(Reach × Impact × Confidence ÷ Effort)이나 ICE 프레임워크를 활용해서 우선순위를 명확히 하세요. 그리고 우선순위를 낮게 준 기능에 대해선 "왜 안 만드는지"를 명확하게 설명할 수 있어야 합니다.

## 실수했던 것들

- 개발 복잡도를 과소평가해서 스프린트를 계속 밀었던 경험
- 사용자 인터뷰 없이 가설만으로 큰 기능을 만들었다가 아무도 안 쓴 경험
- 이해관계자를 너무 늦게 업데이트해서 신뢰를 잃었던 경험

PM은 영광스러운 직업이 아닙니다. 모두의 불만을 들어주는 역할입니다. 하지만 그만큼 배우는 것도 많습니다.`,
    category: '커리어',
    authorId: 'u3',
    authorName: '박준혁',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=junhyuk',
    views: 2134,
    likes: ['u1', 'u2', 'u5', 'u6'],
    comments: [
      {
        id: 'c5',
        content: '정말 공감되는 내용이에요. 특히 커뮤니케이션 부분에서 많이 배웠습니다!',
        authorId: 'u1',
        authorName: '김민준',
        createdAt: '2026-03-02T10:00:00Z',
      },
      {
        id: 'c6',
        content: '"PM은 모두의 불만을 들어주는 역할" ㅋㅋㅋ 너무 공감입니다...',
        authorId: 'u6',
        authorName: '한승우',
        createdAt: '2026-03-02T14:00:00Z',
      },
    ],
    createdAt: '2026-03-02T09:00:00Z',
    updatedAt: '2026-03-02T09:00:00Z',
    isDraft: false,
  },
  {
    id: 'p3',
    title: '2026년 주목해야 할 UI/UX 트렌드 5가지',
    content: `디자이너로서 올해 주목하고 있는 UI/UX 트렌드를 정리했습니다. 단순한 유행이 아닌, 실제로 사용자 경험을 바꾸고 있는 것들 위주입니다.

## 1. AI 네이티브 인터페이스

AI가 UX의 핵심 레이어로 자리잡고 있습니다. 자연어 검색, AI 추천, 컨텍스트 인식 인터페이스가 기본이 되어가고 있어요. Figma의 AI 기능만 봐도 디자인 도구 자체가 바뀌고 있습니다.

## 2. 의미있는 마이크로인터랙션

과도한 애니메이션은 오히려 방해가 됩니다. 사용자에게 피드백을 주는 의미있는 마이크로인터랙션이 트렌드입니다. Motion.dev가 주목받는 이유도 여기에 있어요.

## 3. 접근성(Accessibility) 필수화

WCAG 2.2 가이드라인 준수가 선택이 아닌 필수가 되어가고 있습니다. 색상 대비, 키보드 접근성, 스크린 리더 지원은 기본 중의 기본입니다.

## 4. 미니멀리즘의 진화

단순히 요소를 제거하는 것이 아니라, "필요한 것만 남기는" 근본적인 사고의 변화입니다. 여백이 곧 퀄리티의 지표가 되었습니다.

## 5. 다크모드를 넘어선 테마 시스템

단순한 라이트/다크를 넘어, 사용자가 자신만의 테마를 만들 수 있는 커스터마이징 시스템이 주목받고 있습니다.`,
    category: '트렌드',
    authorId: 'u2',
    authorName: '이서연',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=seoyeon',
    views: 891,
    likes: ['u1', 'u3'],
    comments: [
      {
        id: 'c7',
        content: '접근성 관련해서 실무에서 어떻게 적용하고 계신지 더 자세히 알고 싶어요!',
        authorId: 'u3',
        authorName: '박준혁',
        createdAt: '2026-03-03T11:00:00Z',
      },
    ],
    createdAt: '2026-03-03T10:00:00Z',
    updatedAt: '2026-03-03T10:00:00Z',
    isDraft: false,
  },
  {
    id: 'p4',
    title: 'Go에서 Kubernetes 오퍼레이터 개발하기 - 실전 경험',
    content: `최근 사내 인프라 자동화를 위해 Kubernetes 오퍼레이터를 직접 개발했습니다. controller-runtime 프레임워크를 사용한 경험을 공유합니다.

## 왜 오퍼레이터를 만들었나

기존에 Helm 차트로 관리하던 서비스들이 늘어나면서 배포 복잡도가 폭발적으로 증가했습니다. 특히 상태 관리가 필요한 서비스들(데이터베이스 클러스터 등)은 Helm만으로는 한계가 있었어요.

## controller-runtime으로 개발하기

Operator SDK를 사용하면 보일러플레이트를 많이 줄일 수 있습니다. Reconcile 루프를 잘 이해하는 것이 핵심입니다.

\`\`\`go
func (r *MyAppReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
  // 현재 상태 가져오기
  // 원하는 상태와 비교
  // 차이가 있으면 조정
  return ctrl.Result{}, nil
}
\`\`\`

## 배운 것들

- Informer 캐시를 이용해서 API 서버 부하를 줄이는 방법
- Leader Election으로 HA 구성하는 방법
- 상태 머신 패턴으로 복잡한 오퍼레이터 로직 관리하기

관심 있는 분들을 위해 샘플 코드를 곧 오픈소스로 공개할 예정입니다!`,
    category: '기술공유',
    authorId: 'u5',
    authorName: '정다은',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=daeun',
    views: 567,
    likes: ['u1'],
    comments: [
      {
        id: 'c8',
        content: '오픈소스 공개되면 꼭 살펴볼게요! controller-runtime 문서가 너무 부실해서 힘들었거든요.',
        authorId: 'u1',
        authorName: '김민준',
        createdAt: '2026-03-04T13:00:00Z',
      },
    ],
    createdAt: '2026-03-04T11:00:00Z',
    updatedAt: '2026-03-04T11:00:00Z',
    isDraft: false,
  },
  {
    id: 'p5',
    title: '사이드 프로젝트 팀원 구하고 유지하는 현실적인 방법',
    content: `사이드 프로젝트를 4개 해보면서 팀원 구하고 유지하는 데 대해 배운 것들입니다. 실패 경험 포함해서 솔직하게 씁니다.

## 팀원 구하기

### 프로젝트 설명을 구체적으로

"AI 서비스 같이 만들어요"보다 "LLM 기반 코드 리뷰 서비스를 3개월 안에 MVP 출시, 기술 스택은 Next.js + FastAPI"처럼 구체적으로 쓰세요. 지원율이 10배는 높아집니다.

### 첫 미팅에서 케미 확인

스킬도 중요하지만 함께 일하는 방식이 맞는지 확인하는 게 더 중요합니다. "의사결정을 어떻게 하시나요?" "주로 언제 작업하세요?" 같은 실용적인 질문을 하세요.

## 팀 유지하기

### 초반에 규칙 만들기

나중에 갈등이 생기지 않도록 초반에 합의하세요:
- 주간 싱크 방식과 주기
- 연락 안 될 때 어떻게 할지
- 프로젝트 포기 시 어떻게 할지

### 작은 성공 만들기

MVP도 배포 전에 사람들이 지쳐서 나가는 경우가 많습니다. 2주마다 작은 마일스톤을 만들어서 성취감을 유지하세요.

## 현실적인 조언

사이드 프로젝트 팀은 회사 팀이 아닙니다. 모두가 바쁩니다. 어느 정도의 느슨함을 허용하면서도 동력을 유지하는 균형이 중요합니다.`,
    category: '커리어',
    authorId: 'u3',
    authorName: '박준혁',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=junhyuk',
    views: 1823,
    likes: ['u1', 'u2', 'u5', 'u6'],
    comments: [
      {
        id: 'c9',
        content: '"작은 성공 만들기" 이게 핵심인 것 같아요. 우리 팀도 이게 없어서 흐지부지됐던 것 같아요.',
        authorId: 'u2',
        authorName: '이서연',
        createdAt: '2026-03-05T13:00:00Z',
      },
      {
        id: 'c10',
        content: '초반 규칙 만들기 진짜 중요해요. 프로젝트 포기 시 코드 소유권 같은 것도 미리 정해두는 게 좋습니다.',
        authorId: 'u6',
        authorName: '한승우',
        createdAt: '2026-03-05T15:00:00Z',
      },
    ],
    createdAt: '2026-03-05T09:00:00Z',
    updatedAt: '2026-03-05T09:00:00Z',
    isDraft: false,
  },
  {
    id: 'p6',
    title: '개발자 이직 준비 체크리스트 (3개월 플랜)',
    content: `최근 이직을 마쳤습니다. 3개월 동안 준비한 과정을 체크리스트 형식으로 정리합니다.

## 1개월차: 준비

- 포트폴리오/이력서 업데이트 (경력 중심, 숫자로 표현)
- 지원할 회사 리스트업 (30~50개)
- GitHub 정리 (오래된 프로젝트 아카이브, README 보강)
- 기술 면접 대비 시작 (CS 기초, 시스템 디자인)

## 2개월차: 지원

- 채용 공고 매일 확인 (Wanted, Rocketpunch, LinkedIn)
- 회사별 맞춤 자기소개서 작성
- 코딩 테스트 대비 (프로그래머스, LeetCode 매일 1~2문제)
- 네트워크 활용 (지인 추천이 합격률 3배 높음)

## 3개월차: 면접

- 모의 면접 (녹화해서 피드백)
- 회사별 기술 스택 미리 공부
- 내 경험을 STAR 형식으로 정리
- 협상 준비 (현재 연봉 + 시장가 리서치)

## 결과

약 35개 회사 지원 → 18개 서류 통과 → 12개 면접 → 3개 최종 합격
최종적으로 연봉 30% 상승으로 이직 성공했습니다.`,
    category: '커리어',
    authorId: 'u1',
    authorName: '김민준',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=minjun',
    views: 3421,
    likes: ['u2', 'u3', 'u5', 'u6'],
    comments: [
      {
        id: 'c11',
        content: '네트워크 활용해서 합격률 3배라는 부분 정말 공감합니다. 지인 추천 루트가 확실히 달라요.',
        authorId: 'u3',
        authorName: '박준혁',
        createdAt: '2026-03-06T10:00:00Z',
      },
    ],
    createdAt: '2026-03-06T09:00:00Z',
    updatedAt: '2026-03-06T09:00:00Z',
    isDraft: false,
  },
  {
    id: 'p7',
    title: '[질문] React Query vs SWR, 실무에서 어떤 것 사용하세요?',
    content: `새 프로젝트 시작하면서 데이터 페칭 라이브러리를 선택해야 하는데 고민입니다.

## 현재 상황

팀 규모는 4명 (프론트 2, 백 2), Next.js App Router 사용 예정, REST API 사용

## 고려 중인 옵션

**TanStack Query (React Query)**
- 장점: 기능이 풍부, 캐싱 제어가 세밀함, 커뮤니티가 크다
- 단점: 번들 사이즈가 크고, 학습 곡선이 있음

**SWR**
- 장점: 가볍고 단순함, Next.js와 궁합 좋음
- 단점: 복잡한 케이스에서 한계가 있음

## 질문

실무에서 사용해보신 분들 경험 공유해주세요! 특히 App Router 환경에서 Server Components와 함께 어떻게 사용하시나요?`,
    category: '질문',
    authorId: 'u6',
    authorName: '한승우',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=seungwoo',
    views: 445,
    likes: ['u1'],
    comments: [
      {
        id: 'c12',
        content: '저는 App Router에서는 Server Components로 최대한 데이터 가져오고, Client에서 mutation이 필요할 때만 React Query 씁니다. SWR은 App Router에서 어색한 부분이 있어요.',
        authorId: 'u1',
        authorName: '김민준',
        createdAt: '2026-03-07T10:00:00Z',
      },
      {
        id: 'c13',
        content: '소규모 팀이고 App Router 쓰신다면 그냥 Server Actions + Optimistic Updates로도 충분할 수 있어요. 라이브러리 없이도 잘 됩니다.',
        authorId: 'u5',
        authorName: '정다은',
        createdAt: '2026-03-07T11:00:00Z',
      },
    ],
    createdAt: '2026-03-07T09:00:00Z',
    updatedAt: '2026-03-07T09:00:00Z',
    isDraft: false,
  },
];

export const mockProjects: Project[] = [
  {
    id: 'pr1',
    title: '개발자 포트폴리오 공유 플랫폼',
    description: '개발자들이 자신의 프로젝트와 기술 스택을 쉽게 공유하고, 다른 개발자들에게 피드백을 받을 수 있는 플랫폼입니다. GitHub 연동, 기술 스택 자동 분석, 피어 리뷰 기능 등을 포함합니다.',
    goal: '3개월 안에 MVP를 출시하고 1,000명의 초기 사용자 확보. Product Hunt 런칭 예정.',
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
        skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
        description: 'Next.js 기반 풀스택 개발. GitHub OAuth 연동, 포트폴리오 파싱 기능 개발 담당.',
      },
      {
        id: 'pos2',
        role: '디자이너',
        count: 1,
        skills: ['Figma', 'UI/UX', 'Design System'],
        description: '서비스 전반의 UI/UX 디자인. 디자인 시스템 구축 및 컴포넌트 라이브러리 제작.',
      },
    ],
    applicants: [],
    members: ['u3'],
    createdAt: '2026-03-01T09:00:00Z',
  },
  {
    id: 'pr2',
    title: 'IT 스터디 매칭 앱',
    description: '관심사, 수준, 지역이 맞는 스터디원을 자동으로 매칭해주는 모바일 앱입니다. AI 기반 매칭 알고리즘으로 최적의 스터디 파트너를 찾아드립니다.',
    goal: '6개월 안에 iOS/Android 앱 출시 및 500명 초기 사용자 달성.',
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
        skills: ['React Native', 'Firebase', 'Node.js'],
        description: '모바일 앱 개발 (iOS/Android). 매칭 API 개발 담당.',
      },
      {
        id: 'pos4',
        role: 'PM',
        count: 1,
        skills: ['기획', '데이터분석', 'SQL'],
        description: '서비스 기획 및 매칭 알고리즘 설계. 유저 인터뷰 및 데이터 분석.',
      },
      {
        id: 'pos5',
        role: '디자이너',
        count: 1,
        skills: ['Figma', 'Mobile UI', 'Prototyping'],
        description: '모바일 앱 UI/UX 디자인. 온보딩 플로우부터 핵심 기능까지 전담.',
      },
    ],
    applicants: [
      {
        id: 'app1',
        userId: 'u2',
        userName: '이서연',
        positionId: 'pos5',
        role: '디자이너',
        coverLetter: '모바일 앱 디자인 경험이 3년 있습니다. Figma로 5개 이상의 앱을 디자인했고, iOS/Android 가이드라인에 맞는 디자인을 할 수 있습니다. 스터디 매칭이라는 아이디어에 공감해서 지원하게 되었습니다.',
        status: 'pending',
        appliedAt: '2026-03-02T10:00:00Z',
      },
      {
        id: 'app2',
        userId: 'u6',
        userName: '한승우',
        positionId: 'pos4',
        role: 'PM',
        coverLetter: '스타트업 3곳에서 0→1 제품을 출시한 경험이 있습니다. 특히 매칭 서비스 경험이 있어 해당 도메인에 대한 이해가 높습니다.',
        status: 'pending',
        appliedAt: '2026-03-03T14:00:00Z',
      },
    ],
    members: ['u1'],
    createdAt: '2026-03-02T09:00:00Z',
  },
  {
    id: 'pr3',
    title: '로컬 숨은 맛집 소셜 큐레이션',
    description: '동네 IT인들이 직접 발굴한 숨은 맛집과 카페를 공유하는 소셜 큐레이션 서비스입니다. 리뷰보다 "추천"에 집중하여 진짜 좋은 곳만 모아서 보여줍니다.',
    goal: '3개월 안에 웹 서비스 런칭, 서울 지역 300개 장소 큐레이션.',
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
        skills: ['Next.js', 'Supabase', 'Tailwind CSS'],
        description: '풀스택 개발. 지도 연동, 장소 등록/조회 기능 개발.',
      },
      {
        id: 'pos7',
        role: '마케터',
        count: 1,
        skills: ['SNS 마케팅', '콘텐츠 제작', 'Instagram'],
        description: '인스타그램 채널 운영 및 초기 사용자 획득 전략 수립.',
      },
    ],
    applicants: [],
    members: ['u2'],
    createdAt: '2026-03-03T09:00:00Z',
  },
  {
    id: 'pr4',
    title: 'AI 코드 리뷰 어시스턴트',
    description: 'GitHub PR에 자동으로 코드 리뷰를 달아주는 AI 도구입니다. 단순한 문법 오류를 넘어 설계 패턴, 성능 이슈, 보안 취약점까지 분석합니다.',
    goal: '2개월 MVP 완성, GitHub Marketplace 출시, 첫 달 100개 레포 적용.',
    startDate: '2026-04-01',
    endDate: '2026-05-31',
    status: '진행중',
    leaderId: 'u5',
    leaderName: '정다은',
    positions: [
      {
        id: 'pos8',
        role: '개발자',
        count: 1,
        skills: ['Python', 'LangChain', 'GitHub API'],
        description: 'AI 모델 연동 및 GitHub Action 개발.',
      },
    ],
    applicants: [
      {
        id: 'app3',
        userId: 'u1',
        userName: '김민준',
        positionId: 'pos8',
        role: '개발자',
        coverLetter: 'LangChain으로 RAG 시스템을 구축한 경험이 있습니다. AI 코드 리뷰 아이디어에 큰 관심이 있어 지원합니다.',
        status: 'accepted',
        appliedAt: '2026-03-01T09:00:00Z',
      },
    ],
    members: ['u5', 'u1'],
    createdAt: '2026-02-28T09:00:00Z',
  },
];
