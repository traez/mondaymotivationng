import { Metadata } from "next";
import { getSession } from "@/lib/getSession";
import AddQuote from "@/components/AddQuote";

export const metadata: Metadata = {
    title: "Create Page - Monday Motivation NG",
    description: "Created by Trae Zeeofor",
  };

export default async function AddPage() {
    const session = await getSession();
    const userEmail = session?.user?.email;

  return (
    <div className="flex-grow p-4">
      {session?.user ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Add a New Quote</h1>
          <AddQuote userEmail={userEmail}/>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
          <p className="mb-4">
            Please log in with GitHub or Google to add a new Quote.
          </p>
        </div>
      )}
    </div>
  )
}

