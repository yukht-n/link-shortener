export const CONFIG = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:4200',
  IS_DEV: import.meta.env.DEV,
  APP_NAME: import.meta.env.VITE_PUBLIC_PROJECT_NAME || 'LinkShortener',
  OWNER_NAME: import.meta.env.VITE_PUBLIC_OWNER_NAME || 'Project Owner',
  OWNER_EMAIL: import.meta.env.VITE_PUBLIC_OWNER_EMAIL || 'contact@example.com',
};
