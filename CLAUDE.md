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
├── layout.tsx           # Root layout with consent provider and GA
├── page.tsx             # Single-page landing with all sections
├── globals.css          # Tailwind + custom CSS variables (color palette)
├── api/send/route.ts    # Contact form API (Resend + reCAPTCHA verification)
├── lib/gtag.ts          # Google Analytics utilities
├── lib/recaptcha.ts     # Lazy reCAPTCHA v3 loader + token getter
└── components/
    ├── ContactForm.tsx      # Form with lazy reCAPTCHA v3 integration
    ├── EmailTemplate/       # React Email template for contact notifications
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
All design tokens (colors, gradients, shadows, radii, transitions) are CSS variables
in `app/globals.css` — use those, never hardcoded values. Dark-only theme: near-black
backgrounds (`--color-bg-*`, #0a0a0f base), electric-blue accent (`--color-accent-primary`
#3b82f6), slate-scale text (`--color-text-*`). Font is Inter via `--font-inter`.

## Design Context

### Users
Prospective B2B clients — founders, CTOs, and product owners across Europe —
evaluating whether to hire Required Technology for software development
(frontend, backend, mobile, consulting). They arrive skeptical, comparing
agencies, and want to quickly judge competence and reach out via the contact form.

### Brand Personality
Competent, modern, approachable. A visitor should feel: "these are serious,
up-to-date engineers who are also easy to talk to." Confidence without
enterprise stiffness; cutting-edge without gimmickry.

### Aesthetic Direction
**Reference: cloudflare.com (2026 redesign)** — the system, not the brand.
Decision record: `docs/adr/0001-cloudflare-derived-design-language.md`.
Vocabulary (Hero Card, Blueprint Frame, Trust Band, Ticker, Wordmark,
Plain-Confident): `CONTEXT.md`. The settled traits:

- **Warm dark ground**: page background `#151414`, body text warm cream
  (`#F0E3DE`), headings cream-white (`#FFFBF5`). Dark-only, no light mode.
- **Signature Accent: coral-red `#FF4438`** (deliberately NOT Cloudflare's
  orange — see ADR-0001) used decisively: the Hero Card's gradient fill,
  solid accent feature cards, nav CTA pill. Big committed blocks of color —
  never scattered glows, gradient text, or small accent-colored text.
- **Blueprint Frame**: dotted-grid texture in page margins, 1px hairline
  rules bounding the content column, square registration marks on card
  corners. Flat hairline cards, thin line icons — no glow shadows, no
  lift-on-hover.
- **Typography does the work**: Schibsted Grotesk at **medium (500), not
  bold** for display — tight letter-spacing (~-2.5%), line-height ~1.0,
  huge centered section headings, sentence case. Inter stays for body.
- **Pill buttons** (`border-radius: 9999px`): primary = cream fill,
  near-black text; secondary = ghost outline; nav CTA = accent fill.
- **Plain-Confident voice**: short declarative claims, warm but sober, at
  most one wink per page. No agency-speak, no fabricated social proof —
  the Trust Band carries real numbers only.
- Anti-references: the previous "glowing dark SaaS" look (blur orbs, blue
  glows, gradient text), and Cloudflare's literal orange/wordstyle.

### Design Principles
1. **Commit to color** — one accent in large, solid, rounded blocks.
2. **Warm dark, calm, legible** — WCAG 2.1 AA; accent is for surfaces and
   display type, never small text on dark (it fails contrast).
3. **Hairlines and texture over shadows** — flat cards, no elevation.
4. **Type at medium weight, tight and huge** — hierarchy from size, not
   boldness; motion subtle, CSS-only, `prefers-reduced-motion`-safe.
5. **Tokens only** — all colors/radii/transitions from CSS variables in
   `globals.css`.
6. **Conversion-focused** — everything sharpens the path to the contact form.

## Agent skills

### Issue tracker

Issues live in GitHub Issues for `nemish/requiredtechnology-web` (via the `gh` CLI). See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
