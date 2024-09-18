import { QuoteSchemaType } from "@/components/AddQuote";
import { Comment } from "@/lib/typeComment";

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

async function fetchQuoteById(quoteid: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/quotes/${quoteid}`,
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

async function deleteQuoteById(quoteid: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/quotes/${quoteid}`,
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
  quoteid: string,
  userEmailSplit: string,
  voteType: "up" | "down"
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/quotes/${quoteid}`,
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

async function fetchUserEmails() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/quotes/emails`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user emails");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user emails:", error);
    throw new Error("Failed to fetch user emails");
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

async function addComment(quoteId: string, commentData: Comment) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/quotes/${quoteId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Server response:", errorData);
      throw new Error(
        `Failed to add comment: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error("Failed to add comment");
  }
}

export {
  addQuoteEntry,
  fetchQuotes,
  fetchQuoteById,
  deleteQuoteById,
  voteQuoteById,
  fetchUserEmails,
  fetchQuotesByUserEmail,
  addComment,
};
