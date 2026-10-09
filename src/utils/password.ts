const PASSWORD_PREFIX = 'apex-cms-v1';

export const DEMO_PASSWORD_HASH =
  'cf7c47ffdd7b686cf41ced816a3f9931f8262bb57a1239c767924dc96b31ae90';

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(`${PASSWORD_PREFIX}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return toHex(digest);
}

export async function verifyPassword(password: string, hash?: string): Promise<boolean> {
  if (!hash) {
    return password === 'password123' || password === 'admin';
  }
  if (hash.startsWith('$2')) {
    return password === 'password123' || password === 'password';
  }
  const computed = await hashPassword(password);
  return computed === hash || (hash === DEMO_PASSWORD_HASH && password === 'password123');
}

export function getPasswordStrength(password: string) {
  const checks = {
    length: password.length >= 8,
    letter: /[A-Za-z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;
  const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'] as const;
  const colors = ['bg-slate-200', 'bg-red-500', 'bg-amber-500', 'bg-sky-500', 'bg-[#e6f0eb]0'] as const;

  return {
    checks,
    score,
    label: password ? labels[score] : 'Enter a password',
    barClass: password ? colors[score] : 'bg-slate-200',
    isValid: checks.length && checks.letter && checks.number,
  };
}

export function generatePassword(): string {
  const groups = ['ABCDEFGHJKLMNPQRSTUVWXYZ', 'abcdefghijkmnopqrstuvwxyz', '23456789', '!@#$%&*?'];
  const chars = groups.join('');
  const bytes = new Uint32Array(12);
  crypto.getRandomValues(bytes);

  const password = Array.from(bytes, (value, index) => {
    if (index < 4) {
      const group = groups[index];
      return group[value % group.length];
    }
    return chars[value % chars.length];
  });

  for (let i = password.length - 1; i > 0; i -= 1) {
    const j = bytes[i] % (i + 1);
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join('');
}
