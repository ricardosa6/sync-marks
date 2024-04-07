import { doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";

import { countBookmarks } from "@/utils/chrome";

import { db } from "@/lib/firebase/client";

class Service {
  static async saveBookmarks(user?: User | null): Promise<{
    bookmarks: chrome.bookmarks.BookmarkTreeNode[];
    count: number;
  }> {
    if (!user?.uid) {
      return { bookmarks: [], count: 0 };
    }

    return new Promise((resolve, reject) => {
      chrome.bookmarks.getTree((bookmarks) => {
        setDoc(
          doc(db, "users", user.uid),
          {
            bookmarks,
          },
          { merge: true }
        )
          .then(() => {
            const count = countBookmarks(bookmarks);
            resolve({ bookmarks, count });
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }
}

export default Service;
