import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/SectionHeading";

export const Skills = () => {
  const t = useTranslations("Skills");

  const skillCategories = [
    {
      category: "0",
      skills: ["TypeScript", "C#", "JavaScript", "C++"],
    },
    {
      category: "1",
      skills: ["NestJS", ".NET", "Entity Framework Core", "MediatR", "Node.js", "BullMQ"],
    },
    {
      category: "2",
      skills: ["Angular", "Capacitor", "React", "Next.js", "Flutter", "Tailwind CSS"],
    },
    {
      category: "3",
      skills: [
        "MongoDB",
        "SQL Server",
        "Redis",
        "Docker",
        "GitHub Actions",
        "Grafana",
        "Azure Application Insights",
        "k6",
        "Jest",
        "Playwright",
        "xUnit",
      ],
    },
  ];

  return (
    <section id="skills" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:scroll-mt-10 lg:px-10 lg:py-20">
      <SectionHeading index="03" label={t("label")} title={t("title")} />

      <ul className="mt-8 divide-y divide-stone-200 border-y border-stone-200 dark:divide-stone-800 dark:border-stone-800">
        {skillCategories.map((cat) => (
          <li key={cat.category} className="grid gap-3 py-6 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-8">
            <h3 className="text-base font-semibold text-stone-950 dark:text-stone-50">
              {t(`skillCategories.${cat.category}.category`)}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm text-stone-800 dark:border-stone-700 dark:bg-transparent dark:text-stone-300"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};
