'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import AuthGate from '@/components/auth-gate';
import { addArticle } from '@/lib/data';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const articleSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }).max(100),
  summary: z.string().min(20, { message: 'Summary must be at least 20 characters.' }).max(200),
  content: z.string().min(100, { message: 'Content must be at least 100 characters.' }),
  tags: z.string().refine(value => value.split(',').every(tag => tag.trim().length > 0), {
    message: 'Please provide comma-separated tags.',
  }),
});

function SubmitPageContent() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: { title: '', summary: '', content: '', tags: '' },
  });

  function onSubmit(values: z.infer<typeof articleSchema>) {
    if (!user) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to submit an article.' });
        return;
    }
    const newArticle = addArticle({
        ...values,
        authorId: user.id,
        imageId: `article-${Math.ceil(Math.random() * 5)}`, // Random image for now
        tags: values.tags.split(',').map(tag => tag.trim()),
    });
    
    toast({ title: 'Article submitted!', description: 'Your article has been published.' });
    router.push(`/articles/${newArticle.slug}`);
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Submit an Article</CardTitle>
          <CardDescription>Share your story with the world. Fill out the form below to publish your article.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="The Future of Everything" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Summary</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A brief, one-paragraph summary of your article." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Content</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[300px]" placeholder="Write your full article here. You can use line breaks for paragraphs." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="Technology, Philosophy, Art" {...field} />
                    </FormControl>
                     <p className="text-sm text-muted-foreground">
                        Provide a comma-separated list of tags.
                     </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full md:w-auto" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Publishing...' : 'Publish Article'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SubmitPage() {
    return (
        <AuthGate>
            <SubmitPageContent />
        </AuthGate>
    )
}
