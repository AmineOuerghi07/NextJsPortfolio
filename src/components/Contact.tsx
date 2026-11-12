"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { SectionHeading } from "@/components/SectionHeading";

const fieldClass =
  "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:focus:border-amber-400 dark:focus:ring-amber-400/20";

export const Contact = () => {
  const t = useTranslations("Contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t("fillAllFields"));
      return;
    }

    const loadingToast = toast.loading(t("sending"));

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      toast.dismiss(loadingToast);

      if (res.ok) {
        toast.success(t("thankYouMessage"));
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(t("sendError"));
      }
    } catch {
      toast.dismiss(loadingToast);
      toast.error(t("sendFailed"));
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:scroll-mt-10 lg:px-10 lg:py-20">
      <div>
        <SectionHeading index="05" label={t("label")} title={t("title")} />
        <p className="mt-3 max-w-2xl text-base text-stone-600 dark:text-stone-400">{t("subtitle")}</p>

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="space-y-3">
            <a
              href="mailto:MohamedAmineOuerghi07@gmail.com"
              className="flex items-center gap-4 border-b border-stone-200 py-4 transition-colors hover:text-amber-800 dark:border-stone-800 dark:hover:text-amber-400"
            >
              <Mail className="shrink-0 text-amber-800 dark:text-amber-400" size={20} />
              <span className="min-w-0">
                <span className="block text-xs text-stone-500 dark:text-stone-400">{t("email")}</span>
                <span className="block truncate font-medium text-stone-950 dark:text-stone-50">
                  MohamedAmineOuerghi07@gmail.com
                </span>
              </span>
            </a>

            <a
              href="https://linkedin.com/in/mohamed-amine-ouerghi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 border-b border-stone-200 py-4 transition-colors hover:text-amber-800 dark:border-stone-800 dark:hover:text-amber-400"
            >
              <Linkedin className="shrink-0 text-amber-800 dark:text-amber-400" size={20} />
              <span className="min-w-0">
                <span className="block text-xs text-stone-500 dark:text-stone-400">{t("linkedin")}</span>
                <span className="block truncate font-medium text-stone-950 dark:text-stone-50">
                  /in/mohamed-amine-ouerghi
                </span>
              </span>
            </a>

            <a
              href="https://github.com/AmineOuerghi07"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 border-b border-stone-200 py-4 transition-colors hover:text-amber-800 dark:border-stone-800 dark:hover:text-amber-400"
            >
              <Github className="shrink-0 text-amber-800 dark:text-amber-400" size={20} />
              <span className="min-w-0">
                <span className="block text-xs text-stone-500 dark:text-stone-400">{t("github")}</span>
                <span className="block truncate font-medium text-stone-950 dark:text-stone-50">@AmineOuerghi07</span>
              </span>
            </a>

            <div className="pt-4">
              <h3 className="font-semibold text-stone-950 dark:text-stone-50">{t("responseTime")}</h3>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{t("responseMessage")}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder={t("formName")}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={fieldClass}
            />
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder={t("formEmail")}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={fieldClass}
            />
            <textarea
              name="message"
              placeholder={t("formMessage")}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              className={`${fieldClass} resize-none`}
            />
            <button
              type="submit"
              className="w-full rounded-full bg-amber-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-900 dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400"
            >
              {t("formSubmit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
