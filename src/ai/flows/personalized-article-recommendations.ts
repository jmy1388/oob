'use server';

/**
 * @fileOverview Personalized article recommendations based on reading history.
 *
 * - getPersonalizedArticleRecommendations - A function that returns personalized article recommendations.
 * - PersonalizedArticleRecommendationsInput - The input type for the getPersonalizedArticleRecommendations function.
 * - PersonalizedArticleRecommendationsOutput - The return type for the getPersonalizedArticleRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedArticleRecommendationsInputSchema = z.object({
  readingHistory: z
    .array(z.string())
    .describe('An array of article titles the user has read.'),
  numberOfRecommendations: z
    .number()
    .default(5)
    .describe('The number of article recommendations to return.'),
});

export type PersonalizedArticleRecommendationsInput = z.infer<
  typeof PersonalizedArticleRecommendationsInputSchema
>;

const PersonalizedArticleRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of recommended article titles.'),
});

export type PersonalizedArticleRecommendationsOutput = z.infer<
  typeof PersonalizedArticleRecommendationsOutputSchema
>;

export async function getPersonalizedArticleRecommendations(
  input: PersonalizedArticleRecommendationsInput
): Promise<PersonalizedArticleRecommendationsOutput> {
  return personalizedArticleRecommendationsFlow(input);
}

const getRecommendationsFromHistory = ai.defineTool({
  name: 'getRecommendationsFromHistory',
  description: 'Retrieves article recommendations based on a users reading history.',
  inputSchema: z.object({
    readingHistory: z.array(z.string()).describe('The user reading history'),
  }),
  outputSchema: z.array(z.string()),
},
async (input) => {
    // In a real application, this would call a service that fetches
    // article recommendations from a database or external API based on the
    // user's reading history.
    // This mock implementation just returns some canned recommendations.
    const cannedRecommendations = [
      'The Future of AI in Healthcare',
      'Sustainable Energy Solutions for Urban Development',
      'The Art of Mindful Living',
      'The Science of Cooking',
      'Exploring the Wonders of the Deep Sea',
    ];

    // Filter out articles already in the reading history to avoid recommending them again.
    const newRecommendations = cannedRecommendations.filter(
        (recommendation) => !input.readingHistory.includes(recommendation)
    );

    return newRecommendations;
  }
);

const prompt = ai.definePrompt({
  name: 'personalizedArticleRecommendationsPrompt',
  tools: [getRecommendationsFromHistory],
  input: {schema: PersonalizedArticleRecommendationsInputSchema},
  output: {schema: PersonalizedArticleRecommendationsOutputSchema},
  prompt: `Based on the users reading history: {{{readingHistory}}},
  recommend {{numberOfRecommendations}} articles using the getRecommendationsFromHistory tool.  Return the recommendations as a list of article titles.`, 
});

const personalizedArticleRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedArticleRecommendationsFlow',
    inputSchema: PersonalizedArticleRecommendationsInputSchema,
    outputSchema: PersonalizedArticleRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
