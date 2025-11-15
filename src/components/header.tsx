'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import Logo from './logo';
import { UserNav } from './user-nav';
import { PlusCircle } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export default function Header() {
  const { user, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          {!isClient || loading ? (
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          ) : user ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/submit">
                  <PlusCircle className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">글쓰기</span>
                </Link>
              </Button>
              <UserNav />
            </>
          ) : (
            <Button asChild>
              <Link href="/login">로그인 / 회원가입</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
