import { User } from "@/lib/typeGetSession";
import { QuoteCommentWithMongoId } from "@/lib/typeQuoteComment";
import { fetchQuotes } from "@/lib/handlerQuotes";
import QuoteItem from "./QuoteItem";

interface AllQuotesProps {
  user: User | null;
}

export default async function AllQuotes({ user }: AllQuotesProps) {
  const fetchedQuotes: QuoteCommentWithMongoId[] = await fetchQuotes();

  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold my-4">Quotes</h2>
      <article className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 w-full justify-items-center">
        {fetchedQuotes.map((entry) => (
          <QuoteItem key={entry.id} entry={entry} user={user} />
        ))}
      </article>
    </>
  );
}
