import { NextResponse } from 'next/server';

export async function GET() {
  const kakaoAuthUrl = new URL('https://kauth.kakao.com/oauth/authorize');
  kakaoAuthUrl.searchParams.set('client_id', process.env.KAKAO_REST_API_KEY ?? '');
  kakaoAuthUrl.searchParams.set(
    'redirect_uri',
    process.env.KAKAO_REDIRECT_URI ?? 'http://localhost:3000/api/auth/kakao/callback'
  );
  kakaoAuthUrl.searchParams.set('response_type', 'code');

  return NextResponse.redirect(kakaoAuthUrl.toString());
}
