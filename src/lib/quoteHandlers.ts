import { QuoteSchemaType } from "@/components/AddQuote";

async function addQuoteEntry(quoteData: QuoteSchemaType) {
  try {
    const response = await fetch("/api/addQuoteEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quoteData),
    });

    if (!response.ok) {
      throw new Error("Failed to add quote entry");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding quote entry:", error);
    throw new Error("Failed to add quote entry");
  }
}

export { addQuoteEntry };
