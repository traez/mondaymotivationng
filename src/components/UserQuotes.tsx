"use client";
import { useState, useEffect } from "react";
import { User } from "@/lib/typeGetSession";
import { fetchQuotesByUserEmail } from "@/lib/handlerQuotes";
import { QuoteWithMongoId } from "@/lib/typeQuoteComment";
import QuoteItem from "./QuoteItem";

interface UserQuotesProps {
  userEmails: string[];
  user: User | null;
}

export default function UserQuotes({ userEmails, user }: UserQuotesProps) {
  const [selectedEmail, setSelectedEmail] = useState<string>("Select User");
  const [quotes, setQuotes] = useState<QuoteWithMongoId[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedEmail !== "Select User") {
      setLoading(true); // Start loading
      const fetchQuotes = async () => {
        try {
          const fetchedQuotes = await fetchQuotesByUserEmail(selectedEmail);
          setQuotes(fetchedQuotes);
        } catch (error) {
          console.error("Error fetching quotes:", error);
        } finally {
          setLoading(false); // Stop loading
        }
      };

      fetchQuotes();
    }
  }, [selectedEmail]);

  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold my-4">Select User</h2>
      <select
        value={selectedEmail}
        onChange={(e) => setSelectedEmail(e.target.value)}
        className="p-2 border rounded text-xl sm:text-2xl font-bold w-72"
      >
        <option value="Select User">Select User</option>
        {userEmails.map((email) => (
          <option key={email} value={email}>
            {email}
          </option>
        ))}
      </select>
      {loading ? (
        <p>Loading quotes...</p> 
      ) : selectedEmail !== "Select User" ? (
        <>
          <h2 className="text-xl sm:text-2xl font-bold my-4">
            Quotes by {selectedEmail}
          </h2>
          <article className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 w-full justify-items-center">
            {quotes.map((quote) => (
              <QuoteItem key={quote.mongoId} entry={quote} user={user} />
            ))}
          </article>
        </>
      ) : null}
    </>
  );
}
