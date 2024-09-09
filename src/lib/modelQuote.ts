import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  voterEmail: { type: String, required: true },
  text: { type: String, required: true, maxlength: 300 },
  createdAt: { type: String, required: true }, // Format: DD/MM/YYYY
});

const  quoteSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  id: { type: String, required: true },
  createdAt: { type: String, required: true }, // Format: DD/MM/YYYY
  motivation: { type: String, required: true },
  score: { type: Number, required: true, default: 0 },
  upVotes: { type: [String], default: [] }, // Array of user emails
  downVotes: { type: [String], default: [] }, // Array of user emails
  comments: { type: [commentSchema], default: [] }, // Optional array of comments
});

const Quote = mongoose.models.Quote || mongoose.model("Quote", quoteSchema);

export default Quote;
