'use client';

interface KakaoLoginButtonProps {
  className?: string;
}

export function KakaoLoginButton({ className }: KakaoLoginButtonProps) {
  const handleLogin = () => {
    window.location.href = '/api/auth/kakao';
  };

  return (
    <button
      onClick={handleLogin}
      className={`flex items-center justify-center gap-3 w-full bg-[#FEE500] hover:bg-[#F0D800] text-[#191919] font-semibold py-3 px-6 rounded-xl transition-colors duration-200 ${className ?? ''}`}
    >
      <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 0C4.029 0 0 3.168 0 7.08c0 2.496 1.647 4.692 4.14 5.952L3.06 17.1a.27.27 0 00.414.288L8.82 13.8C8.88 13.806 8.94 13.806 9 13.806c4.971 0 9-3.168 9-7.08C18 2.814 13.971 0 9 0z"
          fill="#191919"
        />
      </svg>
      카카오 로그인
    </button>
  );
}
