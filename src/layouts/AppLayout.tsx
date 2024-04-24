import { Flowbite } from "flowbite-react";
import { Outlet } from "react-router-dom";

import { Header } from "@/components/Header";
import { AuthProvider } from "@/contexts/AuthContext";

export const AppLayout = () => {
  return (
    <Flowbite>
      {/* Backgrounds from https://bg.ibelick.com/ */}
      <div className="absolute inset-0 top-0 -z-10 h-full w-full overflow-hidden bg-white dark:bg-slate-950">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] opacity-50 blur-[80px]"></div>
      </div>
      <div className="flex flex-col h-full">
        <AuthProvider>
          <Header />
          <Outlet />
        </AuthProvider>
      </div>
    </Flowbite>
  );
};
