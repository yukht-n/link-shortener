import type { Metadata } from 'next';

const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || 'Link Shortener';

export const metadata: Metadata = {
  title: `${PROJECT_NAME} - Datenschutz`,
};

export default function PrivacyPolicy() {
  return (
    <>
      <h1>Datenschutz</h1>
      <p>
        Wir legen großen Wert auf Ihre Privatsphäre. Dieser Dienst wurde nach
        dem Prinzip "Data Minimization" entwickelt.
      </p>

      <h3>Datenerfassung</h3>
      <p>
        Wir speichern <strong>keine personenbezogenen Daten</strong>.
        Insbesondere:
      </p>
      <ul>
        <li>
          <strong>Keine IP-Adressen:</strong> Wir speichern keine IP-Adressen
          unserer Nutzer in der Datenbank.
        </li>
        <li>
          <strong>Keine Cookies:</strong> Wir setzen keine Tracking-Cookies ein.
        </li>
        <li>
          <strong>Keine Analyse-Tools:</strong> Wir nutzen keine externen
          Dienste wie Google Analytics.
        </li>
      </ul>

      <h3>Statistiken</h3>
      <p>
        Wir zählen lediglich die Anzahl der Aufrufe (Visits) pro Kurzlink, ohne
        dabei Informationen über den Besucher zu speichern.
      </p>
    </>
  );
}
