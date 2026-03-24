import { Helmet } from '@dr.pogodin/react-helmet';
import { CreateFormUrlSchema, type FormState } from '@project/shared';
import { useActionState } from 'react';
import z from 'zod';
import { CONFIG } from './config';

function App() {
  const [state, formAction, isPending] = useActionState(createShortLink, {
    success: false,
    message: '',
  });

  async function createShortLink(prevState: FormState, formData: FormData) {
    const urlFormData = {
      url: formData.get('url'),
      antiSpam: formData.get('no-name') || '',
    };
    const FormUrlSchema = CreateFormUrlSchema(CONFIG.API_URL);
    const validatedUrlFormData = FormUrlSchema.safeParse(urlFormData);

    if (!validatedUrlFormData.success) {
      console.log(validatedUrlFormData);
      return {
        success: false,
        errors: z.flattenError(validatedUrlFormData.error).fieldErrors,
        message: 'Check the fields below.',
      };
    }

    const validatedFormData = validatedUrlFormData.data;

    const response = await fetch(`${CONFIG.API_URL}/api/short-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedFormData),
    });
    if (!response.ok)
      return { success: false, message: 'Database error. Try again later.' };
    try {
      const originalDBEntry = await response.json();
      return {
        success: true,
        shortCode: originalDBEntry.shortCode,
        visits: originalDBEntry.visits,
      };
    } catch {
      return { success: false, message: 'Database error. Try again later.' };
    }
  }

  return (
    <>
      <Helmet>
        <title>{CONFIG.APP_NAME} - Home</title>
      </Helmet>

      <h1 className="text-4xl font-bold mb-8">
        Express/React {CONFIG.APP_NAME}
      </h1>

      <form action={formAction} className="space-y-4">
        <div>
          <input
            type="text"
            name="url"
            placeholder="Enter link..."
            aria-label="URL to shorten"
            className={`p-2 border rounded text-black dark:text-white w-80 ${state.errors?.url ? 'border-red-500' : 'border-gray-300'}`}
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
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 hover:bg-blue-400 focus:bg-blue-400"
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
      </form>

      {/* ERROR */}
      {state.message && <p className="text-orange-500">{state.message}</p>}

      {/* ANSWER */}
      {state.success && (
        <div className="mt-6 p-4 bg-green-100 rounded text-green-800">
          <p>Your shorted link:</p>
          <a
            href={`${CONFIG.API_URL}/${state.shortCode}`}
            target="_blank"
            rel="noreferrer"
          >
            {CONFIG.API_URL}/{state.shortCode}
          </a>
          {!!state.visits && <p>Visited: {state.visits}</p>}
        </div>
      )}
    </>
  );
}

export default App;
