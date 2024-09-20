"use client";
import Link from 'next/link';
import { QuoteWithMongoId } from "@/lib/typeQuoteComment";
import { User } from "@/lib/typeGetSession";

interface QuoteItemProps {
  entry: QuoteWithMongoId;
  user: User | null;
}

const QuoteItem: React.FC<QuoteItemProps> = ({ entry, user }) => {
  return (
    <div className="w-72 h-[470px] flex flex-col justify-between gap-4 p-4 bg-[#D3EEFF] dark:bg-[#003759] text-[#003759] dark:text-[#D3EEFF] rounded-lg shadow-md border-2 border-solid border-[#003759]">
      {/* User Email */}
      <aside className="flex flex-col">
        <p className="text-xl font-extrabold">User Email:</p>
        <p className="text-sm">{entry.userEmail}</p>
      </aside>

      {/* Created At */}
      <aside className="flex flex-col">
        <p className="text-xl font-extrabold">Created At:</p>
        <p className="text-sm">{entry.createdAt}</p>
      </aside>

      {/* Motivational Quote */}
      <nav className="flex flex-col rounded-lg shadow-md border-2 border-solid border-[#003759] dark:border-[#D3EEFF] p-1 h-[219px]">
        <p className="text-xl font-extrabold">Motivational Quote:</p>
        <p className="text-sm">{entry.motivation}</p>
      </nav>

      {/* See More Button */}
     <menu className="flex justify-between items-center">
        <Link href={`/motivation/${entry.mongoId}`} className="px-4 py-2 bg-[#003759] dark:bg-[#006EB1] text-[#D3EEFF] text-sm font-medium rounded hover:bg-[#0BA3FF] focus:outline-none focus:ring-2 focus:ring-indigo-500">
          See More
        </Link>
        <div className="flex flex-col items-center">
          <b className="text-2xl font-bold">{entry.score}</b>
          <span className="text-sm">Score</span>
        </div>
      </menu>
    </div>
  );
};

export default QuoteItem;
