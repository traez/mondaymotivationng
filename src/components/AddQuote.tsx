"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
//import { addQuoteEntry } from "@/lib/actionsQuoteEntry";

const quoteSchema = z.object({
  userEmail: z.string(),
  createdAt: z.string(),
  motivation: z
    .string()
    .min(1, "Motivational Quote must contain at least 1 character")
    .max(300, "Motivational Quote cannot exceed 100 characters"),
});

export type QuoteSchemaType = z.infer<typeof quoteSchema>;

interface AddQuoteProps {
  userEmail: string | null | undefined;
}

const AddQuote: React.FC<AddQuoteProps> = ({ userEmail }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteSchemaType>({
    resolver: zodResolver(quoteSchema),
  });

  const createdDateFormat = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const onSubmit = async (data: QuoteSchemaType) => {
    const userEmailSplit = data.userEmail.split("@")[0];

    const formattedData = {
      ...data,
      userEmail: userEmailSplit,
      id: uuidv4(),
    };

    //await addQuoteEntry(formattedData); // Assume this sends the quote data
    console.log(formattedData);
    reset();
    router.replace("/?timestamp=" + new Date().getTime());
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Quote</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User Email
          </label>
          <input
            type="text"
            value={userEmail || ""}
            {...register("userEmail")}
            readOnly
            className="mt-1 block w-full rounded-md border border-gray-400 bg-gray-100 p-2 text-gray-700 shadow-sm sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Created At
          </label>
          <input
            type="text"
            value={createdDateFormat}
            {...register("createdAt")}
            readOnly
            className="mt-1 block w-full rounded-md border border-gray-400 bg-gray-100 p-2 text-gray-700 shadow-sm sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Motivational Quote
          </label>
          <textarea
            {...register("motivation")}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-2"
            placeholder="Enter a motivational quote"
            maxLength={300}
          />
          {errors.motivation && (
            <p className="text-red-600 text-sm">{errors.motivation.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Quote
        </button>
      </form>
    </div>
  );
};

export default AddQuote;
