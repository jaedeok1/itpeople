'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/auth-store';
import type { User } from '@/types';

// ── 스키마 ────────────────────────────────────
const emailSchema = z.object({ email: z.string().email('올바른 이메일을 입력해주세요') });
const codeSchema = z.object({ code: z.string().length(6, '6자리 코드를 입력해주세요') });
const signupSchema = z.object({
  nickname: z.string().min(2, '닉네임은 2자 이상이어야 합니다'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
  passwordConfirm: z.string(),
}).refine((d) => d.password === d.passwordConfirm, { message: '비밀번호가 일치하지 않습니다', path: ['passwordConfirm'] });
const loginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

type Tab = 'login' | 'signup';
type SignupStep = 'email' | 'code' | 'profile';

// ── 회원가입 플로우 ───────────────────────────
function SignupForm() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [step, setStep] = useState<SignupStep>('email');
  const [email, setEmail] = useState('');
  const [devCode, setDevCode] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: 이메일
  const emailForm = useForm<z.infer<typeof emailSchema>>({ resolver: zodResolver(emailSchema) });
  // Step 2: 인증코드
  const codeForm = useForm<z.infer<typeof codeSchema>>({ resolver: zodResolver(codeSchema) });
  // Step 3: 프로필
  const profileForm = useForm<z.infer<typeof signupSchema>>({ resolver: zodResolver(signupSchema) });

  const sendCode = async (data: z.infer<typeof emailSchema>) => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error); return; }
      setEmail(data.email);
      if (json.devCode) setDevCode(json.devCode);
      setStep('code');
    } finally { setLoading(false); }
  };

  const verifyCode = async (data: z.infer<typeof codeSchema>) => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: data.code }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error); return; }
      setDevCode(null);
      setStep('profile');
    } finally { setLoading(false); }
  };

  const signup = async (data: z.infer<typeof signupSchema>) => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nickname: data.nickname, password: data.password }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error); return; }
      login(json.user as User);
      router.replace('/');
    } finally { setLoading(false); }
  };

  return (
    <div className="space-y-5">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-2">
        {(['email', 'code', 'profile'] as SignupStep[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step === s ? 'bg-blue-600 text-white' : i < ['email', 'code', 'profile'].indexOf(step) ? 'bg-blue-200 text-blue-700' : 'bg-gray-100 text-gray-400'}`}>
              {i + 1}
            </div>
            {i < 2 && <div className={`h-px w-8 ${i < ['email', 'code', 'profile'].indexOf(step) ? 'bg-blue-300' : 'bg-gray-200'}`} />}
          </div>
        ))}
        <span className="text-xs text-gray-400 ml-1">
          {step === 'email' ? '이메일 입력' : step === 'code' ? '인증 코드 확인' : '프로필 설정'}
        </span>
      </div>

      {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

      {/* Step 1: 이메일 */}
      {step === 'email' && (
        <form onSubmit={emailForm.handleSubmit(sendCode)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="signup-email">이메일</Label>
            <Input id="signup-email" type="email" placeholder="example@email.com" {...emailForm.register('email')} />
            {emailForm.formState.errors.email && (
              <p className="text-xs text-red-500">{emailForm.formState.errors.email.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? '전송 중...' : '인증 코드 받기'}
          </Button>
        </form>
      )}

      {/* Step 2: 인증 코드 */}
      {step === 'code' && (
        <form onSubmit={codeForm.handleSubmit(verifyCode)} className="space-y-4">
          <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
            <strong>{email}</strong>로 인증 코드를 발송했습니다.
          </div>

          {/* 개발 모드: 코드 직접 표시 */}
          {devCode && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
              <p className="text-yellow-700 font-medium">개발 모드 — 이메일 설정 전</p>
              <p className="text-yellow-600 mt-1">인증 코드: <span className="font-bold text-lg tracking-widest">{devCode}</span></p>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="code">인증 코드 6자리</Label>
            <Input
              id="code"
              placeholder="000000"
              maxLength={6}
              className="text-center text-2xl tracking-widest font-bold"
              {...codeForm.register('code')}
            />
            {codeForm.formState.errors.code && (
              <p className="text-xs text-red-500">{codeForm.formState.errors.code.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? '확인 중...' : '인증 확인'}
          </Button>

          <button type="button" className="w-full text-sm text-gray-400 hover:text-gray-600" onClick={() => { setStep('email'); setDevCode(null); }}>
            이메일 다시 입력
          </button>
        </form>
      )}

      {/* Step 3: 프로필 */}
      {step === 'profile' && (
        <form onSubmit={profileForm.handleSubmit(signup)} className="space-y-4">
          <div className="p-3 bg-green-50 rounded-lg text-sm text-green-700">
            ✓ 이메일 인증이 완료되었습니다
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="nickname">닉네임</Label>
            <Input id="nickname" placeholder="사용할 닉네임 입력" {...profileForm.register('nickname')} />
            {profileForm.formState.errors.nickname && (
              <p className="text-xs text-red-500">{profileForm.formState.errors.nickname.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" type="password" placeholder="8자 이상" {...profileForm.register('password')} />
            {profileForm.formState.errors.password && (
              <p className="text-xs text-red-500">{profileForm.formState.errors.password.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
            <Input id="passwordConfirm" type="password" placeholder="비밀번호 재입력" {...profileForm.register('passwordConfirm')} />
            {profileForm.formState.errors.passwordConfirm && (
              <p className="text-xs text-red-500">{profileForm.formState.errors.passwordConfirm.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? '가입 중...' : '회원가입 완료'}
          </Button>
        </form>
      )}
    </div>
  );
}

// ── 로그인 폼 ─────────────────────────────────
function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error); return; }
      login(json.user as User);
      router.replace('/');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

      <div className="space-y-1.5">
        <Label htmlFor="login-email">이메일</Label>
        <Input id="login-email" type="email" placeholder="example@email.com" {...register('email')} />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="login-password">비밀번호</Label>
        <Input id="login-password" type="password" placeholder="비밀번호 입력" {...register('password')} />
        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
        {loading ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
}

// ── 메인 페이지 ───────────────────────────────
function LoginPageContent() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>((searchParams.get('tab') as Tab) ?? 'login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">IT인들의 놀이터</h1>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            IT 전문가들과 함께 네트워킹하고 성장하세요
          </p>
        </div>

        {/* Tab */}
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tab === 'login' ? 'bg-white dark:bg-gray-600 shadow text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
          >
            로그인
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tab === 'signup' ? 'bg-white dark:bg-gray-600 shadow text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
          >
            회원가입
          </button>
        </div>

        {tab === 'login' ? <LoginForm /> : <SignupForm />}

        {tab === 'login' && (
          <p className="mt-5 text-center text-sm text-gray-400">
            계정이 없으신가요?{' '}
            <button onClick={() => setTab('signup')} className="text-blue-600 font-medium hover:underline">
              회원가입
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageContent />
    </Suspense>
  );
}
