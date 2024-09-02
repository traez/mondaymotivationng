import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">
        404 - Page Not Found
      </h2>
      <h2 className="text-2xl font-semibold text-red-600 mb-4">
        Oops! The page you are looking for does not exist
      </h2>
      <p>
        <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Click here
        </Link>
        <span> to go back to the homepage</span>
      </p>
    </div>
  );
}
