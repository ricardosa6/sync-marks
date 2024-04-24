import { useState } from "react";
import { Button } from "flowbite-react";

import { useAuthContext } from "@/contexts/AuthContext";
import { useBookmarksContext } from "@/contexts/BookmarksContext";

import { Skeleton } from "@/components/Skeleton";

import Service from "@/service/service";

import { IconCloud } from "@/icons";

export const HomePage = () => {
  const authContext = useAuthContext();
  const { count, /* refetch, */ loading: loadingBookmarks } =
    useBookmarksContext();

  const [loading, setLoading] = useState(false);

  const handleSyncBookmarks = async () => {
    setLoading(true);
    Service.lock();
    Service.syncBookmarks(authContext?.currentUser).finally(() => {
      setLoading(false);
    });
    Service.unlock();
  };

  return (
    <section className="flex justify-start items-center flex-col h-full flex-1 px-4 pt-1 pb-4 gap-4">
      <section>
        <h1 className="text-lg text-slate-900 dark:text-slate-300">
          👋 Hi {authContext?.currentUser?.email}
        </h1>
        {loadingBookmarks ? (
          <Skeleton className="w-4 h-[8px] my-[5px]" />
        ) : (
          <p className="flex gap-1 items-center text-slate-900 dark:text-slate-300 text-opacity-70">
            Bookmarks synced: {count}
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
          Sync from cloud
        </Button>
      </div>
    </section>
  );
};
