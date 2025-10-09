import { Calendar, MapPin } from "lucide-react";
import { useTranslations } from 'next-intl';

export const Experience = () => {
  const t = useTranslations('Experience');

  const experiences = [
    {
      title: "0", // Reference to the job index in translations
      company: "ITPIDIA",
      location: "Tunis, Tunisie",
      period: "07/2025 - 08/2025",
      description: "0", // Reference to the job index in translations
      tech: ["Flutter", "Dart", ".NET", "MVC", "JWT", "xUnit", "REST API"]
    },
    {
      title: "1",
      company: "ITPIDIA",
      location: "Tunis, Tunisie",
      period: "09/2024 - 03/2025",
      description: "1",
      tech: ["C++", "OpenGL", "EnTT", "ImGUI", "ECS", "GLM"]
    },
    {
      title: "2",
      company: "ITPIDIA",
      location: "Tunis, Tunisie",
      period: "06/2024 - 08/2024",
      description: "2",
      tech: [".NET", "C#", "Clean Architecture", "CQRS", "MediatR", "xUnit"]
    },
    {
      title: "3",
      company: "Northern Archive",
      location: "Tunis, Tunisie",
      period: "07/2023 - 08/2023",
      description: "3",
      tech: ["Flutter", "Dart", "Firebase", "Authentication"]
    }
  ];

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h2>
        </div>
        
        <div className="space-y-8 sm:space-y-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-12 pb-8 sm:pb-12 last:pb-0">
              {idx !== experiences.length - 1 && (
                <div className="absolute left-[11px] sm:left-[15px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-blue-300 dark:from-blue-500 dark:to-blue-800"></div>
              )}
              
              <div className="absolute left-0 top-2 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 dark:bg-blue-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
              
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all ml-4 sm:ml-6 hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{t(`jobs.${exp.title}.title`)}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">{exp.company}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full whitespace-nowrap">
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                </div>
                
                <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <MapPin size={14} />
                  {exp.location}
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{t(`jobs.${exp.description}.description`)}</p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t, i) => (
                    <span key={i} className="text-xs sm:text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-full font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};