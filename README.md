# 🚀 LinkShortener Pro: A Dual-Stack Case Study

A modern, privacy-focused URL shortener built to demonstrate and compare two different architectural approaches: **Client-Side Rendering (CSR)** with Express/React and **Server-Side Rendering (SSR)** with Next.js.

## 🌟 Key Features

- **Dual Architecture**: Compare a classic SPA (React + Express) with a modern Next.js 15 App Router implementation.
- **Shared Business Logic**: Zod schemas and Prisma models are shared across all stacks to ensure 100% type safety and consistency.
- **Privacy-First**: Designed with GDPR in mind. No tracking cookies, no permanent IP logging.
- **Security**:
  - **Honeypot**: Transparent protection against automated bots.
  - **Zod Validation**: Strict schema validation on both client and server.
  - **Rate Limiting**: Protection against request flooding.
- **Developer Experience**: Fully typed with TypeScript, linted with Biome, and tested with Vitest.

---

## 🏗 Architecture Overview

The project is structured as a **Monorepo** to manage multiple applications and shared packages efficiently.

```text
├── apps/
│   ├── react-spa/       # Stack 1: React + Wouter (Vite)
│   ├── express-api/     # Stack 1: Express.js backend
│   └── next-app/        # Stack 2: Next.js 15 (Server Actions + SSR)
├── packages/
│   ├── shared/          # Shared Zod schemas and helper functions
│   └── database/        # Centralized Prisma schema, client, and DB-functions
├── logs/                # Express.js Logs by Winston
└── nginx/               # Nginx configuration for deployment
```

---

## 🛠 Tech Stack

| Feature        | Stack 1 (SPA)              | Stack 2 (Next.js)       |
| :------------- | :------------------------- | :---------------------- |
| **Frontend**   | React 19, Wouter, Tailwind | Next.js 15 (App Router) |
| **Backend**    | Express.js                 | Next.js Server Actions  |
| **Database**   | PostgreSQL + Prisma        | PostgreSQL + Prisma     |
| **Validation** | Zod                        | Zod + next-safe-action  |
| **Styling**    | Tailwind CSS (Typography)  | Tailwind CSS            |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20+)
- PostgreSQL database

### Installation

1.  Clone the repository:

    ```bash
    git clone [https://github.com/yukht-n/link-shortener.git](https://github.com/yukht-n/link-shortener.git)
    cd link-shortener
    ```

2.  Install dependencies for the entire monorepo:

    ```bash
    npm install
    ```

3.  Setup environment variables:
    Create `.env` files in root and each app directory following the `.env.example` templates.

4.  Generate Prisma client:

    ```bash
    npm run db:generate
    ```

### Running the Apps

- **Run all apps (Dev):** `npm run dev:all`
- **Run Next.js only:** `npm run dev:next`
- **Run Express Server:** `npm run dev:express`
- **Run React-SPA :** `npm run dev:client`

---

## 🛡 Security & Privacy

### Honeypot Protection

The application implements a hidden field technique to catch bots. If the `no-name` field is filled, the request is automatically rejected, preventing spam link generation.

### Data Privacy (GDPR)

- **Zero-Logging**: We do not store user IP addresses in the database.
- **Cookie-less**: No tracking or session cookies are used.
- **Minimization**: We only collect the necessary URL data to provide the service.

---

## 🧪 Testing

We use **Vitest** for unit and integration testing.

```bash
npm test
```

---

## 🚢 Deployment

The project is fully containerized and designed to be deployed using Docker Compose and Dokploy.

### Infrastructure Components

- Orchestration: Dokploy (running on VPS).

- Reverse Proxy: Traefik (SSL termination) → Nginx (Internal routing & fallback).

- CI/CD: Automatic deployments via Dokploy hooks.

### Dynamic Nginx Configuration

The project uses Nginx templates (default.conf.template) to inject environment variables at runtime. This allows the same image to handle different domains without hardcoding values.

---

## 📜 License

MIT License. Feel free to use this project for your own learning or portfolio.

---

Created by [Nikita Yukht](https://www.linkedin.com/in/nikita-yukht/)
