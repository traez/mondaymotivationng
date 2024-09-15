import { QuoteSchemaType } from "@/components/AddQuote";

async function addQuoteEntry(quoteData: QuoteSchemaType) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/quotes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Server response:", errorData);
      throw new Error(
        `Failed to add quote entry: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding quote entry:", error);
    throw new Error("Failed to add quote entry");
  }
}

async function fetchQuotes() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/quotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch quotes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw new Error("Failed to fetch quotes");
  }
}

async function fetchQuoteById(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/quotes/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server response:", errorData);
      throw new Error(
        `Failed to fetch quote: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching quote by ID:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch quote: ${error.message}`);
    } else {
      throw new Error("Failed to fetch quote: An unknown error occurred");
    }
  }
}

async function deleteQuoteById(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/quotes/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server response:", errorData);
      throw new Error(
        `Failed to delete quote: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting quote by ID:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete quote: ${error.message}`);
    } else {
      throw new Error("Failed to delete quote: An unknown error occurred");
    }
  }
}

async function voteQuoteById(
  id: string,
  userEmailSplit: string,
  voteType: "up" | "down"
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/quotes/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmailSplit, voteType }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server response:", errorData);
      throw new Error(
        `Failed to vote on quote: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error voting on quote:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to vote on quote: ${error.message}`);
    } else {
      throw new Error("Failed to vote on quote: An unknown error occurred");
    }
  }
}

async function fetchQuotesByUserEmail(userEmail: string) {
  try {
    const response = await fetch(
      `/api/quotes/useremail?userEmail=${encodeURIComponent(userEmail)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quotes by user email:", error);
    throw error;
  }
}

export {
  addQuoteEntry,
  fetchQuotes,
  fetchQuoteById,
  deleteQuoteById,
  voteQuoteById,
  fetchQuotesByUserEmail,
};
