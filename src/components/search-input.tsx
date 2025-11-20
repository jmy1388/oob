
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    // Always navigate to the home page for searching
    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      {isSearchOpen ? (
        <form onSubmit={handleSearchSubmit} className="absolute left-0 w-full px-4 sm:px-6 flex items-center gap-2 animate-fade-in-up">
           <Search className="absolute left-7 sm:left-9 h-5 w-5 text-muted-foreground" />
           <Input 
              type="search"
              placeholder="제목, 내용, 작가 또는 태그로 검색"
              className="pl-10 w-full h-10 text-base rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
           />
           <Button type="button" variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
              <X className="h-5 w-5"/>
           </Button>
        </form>
      ) : (
        <div className={cn('flex items-center space-x-2 transition-opacity', isSearchOpen ? 'opacity-0' : 'opacity-100')}>
            <Button asChild variant="ghost">
              <Link href="/submit">
                <PlusCircle className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">글쓰기</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">검색</span>
            </Button>
        </div>
      )}
    </>
  );
}
