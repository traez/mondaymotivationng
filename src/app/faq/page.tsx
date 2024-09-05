import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ Page - Monday Motivation NG",
  description: "Created by Trae Zeeofor",
};

const FaqPage = () => {
  return (
    <div className="flex flex-grow flex-col justify-start gap-4 sm:gap-8 p-4">
      <h1 className="text-base sm:text-2xl font-bold text-center border rounded-md">
        Frequently Asked Questions Essay
      </h1>
      
    </div>
  );
};

export default FaqPage;
