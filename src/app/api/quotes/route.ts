import { NextResponse } from 'next/server';
import Quote from '@/lib/modelQuote';
import { QuoteSchemaType } from '@/components/AddQuote';

export async function POST(request: Request) {
    try {
      const quoteData: QuoteSchemaType = await request.json();
      
      const newQuote = new Quote(quoteData);
      const savedQuote = await newQuote.save();
      
      const { _id, __v, ...plainQuote } = savedQuote.toObject();
      const result = { mongoId: _id.toString(), ...plainQuote };
      
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      console.error("Error adding quote:", error);
      return NextResponse.json({ error: "Failed to add quote" }, { status: 500 });
    }
  }