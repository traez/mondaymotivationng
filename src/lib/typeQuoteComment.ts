export interface Comment {
  id: string; // Unique identifier for the comment
  voterEmail: string; // Email of the voter who left the comment
  text: string; // The actual comment text
  createdAt: string; // Date and time the comment was created
}

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
export type CommentWithMongoId = Comment & { mongoCid: string };

// Example of how to use CommentWithMongoId in a QuoteWithMongoId
export type QuoteCommentWithMongoId = Omit<QuoteWithMongoId, "comments"> & {
  comments?: CommentWithMongoId[];
};
