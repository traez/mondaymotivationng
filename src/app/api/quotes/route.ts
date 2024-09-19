import { NextResponse } from "next/server";
import Quote from "@/lib/modelQuote";
import { QuoteSchemaType } from "@/components/AddQuote";

async function POST(request: Request) {
  try {
    const quoteData: QuoteSchemaType = await request.json();

    const newQuote = new Quote(quoteData);
    const savedQuote = await newQuote.save();

    // Destructure the saved quote
    const {
      _id: quoteId,
      __v,
      comments = [],
      ...plainQuote
    } = savedQuote.toObject();

    // Format comments in case any exist (likely they are empty on POST)
    const formattedComments = comments.map((comment: any) => {
      const { _id: commentId, ...plainComment } = comment;
      return { mongoCid: commentId.toString(), ...plainComment };
    });

    // Refactor result to match the GET format
    const result = {
      mongoId: quoteId.toString(),
      ...plainQuote,
      comments: formattedComments, // This will be an empty array initially
    };

    return NextResponse.json(result, { status: 201 });
  } catch (error: unknown) {
    console.error("Error adding quote:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to add quote", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to add quote", details: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}

async function GET() {
  try {
    const quotes = await Quote.find({});

    const formattedQuotes = quotes.map((quote) => {
      // Destructure quote object
      const { _id: quoteId, __v, comments, ...plainQuote } = quote.toObject();

      // Format the comments to rename _id to mongoCid
      const formattedComments = comments.map((comment: any) => {
        const { _id: commentId, ...plainComment } = comment;
        return { mongoCid: commentId.toString(), ...plainComment };
      });

      // Return the formatted quote with mongoId and formatted comments
      return {
        mongoId: quoteId.toString(),
        ...plainQuote,
        comments: formattedComments,
      };
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
