import { Metadata } from "next";
import { getSession } from "@/lib/getSession";
import UserListQuotes from "@/components/UserListQuotes";

export const metadata: Metadata = {
  title: "Users Page - Monday Motivation NG",
  description: "Created by Trae Zeeofor",
};

export default async function UsersPage() {
  const session = await getSession();

  return (
    <div className="flex flex-grow flex-col justify-start gap-4 p-2 bg-slate-100 dark:bg-gray-500">
      <div className="flex sm:gap-2 flex-col sm:flex-row text-base sm:text-2xl font-bold text-center border rounded-md">
        <span>View Motivational Quotes By User</span>
      </div>
      <UserListQuotes user={session?.user || null} />
    </div>
  );
}
