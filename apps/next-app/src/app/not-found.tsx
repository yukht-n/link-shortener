import type { Metadata } from 'next';
import Link from 'next/link';

// https://nextjs.org/docs/app/api-reference/file-conventions/not-found

const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || 'LinkShortener';

export const metadata: Metadata = {
  title: `${PROJECT_NAME} - 404 - Not found 🤷`,
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">
        Unfortunately, nothing was found for this URL. 🤷
      </h1>

      <p>Try the following link:</p>

      <Link href="/">Homepage</Link>
    </div>
  );
}
