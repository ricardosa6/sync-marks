import { FormEvent, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuthContext } from "@/contexts/AuthContext";

import { IconShieldCheck, IconPassword, IconMailFilled } from "@/icons";

const Register = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const authContext = useAuthContext();

  const navigate = useNavigate();

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

    authContext
      ?.signup(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(errorCode, errorMessage);
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
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value={t("login.fields.email.label")} />
          </div>
          <TextInput
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
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="password"
              value={t("login.fields.password.label")}
            />
          </div>
          <TextInput
            disabled={loading}
            icon={() => (
              <IconPassword className="w-4 h-4 stroke-gray-600 dark:stroke-gray-400" />
            )}
            id="password"
            placeholder={t("login.fields.password.placeholder")}
            required
            sizing="sm"
            type="password"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="password"
              value={t("signUp.fields.repeatPassword.label")}
            />
          </div>
          <TextInput
            disabled={loading}
            icon={() => (
              // <IconShieldX className="w-4 h-4 stroke-gray-600 dark:stroke-gray-400" />
              <IconShieldCheck className="w-4 h-4 stroke-gray-600 dark:stroke-gray-400" />
            )}
            id="repeatPassword"
            placeholder={t("signUp.fields.repeatPassword.placeholder")}
            required
            sizing="sm"
            type="password"
          />
        </div>
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
        {!passwordMatch ? (
          <p className="opacity-75 text-pretty text-red-600">
            Password do not match
          </p>
        ) : null}
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

export default Register;
