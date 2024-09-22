import { NextResponse, NextRequest } from "next/server";
import Quote from "@/lib/modelQuote";
import dbConnect from "@/lib/dbconnect";

async function GET(
  request: Request,
  { params }: { params: { quoteid: string } }
) {
  await dbConnect();
  try {
    const { quoteid } = params;
    const quote = await Quote.findById(quoteid);

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    // Destructure the quote object
    const { _id: quoteId, __v, comments, ...plainQuote } = quote.toObject();

    // Format the comments to rename _id to mongoCid
    const formattedComments = comments.map((comment: any) => {
      const { _id: commentId, ...plainComment } = comment;
      return { mongoCid: commentId.toString(), ...plainComment };
    });

    // Return the formatted quote with mongoId and formatted comments
    const result = {
      mongoId: quoteId.toString(),
      ...plainQuote,
      comments: formattedComments,
    };

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
  { params }: { params: { quoteid: string } }
) {
  await dbConnect();
  try {
    const { quoteid } = params;
    const deletedQuote = await Quote.findByIdAndDelete(quoteid);

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
  { params }: { params: { quoteid: string } }
) {
  await dbConnect();
  try {
    const { quoteid } = params;
    const { userEmailSplit, voteType } = await request.json();

    const quote = await Quote.findById(quoteid);

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

    // Destructure the quote object
    const { _id: quoteId, __v, comments, ...plainQuote } = quote.toObject();

    // Format the comments to rename _id to mongoCid
    const formattedComments = comments.map((comment: any) => {
      const { _id: commentId, ...plainComment } = comment;
      return { mongoCid: commentId.toString(), ...plainComment };
    });

    // Return the formatted quote with mongoId and formatted comments
    const result = {
      mongoId: quoteId.toString(),
      ...plainQuote,
      comments: formattedComments,
    };

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
