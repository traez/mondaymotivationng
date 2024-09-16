"use client";
import { useState, useEffect } from "react";
import { User } from "@/lib/typeGetSession";
import { fetchUserEmails } from "@/lib/handlerQuotes";
import UserQuotes from "@/components/UserQuotes";

interface UserListQuotesProps {
  user: User | null;
}

export default function UserListQuotes({ user }: UserListQuotesProps) {
  const [userEmails, setUserEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUserEmails = async () => {
      try {
        const emails = await fetchUserEmails();
        setUserEmails(emails);
      } catch (error) {
        console.error("Error fetching user emails:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserEmails();
  }, []);

  if (loading) {
    return <p>Loading user emails...</p>;
  }

  return (
    <>
      <UserQuotes userEmails={userEmails} user={user} />
    </>
  );
}
