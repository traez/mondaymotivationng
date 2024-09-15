import { NextResponse } from "next/server";
import Quote from "@/lib/modelQuote";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userEmail = url.searchParams.get('userEmail');

    if (!userEmail) {
      return NextResponse.json({ error: "User email is required" }, { status: 400 });
    }

    const quotes = await Quote.find({ userEmail });
    const plainQuotes = quotes.map((quote) => {
      const { _id, __v, ...plainQuote } = quote.toObject();
      return { mongoId: _id.toString(), ...plainQuote };
    });

    return NextResponse.json(plainQuotes, { status: 200 });
  } catch (error) {
    console.error("Error fetching quotes by user email:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to fetch quotes", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Failed to fetch quotes",
          details: "An unknown error occurred",
        },
        { status: 500 }
      );
    }
  }
}
