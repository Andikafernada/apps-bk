
import type { ReactNode } from 'react';
import AppSidebar from '@/components/app-sidebar';
import AppHeader from '@/components/app-header';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect('/');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true, email: true, avatarId: true }
  });

  if (!user) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <AppHeader user={user} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
        <footer className="text-center text-sm text-muted-foreground p-4">
          Copyright © {new Date().getFullYear()} Andika Fernanda
        </footer>
      </div>
    </div>
  );
}
