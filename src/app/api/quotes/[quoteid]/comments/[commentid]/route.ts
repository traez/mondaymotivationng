import { NextResponse } from "next/server";
import Quote from "@/lib/modelQuote";

async function DELETE(
  request: Request,
  { params }: { params: { quoteid: string; commentid: string } }
) {
  try {
    const { quoteid, commentid } = params;

    // Find the quote
    const quote = await Quote.findById(quoteid);

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    // Find the index of the comment to be deleted
    const commentIndex = quote.comments.findIndex(
      (comment: any) => comment._id.toString() === commentid
    );

    if (commentIndex === -1) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Remove the comment from the array
    quote.comments.splice(commentIndex, 1);

    // Save the updated quote document
    await quote.save();

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting comment:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to delete comment", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Failed to delete comment",
          details: "An unknown error occurred",
        },
        { status: 500 }
      );
    }
  }
}

export { DELETE };