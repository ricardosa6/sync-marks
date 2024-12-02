import { Link } from "react-router-dom";

import { LoginForm } from "./components";

export const Login = () => {
  return (
    <section className="flex justify-center items-center flex-col p-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-300 mb-2">
        {chrome.i18n.getMessage("login_signIn")}
      </h1>
      <LoginForm />
      <div className="mt-6">
        <p className="opacity-75 text-pretty text-slate-900 dark:text-slate-300">
          {chrome.i18n.getMessage("signUp_newHere")}{" "}
          <Link
            className="text-blue-600 dark:text-blue-400 hover:opacity-75 cursor-pointer"
            to="/auth/register"
          >
            {chrome.i18n.getMessage("signUp_createAccount")}
          </Link>
        </p>
      </div>
    </section>
  );
};
