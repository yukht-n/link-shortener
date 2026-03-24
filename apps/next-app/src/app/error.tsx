'use client'; // The error page must be a client component.
import Link from 'next/link';
// https://nextjs.org/docs/app/api-reference/file-conventions/error

import type { Metadata } from 'next';

const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || 'Link Shortener';

export const metadata: Metadata = {
  title: `${PROJECT_NAME} - Error`,
};

type Props = {
  error: Error;
  reset: () => void;
};
export default function ErrorPage({ error }: Props) {
  return (
    <div className="flex flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">
        Unfortunately, there is a problem. 😩
      </h1>
      <p>{error.message}</p>
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400  hover:bg-blue-400 focus:bg-blue-400"
        onClick={() => {
          window.location.reload();
        }}
      >
        Try again
      </button>
      or
      <p className="text-blue-500 mt-4">Try the following link:</p>
      <Link href="/">Homepage</Link>
    </div>
  );
}
