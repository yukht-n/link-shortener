import type { Link } from './generated/prisma/client';
import { prisma } from './prisma';

export async function serverFindShortCode(
  originalLink: string,
): Promise<Link | null> {
  const dbEntry = await prisma.link.findUnique({
    where: { originalLink },
  });

  return dbEntry;
}

export async function serverFindOriginalLink(
  shortCode: string,
): Promise<string> {
  /*   const originalLink = await prisma.link.findUnique({
    where: { shortCode },
  }); */
  const dbEntry = await prisma.link.update({
    where: { shortCode },
    data: { visits: { increment: 1 } },
  });

  return dbEntry.originalLink;
}

export async function serverSaveLink(
  originalLink: string,
  shortCode: string,
): Promise<Link> {
  const link = await prisma.link.create({
    data: { shortCode, originalLink },
  });
  return link;
}
