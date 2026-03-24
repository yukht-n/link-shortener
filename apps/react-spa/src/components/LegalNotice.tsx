import { Helmet } from '@dr.pogodin/react-helmet';
import { CONFIG } from '../config';
import PageWrapper from './PageWrapper';

export default function LegalNotice() {
  return (
    <PageWrapper>
      <Helmet>
        <title>{CONFIG.APP_NAME} - Impressum</title>
      </Helmet>
      <h1>Impressum</h1>
      <p>Angaben gemäß § 5 TMG:</p>
      <p>
        {CONFIG.OWNER_NAME}
        <br />
      </p>
      <h3>Kontakt</h3>
      <p>E-Mail: {CONFIG.OWNER_EMAIL}</p>
      <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
      <p>{CONFIG.OWNER_NAME}</p>
    </PageWrapper>
  );
}
