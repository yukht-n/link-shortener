import {
  serverFindOriginalLink,
  serverFindShortCode,
  serverSaveLink,
} from '@project/database/db';

import { Prisma } from '@project/database/generated/prisma/client';

import {
  CreateFormUrlSchema,
  type FormValues,
  generateSlug,
  shortCodeValidation,
} from '@project/shared';

export class LinksService {
  private siteUrl: string;
  constructor(siteUrl: string) {
    this.siteUrl = siteUrl;
  }
  async saveLink(formInput: FormValues) {
    const validFunc = CreateFormUrlSchema(this.siteUrl);
    //Link validation
    const resultParse = validFunc.safeParse(formInput);
    if (!resultParse.success) {
      throw Error(resultParse.error.message);
    }
    const validUrl = resultParse.data.url;
    //Checking of existing Link
    const existingLink = await serverFindShortCode(validUrl);
    if (existingLink) return existingLink;

    //Trying generation of ShortCode
    for (let i = 0; i < 3; i++) {
      //generate shortLink
      const shortCode = generateSlug();
      // check URl in db
      try {
        const newLink = await serverSaveLink(validUrl, shortCode);
        return newLink;
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

    throw new Error('Could not generate unique shortCode after 3 attempts');
  }
  async findOriginalLink(shortCode: string) {
    const validShortCode = shortCodeValidation(shortCode);
    const originalLink = await serverFindOriginalLink(validShortCode);
    return originalLink;
  }
}
