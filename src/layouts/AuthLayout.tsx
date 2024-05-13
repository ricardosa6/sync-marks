import { DarkThemeToggle, Flowbite, Select } from "flowbite-react";
import { Outlet } from "react-router-dom";

import { AuthProvider } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { lngs } from "@/utils/language";

export const AuthLayout = () => {
  const { i18n } = useTranslation();
  return (
    <Flowbite>
      {/* Backgrounds from https://bg.ibelick.com/ */}
      <div className="absolute inset-0 top-0 -z-10 h-full w-full overflow-hidden bg-white dark:bg-slate-950">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] opacity-50 blur-[80px]"></div>
      </div>
      <div className="flex flex-col h-full">
        <AuthProvider>
          <div className="p-2 w-full flex justify-between items-center flex-0">
            <Select
              id="languages"
              required
              value={i18n.resolvedLanguage}
              onChange={(event) => {
                i18n.changeLanguage(event.target.value);
              }}
            >
              {Object.entries(lngs).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.nativeName}
                </option>
              ))}
            </Select>
            <div className="flex flex-grow justify-end basis-0">
              <DarkThemeToggle className="w-8 h-8 p-[4px] flex justify-center items-center focus:ring-0 dark:focus:ring-0" />
            </div>
          </div>
          <Outlet />
        </AuthProvider>
      </div>
    </Flowbite>
  );
};
