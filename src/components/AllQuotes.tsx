import { User } from "@/lib/typeGetSession";
import { QuoteWithMongoId } from "@/lib/typeQuote";
import { fetchQuotes } from "@/lib/quoteHandlers";
import QuoteItem from "./QuoteItem";

interface AllQuotesProps {
  user: User | null;
}

export default async function AllQuotes({ user }: AllQuotesProps) {
  const fetchedQuotes: QuoteWithMongoId[] = await fetchQuotes();

  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-4">Quotes</h2>
      <ul className="space-y-4">
        {fetchedQuotes.map((entry) => (
          <QuoteItem key={entry.id} entry={entry} user={user} />
        ))}
      </ul>
    </>
  );
}
