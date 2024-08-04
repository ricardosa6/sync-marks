import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";

import { countBookmarks } from "@/utils/chrome";

import { useAuthContext } from "./AuthContext";

type BookmarksContextType = {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
  loading: boolean;
  count: number;
  refetch: () => Promise<void>;
};

const defaultBookmarksContext: BookmarksContextType = {
  bookmarks: [],
  loading: false,
  count: 0,
  refetch: async () => {},
};

const BookmarksContext = createContext<BookmarksContextType>(
  defaultBookmarksContext
);

export const useBookmarksContext = () => {
  return useContext(BookmarksContext);
};

export const BookmarksProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const authContext = useAuthContext();
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number | null>(null);

  const fetchBookmarks = async () => {
    if (!authContext?.currentUser?.uid) {
      return;
    }

    return getDoc(doc(db, "users", authContext?.currentUser?.uid))
      .then((response) => {
        if (response.exists()) {
          response.data().bookmarks && setBookmarks(response.data().bookmarks);

          const bookmarksCount = countBookmarks(response?.data()?.bookmarks);

          setCount(bookmarksCount);

          return;

          // return chrome.runtime.sendMessage({
          //   bookmarksCount: bookmarksCount,
          // });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchBookmarks().finally(() => {
      setLoading(false);
    });
  }, []);

  const value: BookmarksContextType = {
    bookmarks,
    count: count || 0,
    loading,
    refetch: fetchBookmarks,
  };

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
};
