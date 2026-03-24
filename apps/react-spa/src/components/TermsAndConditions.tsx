import { Helmet } from '@dr.pogodin/react-helmet';
import { CONFIG } from '../config';
import PageWrapper from './PageWrapper';

export default function TermsAndConditions() {
  return (
    <PageWrapper>
      <Helmet>
        <title>{CONFIG.APP_NAME} - AGB</title>
      </Helmet>
      <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>
      <section>
        <h2>1. Gegenstand des Dienstes</h2>
        <p>
          Dieser Dienst ermöglicht es Benutzern, lange URLs in kurze Links
          umzuwandeln. Der Dienst wird kostenlos und "wie besehen" zur Verfügung
          gestellt.
        </p>
      </section>

      <section>
        <h2>2. Verbotene Inhalte</h2>
        <p>
          Es ist strengstens untersagt, Links zu erstellen, die auf folgende
          Inhalte verweisen:
        </p>
        <ul>
          <li>Rechtswidrige oder strafbare Inhalte</li>
          <li>Phishing-Seiten oder Malware</li>
          <li>Spam oder belästigende Inhalte</li>
        </ul>
        <p>
          Wir behalten uns das Recht vor, solche Links ohne Vorankündigung zu
          löschen.
        </p>
      </section>

      <section>
        <h2>3. Haftungsausschluss</h2>
        <p>
          Der Betreiber übernimmt keine Haftung für die Inhalte der verlinkten
          Zielseiten. Für den Inhalt der verlinkten Seiten sind ausschließlich
          deren Betreiber verantwortlich.
        </p>
      </section>
    </PageWrapper>
  );
}
