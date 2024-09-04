export interface Comment {
    id: string; // Unique identifier for the comment
    voterEmail: string; // Email of the voter who left the comment
    text: string; // The actual comment text
    createdAt: string; // Date and time the comment was created
  }