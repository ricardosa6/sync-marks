import { useTranslation } from "react-i18next";

import { LanguageSelect } from "@/modules/i18n/components";
import { LogoutButton } from "@/modules/auth/components";

export const Settings = () => {
  const { t } = useTranslation();

  return (
    <section className="flex gap-8 items-center flex-col h-full flex-1 px-4 pt-1 pb-4">
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-xl text-slate-900 dark:text-slate-300 text-center">
          ⚙️ {t("settings.title")}
        </h1>
        <LanguageSelect label={t("settings.fields.languagesLabel")} />
      </div>
      <LogoutButton />
    </section>
  );
};
