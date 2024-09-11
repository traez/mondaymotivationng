import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motivation ID Page - Monday Motivation NG",
  description: "Created by Trae Zeeofor",
};

const MotivationPage = () => {
  return (
    <div className="flex flex-grow flex-col justify-start gap-4 sm:gap-8 p-4 bg-slate-100 dark:bg-gray-500">
      <h1 className="text-base sm:text-2xl font-bold text-center border rounded-md">
      MotivationPage Page
      </h1>
      
    </div>
  );
};

export default MotivationPage;