import { Link } from 'wouter';
import { CONFIG } from '../config';
export default function Footer() {
  return (
    <footer className="mt-auto border-t py-6 text-sm text-slate-500 dark:text-slate-100">
      <div className="container mx-auto flex flex-col items-center gap-4">
        <p>
          © {new Date().getFullYear()} {CONFIG.APP_NAME} — Privacy First
        </p>
        <nav className="flex gap-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/policies/privacy-policy" className="hover:underline">
            Datenschutz
          </Link>
          <Link
            href="/policies/terms-and-conditions"
            className="hover:underline"
          >
            AGB
          </Link>
          <Link href="/policies/legal-notice" className="hover:underline">
            Impressum
          </Link>
        </nav>
      </div>
    </footer>
  );
}
