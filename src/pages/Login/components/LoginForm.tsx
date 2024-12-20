import { FormEvent, useState } from "react";
import { Button } from "flowbite-react";
import {
  AuthError,
  signInWithEmailAndPassword,
} from "firebase/auth/web-extension";
import { useNavigate } from "react-router-dom";

import { auth } from "@/lib/firebase";

import { IconMailFilled, IconPassword } from "@/modules/shared/icons";
import { TextField } from "@/modules/shared/components";

export const LoginForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError["code"] | null>(null);

  const signUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    return signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        setError(null);
        navigate("/");
      })
      .catch((error: AuthError) => {
        const errorCode = error.code;
        setError(errorCode);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="flex max-w-md flex-col gap-4 w-full" onSubmit={signUp}>
      <TextField
        label={chrome.i18n.getMessage("login_fields_email_label")}
        color={Boolean(error) ? "failure" : undefined}
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
        color={Boolean(error) ? "failure" : undefined}
        disabled={loading}
        icon={() => (
          <IconPassword className="w-4 h-4 stroke-gray-600 dark:stroke-gray-400" />
        )}
        id="password"
        placeholder={chrome.i18n.getMessage(
          "login_fields_password_placeholder"
        )}
        required
        sizing="sm"
        type="password"
      />
      {error && (
        <p className="text-red-500 text-sm font-medium">
          {chrome.i18n.getMessage(`auth_${error}`)}
        </p>
      )}
      <Button
        disabled={loading}
        size={"sm"}
        gradientDuoTone="tealToLime"
        type="submit"
      >
        {chrome.i18n.getMessage("login_signIn")}
      </Button>
      {/* <Button
    disabled={loading}
    size={"sm"}
    color="#4285F4"
    onClick={handleGoogleAuth}
    className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/10 dark:focus:ring-[#4285F4]/55"
  >
    <IconGoogle className="w-4 h-4 me-2" />
    Sign in with Google
  </Button> */}
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
    </form>
  );
};
