import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Users,
  BookOpen,
  Rocket,
  ArrowRight,
  Calendar,
  MessageSquare,
  ChevronRight,
  Zap,
  CheckCircle2,
} from 'lucide-react';

const stats = [
  { label: '활성 회원', value: '1,200+' },
  { label: '진행된 모임', value: '850+' },
  { label: '공유된 지식', value: '3,400+' },
  { label: '사이드 프로젝트', value: '120+' },
];

const features = [
  {
    icon: Users,
    title: '모임',
    description:
      '스터디, 네트워킹, 세미나, 해커톤까지. 온/오프라인 모임을 개설하고 IT인들과 직접 만나보세요.',
    href: '/meetings',
    badge: '신규 모임 12개',
    gradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/30',
    iconBg: 'bg-blue-600',
    hoverBorder: 'hover:border-blue-200 dark:hover:border-blue-800',
    linkColor: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
    points: ['온/오프라인 모임 개설', '카테고리별 모임 탐색', '참여자 관리 & 공지'],
  },
  {
    icon: BookOpen,
    title: '지식 공유',
    description:
      '실무 경험, 기술 인사이트, 커리어 이야기를 나눠주세요. 함께 성장하는 IT 커뮤니티입니다.',
    href: '/community',
    badge: '이번 주 인기글',
    gradient: 'from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30',
    iconBg: 'bg-emerald-600',
    hoverBorder: 'hover:border-emerald-200 dark:hover:border-emerald-800',
    linkColor: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    points: ['기술 · 커리어 · 트렌드 게시판', '댓글 & 대댓글 토론', '인기 글 큐레이션'],
  },
  {
    icon: Rocket,
    title: '사이드 프로젝트',
    description:
      '아이디어를 현실로 만들 팀원을 찾거나, 흥미로운 프로젝트에 합류해 함께 만들어보세요.',
    href: '/projects',
    badge: '팀원 모집 중 8개',
    gradient: 'from-purple-50 to-violet-50 dark:from-purple-950/40 dark:to-violet-950/30',
    iconBg: 'bg-purple-600',
    hoverBorder: 'hover:border-purple-200 dark:hover:border-purple-800',
    linkColor: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
    points: ['역할별 팀원 모집', '지원 & 심사 시스템', '프로젝트 현황 관리'],
  },
];

const recentActivity = [
  {
    type: 'meeting',
    title: 'React 19 & Next.js 16 딥다이브 스터디',
    meta: '3월 15일 · 강남 · 10명 중 3명',
    href: '/meetings/m1',
  },
  {
    type: 'post',
    title: '개발자 이직 준비 체크리스트 (3개월 플랜)',
    meta: '조회 3,421 · 좋아요 4',
    href: '/community/p6',
  },
  {
    type: 'project',
    title: 'IT 스터디 매칭 앱 - 팀원 모집중',
    meta: '개발자 · PM · 디자이너 모집',
    href: '/projects/pr2',
  },
  {
    type: 'post',
    title: 'Next.js 16 App Router 6개월 사용기',
    meta: '조회 1,247 · 댓글 4',
    href: '/community/p1',
  },
  {
    type: 'meeting',
    title: '2026 AI/ML 트렌드 세미나',
    meta: '3월 25일 · 온라인 · 무료',
    href: '/meetings/m3',
  },
];

const typeConfig = {
  meeting: {
    icon: Calendar,
    badge: '모임',
    cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    iconCls: 'bg-blue-50 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400',
  },
  post: {
    icon: MessageSquare,
    badge: '게시글',
    cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    iconCls: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-400',
  },
  project: {
    icon: Rocket,
    badge: '프로젝트',
    cls: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    iconCls: 'bg-purple-50 text-purple-500 dark:bg-purple-900/30 dark:text-purple-400',
  },
};

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-950">

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-100 dark:border-gray-800">
        {/* 배경 그라디언트 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-purple-50/40 dark:from-blue-950/20 dark:via-gray-950 dark:to-purple-950/20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-400/8 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-400/8 dark:bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300 rounded-full px-4 py-1.5 text-xs font-semibold mb-8 tracking-wide">
              <Zap size={12} className="fill-current" />
              IT 전문가 1,200명이 함께하는 커뮤니티
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1]">
              IT인들이 모여
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                함께 성장
              </span>
              하는 공간
            </h1>

            <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
              개발자, 디자이너, PM이 네트워킹하고,<br className="hidden sm:block" />
              지식을 나누며 사이드 프로젝트로 아이디어를 현실로 만드는 플랫폼
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 h-12 text-base shadow-md shadow-blue-200 dark:shadow-blue-900/40 transition-all hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/40"
              >
                <Link href="/meetings">
                  모임 둘러보기
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 h-12 text-base font-medium border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              >
                <Link href="/community">커뮤니티 보기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ─────────────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-800">
            {stats.map(({ label, value }) => (
              <div key={label} className="text-center px-6 py-4">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1 tabular-nums">
                  {value}
                </div>
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Core Features ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            IT인을 위한 모든 것
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base">
            네트워킹부터 협업까지, 성장에 필요한 모든 것이 여기 있습니다
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, description, href, badge, gradient, iconBg, hoverBorder, linkColor, points }) => (
            <Link
              key={href}
              href={href}
              className={`group relative rounded-2xl p-6 bg-gradient-to-br ${gradient} border border-gray-100 dark:border-gray-800/80 ${hoverBorder} hover:shadow-xl hover:-translate-y-1.5 transition-all duration-250 overflow-hidden flex flex-col`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`p-2.5 rounded-xl ${iconBg} text-white shadow-sm`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 flex-1">
                {description}
              </p>

              {/* 기능 포인트 */}
              <ul className="space-y-1.5 mb-5">
                {points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <CheckCircle2 size={12} className="text-gray-400 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className={`flex items-center text-sm font-semibold text-gray-600 dark:text-gray-300 ${linkColor} transition-colors`}>
                바로가기
                <ChevronRight
                  size={15}
                  className="ml-0.5 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── 최근 활동 ──────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">최근 활동</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">지금 이 순간 커뮤니티에서 일어나는 일</p>
            </div>
            <Link
              href="/community"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
            >
              전체 보기 <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recentActivity.map((item, i) => {
              const cfg = typeConfig[item.type as keyof typeof typeConfig];
              const Icon = cfg.icon;
              return (
                <Link
                  key={i}
                  href={item.href}
                  className="group flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/60 hover:border-blue-200 dark:hover:border-blue-700/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
                >
                  <div className={`p-2 rounded-lg flex-shrink-0 ${cfg.iconCls}`}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5 ${cfg.cls}`}>
                      {cfg.badge}
                    </span>
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-400">{item.meta}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              오늘부터 IT인들과 함께 성장하세요
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              이메일 하나로 5초만에 가입하고,<br className="hidden sm:block" />
              1,200명의 IT 전문가와 연결되세요
            </p>
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 h-12 text-base shadow-md shadow-blue-200 dark:shadow-blue-900/40 hover:shadow-lg transition-all"
            >
              <Link href="/login">
                무료로 시작하기 <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div>
              <div className="text-base font-bold text-gray-900 dark:text-white mb-1">
                IT인들의 놀이터
              </div>
              <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                IT 전문가들을 위한 네트워킹, 지식 공유,<br />
                사이드 프로젝트 협업 플랫폼
              </p>
            </div>
            <div className="flex gap-12">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  서비스
                </div>
                <div className="space-y-2 text-sm text-gray-500">
                  <Link href="/meetings" className="block hover:text-gray-900 dark:hover:text-white transition-colors">모임</Link>
                  <Link href="/community" className="block hover:text-gray-900 dark:hover:text-white transition-colors">커뮤니티</Link>
                  <Link href="/projects" className="block hover:text-gray-900 dark:hover:text-white transition-colors">사이드 프로젝트</Link>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  계정
                </div>
                <div className="space-y-2 text-sm text-gray-500">
                  <Link href="/login" className="block hover:text-gray-900 dark:hover:text-white transition-colors">로그인</Link>
                  <Link href="/mypage" className="block hover:text-gray-900 dark:hover:text-white transition-colors">마이페이지</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex items-center justify-between">
            <p className="text-sm text-gray-400">© 2026 IT인들의 놀이터. All rights reserved.</p>
            <p className="text-xs text-gray-300 dark:text-gray-600">Made with ❤️ by IT people</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
