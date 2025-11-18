
'use client';

import { useEffect, useState } from 'react';
import { useFirebase } from '@/firebase';
import { collection, getDocs, writeBatch, query, deleteDoc } from 'firebase/firestore';
import { seedArticles } from '@/lib/seed';

// This component will run once on mount, check if articles exist,
// and if not, it will seed the database.
export function SeedData() {
  const { firestore } = useFirebase();
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    if (!firestore) {
      return;
    }

    const checkAndSeedDatabase = async () => {
      if (isSeeding) return;

      setIsSeeding(true);
      try {
        console.log('Force re-seeding database...');
        const articlesCollection = collection(firestore, 'articles');
        const q = query(articlesCollection);
        const snapshot = await getDocs(q);

        // Delete all existing documents in the articles collection
        if (!snapshot.empty) {
            console.log(`Deleting ${snapshot.size} existing articles...`);
            const deleteBatch = writeBatch(firestore);
            snapshot.docs.forEach(doc => {
                deleteBatch.delete(doc.ref);
            });
            await deleteBatch.commit();
            console.log('Existing articles deleted.');
        }

        // Seed with new data
        console.log('Seeding database with new initial data...');
        await seedArticles(firestore);
        console.log('Database has been re-seeded.');

      } catch (error) {
        console.error('Error during database seed process:', error);
      } finally {
        setIsSeeding(false);
      }
    };

    checkAndSeedDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firestore]);

  // This component does not render anything.
  return null;
}
