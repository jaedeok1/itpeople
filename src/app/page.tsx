import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Users,
  BookOpen,
  Rocket,
  ArrowRight,
  Calendar,
  MessageSquare,
  TrendingUp,
  Code2,
  Palette,
  Briefcase,
  ChevronRight,
  Star,
  Zap,
} from 'lucide-react';

const stats = [
  { label: '활성 회원', value: '1,200+', desc: '매월 성장 중' },
  { label: '진행된 모임', value: '850+', desc: '온/오프라인' },
  { label: '공유된 지식', value: '3,400+', desc: '게시글' },
  { label: '사이드 프로젝트', value: '120+', desc: '팀 구성 완료' },
];

const features = [
  {
    icon: Users,
    title: '모임',
    description:
      '스터디, 네트워킹, 세미나, 해커톤까지. 온/오프라인 모임을 개설하고 IT인들과 직접 만나보세요.',
    href: '/meetings',
    badge: '신규 모임 12개',
    color: 'blue',
    gradient: 'from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20',
    iconBg: 'bg-blue-600',
  },
  {
    icon: BookOpen,
    title: '지식 공유',
    description:
      '실무 경험, 기술 인사이트, 커리어 이야기를 나눠주세요. 함께 성장하는 IT 커뮤니티입니다.',
    href: '/community',
    badge: '이번 주 인기글',
    color: 'emerald',
    gradient: 'from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20',
    iconBg: 'bg-emerald-600',
  },
  {
    icon: Rocket,
    title: '사이드 프로젝트',
    description:
      '아이디어를 현실로 만들 팀원을 찾거나, 흥미로운 프로젝트에 합류해 함께 만들어보세요.',
    href: '/projects',
    badge: '팀원 모집 중 8개',
    color: 'purple',
    gradient: 'from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20',
    iconBg: 'bg-purple-600',
  },
];

const fields = [
  { icon: Code2, label: '개발자', count: '620명', color: 'text-blue-600 bg-blue-50' },
  { icon: Palette, label: '디자이너', count: '280명', color: 'text-purple-600 bg-purple-50' },
  { icon: Briefcase, label: 'PM / 기획자', count: '220명', color: 'text-emerald-600 bg-emerald-50' },
  { icon: TrendingUp, label: '마케터', count: '80명', color: 'text-orange-600 bg-orange-50' },
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

const typeIcon = {
  meeting: Calendar,
  post: MessageSquare,
  project: Rocket,
};

const typeBadge: Record<string, { label: string; cls: string }> = {
  meeting: { label: '모임', cls: 'bg-blue-100 text-blue-700' },
  post: { label: '게시글', cls: 'bg-emerald-100 text-emerald-700' },
  project: { label: '프로젝트', cls: 'bg-purple-100 text-purple-700' },
};

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      {/* ─── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-100 dark:border-gray-800">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(#000 1px, transparent 1px), linear-gradient(to right, #000 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
              <Zap size={13} className="fill-current" />
              IT 전문가 1,200명이 함께하는 커뮤니티
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1]">
              IT인들이 모여
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                함께 성장
              </span>
              하는 공간
            </h1>

            <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
              개발자, 디자이너, PM이 네트워킹하고, 지식을 나누며,
              <br />
              사이드 프로젝트로 아이디어를 현실로 만드는 플랫폼입니다.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 h-12 text-base shadow-sm"
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
                className="px-8 h-12 text-base font-medium"
              >
                <Link href="/community">커뮤니티 보기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ─────────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ label, value, desc }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {value}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Core Features ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            IT인을 위한 모든 것
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            네트워킹부터 협업까지, 성장에 필요한 모든 것이 여기 있습니다
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, description, href, badge, gradient, iconBg }) => (
            <Link
              key={href}
              href={href}
              className={`group relative rounded-2xl p-6 bg-gradient-to-br ${gradient} border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`p-2.5 rounded-xl ${iconBg} text-white`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-gray-800/70 px-2.5 py-1 rounded-full">
                  {badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                {description}
              </p>

              <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                바로가기
                <ChevronRight
                  size={15}
                  className="ml-0.5 group-hover:translate-x-0.5 transition-transform"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Recent Activity + Fields ──────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-5 gap-10">
            {/* Activity Feed */}
            <div className="md:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">최근 활동</h2>
                <Link
                  href="/community"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  전체 보기 <ChevronRight size={14} />
                </Link>
              </div>

              <div className="space-y-2">
                {recentActivity.map((item, i) => {
                  const Icon = typeIcon[item.type as keyof typeof typeIcon];
                  const badge = typeBadge[item.type];
                  return (
                    <Link
                      key={i}
                      href={item.href}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-sm transition-all group"
                    >
                      <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5">
                        <Icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${badge.cls}`}
                          >
                            {badge.label}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.meta}</p>
                      </div>
                      <ChevronRight
                        size={14}
                        className="text-gray-300 flex-shrink-0 mt-1 group-hover:text-blue-400 transition-colors"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Fields */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">직군별 현황</h2>
              <div className="space-y-3">
                {fields.map(({ icon: Icon, label, count, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                  >
                    <div className={`p-2 rounded-lg ${color}`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      {count}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <Star size={20} className="mb-3 opacity-80" />
                <p className="font-semibold mb-1">지금 가입하세요</p>
                <p className="text-sm text-blue-100 mb-4">
                  이미 1,200명의 IT 전문가가 함께하고 있습니다.
                </p>
                <Button
                  asChild
                  size="sm"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold w-full"
                >
                  <Link href="/login">무료로 시작하기</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            오늘부터 IT인들과 함께 성장하세요
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            이메일 하나로 5초만에 가입하고, IT인들과 연결되세요
          </p>
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 h-12 text-base"
          >
            <Link href="/login">
              시작하기 <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                IT인들의 놀이터
              </div>
              <p className="text-sm text-gray-400 max-w-xs">
                IT 전문가들을 위한 네트워킹, 지식 공유,
                <br />
                사이드 프로젝트 협업 플랫폼
              </p>
            </div>
            <div className="flex gap-12">
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  서비스
                </div>
                <div className="space-y-2 text-sm text-gray-500">
                  <Link href="/meetings" className="block hover:text-gray-900 dark:hover:text-white transition-colors">
                    모임
                  </Link>
                  <Link href="/community" className="block hover:text-gray-900 dark:hover:text-white transition-colors">
                    커뮤니티
                  </Link>
                  <Link href="/projects" className="block hover:text-gray-900 dark:hover:text-white transition-colors">
                    사이드 프로젝트
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  계정
                </div>
                <div className="space-y-2 text-sm text-gray-500">
                  <Link href="/login" className="block hover:text-gray-900 dark:hover:text-white transition-colors">
                    로그인
                  </Link>
                  <Link href="/mypage" className="block hover:text-gray-900 dark:hover:text-white transition-colors">
                    마이페이지
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex items-center justify-between">
            <p className="text-sm text-gray-400">
              © 2026 IT인들의 놀이터. All rights reserved.
            </p>
            <p className="text-xs text-gray-300 dark:text-gray-600">
              Made with ❤️ by IT people, for IT people
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
