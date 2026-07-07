import Link from "next/link";
import Head from "next/head";
import { FileQuestion } from "lucide-react";

export default function Custom404() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 max-w-md mx-auto">
      <Head>
        <title>404 - Page Not Found | Parsa</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Head>
      
      <div className="p-4 rounded-full bg-slate-900/60 border border-slate-800 text-slate-400 mb-6">
        <FileQuestion className="h-10 w-10" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-slate-100 mb-2">Page Not Found</h1>
      
      <p className="text-slate-400 text-sm leading-relaxed mb-8">
        The page you are looking for has been removed, renamed, or is temporarily unavailable.
      </p>

      <Link
        href="/"
        className="px-4 py-2 text-xs font-mono rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100 transition-colors focus:ring-2 focus:ring-slate-500 focus:outline-none"
      >
        Return to Home
      </Link>
    </div>
  );
}
