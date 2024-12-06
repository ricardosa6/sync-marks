import { FormEvent, useState } from "react";
import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthError } from "firebase/auth/web-extension";

import {
  IconShieldCheck,
  IconPassword,
  IconMailFilled,
  IconShieldX,
} from "@/modules/shared/icons";
import { useAuthContext } from "@/modules/auth/contexts";
import { TextField } from "@/modules/shared/components";

export const Register = () => {
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
      .then(async () => {
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
        {chrome.i18n.getMessage("signUp_register")}
      </h1>
      <form
        className="flex max-w-md flex-col gap-4 w-full"
        onSubmit={handleSubmit}
      >
        <TextField
          label={chrome.i18n.getMessage("login_fields_email_label")}
          color={isError ? "failure" : undefined}
          disabled={loading}
          icon={() => (
            <IconMailFilled className="w-4 h-4 fill-gray-600 dark:fill-gray-400" />
          )}
          id="email"
          placeholder={chrome.i18n.getMessage("login_fields_email_placeholder")}
          required
          sizing="sm"
          type="email"
        />
        <TextField
          label={chrome.i18n.getMessage("login_fields_password_label")}
          color={passwordError ? "failure" : undefined}
          disabled={loading}
          icon={() => (
            <IconPassword
              className={`w-4 h-4 ${passwordError ? "stroke-red-500" : "stroke-gray-600 dark:stroke-gray-400"} `}
            />
          )}
          id="password"
          placeholder={chrome.i18n.getMessage(
            "login_fields_password_placeholder"
          )}
          required
          sizing="sm"
          type="password"
        />
        <TextField
          label={chrome.i18n.getMessage("signUp_fields_repeatPassword_label")}
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
          placeholder={chrome.i18n.getMessage(
            "signUp_fields_repeatPassword_placeholder"
          )}
          required
          sizing="sm"
          type="password"
        />
        {!passwordMatch ? (
          <p className="text-red-500 text-sm font-medium">
            {chrome.i18n.getMessage(
              "signUp_fields_repeatPassword_doesNotMatch"
            )}
          </p>
        ) : null}
        <Button
          disabled={loading}
          size={"sm"}
          gradientDuoTone="tealToLime"
          type="submit"
        >
          {chrome.i18n.getMessage("login_signUp")}
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
          {chrome.i18n.getMessage("signUp_alreadyHaveAccount")}{" "}
          <Link
            className="text-blue-600 dark:text-blue-400 hover:opacity-75 cursor-pointer"
            to="/auth/login"
          >
            {chrome.i18n.getMessage("login_signIn")}
          </Link>
        </p>
      </div>
    </section>
  );
};
