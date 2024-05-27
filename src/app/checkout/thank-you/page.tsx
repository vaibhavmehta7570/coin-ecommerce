import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] gap-8 px-4 md:px-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-4xl font-bold">Thank you for your order!</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Your order has been confirmed. We'll send you an email with your order
          details.
        </p>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/"
        >
          Return to homepage
        </Link>
      </div>
    </div>
  );
}
