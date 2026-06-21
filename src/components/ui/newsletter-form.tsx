"use client";

/* ─────────────────────────────────────────────────────────────────────────────
   NewsletterForm — Client Component
   Handles email subscription submission.
────────────────────────────────────────────────────────────────────────────── */

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="rounded-sm border border-forest/30 bg-forest/10 px-4 py-3 text-sm font-medium text-forest">
        ✓ You're subscribed. Welcome to Pacific Edge Insights.
      </p>
    );
  }

  return (
    <form
      aria-label="Newsletter signup"
      className="flex flex-col gap-3"
      onSubmit={handleSubmit}
    >
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="
          w-full rounded-sm border border-primary-foreground/20
          bg-primary-foreground/5
          px-4 py-2.5 text-sm
          text-primary-foreground placeholder:text-primary-foreground/30
          transition-shadow duration-200
          focus:border-forest focus:outline-none focus:[box-shadow:0_0_0_2px_var(--forest)]
        "
      />
      <button
        type="submit"
        className="
          w-full rounded-sm bg-forest px-4 py-2.5
          text-sm font-bold tracking-wide text-primary-foreground
          transition-all hover:bg-forest-light
          active:scale-[0.98]
          focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2
        "
      >
        Subscribe
      </button>
      <p className="text-[10px] text-primary-foreground/30">
        No spam. Unsubscribe anytime. View our{" "}
        <a href="/privacy" className="underline hover:text-forest">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}