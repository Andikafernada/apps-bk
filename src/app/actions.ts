
'use server';
 
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
 
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
       // In a real app, you'd create a session here.
       // For now, we'll just redirect.
       redirect('/dashboard');
    } else {
        return 'Invalid email or password.';
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('CredentialsSignin')) {
        return 'Invalid email or password.';
      }
      // This will catch the REDIRECT error and is expected
      if (error.message.includes('NEXT_REDIRECT')) {
        throw error;
      }
    }
    return 'An unexpected error occurred. Please try again.';
  }
}
