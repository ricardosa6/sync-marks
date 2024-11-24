import { NavLink, useLocation } from "react-router-dom";
import { Button, DarkThemeToggle } from "flowbite-react";

import { IconSettingsFilled } from "@/modules/shared/icons";

import { useAuthContext } from "@/modules/auth/contexts";

export const Header = () => {
  const location = useLocation();
  const authContext = useAuthContext();

  const isSettingsPage = location.pathname === "/settings";

  const isLoggedIn = authContext?.currentUser !== null;

  return (
    <div className="p-2 w-full flex justify-between items-center flex-0">
      <div className="flex-grow basis-0 flex gap-1 items-center">
        {isLoggedIn ? (
          <NavLink
            to={isSettingsPage ? "/" : "/settings"}
            className={
              isSettingsPage
                ? "[&>button]:bg-gray-100 [&>button]:dark:bg-gray-700"
                : ""
            }
          >
            <Button
              size="xs"
              color="#24292F"
              className="bg-opacity-0 hover:bg-opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 w-8 h-8 p-[4px]"
            >
              <IconSettingsFilled className="w-4 h-4 fill-gray-600 dark:fill-gray-400" />
            </Button>
          </NavLink>
        ) : null}
      </div>
      {/* <p className="text-sm font-semibold text-slate-900 dark:text-slate-300">
        <Link to="/">SyncMarks</Link>
      </p> */}
      <div className="flex flex-grow justify-end basis-0">
        <DarkThemeToggle className="w-8 h-8 p-[4px] flex justify-center items-center focus:ring-0 dark:focus:ring-0" />
        {/* <a
          href="https://github.com/ricardosa6/sync-bookmarks-extension-react"
          target="_blank"
          rel="noreferrer"
        >
          <Button
            size="xs"
            color="#24292F"
            className="bg-opacity-0 hover:bg-opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 w-8 h-8 p-[4px]"
          >
            <IconGithub className="w-4 h-4 fill-gray-600 dark:fill-gray-400" />
          </Button>
        </a> */}
      </div>
    </div>
  );
};
