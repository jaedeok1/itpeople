import { redirect } from 'next/navigation';

// 카카오 로그인 제거 후 사용하지 않는 라우트 — 로그인 페이지로 리다이렉트
export default function LoginCallbackPage() {
  redirect('/login');
}
