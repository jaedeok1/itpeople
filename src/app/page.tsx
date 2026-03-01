import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, Rocket, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: '모임',
    description: '온/오프라인 모임을 개설하고 참여하세요. 스터디, 네트워킹, 해커톤 등 다양한 모임이 기다립니다.',
    href: '/meetings',
    color: 'bg-blue-500',
  },
  {
    icon: BookOpen,
    title: '지식 공유',
    description: '내가 아는 것을 나누고, 다른 IT 전문가들의 경험을 배우세요. 함께 성장하는 커뮤니티입니다.',
    href: '/community',
    color: 'bg-emerald-500',
  },
  {
    icon: Rocket,
    title: '사이드 프로젝트',
    description: '아이디어를 현실로! 사이드 프로젝트 팀원을 모집하거나, 흥미로운 프로젝트에 합류하세요.',
    href: '/projects',
    color: 'bg-purple-500',
  },
];

const stats = [
  { label: '활성 회원', value: '1,200+' },
  { label: '진행 중인 모임', value: '85+' },
  { label: '게시글', value: '3,400+' },
  { label: '사이드 프로젝트', value: '120+' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="text-yellow-300">✨</span> IT 전문가들의 놀이터에 오신 것을 환영합니다
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            IT인들이 모여<br />
            <span className="text-yellow-300">함께 성장</span>하는 공간
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            개발자, 디자이너, PM이 모여 네트워킹하고, 지식을 나누며,
            사이드 프로젝트로 아이디어를 현실로 만드는 플랫폼입니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8">
              <Link href="/meetings">
                모임 둘러보기 <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10 px-8">
              <Link href="/login">시작하기</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            IT인을 위한 모든 것
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            네트워킹부터 사이드 프로젝트까지, IT인의 성장을 돕는 통합 플랫폼
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, href, color }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-xl ${color} text-white mb-5`}>
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                {title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                {description}
              </p>
              <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                자세히 보기 <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">지금 바로 시작하세요</h2>
          <p className="text-blue-100 mb-8">카카오 계정으로 5초만에 가입하고 IT인들과 연결되세요</p>
          <Button asChild size="lg" className="bg-[#FEE500] hover:bg-[#F0D800] text-[#191919] font-semibold px-10">
            <Link href="/login">카카오로 시작하기</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>© 2026 IT인들의 놀이터. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
