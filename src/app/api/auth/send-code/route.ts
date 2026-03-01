import { NextRequest, NextResponse } from 'next/server';
import { saveCode } from '@/lib/server-store';
import { sendVerificationEmail } from '@/lib/mailer';

function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: '유효한 이메일을 입력해주세요.' }, { status: 400 });
  }

  const code = generateCode();
  saveCode(email, code);

  // 이메일 설정이 없으면 콘솔에 출력 (개발 모드)
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log(`[개발 모드] ${email} 인증 코드: ${code}`);
    return NextResponse.json({ success: true, devCode: code });
  }

  try {
    await sendVerificationEmail(email, code);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('이메일 전송 실패:', error);
    return NextResponse.json({ error: '이메일 전송에 실패했습니다. 이메일 설정을 확인해주세요.' }, { status: 500 });
  }
}
