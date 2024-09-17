import { NextResponse } from "next/server";
import Quote from "@/lib/modelQuote";

async function POST(request: Request, { params }: { params: { quoteid: string } }) {
  try {
    const { quoteid } = params;
    const commentData = await request.json();

    const quote = await Quote.findById(quoteid);
    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    // Append the new comment to the comments array
    quote.comments.push(commentData);

    // Save the updated quote document
    const updatedQuote = await quote.save();
    const { _id, __v, ...plainQuote } = updatedQuote.toObject();

    return NextResponse.json(plainQuote, { status: 201 });
  } catch (error: unknown) {
    console.error("Error adding comment:", error);
    
    if (error instanceof Error) {
      return NextResponse.json({ error: "Failed to add comment", details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Failed to add comment", details: "An unknown error occurred" }, { status: 500 });
    }
  }
}

export { POST };
