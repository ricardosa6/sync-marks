import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { LoginForm } from "./components";

export const Login = () => {
  const { t } = useTranslation();

  return (
    <section className="flex justify-center items-center flex-col p-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-300 mb-2">
        {t("login.signIn")}
      </h1>
      <LoginForm />
      <div className="mt-6">
        <p className="opacity-75 text-pretty text-slate-900 dark:text-slate-300">
          {t("signUp.newHere")}{" "}
          <Link
            className="text-blue-600 dark:text-blue-400 hover:opacity-75 cursor-pointer"
            to="/auth/register"
          >
            {t("signUp.createAccount")}
          </Link>
        </p>
      </div>
    </section>
  );
};
