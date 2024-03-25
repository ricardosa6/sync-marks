import { IconGithub } from "@/icons/IconGithub";
import { Button, DarkThemeToggle } from "flowbite-react";

export const Header = () => {
  return (
    <div className="p-2 w-full flex justify-between items-center flex-0">
      <div className="flex-grow basis-0">
        <DarkThemeToggle className="w-8 h-8 p-[4px] flex justify-center items-center focus:ring-0 dark:focus:ring-0" />
      </div>
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-300">
        Sync bookmarks across browsers
      </p>
      <div className="flex flex-grow justify-end basis-0">
        <a
          href="https://github.com/ricardosa6/sync-bookmarks-extension-react"
          target="_blank"
          rel="noreferrer"
        >
          <Button
            size={"xs"}
            color="#24292F"
            className="bg-opacity-0 hover:bg-opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 p-0"
          >
            <IconGithub className="w-4 h-4 fill-gray-600 dark:fill-gray-400" />
          </Button>
        </a>
      </div>
    </div>
  );
};
