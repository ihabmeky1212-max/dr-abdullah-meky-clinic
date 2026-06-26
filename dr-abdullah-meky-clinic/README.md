# Dr. Abdullah Meky Clinic Management System

A modern, full-stack clinic management platform built for **Dr. Abdullah Meky**. Manage patients, appointments, doctor schedules, and medical records from a professional admin dashboard.

## Tech Stack

- **Next.js 15** — App Router, Server Components, Server Actions
- **TypeScript** — End-to-end type safety
- **Tailwind CSS 4** — Responsive, professional UI
- **Supabase** — Authentication (email/password)
- **Prisma 7** — ORM with PostgreSQL adapter
- **PostgreSQL** — Primary database (Supabase or local)

## Features

- **Landing Page** — Professional public-facing site with services, about, and contact
- **Public Booking** — Patients can request appointments online
- **Admin Dashboard** — Overview stats, today's appointments, recent patients
- **Patient Management** — CRUD with search and detailed profiles
- **Appointment Booking** — Schedule, confirm, complete, or cancel appointments
- **Doctor Schedule** — Weekly availability time slots
- **Medical Records** — Diagnosis, symptoms, prescriptions, vital signs
- **Authentication** — Supabase-powered staff login and registration
- **Responsive Design** — Mobile-friendly sidebar and layouts

## Getting Started

### 1. Clone and install

```bash
cd dr-abdullah-meky-clinic
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side) |
| `NEXT_PUBLIC_APP_URL` | App URL (e.g. `http://localhost:3000`) |

### 3. Set up the database

```bash
# Push schema to database
npm run db:push

# Seed sample data (optional)
npm run db:seed
```

### 4. Configure Supabase Auth

1. Create a project at [supabase.com](https://supabase.com)
2. Enable Email auth under Authentication → Providers
3. Add `http://localhost:3000/auth/callback` to Redirect URLs
4. Copy project URL and anon key to `.env`

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page.

- **Staff login:** `/login`
- **Dashboard:** `/dashboard` (requires auth)
- **Book appointment:** `/book`

## Project Structure

```
dr-abdullah-meky-clinic/
├── prisma/
│   ├── schema.prisma      # Database models
│   └── seed.ts            # Sample data
├── src/
│   ├── app/
│   │   ├── page.tsx       # Landing page
│   │   ├── book/          # Public booking
│   │   ├── login/         # Staff auth
│   │   ├── register/
│   │   └── dashboard/     # Admin area
│   ├── components/
│   │   ├── ui/            # Reusable UI primitives
│   │   ├── layout/        # Header, footer
│   │   ├── landing/       # Landing sections
│   │   └── dashboard/     # Dashboard components
│   ├── lib/
│   │   ├── actions.ts     # Server actions
│   │   ├── prisma.ts      # Database client
│   │   ├── supabase/      # Auth clients
│   │   └── validations.ts # Zod schemas
│   └── generated/prisma/  # Prisma client (auto-generated)
└── prisma.config.ts       # Prisma CLI config
```

## Database Models

- **Profile** — Staff user profiles linked to Supabase auth
- **Patient** — Patient demographics and medical info
- **Appointment** — Scheduled visits with status tracking
- **DoctorSchedule** — Weekly availability slots
- **MedicalRecord** — Clinical notes, diagnosis, prescriptions

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Generate Prisma client and build for production |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run migrations |
| `npm run db:seed` | Seed sample data |
| `npm run db:studio` | Open Prisma Studio |

## License

Private — Dr. Abdullah Meky Clinic
