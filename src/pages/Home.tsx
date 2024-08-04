import { useState } from "react";
import { Button } from "flowbite-react";
import { useTranslation } from "react-i18next";

import { useAuthContext } from "@/contexts/AuthContext";
import { useBookmarksContext } from "@/contexts/BookmarksContext";

import { Skeleton } from "@/components/Skeleton";

import { IconCloud } from "@/icons";

import { Message } from "@/utils/constants/messages";

const Home = () => {
  const authContext = useAuthContext();
  const { count, loading: loadingBookmarks } = useBookmarksContext();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const handleSyncBookmarks = async () => {
    setLoading(true);

    await chrome.runtime.sendMessage("lock" as Message);
    await chrome.runtime.sendMessage("syncBookmarks" as Message);
    await chrome.runtime.sendMessage("unlock" as Message);
    setLoading(false);
  };

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
      <div className="">
        <Button
          isProcessing={loading}
          size="xs"
          gradientDuoTone="greenToBlue"
          onClick={handleSyncBookmarks}
        >
          <IconCloud className="mr-2 h-5 w-5" />
          {t("home.sync")}
        </Button>
      </div>
    </section>
  );
};

export default Home;
