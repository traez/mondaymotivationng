import { NextResponse, NextRequest } from "next/server";
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
        {
          error: "Failed to fetch quote",
          details: "An unknown error occurred",
        },
        { status: 500 }
      );
    }
  }
}

async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const deletedQuote = await Quote.findByIdAndDelete(id);

    if (!deletedQuote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Quote deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting quote:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to delete quote", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Failed to delete quote",
          details: "An unknown error occurred",
        },
        { status: 500 }
      );
    }
  }
}

async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { userEmailSplit, voteType } = await request.json();

    const quote = await Quote.findById(id);

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    const isUpvoted = quote.upVotes.includes(userEmailSplit);
    const isDownvoted = quote.downVotes.includes(userEmailSplit);

    if (voteType === "up") {
      if (isUpvoted) {
        // User is canceling their upvote
        quote.upVotes = quote.upVotes.filter(
          (email: string) => email !== userEmailSplit
        );
        quote.score -= 1;
      } else {
        if (isDownvoted) {
          // User is changing from downvote to upvote
          quote.downVotes = quote.downVotes.filter(
            (email: string) => email !== userEmailSplit
          );
          quote.score += 1;
        }
        // First-time upvoter
        quote.upVotes.push(userEmailSplit);
        quote.score += 1;
      }
    } else if (voteType === "down") {
      if (isDownvoted) {
        // User is canceling their downvote
        quote.downVotes = quote.downVotes.filter(
          (email: string) => email !== userEmailSplit
        );
        quote.score += 1;
      } else {
        if (isUpvoted) {
          // User is changing from upvote to downvote
          quote.upVotes = quote.upVotes.filter(
            (email: string) => email !== userEmailSplit
          );
          quote.score -= 1;
        }
        // First-time downvoter
        quote.downVotes.push(userEmailSplit);
        quote.score -= 1;
      }
    }

    // Ensure score is always the difference between upvotes and downvotes
    quote.score = quote.upVotes.length - quote.downVotes.length;

    await quote.save();

    const { _id, __v, ...updatedQuote } = quote.toObject();
    const result = { mongoId: _id.toString(), ...updatedQuote };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating quote vote:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to update quote vote", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Failed to update quote vote",
          details: "An unknown error occurred",
        },
        { status: 500 }
      );
    }
  }
}

export { GET, DELETE, PATCH };
