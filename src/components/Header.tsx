import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, DarkThemeToggle, Drawer, Sidebar } from "flowbite-react";

import { useAuthContext } from "@/contexts/AuthContext";

import {
  IconGithub,
  IconMenu,
  IconLayoutDashboardFilled,
  IconSettingsFilled,
} from "@/icons";

export const Header = () => {
  const authContext = useAuthContext();

  const isLoggedIn = authContext?.currentUser !== null;

  const [isDrawerOpen, setIsDrowerOpen] = useState(false);

  const handleCloseDrawer = () => {
    setIsDrowerOpen(false);
  };

  return (
    <>
      <div className="p-2 w-full flex justify-between items-center flex-0">
        <div className="flex-grow basis-0 flex gap-1 items-center">
          {isLoggedIn ? (
            // <Link to="/settings">
            <Button
              size="xs"
              color="#24292F"
              className="bg-opacity-0 hover:bg-opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 w-8 h-8 p-[4px]"
              onClick={() => setIsDrowerOpen(!isDrawerOpen)}
            >
              <IconMenu className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </Button>
          ) : // </Link>
          null}
        </div>
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-300">
          <Link to="/">Bookmarks sync</Link>
        </p>
        <div className="flex flex-grow justify-end basis-0">
          <DarkThemeToggle className="w-8 h-8 p-[4px] flex justify-center items-center focus:ring-0 dark:focus:ring-0" />

          <a
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
          </a>
        </div>
      </div>
      <Drawer open={isDrawerOpen} onClose={handleCloseDrawer} className="">
        <Drawer.Header titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Link to="/" onClick={handleCloseDrawer}>
                    <Sidebar.Item icon={IconLayoutDashboardFilled}>
                      Home
                    </Sidebar.Item>
                  </Link>
                  <Link to="/settings" onClick={handleCloseDrawer}>
                    <Sidebar.Item icon={IconSettingsFilled}>
                      Settings
                    </Sidebar.Item>
                  </Link>
                  {/*
                    <Sidebar.Item href="/users/list">Users list</Sidebar.Item>
                    <Sidebar.Item href="/authentication/sign-in">
                      Sign in
                    </Sidebar.Item>
                    <Sidebar.Item href="/authentication/sign-up">
                      Sign up
                    </Sidebar.Item> */}
                </Sidebar.ItemGroup>
                {/* <Sidebar.ItemGroup>
                    <Sidebar.Item href="https://github.com/themesberg/flowbite-react/">
                      Docs
                    </Sidebar.Item>
                    <Sidebar.Item href="https://flowbite-react.com/">
                      Components
                    </Sidebar.Item>
                    <Sidebar.Item href="https://github.com/themesberg/flowbite-react/issues">
                      Help
                    </Sidebar.Item>
                  </Sidebar.ItemGroup> */}
              </Sidebar.Items>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
};
