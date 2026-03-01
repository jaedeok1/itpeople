import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(new URL('/login?error=kakao_denied', request.url));
  }

  try {
    // 1. 카카오 토큰 발급
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_REST_API_KEY ?? '',
        redirect_uri: process.env.KAKAO_REDIRECT_URI ?? 'http://localhost:3000/api/auth/kakao/callback',
        code,
        ...(process.env.KAKAO_CLIENT_SECRET ? { client_secret: process.env.KAKAO_CLIENT_SECRET } : {}),
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return NextResponse.redirect(new URL('/login?error=token_failed', request.url));
    }

    // 2. 카카오 유저 정보 조회
    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const kakaoUser = await userResponse.json();

    const kakaoId = String(kakaoUser.id);
    const nickname = kakaoUser.kakao_account?.profile?.nickname ?? '익명';
    const email = kakaoUser.kakao_account?.email ?? '';
    const profileImage = kakaoUser.kakao_account?.profile?.profile_image_url ?? '';

    // 3. 유저 정보를 쿼리 파라미터로 전달 (실제 서비스에서는 세션/쿠키 사용)
    const params = new URLSearchParams({
      kakaoId,
      nickname,
      email,
      profileImage,
    });

    return NextResponse.redirect(new URL(`/login/callback?${params.toString()}`, request.url));
  } catch {
    return NextResponse.redirect(new URL('/login?error=server_error', request.url));
  }
}
