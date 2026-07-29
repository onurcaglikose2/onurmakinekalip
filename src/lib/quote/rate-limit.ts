type Attempt = { count: number; resetAt: number };

const quoteAttempts = new Map<string, Attempt>();
const uploadAttempts = new Map<string, Attempt>();

function check(
  attempts: Map<string, Attempt>,
  identifier: string,
  limit: number,
  windowMs: number,
  now: number,
) {
  const current = attempts.get(identifier);

  if (!current || current.resetAt <= now) {
    attempts.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfter: 0 };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  return {
    allowed: true,
    remaining: limit - current.count,
    retryAfter: 0,
  };
}

export function checkRateLimit(identifier: string, now = Date.now()) {
  return check(quoteAttempts, identifier, 5, 10 * 60 * 1000, now);
}

export function checkUploadRateLimit(identifier: string, now = Date.now()) {
  return check(uploadAttempts, identifier, 10, 10 * 60 * 1000, now);
}
