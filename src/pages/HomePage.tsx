import { useState } from "react";
import { Button } from "flowbite-react";
import { doc, getDoc } from "firebase/firestore";

import { useAuthContext } from "@/contexts/AuthContext";
import { useBookmarksContext } from "@/contexts/BookmarksContext";

// import Chrome from "@/lib/chrome/chrome";
import { Skeleton } from "@/components/Skeleton";
import { IconCloud } from "@/icons/IconCloud";
import { auth, db } from "@/lib/firebase/client";

export const HomePage = () => {
  const authContext = useAuthContext();
  const { count, /* refetch, */ loading: loadingBookmarks } =
    useBookmarksContext();

  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    authContext?.logout();
  };

  const handleSyncBookmarks = async () => {
    setLoading(true);

    return getDoc(doc(db, "users", auth.currentUser?.uid as string))
      .then((doc) => {
        if (doc.exists()) {
          console.log("Document data:", doc.data());
          const data = doc.data();
          console.log("data", data);
          const bookmarks =
            data?.bookmarks as chrome.bookmarks.BookmarkTreeNode[];

          if (bookmarks) {
            // refetch();

            chrome.bookmarks.remove("0", () => {
              chrome.bookmarks.create(bookmarks[0]);
            });
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="flex justify-between items-center flex-col px-6 h-full flex-1 p-4">
      <section>
        <h1 className="text-xl bg-white dark:bg-slate-950">
          👋 Hi {authContext?.currentUser?.email}
        </h1>
        {loadingBookmarks ? (
          <Skeleton className="w-4 h-[8px] my-[5px]" />
        ) : (
          <p className="flex gap-1 items-center">
            Total bookmarks synced: {count}
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
          Sync
        </Button>
      </div>
      <Button
        size="sm"
        color="failure"
        className=""
        outline
        onClick={handleLogout}
      >
        Logout
      </Button>
    </section>
  );
};
