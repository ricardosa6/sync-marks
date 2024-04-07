import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { db } from "@/lib/firebase/client";
import { countBookmarks } from "@/utils/chrome";

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

export const BookmarksProvider = ({ children }: { children: JSX.Element }) => {
  const authContext = useAuthContext();
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);
  const [loading, setLoading] = useState(false);

  const fetchBookmarks = async () => {
    if (!authContext?.currentUser?.uid) {
      return;
    }

    return getDoc(doc(db, "users", authContext?.currentUser?.uid))
      .then((response) => {
        response.exists() &&
          response.data().bookmarks &&
          setBookmarks(response.data().bookmarks);
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
    count: countBookmarks(bookmarks),
    loading,
    refetch: fetchBookmarks,
  };

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
};
