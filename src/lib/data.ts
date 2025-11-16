
import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export interface Article {
  id:string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  imageId: string;
  authorUsername?: string;
  createdAt: string; // Should be a timestamp
  tags: string[];
  likeCount: number;
}


// Mock data is no longer the source of truth, but can be useful for placeholders or initial structure.
// We will primarily fetch from Firestore.

export const getImage = (id: string): ImagePlaceholder | undefined => {
    return PlaceHolderImages.find(img => img.id === id);
}
