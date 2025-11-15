'use client';

import AuthGate from "@/components/auth-gate";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getArticlesByAuthor, getArticles, getAuthor, getImage } from "@/lib/data";
import type { Article } from "@/lib/data";
import ArticleCard from "@/components/article-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from 'next/navigation'

function ProfilePageContent() {
    const { user, savedArticles: savedArticleIds } = useAuth();
    const searchParams = useSearchParams()
    const tab = searchParams.get('tab')

    if (!user) return null;

    const userArticles = getArticlesByAuthor(user.id);
    const allArticles = getArticles();
    const savedArticles = savedArticleIds.map(id => allArticles.find(a => a.id === id)).filter((a): a is Article => !!a);

    const avatarImage = getImage(user.avatarId);
    const userInitials = user.name.split(' ').map(n => n[0]).join('');

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 text-4xl">
                    {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={user.name} data-ai-hint={avatarImage.imageHint} />}
                    <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="font-headline text-4xl md:text-5xl">{user.name}</h1>
                    <p className="mt-2 text-lg text-muted-foreground">{user.bio}</p>
                </div>
            </header>

            <Tabs defaultValue={tab || "written"} className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                    <TabsTrigger value="written">My Articles</TabsTrigger>
                    <TabsTrigger value="saved">Saved Articles</TabsTrigger>
                </TabsList>
                <TabsContent value="written" className="mt-8">
                    {userArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {userArticles.map((article, index) => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                    author={user}
                                    index={index}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-card rounded-lg shadow-sm">
                            <h3 className="font-headline text-2xl">No articles yet</h3>
                            <p className="text-muted-foreground mt-2">You haven't written any articles. Start sharing your thoughts!</p>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="saved" className="mt-8">
                    {savedArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {savedArticles.map((article, index) => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                    author={getAuthor(article.authorId)}
                                    index={index}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-card rounded-lg shadow-sm">
                            <h3 className="font-headline text-2xl">No saved articles</h3>
                            <p className="text-muted-foreground mt-2">Browse the feed and save articles to read later.</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>

        </div>
    );
}


export default function ProfilePage() {
    return (
        <AuthGate>
            <ProfilePageContent />
        </AuthGate>
    );
}
