import { Metadata } from "next";
import QuoteItemFull from "@/components/QuoteItemFull";
import { fetchQuoteById } from "@/lib/handlerQuotes";
import { QuoteWithMongoId } from "@/lib/typeQuote";
import { getSession } from "@/lib/getSession";

export const metadata: Metadata = {
  title: "Motivation ID Page - Monday Motivation NG",
  description: "Created by Trae Zeeofor",
};

export default async function MotivationPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const fetchedQuote: QuoteWithMongoId = await fetchQuoteById(params.id);

  return (
    <div className="flex flex-grow flex-col justify-start gap-4 sm:gap-8 p-4 bg-slate-100 dark:bg-gray-500">
      <h1 className="text-base sm:text-2xl font-bold text-center border rounded-md">
        MotivationPage Page
      </h1>
      <QuoteItemFull user={session?.user || null} quote={fetchedQuote} />
    </div>
  );
}
