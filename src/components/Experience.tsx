import { MapPin } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/SectionHeading";

type Job = {
  id: string;
  company: string;
  companyHref?: string;
  tech?: string[];
  bullets?: string[];
};

const jobs: Job[] = [
  {
    id: "0",
    company: "SeekMake",
    companyHref: "https://seekmake.com",
    tech: ["NestJS", "MongoDB", "BullMQ", "Redis", "Angular", "Jest", "Playwright", "GitHub Actions"],
    bullets: ["0", "1", "2", "3"],
  },
  {
    id: "1",
    company: "SeekMake",
    companyHref: "https://seekmake.com",
    tech: ["Angular", "Capacitor", "NestJS", "MongoDB"],
    bullets: ["0", "1"],
  },
  { id: "2", company: "ITPIDIA" },
  { id: "3", company: "ITPIDIA" },
  { id: "4", company: "ITPIDIA" },
  { id: "5", company: "Northern Archive" },
];

export const Experience = () => {
  const t = useTranslations("Experience");
  const [activeId, setActiveId] = useState(jobs[0].id);
  const active = jobs.find((job) => job.id === activeId) ?? jobs[0];
  const bullets = active.bullets ?? [];

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const dir = document.documentElement.dir === "rtl" ? -1 : 1;
    const forward = event.key === "ArrowDown" || (dir === 1 ? event.key === "ArrowRight" : event.key === "ArrowLeft");
    const backward = event.key === "ArrowUp" || (dir === 1 ? event.key === "ArrowLeft" : event.key === "ArrowRight");
    if (!forward && !backward && event.key !== "Home" && event.key !== "End") return;

    event.preventDefault();
    let next = index;
    if (forward) next = (index + 1) % jobs.length;
    if (backward) next = (index - 1 + jobs.length) % jobs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = jobs.length - 1;
    setActiveId(jobs[next].id);
    document.getElementById(`job-tab-${jobs[next].id}`)?.focus();
  };

  return (
    <section id="experience" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:scroll-mt-10 lg:px-10 lg:py-20">
      <SectionHeading index="04" label={t("label")} title={t("title")} />

      <div className="mt-10 grid gap-6 md:grid-cols-[200px_minmax(0,1fr)] md:gap-8">
        <div role="tablist" aria-orientation="vertical" className="no-scrollbar flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
          {jobs.map((job, index) => {
            const selected = job.id === active.id;
            return (
              <button
                key={job.id}
                id={`job-tab-${job.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="job-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(job.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={`shrink-0 rounded-md border-b-2 border-transparent px-3 py-2 text-start md:border-b-0 md:border-s-2 ${
                  selected
                    ? "border-amber-700 bg-amber-50 text-stone-950 dark:border-amber-400 dark:bg-amber-400/10 dark:text-stone-50"
                    : "text-stone-600 hover:bg-stone-100 dark:text-stone-500 dark:hover:bg-stone-800"
                }`}
              >
                <span className="block text-sm font-medium">{job.company}</span>
                <span className="mt-0.5 block font-mono text-[11px]">{t(`jobs.${job.id}.period`)}</span>
              </button>
            );
          })}
        </div>

        <article
          id="job-panel"
          role="tabpanel"
          aria-labelledby={`job-tab-${active.id}`}
          className="min-h-64"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-stone-950 dark:text-stone-50">
                {t(`jobs.${active.id}.title`)}
              </h3>
              {active.companyHref ? (
                <a
                  href={active.companyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-medium text-amber-800 hover:underline dark:text-amber-400"
                >
                  {active.company}
                </a>
              ) : (
                <p className="mt-1 text-sm font-medium text-amber-800 dark:text-amber-400">{active.company}</p>
              )}
            </div>
            <p className="font-mono text-xs text-stone-500">{t(`jobs.${active.id}.period`)}</p>
          </div>

          <p className="mt-2 flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400">
            <MapPin size={14} />
            {t(`jobs.${active.id}.location`)}
          </p>

          {bullets.length > 0 ? (
            <ul className="mt-4 list-disc space-y-2 ps-5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              {bullets.map((bullet) => (
                <li key={bullet}>{t(`jobs.${active.id}.bullets.${bullet}`)}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              {t(`jobs.${active.id}.description`)}
            </p>
          )}

          {active.tech && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {active.tech.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 font-mono text-xs text-stone-700 dark:border-stone-700 dark:bg-transparent dark:text-stone-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>

      <p className="mt-10 border-t border-stone-200 pt-6 text-sm leading-relaxed text-stone-700 dark:border-stone-800 dark:text-stone-300">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-stone-500">{t("educationLabel")}</span>
        <span className="mt-2 block text-base text-stone-900 dark:text-stone-100">{t("education")}</span>
      </p>
    </section>
  );
};
