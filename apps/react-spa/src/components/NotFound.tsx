import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'wouter';
import { CONFIG } from '../config';
import PageWrapper from './PageWrapper';

export default function PrivacyPolicy() {
  return (
    <PageWrapper>
      <Helmet>
        <title>{CONFIG.APP_NAME} - 404 - Not found 🤷</title>
      </Helmet>
      <h1 className="text-4xl font-bold mb-8">
        Unfortunately, nothing was found for this URL. 🤷
      </h1>

      <p>Try the following link:</p>

      <Link href="/">Homepage</Link>
    </PageWrapper>
  );
}
