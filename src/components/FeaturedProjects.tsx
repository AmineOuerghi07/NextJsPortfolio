import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/SectionHeading";

type LinkKey = "product" | "appStore" | "github" | "backend" | "mobile" | "web";

type Project = {
  id: string;
  tech: string[];
  links: { href: string; label: LinkKey }[];
};

const projects: Project[] = [
  {
    id: "0",
    tech: ["NestJS", "MongoDB", "BullMQ", "Redis", "Angular", "Capacitor"],
    links: [
      { href: "https://seekmake.com", label: "product" },
      { href: "https://apps.apple.com/us/app/seekmake-one/id6759160870", label: "appStore" },
    ],
  },
  {
    id: "1",
    tech: ["C++17/20", "OpenGL", "GLSL", "ImGui", "ECS", "Premake"],
    links: [{ href: "https://github.com/AmineOuerghi07/OpenGL_Project", label: "github" }],
  },
  {
    id: "2",
    tech: ["NestJS", "Flutter", "Kubernetes", "MongoDB", "MQTT"],
    links: [
      { href: "https://github.com/AmineOuerghi07/smart_farming_backend", label: "backend" },
      { href: "https://github.com/AmineOuerghi07/DreamCraftPim", label: "mobile" },
      { href: "https://github.com/AmineOuerghi07/smart-farming-web", label: "web" },
    ],
  },
  {
    id: "3",
    tech: ["C#", ".NET", "EF Core", "SQL Server", "CQRS", "xUnit"],
    links: [{ href: "https://github.com/AmineOuerghi07/.NET_Project", label: "github" }],
  },
  {
    id: "4",
    tech: ["NestJS", "MongoDB", "Gemini API", "JWT"],
    links: [{ href: "https://github.com/AmineOuerghi07/Recetta_Backend", label: "github" }],
  },
];

const earlier = [
  { id: "0", href: "https://github.com/AmineOuerghi07/Flutter-E-learning-App" },
  { id: "1", href: "https://github.com/AmineOuerghi07/3DMusuem" },
];

export const FeaturedProjects = () => {
  const t = useTranslations("FeaturedProjects");

  return (
    <section id="projects" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:scroll-mt-10 lg:px-10 lg:py-20">
      <SectionHeading index="02" label={t("label")} title={t("title")} />
      <p className="mt-3 max-w-2xl text-base text-stone-600 dark:text-stone-400">{t("subtitle")}</p>

      <ul className="project-list mt-8 border-t border-stone-200 dark:border-stone-800">
        {projects.map((project, index) => (
          <li key={project.id} className="project-row border-b border-stone-200 transition-opacity dark:border-stone-800">
            <article className="grid gap-3 py-7 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6">
              <p className="font-mono text-sm text-amber-800 dark:text-amber-400">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
                  {t(`projects.${project.id}.kicker`)}
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
                  {t(`projects.${project.id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {t(`projects.${project.id}.description`)}
                </p>
                <p className="mt-3 text-sm text-stone-800 dark:text-stone-200">
                  {t(`projects.${project.id}.metric0`)}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 font-mono text-xs text-stone-700 dark:border-stone-700 dark:bg-transparent dark:text-stone-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1 text-sm font-medium text-amber-800 hover:underline dark:text-amber-400"
                    >
                      {t(`links.${link.label}`)}
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 rtl:group-hover/link:-translate-x-0.5"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-stone-500">{t("earlierLabel")}</h3>
        <ul className="mt-3 divide-y divide-stone-200 border-y border-stone-200 dark:divide-stone-800 dark:border-stone-800">
          {earlier.map((item) => (
            <li key={item.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-stone-950 dark:text-stone-50">{t(`earlier.${item.id}.title`)}</p>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{t(`earlier.${item.id}.description`)}</p>
              </div>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-amber-800 hover:underline dark:text-amber-400"
              >
                {t("links.github")}
                <ArrowUpRight size={15} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
