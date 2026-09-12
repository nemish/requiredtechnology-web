# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

**Use pnpm exclusively.** Do not use npm or yarn.

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (Next.js with Turbopack)
pnpm build            # Production build (with Turbopack)
pnpm start            # Start production server
pnpm test             # Run test suite (Vitest, single run)
pnpm add <package>    # Add dependency
pnpm add -D <package> # Add dev dependency
```

For CI/CD: `pnpm install --frozen-lockfile`

## Testing

Vitest + React Testing Library on jsdom, configured in `vitest.config.ts`. Test files
are colocated with the code they test (`app/**/*.test.ts(x)`) and import from `vitest`
explicitly (no globals) — call RTL's `cleanup()` in `afterEach` yourself. Run one file
with `pnpm vitest run <path>`, or watch mode with `pnpm vitest`.

## Architecture

This is a Next.js 15 single-page marketing website for Required Technology using the App Router.

### Tech Stack
- **Framework**: Next.js 15 with Turbopack, App Router
- **React**: 19.1.0
- **Styling**: Tailwind CSS v4 with custom CSS variables in `app/globals.css`
- **Icons**: @heroicons/react, lucide-react
- **Email**: Resend with React Email templates
- **Spam Protection**: Google reCAPTCHA v3
- **Analytics**: Google Analytics via @next/third-parties

### Project Structure
```
app/
├── layout.tsx           # Root layout with ReCAPTCHA provider and GA
├── page.tsx             # Single-page landing with all sections
├── globals.css          # Tailwind + custom CSS variables (color palette)
├── api/send/route.ts    # Contact form API (Resend + reCAPTCHA verification)
├── lib/gtag.ts          # Google Analytics utilities
└── components/
    ├── ContactForm.tsx      # Form with reCAPTCHA v3 integration
    ├── EmailTemplate/       # React Email template for contact notifications
    ├── ReCAPTCHAProvider.tsx # GoogleReCaptchaProvider wrapper
    ├── ConsentProvider.tsx  # Owns cookie-consent state (localStorage-backed context)
    ├── Analytics.tsx        # Mounts GA only after consent is accepted
    ├── CookieBanner.tsx     # GDPR cookie consent (reads/writes via ConsentProvider)
    └── TestModeToggle.tsx   # Dev-only reCAPTCHA testing
```

### Environment Variables
- `RESEND_API_KEY` - Resend API key for email sending
- `RECAPTCHA_SECRET_KEY` - reCAPTCHA v3 server-side secret
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - reCAPTCHA v3 client-side site key
- `NEXT_PUBLIC_GA_ID` - Google Analytics measurement ID

### Path Alias
Use `@/*` for root-relative imports (configured in tsconfig.json).

### Color Palette
Custom CSS variables defined in globals.css following Coolors palette:
- `--primary-black`: #000000
- `--primary-dark`: #0c1821
- `--primary-blue`: #1b2a41
- `--primary-blue-light`: #324a5f
- `--light-accent`: #ccc9dc

## Agent skills

### Issue tracker

Issues live in GitHub Issues for `nemish/requiredtechnology-web` (via the `gh` CLI). See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
