
'use client';

import { useEffect, useState } from 'react';
import { useFirebase } from '@/firebase';
import { collection, getDocs, writeBatch } from 'firebase/firestore';
import { seedArticles } from '@/lib/seed';

// This component will run once on mount, check if articles exist,
// and if not, it will seed the database.
export function SeedData() {
  const { firestore } = useFirebase();
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    if (!firestore || isSeeding) {
      return;
    }

    const reseedDatabase = async () => {
      setIsSeeding(true);
      try {
        console.log('Reseeding database with fresh data...');
        const articlesCollection = collection(firestore, 'articles');
        const snapshot = await getDocs(articlesCollection);
        
        // Delete all existing documents in the articles collection
        if (!snapshot.empty) {
            const deleteBatch = writeBatch(firestore);
            snapshot.docs.forEach(doc => {
                deleteBatch.delete(doc.ref);
            });
            await deleteBatch.commit();
            console.log('Existing articles deleted.');
        }

        // Seed the database with new articles
        await seedArticles(firestore);
        console.log('Database has been re-seeded.');

      } catch (error) {
        console.error('Error during database re-seeding:', error);
      } finally {
        setIsSeeding(false);
      }
    };

    // We will re-seed every time the app loads in this development environment
    // to ensure date changes are always reflected.
    reseedDatabase();

  }, [firestore, isSeeding]);

  // This component does not render anything.
  return null;
}
