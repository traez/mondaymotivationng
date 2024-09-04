import { Comment } from "./typeComment";

export interface Quote {
  userEmail: string;
  id: string;
  createdAt: string; // Format: DD/MM/YYYY
  motivation: string;
  score: number;
  upVotes: string[]; // Array of user Emails
  downVotes: string[]; // Array of user Emails
  comments?: Comment[]; // Optional array of comments
} 

export type QuoteWithMongoId = Quote & { mongoId: string };
