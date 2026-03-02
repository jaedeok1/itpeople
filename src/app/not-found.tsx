import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-[120px] font-bold text-gray-100 dark:text-gray-800 leading-none select-none">
            404
          </div>
          <div className="-mt-6 relative">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              페이지를 찾을 수 없어요
            </h1>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              요청하신 페이지가 존재하지 않거나 이동되었습니다.
              <br />
              URL을 다시 확인해 주세요.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline" className="gap-2">
            <Link href="javascript:history.back()">
              <ArrowLeft size={16} />
              이전으로
            </Link>
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Link href="/">
              <Home size={16} />
              홈으로 가기
            </Link>
          </Button>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-400 mb-4">이런 페이지는 어떠세요?</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { href: '/meetings', label: '모임 둘러보기' },
              { href: '/community', label: '커뮤니티' },
              { href: '/projects', label: '사이드 프로젝트' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
