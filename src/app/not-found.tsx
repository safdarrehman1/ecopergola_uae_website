import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#070B14] text-white p-6 text-center font-sans">
        <div className="max-w-md space-y-4">
          <h1 className="text-6xl font-bold text-[#34AA49]">404</h1>
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="text-sm text-slate-400">
            The page you are looking for does not exist.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-xl bg-[#34AA49] hover:bg-[#268537] text-white font-bold text-sm transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
