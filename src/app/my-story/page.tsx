import Link from "next/link";
import { withBasePath } from "@/lib/withBasePath";

const techStack = [
  "Python",
  "SQL",
  "R",
  "AWS Bedrock",
  "Angular",
  "RAG Pipelines",
  "Power BI",
  "LangChain",
  "LangGraph",
  "PyTorch",
  "MLOps",
  "CI/CD",
  "Snowflake",
  "Databricks",
  "Tableau",
];

export default function MyStoryPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-12 text-ink sm:px-8">
      <div className="absolute left-[-14rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-cyan-200/45 blur-3xl" />
      <div className="absolute bottom-[-12rem] right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-sky-200/45 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <header className="quest-panel rounded-3xl p-7 sm:p-10">
          <p className="ui-chip w-fit text-cyan-900">My Story</p>
          <h1 className="display-font mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">About Me</h1>
          <p className="mt-4 max-w-3xl text-[color:var(--ink-soft)]">
            Bridging product thinking and infrastructure to make AI work in the real world.
          </p>
          <Link href="/" className="ui-btn-primary mt-6 inline-block px-5 py-2.5 text-sm">
            Back to Home
          </Link>
        </header>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.7fr_1fr]">
          <div className="quest-panel rounded-2xl p-5 text-sm leading-relaxed text-[color:var(--ink-soft)]">
            <h2 className="display-font text-2xl font-bold text-stone-900">My Story</h2>
            <p className="mt-4">
              I&apos;m Sourabrata Samanta, a software engineer turned Data & AI builder who thrives on solving messy,
              unstructured problems and turning them into crisp, scalable solutions. My journey started with
              electronics and computer science at KIIT and evolved through years of full-stack engineering at
              Accenture, where I learned how real systems behave under pressure. That foundation shaped how I build
              today: fast, clean, and obsessively user-centric.
            </p>
            <p className="mt-4">
              These days, I specialize in AI engineering, multimodal RAG pipelines, cloud-native architecture, and
              full-stack development, blending technical depth with product thinking. I&apos;m currently pursuing my MSIS
              at Indiana University&apos;s Kelley School of Business, focusing heavily on Data Analytics, Cloud Computing,
              and AI strategy.
            </p>
            <p className="mt-4">
              I love working at the intersection of AI systems, data engineering, and product development, where
              architecture meets creativity. Whether it&apos;s RAG, MLOps, cloud infra, or analyst-facing dashboards, I&apos;m
              driven by one goal: shipping solutions that actually move the needle.
            </p>
            <p className="mt-4">
              Outside tech, I&apos;m a musician and audio storyteller. I compose original guitar pieces, create audio
              stories in Adobe Audition, and blend sound and narrative as a creative outlet. That balance keeps me
              grounded and fuels the creativity I bring into my engineering work.
            </p>

            <h3 className="display-font mt-6 text-xl font-bold text-stone-900">What I Do</h3>
            <ul className="mt-3 space-y-2">
              <li>Technology consulting - strategy and solution design</li>
              <li>Cloud-native architectures - scalable, secure AWS & Azure deployments</li>
              <li>ML & AI engineering - RAG pipelines, model integration, and production LLM systems</li>
              <li>Data science & advanced analytics - modeling, experimentation, and insight generation</li>
              <li>Data analytics & BI - dashboards, stakeholder-driven metrics, and self-serve analytics</li>
              <li>Product management & strategy - roadmaps, prioritization, and measurable outcomes</li>
            </ul>
          </div>

          <aside className="space-y-4">
            <div className="quest-panel rounded-2xl p-4">
              <img
                src={withBasePath("/assets/logos/portimage.JPG")}
                alt="Sourabrata Samanta"
                className="w-full rounded-xl object-cover"
              />
            </div>

            <div className="quest-panel rounded-2xl p-4">
              <h3 className="display-font text-lg font-bold text-stone-900">Affiliations</h3>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <img src={withBasePath("/assets/logos/kiit.png")} alt="KIIT" className="h-12 rounded bg-white p-1.5" />
                <img src={withBasePath("/assets/logos/accenture.png")} alt="Accenture" className="h-9 rounded bg-white p-1.5" />
                <img
                  src={withBasePath("/assets/logos/indiana.webp")}
                  alt="Indiana University"
                  className="h-12 rounded bg-white p-1.5"
                />
                <img src={withBasePath("/assets/logos/mphasis.png")} alt="Mphasis" className="h-9 rounded bg-white p-1.5" />
                <img src={withBasePath("/assets/logos/auntedna.png")} alt="auntEDNA.ai" className="h-9 rounded bg-white p-1.5" />
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 p-4">
              <h3 className="display-font text-lg font-bold text-white">Technologies I Use</h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {techStack.map((item) => (
                  <span key={item} className="rounded-lg bg-cyan-50 px-2 py-1 text-center text-xs font-semibold text-cyan-900">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
