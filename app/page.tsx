import {
  ArrowRightIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ServerStackIcon,
  LightBulbIcon,
  CheckCircleIcon,
  RocketLaunchIcon,
  ClockIcon,
  UserGroupIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import ContactForm from "./components/ContactForm";
import DevTools from "./components/DevTools";
import CookieBanner from "./components/CookieBanner";
import Navigation from "./components/Navigation";

const TICKER_ITEMS = [
  "React",
  "Node.js",
  "iOS & Android",
  "Architecture reviews",
  "Full-cycle delivery",
  "Based in Tallinn",
  "Working across Europe",
];

function TickerRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <span aria-hidden={ariaHidden} className="inline-flex gap-10 items-center">
      {TICKER_ITEMS.map((item) => (
        <span key={item} className="inline-flex items-center gap-10">
          <span>{item}</span>
          <span className="opacity-50">·</span>
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Blueprint Frame: bounded content column over the dotted ground */}
      <div className="frame max-w-7xl mx-auto">
        {/* Hero Card */}
        <section className="pt-24 lg:pt-28 px-3 sm:px-5">
          <div className="hero-card">
            <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-24 lg:py-36">
              <p className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/40 text-sm text-white mb-8">
                Based in Tallinn · Working across Europe
              </p>

              <h1 className="display text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
                Software that ships.
              </h1>

              <p className="text-lg sm:text-xl text-white/95 mb-10 max-w-xl mx-auto leading-relaxed">
                Frontend, backend, mobile, and consulting — end to end, by a
                senior team you can actually talk to.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="#contact" className="btn-primary">
                  Start a project
                  <ArrowRightIcon className="w-5 h-5" />
                </a>
                <a
                  href="#services"
                  className="btn-secondary border-white/50 text-white hover:bg-white/10"
                >
                  See what we do
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Band: real numbers only */}
        <section className="py-16 lg:py-20 px-4 sm:px-8">
          <dl className="reg grid grid-cols-1 sm:grid-cols-3 border border-[var(--color-border-default)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border-default)]">
            <div className="p-8 text-center">
              <dd className="display text-5xl mb-2">50+</dd>
              <dt className="text-sm text-[var(--color-text-tertiary)]">
                Projects delivered
              </dt>
            </div>
            <div className="p-8 text-center">
              <dd className="display text-5xl mb-2">100%</dd>
              <dt className="text-sm text-[var(--color-text-tertiary)]">
                Client satisfaction
              </dt>
            </div>
            <div className="p-8 text-center">
              <dd className="display text-5xl mb-2">24/7</dd>
              <dt className="text-sm text-[var(--color-text-tertiary)]">
                Support available
              </dt>
            </div>
          </dl>
        </section>

        {/* Services */}
        <section id="services" className="py-20 lg:py-28 px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl mb-5">
              What we build
            </h2>
            <p className="text-lg text-[var(--color-text-tertiary)]">
              Four disciplines, one team, no hand-offs.
            </p>
          </div>

          <div className="reg grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">
              <CodeBracketIcon className="w-6 h-6 text-[var(--color-text-primary)] mb-5" />
              <h3 className="display text-xl mb-3">Frontend</h3>
              <p className="text-[var(--color-text-tertiary)] leading-relaxed flex-1">
                Web applications in React, Vue, or Angular that stay fast and
                maintainable as they grow.
              </p>
            </div>

            <div className="card">
              <ServerStackIcon className="w-6 h-6 text-[var(--color-text-primary)] mb-5" />
              <h3 className="display text-xl mb-3">Backend</h3>
              <p className="text-[var(--color-text-tertiary)] leading-relaxed flex-1">
                APIs and services in Node.js, Python, and Java, on database
                architectures designed to last.
              </p>
            </div>

            <div className="card">
              <DevicePhoneMobileIcon className="w-6 h-6 text-[var(--color-text-primary)] mb-5" />
              <h3 className="display text-xl mb-3">Mobile</h3>
              <p className="text-[var(--color-text-tertiary)] leading-relaxed flex-1">
                Native iOS and Android — or React Native and Flutter when one
                codebase is the right call.
              </p>
            </div>

            <div className="card">
              <LightBulbIcon className="w-6 h-6 text-[var(--color-text-primary)] mb-5" />
              <h3 className="display text-xl mb-3">Consulting</h3>
              <p className="text-[var(--color-text-tertiary)] leading-relaxed flex-1">
                Architecture reviews, technology strategy, and honest answers
                about what you actually need.
              </p>
            </div>

            {/* Signature Accent card */}
            <div className="card-accent md:col-span-2">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <RocketLaunchIcon className="w-8 h-8 shrink-0" />
                <div className="flex-1">
                  <h3 className="display text-2xl text-white mb-3">
                    Full-cycle delivery
                  </h3>
                  <p className="card-accent-muted leading-relaxed">
                    From first call to production and beyond. One team owns the
                    whole path, so nothing gets lost between hand-offs.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="chip">Discovery</span>
                    <span className="chip">Design</span>
                    <span className="chip">Development</span>
                    <span className="chip">Testing</span>
                    <span className="chip">Deployment</span>
                    <span className="chip">Maintenance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 lg:py-28 px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="display text-4xl sm:text-5xl mb-8">
                A senior team in Tallinn
              </h2>
              <p className="text-lg text-[var(--color-text-tertiary)] mb-6 leading-relaxed">
                Required Technology is a team of engineers, designers, and
                consultants who have shipped software across industries — and
                learned what makes projects succeed or stall.
              </p>
              <p className="text-lg text-[var(--color-text-tertiary)] leading-relaxed">
                Every engagement gets senior people, direct communication, and
                technical decisions we're willing to explain and defend.
              </p>
            </div>

            <div className="reg card">
              <div className="flex items-center gap-3 mb-6">
                <HeartIcon className="w-6 h-6 text-[var(--color-text-primary)]" />
                <h3 className="display text-xl">Our mission</h3>
              </div>
              <p className="text-[var(--color-text-tertiary)] leading-relaxed text-lg">
                Build software that makes our clients' businesses measurably
                better — and be the team they call first next time.
              </p>
              <div className="mt-8 p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border-subtle)]">
                <p className="text-sm text-[var(--color-text-tertiary)]">
                  We build partnerships, not just products. Your success is how
                  we measure ours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How we work */}
        <section id="why-us" className="py-20 lg:py-28 px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl mb-5">
              How we work
            </h2>
            <p className="text-lg text-[var(--color-text-tertiary)]">
              The habits behind the track record.
            </p>
          </div>

          <div className="reg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card">
              <CheckCircleIcon className="w-6 h-6 text-[var(--color-text-primary)] mb-5" />
              <h3 className="display text-lg mb-3">Quality first</h3>
              <p className="text-[var(--color-text-tertiary)] text-sm leading-relaxed">
                Code review and testing on everything we ship — no exceptions
                for deadlines.
              </p>
            </div>

            <div className="card">
              <ClockIcon className="w-6 h-6 text-[var(--color-text-primary)] mb-5" />
              <h3 className="display text-lg mb-3">On time</h3>
              <p className="text-[var(--color-text-tertiary)] text-sm leading-relaxed">
                Short iterations and honest status updates, so surprises
                surface early.
              </p>
            </div>

            <div className="card">
              <UserGroupIcon className="w-6 h-6 text-[var(--color-text-primary)] mb-5" />
              <h3 className="display text-lg mb-3">Senior team</h3>
              <p className="text-[var(--color-text-tertiary)] text-sm leading-relaxed">
                Experienced engineers on every project — not a rotating bench.
              </p>
            </div>

            <div className="card">
              <HeartIcon className="w-6 h-6 text-[var(--color-text-primary)] mb-5" />
              <h3 className="display text-lg mb-3">Client-focused</h3>
              <p className="text-[var(--color-text-tertiary)] text-sm leading-relaxed">
                Your business goals drive the technical decisions, not the
                other way round.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 lg:py-28 px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl mb-5">
              Tell us what you're building
            </h2>
            <p className="text-lg text-[var(--color-text-tertiary)]">
              We typically reply within one business day.
            </p>
          </div>

          <ContactForm />
        </section>

        {/* Closing CTA card with Ticker */}
        <section className="pb-20 lg:pb-28 px-3 sm:px-5">
          <div className="hero-card">
            <div className="relative z-10 text-center px-6 pt-20 pb-14 lg:pt-28 lg:pb-16">
              <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-white mb-8">
                Ready when you are.
              </h2>
              <a href="#contact" className="btn-primary">
                Start a project
                <ArrowRightIcon className="w-5 h-5" />
              </a>
              <div className="ticker mt-16 text-white/95 text-sm">
                <div className="ticker-track">
                  <TickerRow />
                  <TickerRow ariaHidden />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer pt-16 pb-10 px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-16">
            <div className="md:col-span-2">
              <h3 className="display text-lg mb-5">Required Technology</h3>
              <p className="text-[var(--color-text-tertiary)] max-w-md leading-relaxed">
                Frontend, backend, mobile development, IT consulting, and
                full-cycle delivery — from Tallinn, for clients across Europe.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-[var(--color-text-primary)] uppercase tracking-wider mb-5">
                Services
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#services"
                    className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    Frontend
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    Backend
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    Mobile
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    Consulting
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-[var(--color-text-primary)] uppercase tracking-wider mb-5">
                Contact
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:info@required.ee"
                    className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    info@required.ee
                  </a>
                </li>
                <li className="text-[var(--color-text-tertiary)]">
                  Tallinn, Estonia
                </li>
              </ul>
            </div>
          </div>

          {/* Footer signature */}
          <p className="wordmark-footer text-2xl sm:text-4xl lg:text-5xl text-center mb-10 select-none">
            Required Technology
          </p>

          <div className="border-t border-[var(--color-border-subtle)] pt-8">
            <p className="text-sm text-[var(--color-text-muted)] text-center sm:text-left">
              © 2026 Required Technology OÜ. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* reCAPTCHA debug tooling - development only, never bundled in production */}
      <DevTools />

      {/* Cookie Consent Banner */}
      <CookieBanner />
    </div>
  );
}
