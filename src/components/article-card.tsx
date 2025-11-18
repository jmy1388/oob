
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { Article } from '@/lib/data';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Skeleton } from './ui/skeleton';
import type { Timestamp } from 'firebase/firestore';
import { User } from 'lucide-react';


interface ArticleCardProps {
  article: Article;
  authorUsername?: string;
  index: number;
}

function AuthorDetails({ authorUsername, createdAt }: { authorUsername?: string, createdAt: Timestamp }) {
    if (!authorUsername) {
        return (
            <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>
        )
    }
    
    const date = createdAt.toDate();

    return (
        <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-muted text-muted-foreground flex items-center justify-center">
                <User className="h-5 w-5" />
            </Avatar>
            <div>
                <p className="font-semibold text-sm">{authorUsername}</p>
                <p className="text-xs text-muted-foreground">
                    {format(date, 'yyyy년 M월 d일', { locale: ko })}
                </p>
            </div>
        </div>
    )
}

export default function ArticleCard({ article, authorUsername, index }: ArticleCardProps) {

  return (
    <Card
      className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl animate-fade-in-up border-transparent shadow-none hover:bg-card"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="flex-grow p-4">
        <Link href={`/articles/${article.slug}`}>
          <CardTitle className="font-headline text-lg leading-tight mb-2 hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </CardTitle>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-3">{article.summary}</p>
        <div className="flex flex-wrap gap-1">
            {article.tags.slice(0, 2).map(tag => (
                <Badge key={tag} variant="secondary" className="font-normal text-xs">{tag}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AuthorDetails authorUsername={authorUsername} createdAt={article.createdAt} />
      </CardFooter>
    </Card>
  );
}
