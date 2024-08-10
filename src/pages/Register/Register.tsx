import { FormEvent, useState } from "react";
import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthError } from "firebase/auth";

import {
  IconShieldCheck,
  IconPassword,
  IconMailFilled,
  IconShieldX,
} from "@/modules/shared/icons";

import { useAuthContext } from "@/modules/auth/contexts";
import { TextField } from "@/modules/shared/components";

export const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authContext = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState<AuthError["code"] | null>(null);

  const isError = Boolean(error);

  const passwordError = isError || !passwordMatch;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    const repeatPassword = event.currentTarget.repeatPassword.value;

    if (password !== repeatPassword) {
      console.error("Passwords do not match");

      setLoading(false);
      setPasswordMatch(false);

      return;
    }

    return authContext
      ?.signup(email, password)
      .then(() => {
        setError(null);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="flex justify-center items-center flex-col p-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-300 mb-2">
        {t("signUp.register")}
      </h1>
      <form
        className="flex max-w-md flex-col gap-4 w-full"
        onSubmit={handleSubmit}
      >
        <TextField
          label={t("login.fields.email.label")}
          color={isError ? "failure" : undefined}
          disabled={loading}
          icon={() => (
            <IconMailFilled className="w-4 h-4 fill-gray-600 dark:fill-gray-400" />
          )}
          id="email"
          placeholder={t("login.fields.email.placeholder")}
          required
          sizing="sm"
          type="email"
        />
        <TextField
          label={t("login.fields.password.label")}
          color={passwordError ? "failure" : undefined}
          disabled={loading}
          icon={() => (
            <IconPassword
              className={`w-4 h-4 ${passwordError ? "stroke-red-500" : "stroke-gray-600 dark:stroke-gray-400"} `}
            />
          )}
          id="password"
          placeholder={t("login.fields.password.placeholder")}
          required
          sizing="sm"
          type="password"
        />
        <TextField
          label={t("signUp.fields.repeatPassword.label")}
          color={passwordError ? "failure" : undefined}
          disabled={loading}
          icon={() =>
            passwordMatch ? (
              <IconShieldCheck className="w-4 h-4 stroke-gray-600 dark:stroke-gray-400" />
            ) : (
              <IconShieldX className="w-4 h-4 stroke-red-500" />
            )
          }
          id="repeatPassword"
          placeholder={t("signUp.fields.repeatPassword.placeholder")}
          required
          sizing="sm"
          type="password"
        />
        {!passwordMatch ? (
          <p className="text-red-500 text-sm font-medium">
            {t("signUp.fields.repeatPassword.doesNotMatch")}
          </p>
        ) : null}
        <Button
          disabled={loading}
          size={"sm"}
          gradientDuoTone="tealToLime"
          type="submit"
        >
          {t("login.signUp")}
        </Button>
        {/* <Button
          disabled
          size={"sm"}
          color="#24292F"
          className="bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4
        focus:outline-none focus:ring-[#24292F]/50 dark:focus:ring-gray-500 dark:hover:bg-[#050708]/50"
        >
          <IconGithub className="w-4 h-4 me-2" />
          Sign in with GitHub
        </Button> */}
        {/* <Button
          disabled
          size={"sm"}
          color="#4285F4"
          className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/10 dark:focus:ring-[#4285F4]/55"
        >
          <IconGoogle className="w-4 h-4 me-2" />
          Sign in with Google
        </Button> */}
      </form>

      <div className="mt-6">
        <p className="opacity-75 text-pretty text-slate-900 dark:text-slate-300">
          {t("signUp.alreadyHaveAccount")}{" "}
          <Link
            className="text-blue-600 dark:text-blue-400 hover:opacity-75 cursor-pointer"
            to="/auth/login"
          >
            {t("login.signIn")}
          </Link>
        </p>
      </div>
    </section>
  );
};
