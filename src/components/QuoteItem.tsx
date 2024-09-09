"use client";
import { QuoteWithMongoId } from "@/lib/typeQuote";
import { User } from "@/lib/typeGetSession";

interface QuoteItemProps {
  entry: QuoteWithMongoId;
  user: User | null;
}

const QuoteItem: React.FC<QuoteItemProps> = ({ entry, user }) => {
  return (
    <div className="w-full gap-6 p-4 bg-[#D3EEFF] dark:bg-[#003759] text-[#003759] dark:text-[#D3EEFF] rounded-lg shadow-md border-2 border-solid border-[#003759]">
      {/* User Email */}
      <aside className="sm:col-span-1 mb-4 sm:mb-0">
        <p className="text-xl font-extrabold ">User Email:</p>
        <p className="text-sm ">{entry.userEmail}</p>
      </aside>

      {/* Created At */}
      <aside className="sm:col-span-1 mb-4 sm:mb-0">
        <p className="text-xl font-extrabold">Created At:</p>
        <p className="text-sm">{entry.createdAt}</p>
      </aside>

      {/* Motivational Quote */}
      <aside className="sm:col-span-1">
        <p className="text-xl font-extrabold">Motivational Quote:</p>
        <p className="text-sm">{entry.motivation}</p>
      </aside>

      {/* See More Button */}
      <nav className="mt-4 sm:mt-0 sm:col-span-1">
        <button className="px-4 py-2 bg-[#003759] dark:bg-[#D3EEFF] text-[#D3EEFF] dark:text-[#003759] text-sm font-medium rounded hover:bg-[#006EB1] hover:text-[#D3EEFF] focus:outline-none focus:ring-2 focus:ring-indigo-500">
          See More
        </button>
      </nav>
    </div>
  );
};

export default QuoteItem;
