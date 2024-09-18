"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User } from "@/lib/typeGetSession";
import { QuoteWithMongoId } from "@/lib/typeQuote";
import { deleteQuoteById, voteQuoteById } from "@/lib/handlerQuotes";
import CommentFull from "./CommentFull";

interface QuoteItemFullProps {
  user: User | null;
  quote: QuoteWithMongoId;
}

export default function QuoteItemFull({ user, quote }: QuoteItemFullProps) {
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
      {userEmailSplit === quote.userEmail && (
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-800 text-white rounded-lg mb-4"
          onClick={handleDeleteQuote}
        >
          Delete Quote
        </button>
      )}

      {/* Replace the Comments Section with the new component */}
      <CommentFull
        user={user}
        quoteId={quote.mongoId}
        initialComments={quote.comments || []}
      />
    </div>
  );
}
