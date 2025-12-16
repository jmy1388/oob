'use client';

import { useEffect, useState } from 'react';
import { useFirebase } from '@/firebase';
import { seedArticles } from '@/lib/seed';
import { onAuthStateChanged, User } from 'firebase/auth';

// This component is responsible for seeding the database with initial data
// if it's empty. It runs once on the client side only after user is authenticated.
export default function SeedData() {
  const { firestore, auth } = useFirebase();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, [auth]);

  useEffect(() => {
    if (firestore && user) {
      seedArticles(firestore, user.uid);
    }
  }, [firestore, user]);

  return null; // This component doesn't render anything.
}