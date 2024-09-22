import { NextResponse } from "next/server";
import Quote from "@/lib/modelQuote";
import dbConnect from "@/lib/dbconnect";

async function POST(
  request: Request,
  { params }: { params: { quoteid: string } }
) {
  await dbConnect();
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

    // Destructure the saved quote
    const {
      _id: quoteId,
      __v,
      comments,
      ...plainQuote
    } = updatedQuote.toObject();

    // Format the comments to rename _id to mongoCid
    const formattedComments = comments.map((comment: any) => {
      const { _id: commentId, ...plainComment } = comment;
      return { mongoCid: commentId.toString(), ...plainComment };
    });

    // Refactor result to match the format in the original POST
    const result = {
      mongoId: quoteId.toString(),
      ...plainQuote,
      comments: formattedComments, // Return the formatted comments array
    };

    return NextResponse.json(result, { status: 201 });
  } catch (error: unknown) {
    console.error("Error adding comment:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to add comment", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Failed to add comment",
          details: "An unknown error occurred",
        },
        { status: 500 }
      );
    }
  }
}

export { POST };
