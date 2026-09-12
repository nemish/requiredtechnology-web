"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <nav className="nav-glass fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Wordmark */}
          <span className="display text-lg">Required Technology</span>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <a href="#services" className="nav-link">
              Services
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#why-us" className="nav-link">
              Why Us
            </a>
            <a href="#contact" className="btn-accent ml-4 py-2.5 px-5 text-sm">
              Get in touch
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls={isMenuOpen ? "mobile-menu" : undefined}
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-20 left-0 right-0 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border-default)] animate-fade-in"
        >
          <div className="px-4 py-6 space-y-4">
            <a
              href="#services"
              onClick={closeMenu}
              className="block px-4 py-3 text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
            >
              Services
            </a>
            <a
              href="#about"
              onClick={closeMenu}
              className="block px-4 py-3 text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
            >
              About
            </a>
            <a
              href="#why-us"
              onClick={closeMenu}
              className="block px-4 py-3 text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
            >
              Why Us
            </a>
            <div className="pt-4 border-t border-[var(--color-border-default)]">
              <a
                href="#contact"
                onClick={closeMenu}
                className="btn-accent w-full py-3 text-center"
              >
                Get in touch
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
