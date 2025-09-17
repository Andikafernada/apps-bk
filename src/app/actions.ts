
'use server';
 
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import bcrypt from 'bcrypt';
import { createSession, deleteSession } from '@/lib/session';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const { email, password } = Object.fromEntries(formData);
    
    const user = await prisma.user.findUnique({
      where: { email: email.toString() },
    });
 
    if (!user) {
      return 'Invalid email or password.';
    }
 
    const passwordsMatch = await bcrypt.compare(password.toString(), user.password);
 
    if (passwordsMatch) {
       await createSession(user.id);
       redirect('/dashboard');
    } else {
        return 'Invalid email or password.';
    }
  } catch (error) {
    if (error instanceof Error) {
      // This will catch the REDIRECT error and is expected
      if (error.message.includes('NEXT_REDIRECT')) {
        throw error;
      }
      if (error.message.includes('CredentialsSignin')) {
        return 'Invalid email or password.';
      }
    }
    return 'An unexpected error occurred. Please try again.';
  }
}

export async function logout() {
  await deleteSession();
  redirect('/');
}
