import Link from "next/link";
import ThemeSwitch from "@/components/ThemeSwitch";
import GithubLogin from "./GithubLogin";
import GoogleLogin from "./GoogleLogin";
import { getSession } from "@/lib/getSession";
import { logout } from "@/lib/actionsLoginOut";

export default async function Navbar() {
  const session = await getSession();
  console.log(session?.user);

  return (
    <nav className="flex flex-col justify-center items-center gap-1 md:flex-row md:justify-between p-1 border-b-2 border-gray-800 dark:border-gray-300 bg-gray-300 dark:bg-gray-800 text-blue-900 dark:text-blue-200 ">
      <menu className="flex justify-start">
        <Link
          href="/"
          className="flex items-center self-center text-2xl font-semibold whitespace-nowrap dark:hover:text-yellow-200 hover:text-green-700"
        >
          Monday Motivation NG
        </Link>
      </menu>
      <menu className="flex flex-col justify-center items-center gap-1 sm:flex-row sm:justify-between sm:w-full md:justify-end md:gap-10">
        <aside className="flex justify-center items-center gap-1">
          <Link
            href="/"
            className="self-center text-base font-semibold border-2 px-1 rounded-md hover:bg-yellow-200 hover:text-blue-900"
          >
            Create
          </Link>
          <Link
            href="/"
            className="self-center text-base font-semibold border-2 px-1 rounded-md hover:bg-yellow-200 hover:text-blue-900"
          >
            Users
          </Link>
          <Link
            href="/"
            className="self-center text-base font-semibold border-2 px-1 rounded-md hover:bg-yellow-200 hover:text-blue-900"
          >
            FAQ
          </Link>
        </aside>
        <aside className="flex justify-center items-center gap-1">
          <div className="flex border-2 px-1 items-center rounded-md gap-1">
            <span className="font-bold">Logins:</span>
            <GithubLogin />
            <GoogleLogin />
          </div>
          <form
            action={logout}
            className="font-bold border-2 px-1 rounded-md hover:bg-yellow-200 hover:text-blue-900"
          >
            <button type="submit">Logout</button>
          </form>
          <ThemeSwitch />
        </aside>
      </menu>
    </nav>
  );
}
