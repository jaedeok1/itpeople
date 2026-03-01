'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { KakaoLoginButton } from '@/components/auth/kakao-login-button';

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: Record<string, string> = {
    kakao_denied: '카카오 로그인이 취소되었습니다.',
    token_failed: '로그인 처리 중 오류가 발생했습니다.',
    server_error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">💻</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">IT인들의 놀이터</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
            IT 전문가들과 함께 네트워킹하고 성장하세요
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm text-center">
            {errorMessages[error] ?? '오류가 발생했습니다.'}
          </div>
        )}

        <KakaoLoginButton />

        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
          로그인하면{' '}
          <span className="underline cursor-pointer">이용약관</span>
          {' '}및{' '}
          <span className="underline cursor-pointer">개인정보처리방침</span>
          에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
