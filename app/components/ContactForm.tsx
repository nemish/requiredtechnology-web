"use client";

import { useEffect, useRef, useState } from "react";
import ReCAPTCHADebug from "./ReCAPTCHADebug";
import { event } from "../lib/gtag";
import { getRecaptchaToken, loadRecaptcha } from "../lib/recaptcha";
import { PaperAirplaneIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Load the reCAPTCHA script when the form scrolls into view, so a token
  // is ready by submit time (focus is the fallback trigger).
  useEffect(() => {
    const form = formRef.current;
    if (!form || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        loadRecaptcha();
        observer.disconnect();
      }
    });
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const recaptchaToken = await getRecaptchaToken("contact_form_submit");

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });

        // Track successful form submission
        event({
          action: "submit",
          category: "contact_form",
          label: "success",
          value: 1,
        });
      } else {
        setSubmitStatus("error");

        // Track failed form submission
        event({
          action: "submit",
          category: "contact_form",
          label: "error",
          value: 0,
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");

      // Track form submission error
      event({
        action: "submit",
        category: "contact_form",
        label: "exception",
        value: 0,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <ReCAPTCHADebug />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onFocus={loadRecaptcha}
        className="form-container"
      >
        {/* Name Field */}
        <div className="mb-8">
          <label
            htmlFor="name"
            className="form-label"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="form-input"
            placeholder="Your name"
          />
        </div>

        {/* Email Field */}
        <div className="mb-8">
          <label
            htmlFor="email"
            className="form-label"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="form-input"
            placeholder="your@email.com"
          />
        </div>

        {/* Message Field */}
        <div className="mb-10">
          <label
            htmlFor="message"
            className="form-label"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            required
            className="form-input resize-none"
            placeholder="Tell us about your project..."
          />
        </div>

        {/* Success Message */}
        {submitStatus === "success" && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
            <CheckCircleIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-emerald-400 font-medium text-sm">Message sent successfully!</p>
              <p className="text-emerald-400/70 text-sm mt-1">
                Thank you for reaching out. We'll get back to you soon.
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <ExclamationCircleIcon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 font-medium text-sm">Failed to send message</p>
              <p className="text-red-400/70 text-sm mt-1">
                Something went wrong. Please try again or contact us directly.
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <PaperAirplaneIcon className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Privacy Note */}
        <p className="mt-8 text-xs text-center text-[var(--color-text-muted)]">
          By submitting this form, you agree to our privacy policy. We'll never share your information.
        </p>
      </form>
    </div>
  );
}
