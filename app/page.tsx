import {
  ArrowRightIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ServerStackIcon,
  LightBulbIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import ContactForm from "./components/ContactForm";
import TestModeToggle from "./components/TestModeToggle";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">
                  Required Technology
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#services"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Services
                </a>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  About
                </a>
                <a
                  href="#why-us"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Why Us
                </a>
                <a
                  href="#contact"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Building Tomorrow's
              <span className="text-blue-400 block mt-2">
                Digital Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              We deliver end-to-end software development services, from concept
              to deployment. Frontend, backend, mobile apps, and IT consulting –
              we bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="#contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
              >
                Get Started
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#services"
                className="border-2 border-gray-600 text-gray-300 px-8 py-3 rounded-lg text-lg font-semibold hover:border-blue-400 hover:text-blue-400 transition-colors"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Comprehensive software development solutions tailored to your
              business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="service-card p-8">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <CodeBracketIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Frontend Development
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Modern, responsive web applications built with React, Vue,
                Angular, and cutting-edge frameworks.
              </p>
            </div>

            <div className="service-card p-8">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <ServerStackIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Backend Development
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Scalable server-side solutions with Node.js, Python, Java, and
                robust database architectures.
              </p>
            </div>

            <div className="service-card p-8">
              <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center mb-4">
                <DevicePhoneMobileIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Mobile Development
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Native iOS and Android apps plus cross-platform solutions using
                React Native and Flutter.
              </p>
            </div>

            <div className="service-card p-8">
              <div className="w-12 h-12 bg-blue-300 rounded-lg flex items-center justify-center mb-4">
                <LightBulbIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                IT Consulting
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Strategic technology guidance, architecture planning, and
                digital transformation strategies.
              </p>
            </div>

            <div className="service-card p-8">
              <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center mb-4">
                <CheckCircleIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Full-Cycle Delivery
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Complete project lifecycle management from ideation to
                deployment and maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
                About Required Technology
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                We're a passionate team of software engineers, designers, and
                consultants dedicated to transforming businesses through
                innovative technology solutions.
              </p>
              <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                With years of experience across diverse industries, we
                understand that every project is unique. We combine technical
                expertise with strategic thinking to deliver solutions that
                drive real results.
              </p>
            </div>
            <div className="bg-gray-800 p-10 rounded-xl shadow-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">
                Our Mission
              </h3>
              <p className="text-gray-300 leading-relaxed">
                To empower businesses with cutting-edge software solutions that
                streamline operations, enhance user experiences, and drive
                sustainable growth in the digital age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-32 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              What sets us apart from the competition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            <div className="text-center why-choose-card">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Quality First
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Rigorous testing and code reviews ensure robust, reliable
                solutions.
              </p>
            </div>

            <div className="text-center why-choose-card">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">
                On-Time Delivery
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Agile methodologies and transparent communication guarantee
                project success.
              </p>
            </div>

            <div className="text-center why-choose-card">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Expert Team
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Seasoned professionals with deep expertise across multiple
                technologies.
              </p>
            </div>

            <div className="text-center why-choose-card">
              <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Client-Focused
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Your vision and business goals are at the center of everything
                we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Ready to start your next project? Let's discuss how we can help
              bring your ideas to life.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-6">Required Technology</h3>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Delivering exceptional software development solutions with
                expertise across frontend, backend, mobile development, IT
                consulting, and full-cycle project delivery.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-3 text-gray-400">
                <li>Frontend Development</li>
                <li>Backend Development</li>
                <li>Mobile Development</li>
                <li>IT Consulting</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@required.ee</li>
                <li>Tallinn, Estonia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; 2025 Required Technology OÜ. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Test Mode Toggle - Only visible in development or when test mode is enabled */}
      <TestModeToggle />
    </div>
  );
}
