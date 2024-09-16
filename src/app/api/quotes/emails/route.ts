import { NextResponse } from "next/server";
import Quote from "@/lib/modelQuote";

async function GET() {
  try {
    const userEmails = await Quote.distinct("userEmail");
    return NextResponse.json(userEmails, { status: 200 });
  } catch (error) {
    console.error("Error fetching user emails:", error);
    
    if (error instanceof Error) {
      return NextResponse.json({ error: "Failed to fetch user emails", details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Failed to fetch user emails", details: "An unknown error occurred" }, { status: 500 });
    }
  }
}

export { GET };