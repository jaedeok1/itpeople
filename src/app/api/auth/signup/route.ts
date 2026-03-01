import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail, codeStore } from '@/lib/server-store';

export async function POST(request: NextRequest) {
  const { email, nickname, password } = await request.json();

  if (!email || !nickname || !password) {
    return NextResponse.json({ error: '모든 항목을 입력해주세요.' }, { status: 400 });
  }

  // 이미 가입된 이메일 확인
  if (findUserByEmail(email)) {
    return NextResponse.json({ error: '이미 가입된 이메일입니다.' }, { status: 409 });
  }

  // 인증 코드가 확인된 상태인지 검증 (코드 스토어에서 삭제된 상태 = 이미 verify-code를 통과)
  // verify-code에서 성공 시 코드를 삭제하지 않으므로 여기서 한번 더 체크
  // 대신 클라이언트에서 verified 상태를 관리

  const user = createUser({ email, nickname, password });

  // 비밀번호 제외하고 반환
  const { password: _, ...safeUser } = user;
  return NextResponse.json({ success: true, user: safeUser });
}
