'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import ArticleCard from '@/components/article-card';
import { getArticles, getAuthor } from '@/lib/data';
import type { Article, User } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import { getPersonalizedArticleRecommendations } from '@/ai/flows/personalized-article-recommendations';

const allArticles = getArticles();
const allAuthors = allArticles.map(article => getAuthor(article.authorId)).filter(Boolean) as User[];

function PersonalizedFeed() {
  const { user, readingHistory } = useAuth();
  const [recommendations, setRecommendations] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && readingHistory.length > 0) {
      setIsLoading(true);
      const fetchRecommendations = async () => {
        try {
          const historyTitles = readingHistory
            .map(id => allArticles.find(a => a.id === id)?.title)
            .filter((t): t is string => !!t);

          const result = await getPersonalizedArticleRecommendations({
            readingHistory: historyTitles,
            numberOfRecommendations: 3,
          });

          const recommendedArticles = result.recommendations
            .map(title => allArticles.find(a => a.title === title))
            .filter((a): a is Article => !!a);

          setRecommendations(recommendedArticles);
        } catch (error) {
          console.error("Failed to fetch recommendations:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchRecommendations();
    } else {
      setIsLoading(false);
    }
  }, [user, readingHistory]);

  if (!user) {
    return null;
  }
  
  if (isLoading) {
      return (
        <div className="mb-12">
            <h2 className="font-headline text-3xl mb-6">Recommended For You</h2>
            <div className="flex items-center justify-center text-muted-foreground">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Finding articles you'll love...</span>
            </div>
        </div>
      )
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <h2 className="font-headline text-3xl mb-6">Recommended For You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendations.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            author={getAuthor(article.authorId)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = useMemo(() => {
    if (!searchTerm) return allArticles;
    const lowercasedTerm = searchTerm.toLowerCase();
    return allArticles.filter(article => {
      const author = getAuthor(article.authorId);
      return (
        article.title.toLowerCase().includes(lowercasedTerm) ||
        article.summary.toLowerCase().includes(lowercasedTerm) ||
        (author && author.name.toLowerCase().includes(lowercasedTerm)) ||
        article.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm))
      );
    });
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-7xl mb-4 text-primary">oob</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
      </header>

      <div className="mb-12 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles by title, author, or tag..."
            className="pl-10 w-full h-12 text-base rounded-full shadow-sm"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <PersonalizedFeed />

      <div>
        <h2 className="font-headline text-3xl mb-6">
          {searchTerm ? 'Search Results' : 'All Articles'}
        </h2>
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                author={getAuthor(article.authorId)}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-lg">
            <p className="text-muted-foreground text-lg">No articles found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
