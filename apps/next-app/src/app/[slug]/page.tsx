import { serverFindOriginalLink } from '@project/database/db';
import { Prisma } from '@project/database/generated/prisma/client';
import { notFound, redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}
type Props = PageProps;

// Redirect Page
export default async function RedirectPage({ params }: Props) {
  const { slug } = await params;

  try {
    const originalLink = await serverFindOriginalLink(slug);
    if (!originalLink) notFound();
    redirect(originalLink);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025')
      notFound();
    throw e;
  }
}
