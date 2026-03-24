'use client';

import { useActionState } from 'react';
import { createShortLink } from './actions';

const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || 'LinkShortener';

export default function Home() {
  const [state, formAction, isPending] = useActionState(createShortLink, {
    success: false,
    message: '',
  });
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

  return (
    <main className="flex flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-8">Next.js {PROJECT_NAME}</h1>

      <form action={formAction} className="space-y-4">
        <div>
          <input
            type="text"
            name="url"
            placeholder="Enter link..."
            aria-label="URL to shorten"
            className={`p-2 boreder rounded text-black w-80 ${state.errors?.url ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {state.errors?.url && (
            <p className="text-red-500 text-sm mt-1">{state.errors.url[0]}</p>
          )}{' '}
        </div>
        <div
          style={{ position: 'absolute', left: '-5000px' }}
          aria-hidden="true"
        >
          <input type="text" name="no-name" tabIndex={-1} autoComplete="off" />
          {state.errors?.antiSpam && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.antiSpam[0]}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400  hover:bg-blue-400 focus:bg-blue-400"
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
      </form>

      {state.message && <p className="text-orange-500">{state.message}</p>}

      {state.success && (
        <div className="mt-6 p-4 bg-green-100 rounded text-green-800">
          <p>Your shorted link:</p>
          <a
            href={`${siteUrl}/${state.shortCode}`}
            target="_blank"
            rel="noreferrer"
          >
            {siteUrl}/{state.shortCode}
          </a>
          {!!state.visits && <p>Visited: {state.visits}</p>}
        </div>
      )}
    </main>
  );
}
