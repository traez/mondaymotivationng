import { NextResponse } from "next/server";
import Quote from "@/lib/modelQuote";

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const quote = await Quote.findById(id);

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    const { _id, __v, ...plainQuote } = quote.toObject();
    const result = { mongoId: _id.toString(), ...plainQuote };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching quote by ID:", error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to fetch quote", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to fetch quote", details: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}

export { GET };