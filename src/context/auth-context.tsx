'use client';

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User as FirebaseUser
} from 'firebase/auth';
import { doc, serverTimestamp } from 'firebase/firestore';
import { useFirebase, useUser, useDoc, useMemoFirebase, setDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase';
import type { UserProfile } from '@/lib/data';


interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  signup: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  isArticleSaved: (articleId: string) => boolean;
  toggleSaveArticle: (articleId: string) => void;
  addReadingHistory: (articleId: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { auth, firestore } = useFirebase();
  const { user, isUserLoading } = useUser();
  
  const userProfileRef = useMemoFirebase(() => user ? doc(firestore, 'users', user.uid) : null, [firestore, user]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isUserLoading || isProfileLoading);
  }, [isUserLoading, isProfileLoading]);

  const login = async (email: string, password?: string) => {
    if (!password) throw new Error("Password is required for email login.");
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (name: string, email: string, password?: string) => {
    if (!password) throw new Error("Password is required for email signup.");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (userCredential.user) {
        const newUser = userCredential.user;
        await updateProfile(newUser, { displayName: name });
        const userProfileDocRef = doc(firestore, "users", newUser.uid);
        setDocumentNonBlocking(userProfileDocRef, {
            id: newUser.uid,
            username: name,
            email: email,
            bio: '새로운 작가입니다! 제 이야기를 세상과 공유하게 되어 기쁩니다.',
            readingList: [],
        }, { merge: true });
    }
  }
  
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const googleUser = result.user;

    if (googleUser && googleUser.email) {
        const userProfileDocRef = doc(firestore, "users", googleUser.uid);
        setDocumentNonBlocking(userProfileDocRef, {
            id: googleUser.uid,
            username: googleUser.displayName || 'New User',
            email: googleUser.email,
            bio: 'Joined through Google! Excited to share my stories.',
            readingList: [],
        }, { merge: true });
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const isArticleSaved = useCallback((articleId: string) => {
    return userProfile?.readingList?.includes(articleId) ?? false;
  }, [userProfile]);

  const toggleSaveArticle = useCallback((articleId: string) => {
    if (!user || !userProfile) return;
    
    let newReadingList: string[];
    if (userProfile.readingList?.includes(articleId)) {
        newReadingList = userProfile.readingList.filter(id => id !== articleId);
    } else {
        newReadingList = [...(userProfile.readingList || []), articleId];
    }
    
    const userProfileDocRef = doc(firestore, 'users', user.uid);
    setDocumentNonBlocking(userProfileDocRef, { readingList: newReadingList }, { merge: true });

  }, [user, userProfile, firestore]);
  
  const addReadingHistory = useCallback((articleId: string) => {
      // This is a placeholder as reading history is not fully implemented in firestore yet.
      // A more robust implementation would involve a separate collection or a more complex user document structure.
  }, []);

  const value = {
      user,
      userProfile: userProfile ?? null,
      loading,
      login,
      signup,
      logout,
      signInWithGoogle,
      isArticleSaved,
      toggleSaveArticle,
      addReadingHistory,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
