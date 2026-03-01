import nodemailer from 'nodemailer';

export function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT ?? 465),
    secure: Number(process.env.EMAIL_PORT ?? 465) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

export async function sendVerificationEmail(to: string, code: string) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.EMAIL_FROM ?? 'IT인들의 놀이터 <noreply@itpeople.dev>',
    to,
    subject: '[IT인들의 놀이터] 이메일 인증 코드',
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px;">
        <h2 style="color: #2563eb; margin-bottom: 8px;">💻 IT인들의 놀이터</h2>
        <p style="color: #6b7280; margin-bottom: 32px;">이메일 인증 코드를 확인해주세요.</p>

        <div style="background: #f3f4f6; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
          <p style="color: #374151; font-size: 14px; margin-bottom: 8px;">인증 코드</p>
          <div style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #1d4ed8;">${code}</div>
        </div>

        <p style="color: #9ca3af; font-size: 13px;">
          이 코드는 <strong>10분간</strong> 유효합니다.<br>
          본인이 요청하지 않은 경우 이 이메일을 무시하세요.
        </p>
      </div>
    `,
  });
}
