
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_COOKIE_NAME = 'bk_pasundan_session';
// In a real production app, this should be a long, complex secret stored in environment variables
const SESSION_SECRET = process.env.SESSION_SECRET || 'a-very-insecure-default-secret-for-development';


// A very simple session implementation.
// In a real app, use a robust library like next-auth or iron-session.

type SessionPayload = {
  userId: string;
  expires: Date;
};

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const session: SessionPayload = { userId, expires };

  // For this simple example, we'll just store the JSON string.
  // A real implementation MUST sign or encrypt this payload.
  cookies().set(SESSION_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const session = JSON.parse(sessionCookie) as SessionPayload;
    
    // Check for expiration
    if (new Date(session.expires) < new Date()) {
      await deleteSession();
      return null;
    }

    return session;
  } catch (error) {
    console.error('Failed to parse session cookie:', error);
    return null;
  }
}

export async function deleteSession() {
  cookies().delete(SESSION_COOKIE_NAME);
}
