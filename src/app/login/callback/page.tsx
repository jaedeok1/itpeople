'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import type { User } from '@/types';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((s) => s.login);

  useEffect(() => {
    const kakaoId = searchParams.get('kakaoId');
    const nickname = searchParams.get('nickname');
    const email = searchParams.get('email');
    const profileImage = searchParams.get('profileImage');

    if (!kakaoId || !nickname) {
      router.replace('/login?error=server_error');
      return;
    }

    const user: User = {
      id: `user_${kakaoId}`,
      kakaoId,
      nickname,
      email: email ?? '',
      profileImage: profileImage ?? undefined,
      role: 'member',
      skills: [],
      createdAt: new Date().toISOString(),
    };

    login(user);
    router.replace('/');
  }, [searchParams, login, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4" />
        <p className="text-gray-500">로그인 중...</p>
      </div>
    </div>
  );
}

export default function LoginCallbackPage() {
  return (
    <Suspense>
      <CallbackContent />
    </Suspense>
  );
}
