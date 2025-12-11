'use client';

import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * An invisible component that listens for globally emitted 'permission-error' events.
 * It throws any received error to be caught by Next.js's global-error.tsx.
 */
export function FirebaseErrorListener() {
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      console.error('Global permission error caught:', error);
      setError(error); // Update state to show modal
    };

    errorEmitter.on('permission-error', handleError);
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  return (
    <Dialog open={!!error} onOpenChange={(open) => !open && setError(null)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive mb-2">
            <AlertCircle className="h-6 w-6" />
            <DialogTitle>데이터 접근 오류</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            데이터를 불러오는 도중 문제가 발생했습니다.
            <br />
            <span className="text-xs text-muted-foreground mt-2 block bg-muted p-2 rounded">
              {error?.message || '권한이 없거나 네트워크 문제입니다.'}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => setError(null)}>
            닫기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
