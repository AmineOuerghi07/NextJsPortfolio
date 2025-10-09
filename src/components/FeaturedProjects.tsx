import { ChevronRight, Github } from "lucide-react";
import { useTranslations } from 'next-intl';

export const FeaturedProjects = () => {
  const t = useTranslations('FeaturedProjects');

  const projects = [
    {
      title: "0", // Reference to the project index in translations
      description: "0", // Reference to the project index in translations
      tech: [
        "NestJS",
        "Flutter",
        "React",
        "MongoDB",
        "RabbitMQ",
        "Kubernetes",
        "Grafana",
        "Prometheus",
        "Power BI",
        "Microservices"
      ],
      gradient: "from-green-500 to-emerald-500",
      metrics: "0", // Reference to the project index in translations
      github: "https://github.com/AmineOuerghi07/smart_farming_backend"
    },
    {
      title: "1",
      description: "1",
      tech: ["Flutter", "NestJS", "MongoDB", "Gemini API", "Provider"],
      gradient: "from-orange-500 to-yellow-500",
      metrics: "1",
      github: "https://github.com/AmineOuerghi07/Recetta_Backend"
    },
    {
      title: "2",
      description: "2",
      tech: ["Flutter", "Firebase", "Dart", "Firestore", "Storage"],
      gradient: "from-blue-500 to-indigo-500",
      metrics: "2",
      github: "https://github.com/AmineOuerghi07/Flutter-E-learning-App"
    },
    {
      title: "3",
      description: "3",
      tech: ["Unity", "C#"],
      gradient: "from-purple-600 to-pink-600",
      metrics: "3",
      github: "https://github.com/AmineOuerghi07/3DMusuem/tree/V0.1"
    }
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`h-48 sm:h-56 bg-gradient-to-br ${project.gradient} from-blue-500/10 via-transparent to-blue-700/10 dark:from-blue-400/10 dark:to-purple-600/10 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                <span className="relative z-10">{t(`projects.${project.title}.title`).split(' ')[0]}</span>
              </div>
              <div className="p-6">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{t(`projects.${project.description}.description`)}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs sm:text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                  {['metric0', 'metric1', 'metric2'].map((metricKey, i) => (
                    <div key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <ChevronRight size={16} className="text-blue-600 dark:text-blue-400" />
                      {t(`projects.${project.metrics}.${metricKey}`)}
                    </div>
                  ))}

                  {/* GitHub link */}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mt-2 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Github size={16} /> View on GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};