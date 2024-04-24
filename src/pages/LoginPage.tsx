import { FormEvent, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "@/lib/firebase/client";

import {
  IconMailFilled,
  IconPassword /* , IconGithub, IconGoogle*/,
} from "@/icons";

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);

        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(errorCode, errorMessage);

        // setAppStatusError();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="flex justify-center items-center flex-col p-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-300 mb-2">
        Sign in
      </h1>
      <form
        className="flex max-w-md flex-col gap-4 w-full"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            disabled={loading}
            icon={() => (
              <IconMailFilled className="w-4 h-4 fill-gray-600 dark:fill-gray-400" />
            )}
            id="email"
            placeholder="example@mail.com"
            required
            sizing="sm"
            type="email"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            disabled={loading}
            icon={() => (
              <IconPassword className="w-4 h-4 stroke-gray-600 dark:stroke-gray-400" />
            )}
            id="password"
            placeholder="Password"
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
          Sign in
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

      <div className="mt-6">
        <p className="opacity-75 text-pretty text-slate-900 dark:text-slate-300">
          New here?{" "}
          <Link
            className="text-blue-600 dark:text-blue-400 hover:opacity-75 cursor-pointer"
            to="/register"
          >
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
};
