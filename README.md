# GeekShop

Next.js 15 storefront with Payload CMS 3, PostgreSQL, and Vercel Blob. The app lives in `apps/web`; shared UI lives in `packages/ui`.

## Setup

Use Node.js 22+ and pnpm 9.14.4. Run `pnpm install --frozen-lockfile` from the repository root. Copy `apps/web/.env.example` to `apps/web/.env.local` and configure a dedicated development database and secret. Never commit environment files or use the production database for development schema changes.

Run `pnpm --filter @geekshop/web generate:importmap`, then `pnpm dev`. Payload's admin is at `/admin`. Public first-admin registration is disabled. Use the private setup command below.

## Database and deployment

Vercel project: `cerberiys-projects/geekshop-web`, root directory `apps/web`, production branch `master`.

Production requires `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, and `BLOB_READ_WRITE_TOKEN`. `SEED_SECRET` enables the optional catalog import endpoint. Sensitive Vercel variables are intentionally omitted by environment pulls; keep their original values in a secure store.

Generate migrations with `pnpm --filter @geekshop/web payload migrate:create`, review them, and apply them with `pnpm --filter @geekshop/web migrate` using the target environment before deploying. Production does not automatically push schema changes.

## Catalog import

`POST /api/seed` accepts `x-seed-token` matching `SEED_SECRET`. It imports the bundled MTG list and skips existing slugs. Imported products need real prices and images; zero prices are placeholders. Do not treat a successful HTTP response as a successful import: check the returned `errors` array.

## Validation and limitations

Run `pnpm type-check` and `pnpm --filter @geekshop/web build` with valid environment configuration. Verify `/`, `/products`, a product detail, `/admin`, and `/api/products` after deployment.

Checkout is not implemented. The catalog currently displays at most 24 products without pagination. The legacy lint script still requires an ESLint configuration; there is no automated test suite yet.

## First administrator

Create an ignored `apps/web/.env.admin.local` containing `ADMIN_EMAIL` and a unique `ADMIN_PASSWORD` of at least 16 characters. Keep this file private. With the production configuration in `apps/web/.env.production.local`, run `pnpm --filter @geekshop/web admin:create`. Remove `.env.admin.local` after storing the credentials securely. This command refuses to run if an administrator already exists. Public API requests cannot enable its server-only bootstrap context.

No email delivery provider is configured yet, so password-reset email is not available.
