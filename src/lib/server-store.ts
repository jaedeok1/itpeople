// 서버 인메모리 스토어 (개발/데모용)
// 실제 서비스에서는 DB로 교체

export interface StoredUser {
  id: string;
  email: string;
  nickname: string;
  password: string;
  profileImage?: string;
  role: 'admin' | 'member';
  bio?: string;
  skills: string[];
  field?: string;
  createdAt: string;
}

interface VerificationCode {
  code: string;
  expiresAt: number; // timestamp
}

// 전역 스토어 (서버 재시작 시 초기화)
declare global {
  var __userStore: Map<string, StoredUser> | undefined;
  var __codeStore: Map<string, VerificationCode> | undefined;
}

export const userStore: Map<string, StoredUser> =
  global.__userStore ?? (global.__userStore = new Map());

export const codeStore: Map<string, VerificationCode> =
  global.__codeStore ?? (global.__codeStore = new Map());

export function saveCode(email: string, code: string) {
  codeStore.set(email, {
    code,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10분
  });
}

export function verifyCode(email: string, code: string): boolean {
  const stored = codeStore.get(email);
  if (!stored) return false;
  if (Date.now() > stored.expiresAt) {
    codeStore.delete(email);
    return false;
  }
  return stored.code === code;
}

export function createUser(data: Omit<StoredUser, 'id' | 'createdAt' | 'role' | 'skills'>): StoredUser {
  const user: StoredUser = {
    id: `user_${Date.now()}`,
    role: 'member',
    skills: [],
    createdAt: new Date().toISOString(),
    ...data,
  };
  userStore.set(data.email, user);
  codeStore.delete(data.email);
  return user;
}

export function findUserByEmail(email: string): StoredUser | undefined {
  return userStore.get(email);
}
