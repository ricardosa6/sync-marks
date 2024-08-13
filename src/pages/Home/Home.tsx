import { Button, Popover } from "flowbite-react";
import { useTranslation } from "react-i18next";

import { useAuthContext } from "@/modules/auth/contexts";

import { Skeleton } from "@/modules/shared/components";
import { IconInfoCircle } from "@/modules/shared/icons/IconInfoCircle";

import { useBookmarksContext } from "@/modules/bookmarks/contexts";
import { SyncButton } from "@/modules/bookmarks/components";

export const Home = () => {
  const authContext = useAuthContext();
  const { count, loading: loadingBookmarks } = useBookmarksContext();
  const { t } = useTranslation();

  return (
    <section className="flex justify-start items-center flex-col h-full flex-1 px-4 pt-1 pb-4 gap-4">
      <section>
        <h1 className="text-lg text-slate-900 dark:text-slate-300">
          {t("home.title", { email: authContext?.currentUser?.email })}
        </h1>
        {loadingBookmarks ? (
          <Skeleton className="w-4 h-[8px] my-[5px]" />
        ) : (
          <p className="flex gap-1 items-center text-slate-900 dark:text-slate-300 text-opacity-70">
            {t("home.bookmarksSynced", { count })}
          </p>
        )}
      </section>
      <div className="flex flex-row gap-2 items-center">
        <SyncButton />
        <Popover
          aria-labelledby="default-popover"
          placement="bottom"
          content={
            <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
              <div className="px-3 py-2">
                <p>{t("home.syncInfoPopover")}</p>
              </div>
            </div>
          }
        >
          <Button size={"xs"} className="p-0 [&>span]:p-0 !bg-transparent">
            <IconInfoCircle className="text-slate-900 dark:text-slate-300 h-5 w-5" />
          </Button>
        </Popover>
      </div>
    </section>
  );
};
