'use client';
import { Github, Linkedin, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

export const Contact = () => {
  const t = useTranslations('Contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      alert(t('thankYouMessage'));
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert(t('fillAllFields'));
    }
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <a
                href="mailto:MohamedAmineOuerghi07@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 p-4 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-all hover:scale-[1.02]"
              >
                <div className="justify-items-center"><Mail className="text-blue-600 dark:text-blue-400" size={24} /> </div>
                <div className="md:flex-1 min-w-0 text-center md:text-left">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {t('email')}
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white break-words">
                    MohamedAmineOuerghi07@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/mohamed-amine-ouerghi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 p-4 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-all hover:scale-[1.02]"
              >
                <div className="justify-items-center"> <Linkedin className="text-blue-600 dark:text-blue-400" size={24} /> </div>
                <div className="md:flex-1 min-w-0 text-center md:text-left">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {t('linkedin')}
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white break-words">
                    /in/mohamed-amine-ouerghi
                  </div>
                </div>
              </a>

              <a
                href="https://github.com/AmineOuerghi07"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 p-4 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-all hover:scale-[1.02]"
              >
                <div className="justify-items-center"><Github className="text-blue-600 dark:text-blue-400" size={24} /> </div>
                <div className="md:flex-1 min-w-0 text-center md:text-left">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {t('github')}
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white break-words">
                    @AmineOuerghi07
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-8 p-6 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl text-center md:text-left">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                {t('responseTime')}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {t('responseMessage')}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder={t('formName')}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 md:py-4 rounded-xl bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-400/50 transition-all"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder={t('formEmail')}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 md:py-4 rounded-xl bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-400/50 transition-all"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder={t('formMessage')}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 md:py-4 rounded-xl bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-400/50 resize-none transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-800 px-6 py-3 md:py-4 rounded-xl font-bold hover:bg-blue-700 dark:hover:bg-blue-400 transition-all hover:shadow-2xl hover:scale-[1.02]"
              >
                {t('formSubmit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};