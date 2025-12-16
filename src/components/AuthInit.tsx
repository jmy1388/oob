'use client';

import { useEffect } from 'react';
import { initializeFirebase } from '@/firebase';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';

export default function AuthInit() {
    useEffect(() => {
        // Initialize Firebase and get auth instance
        const { auth } = initializeFirebase();

        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                try {
                    await signInAnonymously(auth);
                    console.log("Anonymous auth successful");
                } catch (error) {
                    console.error("Anonymous auth failed", error);
                }
            }
        });
        return () => unsub();
    }, []);

    return null;
}
