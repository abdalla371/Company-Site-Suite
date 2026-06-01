# Smart Employment Service

Somalia's premier employment platform connecting job seekers, students, and employers through job listings, internship programs, shaqo-tag programs, HR policy consulting, and membership plans.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, served at /api)
- `pnpm --filter @workspace/smart-employment run dev` — run the frontend (served at /)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-set by Replit DB)
- Required env: `SESSION_SECRET` — used to salt password hashes

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + shadcn/ui, Wouter routing, TanStack Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for all API contracts)
- `lib/db/src/schema/` — Drizzle ORM schema files (users, jobs, companies, applications, memberships)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/smart-employment/src/` — React frontend pages and components

## Architecture decisions

- Contract-first: OpenAPI spec generates both React Query hooks (frontend) and Zod schemas (backend validation)
- Password hashing uses SHA-256 + SESSION_SECRET (simple token-based auth with base64 encoded tokens)
- Membership plan features stored as JSON string in PostgreSQL TEXT column (parsed on read)
- Featured jobs fallback: if fewer than 6 are marked featured, recent active jobs fill in
- All DB tables use `serial` primary keys and `timestamp` for created_at/updated_at

## Product

- **Home**: Hero, site statistics, featured job cards, top companies, programs overview
- **Jobs**: Searchable and filterable job listings (by keyword, category, type, location)
- **Internship Program**: Program overview and application form
- **Shaqo-Tag Program**: Work attachment program info and application form
- **Membership**: Plan tiers (Basic, Professional, Premium) with signup
- **Post a Job**: Employer job posting form
- **Auth**: User registration (job_seeker/employer roles) and login

## Gotchas

- After any OpenAPI spec change, always run `pnpm --filter @workspace/api-spec run codegen` before writing routes
- After adding new schema files to `lib/db/src/schema/`, run `pnpm run typecheck:libs` before typechecking the api-server
- The `features` column in `membership_plans` is stored as JSON string — always `JSON.parse()` on read
- Password hashing: `sha256(password + SESSION_SECRET)` — changing SESSION_SECRET invalidates all passwords

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._
