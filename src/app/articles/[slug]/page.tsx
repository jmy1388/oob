
import { notFound } from 'next/navigation';
import { initializeFirebase } from '@/firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import type { Article } from '@/lib/data';
import ArticlePageContent from './ArticlePageContent';


// This function is crucial for Next.js to know which dynamic pages to build at build time.
// It fetches all articles and returns a list of slugs.
export async function generateStaticParams() {
  // We need a temporary, server-side instance of Firestore to fetch the slugs.
  // This is safe to do here as this function only runs on the server at build time.
  const { firestore } = initializeFirebase();
  const articlesCollection = collection(firestore, 'articles');
  const articlesSnapshot = await getDocs(articlesCollection);
  
  if (articlesSnapshot.empty) {
    return [];
  }

  const articles = articlesSnapshot.docs.map(doc => doc.data() as {slug: string});

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Helper function to fetch a single article on the server
async function getArticle(slug: string): Promise<Article | null> {
    const { firestore } = initializeFirebase();
    const articlesQuery = query(collection(firestore, 'articles'), where('slug', '==', slug));
    const querySnapshot = await getDocs(articlesQuery);
    
    if (querySnapshot.empty) {
        return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    // Firestore Timestamps need to be converted for client-side usage
    const firestoreTimestamp = data.createdAt as Timestamp;
    return {
        ...data,
        id: doc.id,
        createdAt: JSON.parse(JSON.stringify(firestoreTimestamp)), // Serialize timestamp
    } as Article;
}

// The main page component is now a Server Component
export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  // We pass the server-fetched data to the client component
  return <ArticlePageContent article={article} />;
}
