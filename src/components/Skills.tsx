import { useTranslations } from 'next-intl';

export const Skills = () => {
  const t = useTranslations('Skills');

  const skillCategories = [
    {
      category: "0", // Reference to the category index in translations
      skills: [
        ".NET",
        "Spring Boot",
        "NestJS",
        "Node.js",
        "MongoDB",
        "RabbitMQ",
        "Docker",
        "Kubernetes",
        "Prometheus",
        "Grafana",
        "SQL", 
        "NoSQL"
      ]
    },
    {
      category: "1",
      skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"]
    },
    {
      category: "2",
      skills: ["Flutter", "Dart", "Provider", "BLoC", "Firebase"]
    },
    {
      category: "3",
      skills: [
        "C++",
        "Java",
        "OpenGL",
        "ImGUI",
        "Premake",
        "Lua"
      ]
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-600 dark:text-blue-400">{t(`skillCategories.${cat.category}.category`)}</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {cat.skills.map((skill, i) => (
                  <span key={i} className="bg-white dark:bg-gray-700 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md hover:scale-105 transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};