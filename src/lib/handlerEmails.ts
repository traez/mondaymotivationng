async function fetchUserEmails() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/emails`, 
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
  
  export { fetchUserEmails };  