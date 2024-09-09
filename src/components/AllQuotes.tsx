import { User } from "@/lib/typeGetSession";
import { QuoteWithMongoId } from "@/lib/typeQuote";
import { fetchQuotes } from "@/lib/quoteHandlers";

interface AllQuotesProps {
  user: User | null;
}

export default async function AllQuotes({ user }: AllQuotesProps) {
    const fetchedQuotes: QuoteWithMongoId[] = await fetchQuotes();
  console.log(fetchedQuotes);  

  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-4">Quotes</h2>
      <div>
        <h1>AllQuotes</h1>
      </div>
    </>
  );
}
