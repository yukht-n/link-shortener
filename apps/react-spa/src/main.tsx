import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, Switch } from 'wouter';
import './index.css';
import { Helmet, HelmetProvider } from '@dr.pogodin/react-helmet';
import App from './App.tsx';
import Footer from './components/Footer.tsx';
import LegalNotice from './components/LegalNotice.tsx';
import PrivacyPolicy from './components/PrivacyPolicy.tsx';
import TermsAndConditions from './components/TermsAndConditions.tsx';
import { CONFIG } from './config.ts';
import NotFound from './components/NotFound.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>{CONFIG.APP_NAME}</title>
        <meta name="description" content="Make your links shorter" />
      </Helmet>
      <div className="min-h-screen grid grid-rows-[1fr_auto]">
        <main className="flex flex-col items-center p-12">
          <Suspense
            fallback={<strong className="animate-pulse">Loading… ⌛</strong>}
          >
            <Switch>
              <Route path="/" component={App} />

              <Route
                path="/policies/privacy-policy"
                component={PrivacyPolicy}
              />

              <Route
                path="/policies/terms-and-conditions"
                component={TermsAndConditions}
              />

              <Route path="/policies/legal-notice" component={LegalNotice} />

              <Route path="*" component={NotFound} />
            </Switch>
          </Suspense>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  </StrictMode>,
);
