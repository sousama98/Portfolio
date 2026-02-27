import Link from "next/link";
import {
  badges,
  certifications,
  contactLinks,
  educationTimeline,
  experiences,
  galleryImages,
  projectQuests,
  zones,
} from "@/content/content";

export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-12 text-ink sm:px-8">
      <div className="absolute left-[-14rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-cyan-200/45 blur-3xl" />
      <div className="absolute bottom-[-12rem] right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-sky-200/45 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <header className="quest-panel rounded-3xl p-7 sm:p-10">
          <p className="ui-chip w-fit text-cyan-900">Readable Fallback</p>
          <h1 className="display-font mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">Quest Portfolio /work</h1>
          <p className="mt-4 max-w-3xl text-[color:var(--ink-soft)]">
            This route mirrors the 3D quest content in plain HTML for accessibility, searchability, and low-power
            devices.
          </p>
          <Link href="/" className="ui-btn-primary mt-6 inline-block px-5 py-2.5 text-sm">
            Back to 3D Quest
          </Link>
        </header>

        <section className="mt-8">
          <h2 className="display-font text-3xl font-bold">Home Gallery</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((item) => (
              <li key={item} className="quest-panel rounded-2xl p-4 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="display-font text-3xl font-bold">Zones</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {zones
              .filter((zone) => zone.id !== "inventory")
              .map((zone) => (
                <article key={zone.id} className="quest-panel rounded-2xl p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: zone.color }} />
                    <h3 className="display-font text-xl font-bold">{zone.name}</h3>
                  </div>
                  <p className="mt-2 text-sm text-[color:var(--ink-soft)]">
                    <strong className="text-stone-900">Mission:</strong> {zone.mission}
                  </p>
                  <p className="mt-2 text-sm text-[color:var(--ink-soft)]">
                    <strong className="text-stone-900">Exploration:</strong> {zone.exploration}
                  </p>
                  <p className="mt-2 text-sm text-[color:var(--ink-soft)]">
                    <strong className="text-stone-900">Victory:</strong> {zone.victory}
                  </p>
                </article>
              ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="display-font text-3xl font-bold">Project Quests</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {projectQuests.map((project) => (
              <article key={project.name} className="quest-panel rounded-2xl p-5">
                <h3 className="display-font text-xl font-bold">{project.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-cyan-800">{project.stack}</p>
                <p className="mt-3 text-sm text-[color:var(--ink-soft)]">{project.summary}</p>
                <p className="mt-2 text-sm text-[color:var(--ink-soft)]">
                  <strong className="text-stone-900">Result:</strong> {project.result}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="display-font text-3xl font-bold">Experience</h2>
          <div className="mt-4 space-y-4">
            {experiences.map((item) => (
              <article key={item.company} className="quest-panel rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="display-font text-2xl font-bold">{item.company}</h3>
                    <p className="mt-1 text-sm font-semibold text-stone-900">Role: {item.role}</p>
                    <p className="text-sm text-[color:var(--ink-soft)]">Dates: {item.period}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-[color:var(--ink-soft)]">{item.summary}</p>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[color:var(--ink-soft)]">
                  {item.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>

                <div className="mt-5">
                  <p className="mb-2 text-sm font-semibold text-stone-900">Skills used</p>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span key={skill} className="ui-chip text-cyan-900">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="quest-panel rounded-2xl p-6">
            <h2 className="display-font text-3xl font-bold">Education Timeline</h2>
            <ul className="mt-4 space-y-3">
              {educationTimeline.map((item) => (
                <li key={item.title} className="rounded-xl border border-[color:var(--line)] bg-white/55 p-4 text-sm">
                  <p className="font-bold">{item.period} - {item.title}</p>
                  <p className="mt-1 text-[color:var(--ink-soft)]">{item.detail}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="quest-panel rounded-2xl p-6">
            <h2 className="display-font text-3xl font-bold">Experience Focus</h2>
            <p className="mt-4 text-sm text-[color:var(--ink-soft)]">
              Experience focused on cloud-native systems, ML/AI engineering, data platforms, and product delivery.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[color:var(--ink-soft)]">
              <li>Product strategy and go-to-market execution</li>
              <li>LLM applications, RAG pipelines, and model operations</li>
              <li>Cloud architecture on AWS and Azure</li>
              <li>Dashboards, KPI tracking, and analytics enablement</li>
            </ul>
          </article>
        </section>

        <section className="mt-10 grid gap-6 pb-12 md:grid-cols-2">
          <article className="quest-panel rounded-2xl p-6">
            <h2 className="display-font text-3xl font-bold">Certifications</h2>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[color:var(--ink-soft)]">
              {certifications.map((certification) => (
                <li key={certification}>{certification}</li>
              ))}
            </ul>
          </article>

          <article className="quest-panel rounded-2xl p-6">
            <h2 className="display-font text-3xl font-bold">Contact</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a className="font-semibold text-cyan-900 underline decoration-2 underline-offset-4" href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="pb-12">
          <h2 className="display-font text-3xl font-bold">Badge Definitions</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((badge) => (
              <li key={badge.id} className="quest-panel rounded-2xl p-4 text-sm">
                <p className="font-bold">{badge.title}</p>
                <p className="mt-1 text-[color:var(--ink-soft)]">{badge.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
