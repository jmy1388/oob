'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a summary of an article.
 *
 * The flow takes article content as input and returns a short summary of the main points.
 * It exports the `generateArticleSummary` function, the `GenerateArticleSummaryInput` type, and the `GenerateArticleSummaryOutput` type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArticleSummaryInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The full content of the article to be summarized.'),
});

export type GenerateArticleSummaryInput = z.infer<
  typeof GenerateArticleSummaryInputSchema
>;

const GenerateArticleSummaryOutputSchema = z.object({
  summary: z.string().describe('A short summary of the article.'),
});

export type GenerateArticleSummaryOutput = z.infer<
  typeof GenerateArticleSummaryOutputSchema
>;

export async function generateArticleSummary(
  input: GenerateArticleSummaryInput
): Promise<GenerateArticleSummaryOutput> {
  return generateArticleSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArticleSummaryPrompt',
  input: {schema: GenerateArticleSummaryInputSchema},
  output: {schema: GenerateArticleSummaryOutputSchema},
  prompt: `Summarize the following article in a few sentences:\n\n{{{articleContent}}}`,
});

const generateArticleSummaryFlow = ai.defineFlow(
  {
    name: 'generateArticleSummaryFlow',
    inputSchema: GenerateArticleSummaryInputSchema,
    outputSchema: GenerateArticleSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
