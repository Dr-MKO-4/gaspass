// src/types/BlogPost.ts
export interface BlogPost {
  id: number;
  title: string;
  excerpt?: string;
  date: string;
  image: string;
  imageCaption?: string;
  author: string;
  content: string | string[];
  category: string;
  likes?: number;
  comments?: number;
  tags?: string[];
  readingTime: number;
}