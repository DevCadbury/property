/* ─────────────────────────────────────────────────────────────────────────────
   TrustSection — PLACEHOLDER
   Three sub-sections in one band:
   ┌───────────────────────────────────────────────────────────────────────┐
   │  A. How It Works — 3-step numbered timeline with icon grid           │
   ├───────────────────────────────────────────────────────────────────────┤
   │  B. Agent Spotlights — Avatar, name, rating, "Contact" ghost button  │
   ├───────────────────────────────────────────────────────────────────────┤
   │  C. Testimonials — Clean quote cards with star ratings               │
   └───────────────────────────────────────────────────────────────────────┘
───────────────────────────────────────────────────────────────────────────── */

import { PROCESS_STEPS, MOCK_AGENTS, MOCK_TESTIMONIALS } from "@/data/mock";

/* ════════════════════════════════════════════════════════════════════════════
   Main export
════════════════════════════════════════════════════════════════════════════ */
export function TrustSection() {
  return (
    <>
      <HowItWorksSubSection />
      <AgentSpotlightsSubSection />
      <TestimonialsSubSection />
    </>
  );
}

/* ─── A. How It Works ────────────────────────────────────────────────────── */
function HowItWorksSubSection() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="section-band-light py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-forest">
            The Process
          </p>
          <h2
            id="how-it-works-heading"
            className="font-display text-4xl font-bold text-foreground md:text-5xl"
          >
            How NorthStar Works
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            From first search to keys in hand — simplified into three meaningful steps.
          </p>
        </div>

        <div className="divider-copper mb-12" aria-hidden="true" />

        {/* Steps grid */}
        {/* TODO: Animate with staggerContainer + staggerItem Framer Motion variants */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.id}
              className="relative flex flex-col gap-4 rounded-md border border-border bg-card p-8 shadow-sm"
            >
              {/* Step number — decorative */}
              <span
                aria-hidden="true"
                className="absolute right-6 top-5 font-display text-6xl font-bold text-muted/40 select-none"
              >
                {step.id}
              </span>

              {/* Icon placeholder */}
              {/* TODO: Replace span with dynamic Lucide icon using step.iconName */}
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-forest/10 text-xl">
                {step.iconName === "Search"   ? "🔍" : ""}
                {step.iconName === "Users"    ? "👥" : ""}
                {step.iconName === "KeyRound" ? "🔑" : ""}
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {/* Connector line (hidden on last item) */}
              {step.id < PROCESS_STEPS.length && (
                <div
                  aria-hidden="true"
                  className="absolute -right-4 top-1/2 hidden h-px w-8 bg-gradient-to-r from-border to-transparent md:block"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── B. Agent Spotlights ────────────────────────────────────────────────── */
function AgentSpotlightsSubSection() {
  return (
    <section
      aria-labelledby="agents-heading"
      className="section-band-offwhite py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-forest">
              Our Specialists
            </p>
            <h2
              id="agents-heading"
              className="font-display text-4xl font-bold text-foreground md:text-5xl"
            >
              Meet the Agents
            </h2>
          </div>
          <a
            href="/agents"
            aria-label="View all agents"
            className="hidden text-sm font-semibold text-foreground underline-offset-4 hover:underline hover:text-forest md:block"
          >
            All Agents →
          </a>
        </div>

        <div className="divider-copper mb-12" aria-hidden="true" />

        {/* TODO: Animate with staggerContainer Framer Motion variant */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="card-lift flex flex-col items-center rounded-md border border-border bg-card p-6 text-center shadow-sm"
            >
              {/* Avatar */}
              {/* TODO: Replace with shadcn Avatar component */}
              <div className="mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-copper/30 bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <h3 className="text-base font-semibold text-foreground">{agent.name}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{agent.title}</p>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-1 text-xs">
                <span className="text-forest">★</span>
                <strong className="text-foreground">{agent.rating}</strong>
                <span className="text-muted-foreground">({agent.reviewCount} reviews)</span>
              </div>

              {/* Stats */}
              <div className="my-3 flex w-full justify-center gap-6 border-y border-border py-3 text-xs">
                <div>
                  <p className="font-bold text-foreground">{agent.listingsSold}</p>
                  <p className="text-muted-foreground">Sold</p>
                </div>
                <div>
                  <p className="font-bold text-foreground">{agent.yearsActive}yr</p>
                  <p className="text-muted-foreground">Experience</p>
                </div>
              </div>

              {/* Contact ghost button */}
              <a
                href={`/agents/${agent.slug}`}
                className="
                  mt-1 w-full rounded-md border border-foreground/20 py-2
                  text-xs font-semibold text-foreground/70
                  transition-all hover:border-copper hover:text-forest
                  focus-visible:outline-2 focus-visible:outline-gold
                "
              >
                Contact {agent.name.split(" ")[0]}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── C. Testimonials ────────────────────────────────────────────────────── */
function TestimonialsSubSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="section-band-light py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-forest">
            Client Stories
          </p>
          <h2
            id="testimonials-heading"
            className="font-display text-4xl font-bold text-foreground md:text-5xl"
          >
            What Our Clients Say
          </h2>
        </div>

        <div className="divider-copper mb-12" aria-hidden="true" />

        {/* TODO: Animate with staggerContainer Framer Motion variant */}
        {/* TODO: Optionally convert to auto-scrolling carousel on mobile */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {MOCK_TESTIMONIALS.map((t) => (
            <blockquote
              key={t.id}
              className="card-lift flex flex-col gap-4 rounded-md border border-border bg-card p-8 shadow-sm"
            >
              {/* Quote icon */}
              <span aria-hidden="true" className="font-display text-5xl leading-none text-forest/20">
                "
              </span>

              {/* Stars */}
              <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className={`text-sm ${i < t.rating ? "text-forest" : "text-border"}`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Content */}
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground italic">
                {t.content}
              </p>

              {/* Author */}
              <footer className="flex items-center gap-3 border-t border-border pt-4">
                {t.authorAvatar && (
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.authorAvatar}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div>
                  <cite className="not-italic text-sm font-semibold text-foreground">
                    {t.authorName}
                  </cite>
                  <p className="text-xs text-muted-foreground">{t.authorTitle}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
