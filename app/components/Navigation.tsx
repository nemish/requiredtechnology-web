"use client";

import { useState } from "react";
import {
  ArrowRightIcon,
  CubeTransparentIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="nav-glass fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <CubeTransparentIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                Required Technology
              </h1>
            </div>
          </div>

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
            <a href="#contact" className="btn-primary ml-4 py-2.5 px-5 text-sm">
              Get in Touch
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
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
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border-default)] animate-fade-in">
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
                className="btn-primary w-full py-3 text-center"
              >
                Get in Touch
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
