import type { Metadata } from 'next';

const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || 'Link Shortener';

export const metadata: Metadata = {
  title: `${PROJECT_NAME} - Impressum`,
};

export default function LegalNotice() {
  const name = process.env.OWNER_NAME || 'Project Owner';
  const email = process.env.OWNER_EMAIL || 'contact@example.com';
  return (
    <>
      <h1>Impressum</h1>
      <p>Angaben gemäß § 5 TMG:</p>
      <p>
        {name}
        <br />
      </p>
      <h3>Kontakt</h3>
      <p>E-Mail: {email}</p>
      <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
      <p>{name}</p>
    </>
  );
}
