"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { User } from "@/lib/typeGetSession";
import { Comment } from "@/lib/typeComment";
import { toast } from "sonner";

const commentSchema = z.object({
  text: z
    .string()
    .min(1, "Comment must contain at least 1 character")
    .max(300, "Comment cannot exceed 300 characters"),
});

type CommentSchemaType = z.infer<typeof commentSchema>;

interface CommentFullProps {
  user: User | null;
  quoteId: string;
  initialComments: Comment[];
}

export default function CommentFull({
  user,
  quoteId,
  initialComments,
}: CommentFullProps) {
  const [comments, setComments] = useState(initialComments);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentSchemaType>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: CommentSchemaType) => {
    if (!user) {
      toast.error("You must be signed in to add a comment.");
      return;
    }
    const userEmailSplit = user.email.split("@")[0];

    const newComment: Comment = {
      id: uuidv4(),
      voterEmail: userEmailSplit,
      text: data.text,
      createdAt: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };

    try {
      // TODO: Implement the API call to add the comment
      // await addCommentToQuote(quoteId, newComment);
      console.log(newComment);
      /* setComments([...comments, newComment]); */
      toast.success("Comment added successfully");
      reset();
    } catch (error) {
      toast.error("Failed to add comment");
      console.error("Error adding comment:", error);
    }
  };

  const handleEditComment = (commentId: string) => {
    /* setEditingCommentId(commentId);
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    if (commentToEdit) {
      reset({ text: commentToEdit.text });
    } */
  };

  const handleSaveComment = async (data: CommentSchemaType) => {
    /* if (!editingCommentId) return;

    try {
      // TODO: Implement the API call to update the comment
      // await updateCommentInQuote(quoteId, editingCommentId, data.text);
      setComments(
        comments.map((comment) =>
          comment.id === editingCommentId
            ? { ...comment, text: data.text }
            : comment
        )
      );
      toast.success("Comment updated successfully");
      setEditingCommentId(null);
      reset();
    } catch (error) {
      toast.error("Failed to update comment");
      console.error("Error updating comment:", error);
    } */
  };

  const handleDeleteComment = async (commentId: string) => {
    /*  try {
      // TODO: Implement the API call to delete the comment
      // await deleteCommentFromQuote(quoteId, commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error("Error deleting comment:", error);
    } */
  };

  return (
    <section className="mt-6">
      <h2 className="text-xl font-bold">Comments:</h2>

      {/* Add Comment */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col">
        <textarea
          className="p-2 border border-gray-300 rounded-md mb-2 bg-gray-100 text-gray-700"
          rows={3}
          {...register("text")}
          placeholder="Add a comment..."
        ></textarea>
        {errors.text && (
          <p className="text-red-600 text-sm mb-2">{errors.text.message}</p>
        )}
        <button
          type="submit"
          className="self-end px-4 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg"
        >
          Submit
        </button>
      </form>

      {/* Comment List */}
      <ul className="mt-4 space-y-4">
        {comments?.map((comment) => (
          <li
            key={comment.id}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
          >
            {editingCommentId === comment.id ? (
              <form onSubmit={handleSubmit(handleSaveComment)}>
                <textarea
                  className="p-2 border border-gray-300 rounded-md mb-2 w-full"
                  rows={3}
                  {...register("text")}
                ></textarea>
                {errors.text && (
                  <p className="text-red-600 text-sm mb-2">
                    {errors.text.message}
                  </p>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Save
                </button>
              </form>
            ) : (
              <div>
                <p className="text-sm mb-2">{comment.text}</p>
                <div className="flex justify-between items-center">
                  <small className="text-gray-500">
                    By: {comment.voterEmail} on {comment.createdAt}
                  </small>
                  {user && user.email === comment.voterEmail && (
                    <div className="space-x-2">
                      <button
                        className="text-blue-500"
                        onClick={() => handleEditComment(comment.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
