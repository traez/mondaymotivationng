"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User } from "@/lib/typeGetSession";
import { QuoteWithMongoId } from "@/lib/typeQuote";
import { deleteQuoteById, voteQuoteById } from "@/lib/quoteHandlers";

interface QuoteItemFullProps {
  user: User | null;
  quote: QuoteWithMongoId;
}

export default function QuoteItemFull({ user, quote }: QuoteItemFullProps) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(quote.comments);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentText, setEditedCommentText] = useState(""); 
  const userEmailSplit = user?.email.split("@")[0] || "Anonymous";
  const router = useRouter();

  const handleVote = async (type: "up" | "down", userEmailSplit: string) => {
    if (!user) {
      toast.error("You must be signed in to vote.");
      return;
    }

    try {
      await voteQuoteById(quote.mongoId, userEmailSplit, type);
      if (type === "up") {
        toast.success("Upvote successful");
      } else {
        toast.success("Downvote successful");
      }
      // Refresh the route to update the data
      router.refresh();
    } catch (error) {
      toast.error("Failed to process vote");
      console.error("Error voting on quote:", error);
    }
  };

  const handleDeleteQuote = async () => {
    if (!user) {
      toast.error("You must be signed in to delete a quote.");
      return;
    }

    if (userEmailSplit !== quote.userEmail) {
      toast.error("You can only delete your own quotes.");
      return;
    }

    try {
      await deleteQuoteById(quote.mongoId);
      toast.success("Quote deleted successfully");
      router.replace("/?timestamp=" + new Date().getTime());
    } catch (error) {
      toast.error("Failed to delete quote");
      console.error("Error deleting quote:", error);
    }
  };

  const handleAddComment = () => {
    /*   if (commentText.trim()) {
      const newComment = {
        id: new Date().toISOString(),
        voterEmail: user?.email || "Anonymous",
        text: commentText,
        createdAt: new Date().toLocaleDateString("en-GB"),
      };
      setComments([...comments, newComment]);
      setCommentText("");
    } */
  };

  const handleEditComment = (commentId: string) => {
   /*  const commentToEdit = comments?.find((comment) => comment.id === commentId);
    if (commentToEdit) {
      setEditingCommentId(commentId);
      setEditedCommentText(commentToEdit.text);
    } */
  };

  const handleSaveComment = () => {
/*     if (editingCommentId) {
      const updatedComments = comments?.map((comment) =>
        comment.id === editingCommentId
          ? { ...comment, text: editedCommentText }
          : comment
      );
      setComments(updatedComments);
      setEditingCommentId(null);
      setEditedCommentText("");
    } */
  };

  const handleDeleteComment = (commentId: string) => {
  /*   setComments(comments?.filter((comment) => comment.id !== commentId)); */
  };

  return (
    <div className="p-6 bg-[#D3EEFF] dark:bg-[#003759] text-[#003759] dark:text-[#D3EEFF] rounded-lg shadow-lg border-2 border-solid border-[#003759]">
      {/* User Email */}
      <aside className="mb-4">
        <p className="text-xl font-bold">User Email:</p>
        <p className="text-sm">{quote.userEmail}</p>
      </aside>

      {/* Created At */}
      <aside className="mb-4">
        <p className="text-xl font-bold">Created At:</p>
        <p className="text-sm">{quote.createdAt}</p>
      </aside>

      {/* Motivational Quote */}
      <section className="mb-4 p-2 rounded-lg shadow-md border-2 border-solid border-[#003759] dark:border-[#D3EEFF]">
        <p className="text-xl font-bold">Motivational Quote:</p>
        <p className="text-sm">{quote.motivation}</p>
      </section>

      {/* Score */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-800 text-white rounded-lg"
          onClick={() => handleVote("up", userEmailSplit)}
        >
          Upvote
        </button>
        <div className="text-2xl font-bold">{quote.score}</div>
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-800 text-white rounded-lg"
          onClick={() => handleVote("down", userEmailSplit)}
        >
          Downvote
        </button>
      </div>

      {/* UpVotes List */}
      <div className="mb-4">
        <p className="text-lg font-bold">Upvoted by:</p>
        <ul className="text-sm">
          {quote.upVotes.map((email, idx) => (
            <li key={idx}>{email}</li>
          ))}
        </ul>
      </div>

      {/* DownVotes List */}
      <div className="mb-4">
        <p className="text-lg font-bold">Downvoted by:</p>
        <ul className="text-sm">
          {quote.downVotes.map((email, idx) => (
            <li key={idx}>{email}</li>
          ))}
        </ul>
      </div>

      {/* Delete Quote Button */}
      <button
        className="px-4 py-2 bg-red-500 hover:bg-red-800 text-white rounded-lg mb-4"
        onClick={handleDeleteQuote}
      >
        Delete Quote
      </button>

      {/* Comments Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Comments:</h2>

        {/* Add Comment */}
        <div className="mt-4 flex flex-col">
          <textarea
            className="p-2 border border-gray-300 rounded-md mb-2 bg-gray-100 text-gray-700"
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
          ></textarea>
          <button
            className="self-end px-4 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg"
            onClick={handleAddComment}
          >
            Submit
          </button>
        </div>

        {/* Comment List */}
        <ul className="mt-4 space-y-4">
          {comments?.map((comment) => (
            <li
              key={comment.id}
              className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
            >
              {editingCommentId === comment.id ? (
                <div>
                  <textarea
                    className="p-2 border border-gray-300 rounded-md mb-2"
                    rows={3}
                    value={editedCommentText}
                    onChange={(e) => setEditedCommentText(e.target.value)}
                  ></textarea>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    onClick={handleSaveComment}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-sm mb-2">{comment.text}</p>
                  <div className="flex justify-between items-center">
                    <small className="text-gray-500">
                      By: {comment.voterEmail} on {comment.createdAt}
                    </small>
                    {user && user.email === comment.voterEmail && (
                      <div className="space-x-2">
                        <button
                          className="text-blue-500"
                          onClick={() => handleEditComment(comment.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
