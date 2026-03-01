import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/server-store';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: '이메일과 비밀번호를 입력해주세요.' }, { status: 400 });
  }

  const user = findUserByEmail(email);

  if (!user) {
    return NextResponse.json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
  }

  if (user.password !== password) {
    return NextResponse.json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
  }

  // 비밀번호 제외하고 반환
  const { password: _, ...safeUser } = user;
  return NextResponse.json({ success: true, user: safeUser });
}
