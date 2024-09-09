import { QuoteSchemaType } from "@/components/AddQuote";

async function addQuoteEntry(quoteData: QuoteSchemaType) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quoteData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Server response:", errorData);
      throw new Error(`Failed to add quote entry: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding quote entry:", error);
    throw new Error("Failed to add quote entry");
  }
}

async function fetchQuotes() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch quotes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw new Error("Failed to fetch quotes");
  }
}

export { addQuoteEntry, fetchQuotes };
