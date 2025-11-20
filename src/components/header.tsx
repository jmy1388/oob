
'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import Logo from './logo';
import { Skeleton } from './ui/skeleton';
import SearchInput from './search-input';

function SearchInputFallback() {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  )
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className='mr-4 flex'>
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
           <Suspense fallback={<SearchInputFallback />}>
              <SearchInput />
           </Suspense>
        </div>
      </div>
    </header>
  );
}
