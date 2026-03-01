import { NextRequest, NextResponse } from 'next/server';
import { verifyCode } from '@/lib/server-store';

export async function POST(request: NextRequest) {
  const { email, code } = await request.json();

  if (!email || !code) {
    return NextResponse.json({ error: '이메일과 인증 코드를 입력해주세요.' }, { status: 400 });
  }

  const isValid = verifyCode(email, code);

  if (!isValid) {
    return NextResponse.json({ error: '인증 코드가 올바르지 않거나 만료되었습니다.' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
