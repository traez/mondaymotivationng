import { Metadata } from "next";
import TanstackTable from "@/components/TanstackTable";

export const metadata: Metadata = {
  title: "FAQ Page - Monday Motivation NG",
  description: "Created by Trae Zeeofor",
};

const FaqPage = () => {
  return (
    <div className="flex flex-grow flex-col justify-start gap-4 sm:gap-8 p-4 bg-slate-100 dark:bg-gray-500">
      <h1 className="text-base sm:text-2xl font-bold text-center border rounded-md">
        Frequently Asked Questions Essay
      </h1>
      <TanstackTable />
    </div>
  );
};

export default FaqPage;
