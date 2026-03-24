'use server';

import { serverFindShortCode, serverSaveLink } from '@project/database/db';
import { Prisma } from '@project/database/generated/prisma/client';
import type { FormState } from '@project/shared/index';
import { CreateFormUrlSchema, generateSlug } from '@project/shared/index';

import z from 'zod';

export async function createShortLink(
  prevState: FormState,
  formData: FormData,
) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const urlFormData = {
    url: formData.get('url'),
    antiSpam: formData.get('no-name') || '',
  };
  const FormUrlSchema = CreateFormUrlSchema(siteUrl);
  const validatedUrlFormData = FormUrlSchema.safeParse(urlFormData);

  if (!validatedUrlFormData.success)
    return {
      success: false,
      errors: z.flattenError(validatedUrlFormData.error).fieldErrors,
      message: 'Check the fields below.',
    };

  const { url: validUrl } = validatedUrlFormData.data;

  try {
    const originalDBEntry = await serverFindShortCode(validUrl);
    if (originalDBEntry)
      return {
        success: true,
        shortCode: originalDBEntry.shortCode,
        visits: originalDBEntry.visits,
      };

    //Trying generation of ShortCode
    for (let i = 0; i < 3; i++) {
      //generate shortLink
      const shortCode = generateSlug();
      // check URl in db
      try {
        const newLink = await serverSaveLink(validUrl, shortCode);
        return { success: true, shortCode: newLink.shortCode };
      } catch (e) {
        if (
          !(
            e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === 'P2002'
          )
        )
          throw e;

        // Else The shortCode exist already
      }
    }
  } catch {
    return { success: false, message: 'Database error. Try again later.' };
  }
  return {
    success: false,
    message: 'Unable to create a unique link. Please try again later.',
  };
}
