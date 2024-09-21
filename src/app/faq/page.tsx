import { Metadata } from "next";

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
      <section className="flex flex-col justify-around gap-3 sm:gap-6 text-sm sm:text-lg">
        
        <p>A famous Nigerian quote goes: <span className="font-bold underline text-amber-900 dark:text-[#000080]">“No use advice kill person for problem wey money go solve.”</span> True, isn&apos;t it? Money answereth many things—though not all. Sometimes, what you really need are powerful, uplifting words to touch your soul and inspire change. <span className="font-bold underline text-amber-900 dark:text-[#000080]">And that&apos;s what this website is all about!</span></p>

        <p><span className="font-extrabold text-base sm:text-2xl underline text-black dark:text-[#000080]">mondaymotivationng.vercel.app</span></p>

        <p>Created with love by <span className="font-bold underline text-amber-900 dark:text-[#000080]">Trae Zeeofor</span>, this is a full-stack, <span className="font-bold underline text-amber-900 dark:text-[#000080]">Reddit-styled app</span> where you can <span className="font-bold underline text-amber-900 dark:text-[#000080]">register your favorite quotes</span>, <span className="font-bold underline text-amber-900 dark:text-[#000080]">test their popularity through upvotes and downvotes</span>, and <span className="font-bold underline text-amber-900 dark:text-[#000080]">engage in conversations with other users</span>.
        </p>
        
        <p>On the homepage, there&apos;s a <span className="font-bold underline text-amber-900 dark:text-[#000080]">table where you can sort quotes by various criteria</span>. You can also visit the user page to see <span className="font-bold underline text-amber-900 dark:text-[#000080]">quotes grouped by the users who created them</span>. Each quote has its own page, where you can <span className="font-bold underline text-amber-900 dark:text-[#000080]">view all the comments and see who&apos;s voting for or against it</span>. And finally, you can enjoy the site in either <span className="font-bold underline text-amber-900 dark:text-[#000080]">light or dark</span> mode—your choice!</p>
        
        <p>Please log in with <span className="font-bold underline text-amber-900 dark:text-[#000080]">GitHub or Google</span> to add your own quote. At the website footer, you&apos;ll find links to the <span className="font-bold underline text-amber-900 dark:text-[#000080]">project source code</span>, as well as other projects and the broader body of work by Trae Zeeofor.</p>
        
        <p>Thank you for visiting!</p>
      </section>
    </div>
  );
};

export default FaqPage;
