// import { LanguageSelect } from "@/modules/i18n/components";
import { LogoutButton } from "@/modules/auth/components";

export const Settings = () => {
  return (
    <section className="flex gap-8 items-center flex-col h-full flex-1 px-4 pt-1 pb-4">
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-xl text-slate-900 dark:text-slate-300 text-center">
          ⚙️ {chrome.i18n.getMessage("settings_title")}
        </h1>
        {/* <LanguageSelect
          label={chrome.i18n.getMessage("settings_fields_languagesLabel")}
        /> */}
      </div>
      <LogoutButton />
    </section>
  );
};
