import normalizeUrl from 'normalize-url';
import { z } from 'zod';

// Constants for shortCode generation
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const SHORTCODE_LENGTH = 6;

export type FormState = {
  success: boolean;
  message?: string;
  errors?: {
    url?: string[];
    // alias?: string[];
  };
  shortCode?: string | null;
  visits?: number;
};

const shortCodeSchema = z
  .string()
  .length(6)
  .regex(/^[a-zA-Z0-9]+$/);

export const urlSchema = z
  .string()
  .min(4, 'URL is required')
  .max(200, 'Maximun 200 chars');

export const CreateFormUrlSchema = (siteUrl: string) =>
  z.object({
    antiSpam: z.string().max(0, 'Spam detected'),
    url: urlSchema
      .transform((val) =>
        normalizeUrl(val, {
          stripWWW: true,
          removeTrailingSlash: true,
          forceHttps: true,
        }),
      )
      .refine(
        (val) => {
          const host = new URL(val).hostname.replace('www.', '');
          return host.includes('.');
        },
        {
          message: `Invalid URL`,
        },
      )
      .refine(
        (val) => {
          const myDomain = new URL(siteUrl).hostname.replace('www.', '');
          return !val.includes(myDomain);
        },
        {
          message: `You cannot shorten links to ${siteUrl || 'our own site'}.`,
        },
      ),
    // alias: z.string().min(3).optional()
  });

type LinkSchemaType = ReturnType<typeof CreateFormUrlSchema>;
export type FormValues = z.infer<LinkSchemaType>;

// For server
export function validateAndNormalizeUrl(url: string, siteUrl: string) {
  //Normalizing
  const normalUrl = normalizeUrl(url, {
    stripWWW: true,
    removeTrailingSlash: true,
    forceHttps: true,
  });
  //Validaton
  return urlValidation(normalUrl, siteUrl);
}

// For server client OLD validation
export function urlValidation(url: string, siteUrl: string) {
  const result = urlSchema
    .refine(
      (val) => {
        const myDomain = new URL(siteUrl).hostname.replace('www.', '');
        const targetDomain = new URL(val).hostname.replace('www.', '');
        return myDomain !== targetDomain;
      },
      { message: `You cannot shorten links to ${siteUrl}.` },
    )
    .safeParse(url);
  if (!result.success) {
    console.log(result.error.message);
    throw Error(result.error.message);
  }
  return result.data;
}

export function shortCodeValidation(shortCode: string) {
  return shortCodeSchema.parse(shortCode);
}

export function generateSlug(length = SHORTCODE_LENGTH) {
  let shotcode = '';
  for (let i = 0; i < length; i++)
    shotcode += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  return shotcode;
}
