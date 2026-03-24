import type { PropsWithChildren } from 'react';
import { Link } from 'wouter';

type Props = PropsWithChildren;
export default function PageWrapper({ children }: Props) {
  return (
    <div className="max-w-2xl w-full relative mx-auto p-6">
      <div className="mb-8 lg:absolute  lg:-left-16 lg:mb-0">
        <Link
          href="/"
          className="inline-flex items-center justify-center p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
          aria-label="Zurück zur Startseite"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>Zurück</title>
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          <span className="ml-2 lg:hidden font-medium">Zurück</span>
        </Link>
      </div>

      <article className="prose prose-slate lg:prose-lg max-w-none dark:prose-invert">
        {children}
      </article>
    </div>
  );
}
