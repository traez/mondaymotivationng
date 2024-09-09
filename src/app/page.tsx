import { getSession } from "@/lib/getSession";
import AllQuotes from "@/components/AllQuotes";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="flex-grow flex-col items-center justify-between p-2 bg-slate-100 dark:bg-gray-500">
     <div className="">
        <div className="flex sm:gap-2 flex-col sm:flex-row text-base sm:text-2xl font-bold text-center border rounded-md">
          <span>Monday Motivation NG</span>
        </div>
        <h2 className="text-sm sm:text-xl text-center border rounded-md">
        Get yourself motivated on Monday and all days
        </h2>
        {session?.user && (
          <div className="mt-6">
            <p className="text-lg">Email: {session.user.email}</p>
            <p className="text-lg">
              Expires: {new Date(session.expires).toLocaleString()}
            </p>
          </div>
        )}
      </div>
      <AllQuotes user={session?.user || null} />
    </main>
  );
}
