
'use server';
 
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
 
const prisma = new PrismaClient();
 
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
    } else {
        return 'Invalid email or password.';
    }
  } catch (error) {
    console.error(error);
    return 'An unexpected error occurred.';
  }
  redirect('/dashboard');
}
