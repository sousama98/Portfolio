"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "@/lib/withBasePath";
import {
  certificationShowcase,
  contactMethods,
  educationDetails,
  experiences,
  projectDetails,
  preferredRoles,
  type ZoneContent,
} from "@/content/content";

type Props = {
  zone: ZoneContent | null;
  onClose: () => void;
};

export default function QuestPanel({ zone, onClose }: Props) {
  const [selectedEducation, setSelectedEducation] = useState<"undergrad" | "grad" | null>(null);
  const [homeSlide, setHomeSlide] = useState(0);

  useEffect(() => {
    setSelectedEducation(null);
    setHomeSlide(0);
  }, [zone?.id]);

  if (!zone) return null;

  const isExperience = zone.id === "experience";
  const isHome = zone.id === "home";
  const isCertifications = zone.id === "certifications";
  const isContact = zone.id === "contact";
  const isEducation = zone.id === "education";
  const isProjects = zone.id === "projects";
  const isThankYou = zone.id === "thank-you";

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/35 p-4 md:items-center">
      <article className="quest-panel fade-in-up max-h-[88vh] w-full max-w-6xl overflow-auto rounded-3xl p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <p className="ui-chip text-cyan-900">Level Portal</p>
          <button type="button" onClick={onClose} className="ui-btn px-3 py-1.5 text-sm">
            Close
          </button>
        </div>

        <h2 className="display-font mt-4 text-3xl font-bold text-ink">{zone.name}</h2>

        {!isExperience && !isHome && !isCertifications && !isContact && !isEducation && !isProjects && !isThankYou && (
          <section className="mt-5 grid gap-4 text-sm leading-relaxed text-[color:var(--ink-soft)] sm:grid-cols-3">
            <div className="rounded-2xl border border-[color:var(--line)] bg-white/55 p-4">
              <h3 className="display-font text-base font-bold text-stone-900">Mission</h3>
              <p className="mt-2">{zone.mission}</p>
            </div>
            <div className="rounded-2xl border border-[color:var(--line)] bg-white/55 p-4">
              <h3 className="display-font text-base font-bold text-stone-900">Exploration</h3>
              <p className="mt-2">{zone.exploration}</p>
            </div>
            <div className="rounded-2xl border border-[color:var(--line)] bg-white/55 p-4">
              <h3 className="display-font text-base font-bold text-stone-900">Victory</h3>
              <p className="mt-2">{zone.victory}</p>
            </div>
          </section>
        )}

        {isExperience && (
          <section className="mt-5 space-y-4 text-sm text-[color:var(--ink-soft)]">
            {experiences.map((item) => (
              <article key={item.company} className="rounded-2xl border border-[color:var(--line)] bg-white/55 p-4">
                <h3 className="display-font text-xl font-bold text-stone-900">{item.company}</h3>
                <p className="mt-1 font-semibold text-stone-900">Role: {item.role}</p>
                <p className="text-[color:var(--ink-soft)]">Dates: {item.period}</p>
                <p className="mt-3">{item.summary}</p>

                <ul className="mt-3 list-disc space-y-1 pl-5">
                  {item.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span key={skill} className="ui-chip text-cyan-900">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </section>
        )}

        {isHome && (
          <section className="mt-5 space-y-6">
            <section className="rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-7 text-white">
              <h3 className="display-font text-3xl font-bold">
                Hi, I Am <span className="text-cyan-100">Sourabrata Samanta</span>
              </h3>
              <p className="mt-2 text-sm sm:text-base">
                AI Engineer | Full-Stack Developer | Cloud & Data Specialist
              </p>
              <p className="mt-2 text-sm sm:text-base">
                I build intelligent, scalable applications powered by modern AI, cloud, and data systems.
              </p>
              <p className="mt-4 rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold text-cyan-50">
                Play this game, complete all paths by visiting every level.
              </p>
            </section>

            <section className="rounded-2xl border border-[color:var(--line)] bg-white/60 p-5">
              <h4 className="display-font text-2xl font-bold text-stone-900">Gallery</h4>
              <p className="mt-1 text-sm text-[color:var(--ink-soft)]">A few things I love outside of work.</p>

              <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    emoji: "🎸",
                    title: "Music & Audio",
                    text: "I write, play, and tell stories through sound.",
                    tags: ["Guitar player", "Lyricist", "Spotify podcaster", "Rock music"],
                  },
                  {
                    emoji: "✈️",
                    title: "Travel & Food",
                    text: "Exploring places, people, and plates one trip at a time.",
                    tags: ["Solo traveller", "Travel vlogger", "Foodie"],
                  },
                  {
                    emoji: "🎮",
                    title: "Gaming",
                    text: "Competitive and story-driven worlds I keep going back to.",
                    tags: ["FIFA", "CS:GO", "Assassin's Creed"],
                  },
                  {
                    emoji: "🎬",
                    title: "Cinema & Storytelling",
                    text: "From classic directors to universe-building blockbusters.",
                    tags: ["Satyajit Ray", "Christopher Nolan", "Marvel"],
                  },
                  {
                    emoji: "⚽",
                    title: "Football",
                    text: "Match nights, rivalries, and the beautiful game.",
                    tags: ["Manchester United", "Argentina", "Mohun Bagan"],
                  },
                ].map((hobby) => (
                  <article key={hobby.title} className="rounded-xl border border-cyan-100 bg-cyan-50/70 p-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{hobby.emoji}</span>
                      <h5 className="font-bold text-stone-900">{hobby.title}</h5>
                    </div>
                    <p className="mt-2 text-[color:var(--ink-soft)]">{hobby.text}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {hobby.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-cyan-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setHomeSlide((prev) => (prev - 1 + 7) % 7)}
                    className="ui-btn h-9 w-9 text-sm"
                  >
                    ❮
                  </button>
                  <div className="mx-2 grid flex-1 grid-cols-2 gap-2 md:max-w-4xl">
                    {[
                      ["/assets/logos/Carousel/re.JPG", "/assets/logos/Carousel/key.JPG"],
                      ["/assets/logos/Carousel/aws.JPG", "/assets/logos/Carousel/kiro.jpg"],
                      ["/assets/logos/Carousel/100_0464.JPG", "/assets/logos/Carousel/FullSizeRender.jpeg"],
                      ["/assets/logos/Carousel/IMG_1855.jpeg", "/assets/logos/Carousel/IMG_3773.JPG"],
                      ["/assets/logos/Carousel/IMG_5465.jpeg", "/assets/logos/Carousel/IMG_5577.JPG"],
                      ["/assets/logos/Carousel/IMG_5587.JPG", "/assets/logos/Carousel/IMG_5783.JPG"],
                      ["/assets/logos/Carousel/IMG_6643.JPG", "/assets/logos/Carousel/invent.jpeg"],
                    ][homeSlide].map((src) => (
                      <img
                        key={src}
                        src={withBasePath(src)}
                        alt="Gallery slide"
                        className="h-72 w-full rounded-lg object-cover"
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setHomeSlide((prev) => (prev + 1) % 7)}
                    className="ui-btn h-9 w-9 text-sm"
                  >
                    ❯
                  </button>
                </div>
                <div className="mt-3 flex justify-center gap-2">
                  {Array.from({ length: 7 }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setHomeSlide(idx)}
                      className={`h-2.5 w-2.5 rounded-full ${homeSlide === idx ? "bg-cyan-700" : "bg-cyan-200"}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </section>
          </section>
        )}

        {isCertifications && (
          <section className="mt-5 space-y-6">
            <section className="rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-7 text-white">
              <h3 className="display-font text-3xl font-bold">Certifications & Awards</h3>
              <p className="mt-2 text-sm sm:text-base">
                Professional credentials validating expertise in AI, Cloud, and Data Engineering
              </p>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {certificationShowcase.map((item) => (
                <article
                  key={`${item.title}-${item.date}`}
                  className="rounded-2xl border border-[color:var(--line)] bg-white/60 p-5 text-sm"
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-50">
                    {item.logoSrc ? (
                      <img src={item.logoSrc} alt={item.issuer} className="max-h-10 max-w-10 object-contain" />
                    ) : (
                      <span className="text-2xl">{item.badge}</span>
                    )}
                  </div>
                  <h4 className="display-font text-xl font-bold text-stone-900">{item.title}</h4>
                  <p className="mt-1 font-semibold text-cyan-800">{item.issuer}</p>
                  <p className="mt-2 text-[color:var(--ink-soft)]">{item.description}</p>
                  <p className="mt-3 inline-block rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-900">
                    {item.date}
                  </p>
                </article>
              ))}
            </section>
          </section>
        )}

        {isContact && (
          <section className="mt-5 space-y-6">
            <section className="rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-7 text-white">
              <h3 className="display-font text-3xl font-bold">Get In Touch</h3>
              <p className="mt-2 text-sm sm:text-base">
                Let&apos;s discuss opportunities and collaborate on exciting projects
              </p>
            </section>

            <section className="rounded-2xl border border-[color:var(--line)] bg-white/60 p-5 text-sm leading-relaxed text-[color:var(--ink-soft)]">
              <h4 className="display-font text-2xl font-bold text-stone-900">Let&apos;s Connect</h4>
              <p className="mt-3">
                I&apos;m always interested in hearing about new opportunities, collaborating on projects, or just having a
                conversation about technology.
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {contactMethods.map((method) => (
                  <article key={method.label} className="rounded-xl border border-cyan-100 bg-cyan-50/70 p-4">
                    <h5 className="font-bold text-stone-900">
                      {method.icon} {method.label}
                    </h5>
                    <p className="mt-1 break-all">
                      <a
                        href={method.href}
                        target={method.href.startsWith("http") ? "_blank" : undefined}
                        rel={method.href.startsWith("http") ? "noreferrer" : undefined}
                        className="text-cyan-900 underline decoration-2 underline-offset-4"
                      >
                        {method.value}
                      </a>
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-cyan-100 bg-cyan-50/70 p-4">
                <h5 className="font-bold text-stone-900">Current Status</h5>
                <p className="mt-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                  🟢 Available for new opportunities
                </p>
              </div>

              <div className="mt-5">
                <h5 className="font-bold text-stone-900">Target Roles</h5>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {preferredRoles.map((role) => (
                    <article
                      key={role.title}
                      className="rounded-xl border border-[color:var(--line)] bg-white/75 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <h6 className="font-bold text-stone-900">{role.title}</h6>
                      <p className="mt-1 text-[color:var(--ink-soft)]">{role.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </section>
        )}

        {isEducation && (
          <section className="mt-5 space-y-6">
            <section className="rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-7 text-white">
              <h3 className="display-font text-3xl font-bold">Education</h3>
              <p className="mt-2 text-sm sm:text-base">Academic journey and continuous learning</p>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              {educationDetails.map((item) => (
                <button
                  key={item.level}
                  type="button"
                  onClick={() => setSelectedEducation(item.level)}
                  className={`rounded-2xl border p-5 text-left text-sm transition ${
                    item.level === "grad"
                      ? "border-cyan-700/20 bg-gradient-to-br from-cyan-700 to-sky-700 text-white"
                      : "border-[color:var(--line)] bg-white/60 text-[color:var(--ink-soft)]"
                  } ${
                    selectedEducation === item.level
                      ? "ring-2 ring-cyan-400/70"
                      : "hover:-translate-y-0.5 hover:shadow-md"
                  }`}
                >
                  <div className="mb-3 text-2xl">🎓</div>
                  <h4 className="display-font text-2xl font-bold">{item.title}</h4>
                  <p className={item.level === "grad" ? "text-cyan-100" : "text-[color:var(--ink-soft)]"}>
                    {item.subtitle}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider opacity-80">Click to view details ↓</p>
                </button>
              ))}
            </section>

            {selectedEducation ? (
              <section className="space-y-4">
                {educationDetails
                  .filter((item) => item.level === selectedEducation)
                  .map((item) => (
                    <article key={`${item.level}-details`} className="rounded-2xl border border-[color:var(--line)] bg-white/60 p-5 text-sm text-[color:var(--ink-soft)]">
                      <div className="flex flex-wrap items-center gap-3">
                        <img src={item.logoSrc} alt={item.university} className="h-12 rounded bg-white p-1.5" />
                        <div>
                          <h4 className="display-font text-2xl font-bold text-stone-900">{item.university}</h4>
                          <p className="font-semibold text-cyan-800">{item.degree}</p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <div className="rounded-xl border border-cyan-100 bg-cyan-50/70 p-3">
                          <p className="font-semibold text-stone-900">📅 Duration</p>
                          <p className="mt-1">{item.duration}</p>
                        </div>
                        <div className="rounded-xl border border-cyan-100 bg-cyan-50/70 p-3">
                          <p className="font-semibold text-stone-900">📊 {item.gpaLabel}</p>
                          <p className="mt-1">{item.gpaValue}</p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="font-semibold text-stone-900">📚 Key Courses</p>
                          <ul className="mt-2 list-disc space-y-1 pl-5">
                            {item.keyCourses.map((course) => (
                              <li key={course}>{course}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-stone-900">🏆 Certifications</p>
                          <ul className="mt-2 list-disc space-y-1 pl-5">
                            {item.certifications.map((certification) => (
                              <li key={certification}>{certification}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {item.extracurriculars && (
                        <div className="mt-4">
                          <p className="font-semibold text-stone-900">🎯 Extracurriculars</p>
                          <ul className="mt-2 list-disc space-y-1 pl-5">
                            {item.extracurriculars.map((activity) => (
                              <li key={activity}>{activity}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </article>
                  ))}
              </section>
            ) : (
              <p className="rounded-xl border border-cyan-100 bg-cyan-50/70 px-4 py-3 text-sm text-cyan-900">
                Select either Undergraduate or Graduate above to view details.
              </p>
            )}
          </section>
        )}

        {isProjects && (
          <section className="mt-5 space-y-6">
            <section className="rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-7 text-white">
              <h3 className="display-font text-3xl font-bold">My Projects</h3>
              <p className="mt-2 text-sm sm:text-base">
                A showcase of my technical work and problem-solving approach
              </p>
            </section>

            <section className="space-y-4">
              {projectDetails.map((project) => (
                <article
                  key={project.title}
                  className="rounded-2xl border border-[color:var(--line)] bg-white/60 p-5 text-sm text-[color:var(--ink-soft)]"
                >
                  <h4 className="display-font text-2xl font-bold text-stone-900">{project.title}</h4>
                  <p className="mt-3">{project.description}</p>

                  <div className="mt-4 space-y-3">
                    <div>
                      <h5 className="font-bold text-stone-900">Problem Solved</h5>
                      <p className="mt-1">{project.problemSolved}</p>
                    </div>

                    <div>
                      <h5 className="font-bold text-stone-900">Technical Approach</h5>
                      <ol className="mt-2 list-decimal space-y-1 pl-5">
                        {project.technicalApproach.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h5 className="font-bold text-stone-900">Key Learnings</h5>
                      <p className="mt-1">{project.keyLearnings}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techTags.map((tag) => (
                      <span key={tag} className="ui-chip text-cyan-900">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </section>
          </section>
        )}

        {isThankYou && (
          <section className="mt-6 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-10 text-center text-white">
            <p className="text-lg font-semibold sm:text-xl">
              Thank You For Visiting All The Paths, Hope You Had A Great Journey
            </p>
            <p className="mt-6 text-2xl font-bold">Visit Again</p>
            <p className="mt-4 text-base sm:text-lg">Love The Life You live, Live The Life You Love</p>
          </section>
        )}
      </article>
    </div>
  );
}
