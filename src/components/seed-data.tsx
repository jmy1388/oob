
'use client';

import { useEffect, useState } from 'react';
import { useFirebase } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { seedArticles } from '@/lib/seed';

// This component will run once on mount, check if articles exist,
// and if not, it will seed the database.
export function SeedData() {
  const { firestore } = useFirebase();
  const [isSeeding, setIsSeeding] = useState(false);
  const [hasSeeded, setHasSeeded] = useState(false);

  useEffect(() => {
    // Prevent seeding more than once per client session
    if (!firestore || isSeeding || hasSeeded) {
      return;
    }

    const checkAndSeed = async () => {
      setIsSeeding(true);
      try {
        const articlesCollection = collection(firestore, 'articles');
        const snapshot = await getDocs(articlesCollection);
        
        if (snapshot.empty) {
          console.log('No articles found. Seeding database...');
          await seedArticles(firestore);
          console.log('Database seeded.');
        } else {
          console.log('Articles already exist. Skipping seed.');
        }
      } catch (error) {
        console.error('Error during seeding check:', error);
      } finally {
        setIsSeeding(false);
        setHasSeeded(true); // Mark as seeded to prevent re-runs
      }
    };

    checkAndSeed();

  }, [firestore, isSeeding, hasSeeded]);

  // This component does not render anything.
  return null;
}
