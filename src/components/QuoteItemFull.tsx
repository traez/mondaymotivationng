import { User } from "@/lib/typeGetSession";
import { QuoteWithMongoId } from "@/lib/typeQuote";

interface QuoteItemFullProps {
  user: User | null;
  quote: QuoteWithMongoId;
}

export default async function QuoteItemFull({
  user,
  quote,
}: QuoteItemFullProps) {
  return (
    <div>
      <h1>QuoteItemFull</h1>
    </div>
  );
}
