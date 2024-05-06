import { LogoutButton } from "@/components/LogoutButton";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "@/components/LanguageSelect";

const Settings = () => {
  const { t } = useTranslation();

  return (
    <section className="flex justify-between items-center flex-col h-full flex-1 px-4 pt-1 pb-4">
      <div className="relative w-full">
        <h1 className="text-xl text-slate-900 dark:text-slate-300 text-center">
          ⚙️ {t("settings.title")}
        </h1>
        <LanguageSelect />
      </div>
      <LogoutButton />
    </section>
  );
};

export default Settings;
