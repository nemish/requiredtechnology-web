import {
  ArrowRightIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ServerStackIcon,
  LightBulbIcon,
  CheckCircleIcon,
  SparklesIcon,
  CubeTransparentIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import ContactForm from "./components/ContactForm";
import DevTools from "./components/DevTools";
import CookieBanner from "./components/CookieBanner";
import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center justify-center pt-20">
        {/* Background Effects */}
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-32">
          <div className="w-full max-w-4xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-4">
              Building Tomorrow's
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Digital Solutions
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-[var(--color-text-tertiary)] mb-4 max-w-2xl mx-auto leading-relaxed">
              We deliver end-to-end software development services, from concept
              to deployment. Frontend, backend, mobile apps, and IT consulting –
              we bring your ideas to life.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#contact" className="btn-primary text-base py-4 px-8">
                Start Your Project
                <ArrowRightIcon className="w-5 h-5" />
              </a>
              <a href="#services" className="btn-secondary text-base py-4 px-8">
                Explore Services
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-20 pt-8 border-t border-[var(--color-border-default)]">
              <p className="text-sm text-[var(--color-text-muted)] mb-6">Trusted by companies across Europe</p>
              <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
                <span className="text-[var(--color-text-tertiary)] font-semibold">Enterprise Ready</span>
                <span className="w-px h-4 bg-[var(--color-border-default)] hidden sm:block" />
                <span className="text-[var(--color-text-tertiary)] font-semibold">Agile Development</span>
                <span className="w-px h-4 bg-[var(--color-border-default)] hidden sm:block" />
                <span className="text-[var(--color-text-tertiary)] font-semibold">Full-Stack Expertise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-darker py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-subtle)] border border-[var(--color-border-accent)] rounded-full text-sm font-medium text-[var(--color-accent-secondary)] mb-6">
              <CodeBracketIcon className="w-4 h-4" />
              <span>What We Do</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Our Services
            </h2>
            <p className="text-lg text-[var(--color-text-tertiary)] leading-relaxed">
              Comprehensive software development solutions tailored to your
              business needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Frontend Development */}
            <div className="service-card group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/20 flex items-center justify-center mb-5">
                <CodeBracketIcon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Frontend Development
              </h3>
              <p className="text-[var(--color-text-tertiary)] leading-relaxed flex-1">
                Modern, responsive web applications built with React, Vue,
                Angular, and cutting-edge frameworks.
              </p>
            </div>

            {/* Backend Development */}
            <div className="service-card group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-600/20 border border-violet-500/20 flex items-center justify-center mb-5">
                <ServerStackIcon className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Backend Development
              </h3>
              <p className="text-[var(--color-text-tertiary)] leading-relaxed flex-1">
                Scalable server-side solutions with Node.js, Python, Java, and
                robust database architectures.
              </p>
            </div>

            {/* Mobile Development */}
            <div className="service-card group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/20 flex items-center justify-center mb-5">
                <DevicePhoneMobileIcon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Mobile Development
              </h3>
              <p className="text-[var(--color-text-tertiary)] leading-relaxed flex-1">
                Native iOS and Android apps plus cross-platform solutions using
                React Native and Flutter.
              </p>
            </div>

            {/* IT Consulting */}
            <div className="service-card group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/20 flex items-center justify-center mb-5">
                <LightBulbIcon className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                IT Consulting
              </h3>
              <p className="text-[var(--color-text-tertiary)] leading-relaxed flex-1">
                Strategic technology guidance, architecture planning, and
                digital transformation strategies.
              </p>
            </div>

            {/* Full-Cycle Delivery */}
            <div className="service-card group md:col-span-2 lg:col-span-2">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <RocketLaunchIcon className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Full-Cycle Delivery
                  </h3>
                  <p className="text-[var(--color-text-tertiary)] leading-relaxed">
                    Complete project lifecycle management from ideation to
                    deployment and maintenance. We handle everything so you can focus on growing your business.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Discovery</span>
                    <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Design</span>
                    <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Development</span>
                    <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Testing</span>
                    <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Deployment</span>
                    <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Maintenance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-dark py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-subtle)] border border-[var(--color-border-accent)] rounded-full text-sm font-medium text-[var(--color-accent-secondary)] mb-6">
                <UserGroupIcon className="w-4 h-4" />
                <span>About Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-8">
                About Required Technology
              </h2>
              <p className="text-lg text-[var(--color-text-tertiary)] mb-6 leading-relaxed">
                We're a passionate team of software engineers, designers, and
                consultants dedicated to transforming businesses through
                innovative technology solutions.
              </p>
              <p className="text-lg text-[var(--color-text-tertiary)] mb-8 leading-relaxed">
                With years of experience across diverse industries, we
                understand that every project is unique. We combine technical
                expertise with strategic thinking to deliver solutions that
                drive real results.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[var(--color-border-default)]">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">50+</div>
                  <div className="text-sm text-[var(--color-text-muted)]">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-[var(--color-text-muted)]">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-[var(--color-text-muted)]">Support Available</div>
                </div>
              </div>
            </div>

            {/* Right Column - Mission Card */}
            <div className="about-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <HeartIcon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Our Mission
                </h3>
              </div>
              <p className="text-[var(--color-text-tertiary)] leading-relaxed text-lg">
                To empower businesses with cutting-edge software solutions that
                streamline operations, enhance user experiences, and drive
                sustainable growth in the digital age.
              </p>
              <div className="mt-8 p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border-default)]">
                <p className="text-sm text-[var(--color-text-muted)] italic">
                  "We believe in building partnerships, not just products. Your success is our success."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="section-darker py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-subtle)] border border-[var(--color-border-accent)] rounded-full text-sm font-medium text-[var(--color-accent-secondary)] mb-6">
              <ShieldCheckIcon className="w-4 h-4" />
              <span>Our Commitment</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Why Choose Us
            </h2>
            <p className="text-lg text-[var(--color-text-tertiary)] leading-relaxed">
              What sets us apart from the competition
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Quality First */}
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-5">
                <CheckCircleIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Quality First
              </h3>
              <p className="text-[var(--color-text-tertiary)] text-sm leading-relaxed">
                Rigorous testing and code reviews ensure robust, reliable
                solutions.
              </p>
            </div>

            {/* On-Time Delivery */}
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center mx-auto mb-5">
                <ClockIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                On-Time Delivery
              </h3>
              <p className="text-[var(--color-text-tertiary)] text-sm leading-relaxed">
                Agile methodologies and transparent communication guarantee
                project success.
              </p>
            </div>

            {/* Expert Team */}
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mx-auto mb-5">
                <UserGroupIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Expert Team
              </h3>
              <p className="text-[var(--color-text-tertiary)] text-sm leading-relaxed">
                Seasoned professionals with deep expertise across multiple
                technologies.
              </p>
            </div>

            {/* Client-Focused */}
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-5">
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Client-Focused
              </h3>
              <p className="text-[var(--color-text-tertiary)] text-sm leading-relaxed">
                Your vision and business goals are at the center of everything
                we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-dark py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-subtle)] border border-[var(--color-border-accent)] rounded-full text-sm font-medium text-[var(--color-accent-secondary)] mb-6">
              <SparklesIcon className="w-4 h-4" />
              <span>Let's Connect</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Get In Touch
            </h2>
            <p className="text-lg text-[var(--color-text-tertiary)] leading-relaxed">
              Ready to start your next project? Let's discuss how we can help
              bring your ideas to life.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-20">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <CubeTransparentIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Required Technology</h3>
              </div>
              <p className="text-[var(--color-text-tertiary)] mb-6 max-w-md leading-relaxed">
                Delivering exceptional software development solutions with
                expertise across frontend, backend, mobile development, IT
                consulting, and full-cycle project delivery.
              </p>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Services</h4>
              <ul className="space-y-4">
                <li><a href="#services" className="text-[var(--color-text-tertiary)] hover:text-white transition-colors">Frontend Development</a></li>
                <li><a href="#services" className="text-[var(--color-text-tertiary)] hover:text-white transition-colors">Backend Development</a></li>
                <li><a href="#services" className="text-[var(--color-text-tertiary)] hover:text-white transition-colors">Mobile Development</a></li>
                <li><a href="#services" className="text-[var(--color-text-tertiary)] hover:text-white transition-colors">IT Consulting</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Contact</h4>
              <ul className="space-y-4">
                <li className="text-[var(--color-text-tertiary)]">
                  <a href="mailto:info@required.ee" className="hover:text-white transition-colors">info@required.ee</a>
                </li>
                <li className="text-[var(--color-text-tertiary)]">Tallinn, Estonia</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[var(--color-border-default)] mt-12 pt-8">
            <p className="text-sm text-[var(--color-text-muted)] text-center sm:text-left">
              © 2025 Required Technology OÜ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* reCAPTCHA debug tooling - development only, never bundled in production */}
      <DevTools />

      {/* Cookie Consent Banner */}
      <CookieBanner />
    </div>
  );
}
