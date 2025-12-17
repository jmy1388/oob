'use client';

// src/app/articles/[slug]/page.tsx

// ✅ [핵심] 빌드 시점에 미리 페이지를 만들지 않도록 강제합니다. (배포 오류 해결)
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useArticleDetail } from '@/hooks/useArticles';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFirebase } from '@/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const slug = params?.slug as string;
  const { article, loading } = useArticleDetail(slug);

  const { firestore, auth } = useFirebase();
  const [user, setUser] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (auth) {
      const unsub = onAuthStateChanged(auth, setUser);
      return () => unsub();
    }
  }, [auth]);

  const handleDelete = async () => {
    if (!article || !firestore || !user) return;
    if (!confirm('정말로 이 글을 삭제하시겠습니까?')) return;

    setIsDeleting(true);
    try {
      await deleteDoc(doc(firestore, 'articles', article.id));
      toast({ title: '삭제 완료', description: '글이 삭제되었습니다.' });
      router.push('/');
    } catch (error) {
      console.error('Delete failed', error);
      toast({ variant: 'destructive', title: '삭제 실패', description: '권한이 없거나 오류가 발생했습니다.' });
    } finally {
      setIsDeleting(false);
    }
  };

  // 로딩 중일 때 표시
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // 글이 없을 때 표시
  if (!article) {
    return (
      <div className="container mx-auto py-20 text-center px-4">
        <h1 className="text-2xl font-bold mb-4">글을 찾을 수 없습니다.</h1>
        <p className="text-muted-foreground mb-8">삭제되었거나 존재하지 않는 페이지입니다.</p>
        <Link href="/" className="text-primary hover:underline">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  // 글 상세 내용 표시
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="mb-6">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← 목록으로 돌아가기
        </Link>
      </div>

      <header className="mb-8 border-b border-border pb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground break-keep leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center justify-between text-muted-foreground text-sm">

          {user && user.uid === article.authorId && (
            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? '삭제 중...' : '삭제하기'}
              </Button>
            </div>
          )}
        </div>

        {/* TEMPORARY DEBUG INFO */}
        <div className="mt-2 p-2 bg-slate-100 text-xs text-slate-500 rounded font-mono">
          <p>DEBUG INFO (나중에 지울 예정):</p>
          <p>My UID: {user ? user.uid : 'Not logged in'}</p>
          <p>Author ID: {article.authorId || 'None'}</p>
          <p>Match?: {user && user.uid === article.authorId ? 'YES' : 'NO'}</p>
        </div>
      </header>

      <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <div className="whitespace-pre-wrap leading-relaxed text-foreground min-h-[200px]">
          {article.content}
        </div>
      </article>

      {article.tags && article.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap pt-6 border-t border-border">
          {article.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}


