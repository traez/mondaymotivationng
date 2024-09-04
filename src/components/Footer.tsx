export default function Footer() {
  return (
    <>
      <footer className="p-2 flex flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm border-t-2 border-solid border-gray-800 dark:border-gray-300 bg-gray-300 dark:bg-gray-800 text-blue-900 dark:text-blue-200">
        <a
          href="https://github.com/traez/mondaymotivationng"
          target="_blank"
          className=" hover:underline hover:text-green-600 font-bold text-blue-700 dark:text-blue-500"
        >
          Monday Motivation NG
        </a>
        <b>©2024 Trae Zeeofor</b>
      </footer>
    </>
  );
}
