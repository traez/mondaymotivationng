import { NextResponse } from "next/server";
import Quote from "@/lib/modelQuote";
import { QuoteSchemaType } from "@/components/AddQuote";

async function POST(request: Request) {
  try {
    const quoteData: QuoteSchemaType = await request.json();

    const newQuote = new Quote(quoteData);
    const savedQuote = await newQuote.save();

    const { _id, __v, ...plainQuote } = savedQuote.toObject();
    const result = { mongoId: _id.toString(), ...plainQuote };

    return NextResponse.json(result, { status: 201 });
  } catch (error: unknown) {
    console.error("Error adding quote:", error);
    
    if (error instanceof Error) {
      return NextResponse.json({ error: "Failed to add quote", details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Failed to add quote", details: "An unknown error occurred" }, { status: 500 });
    }
  }
}

async function GET() {
  try {
    const quotes = await Quote.find({});
    const formattedQuotes = quotes.map((quote) => {
      const { _id, __v, ...plainQuote } = quote.toObject();
      return { mongoId: _id.toString(), ...plainQuote };
    });

    return NextResponse.json(formattedQuotes, { status: 200 });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}

export { POST, GET };
