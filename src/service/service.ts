import { doc, getDoc, setDoc } from "firebase/firestore";

import { User } from "firebase/auth";

import {
  cleanBookmarks,
  countBookmarks,
  addAllBookmarks,
} from "@/utils/chrome";

import { auth, db } from "@/lib/firebase/client";

class Service {
  private isLocked: boolean;

  constructor() {
    this.isLocked = false;
  }

  // Método para bloquear la clase
  public lock(): void {
    this.isLocked = true;
  }

  // Método para desbloquear la clase
  public unlock(): void {
    this.isLocked = false;
  }

  public async saveBookmarks(user?: User | null): Promise<{
    bookmarks: chrome.bookmarks.BookmarkTreeNode[];
    count: number;
  }> {
    if (!user?.uid || this.isLocked) {
      return { bookmarks: [], count: 0 };
    }

    return chrome.bookmarks.getTree().then(async (bookmarks) => {
      return setDoc(
        doc(db, "users", user.uid),
        {
          bookmarks,
        },
        { merge: true },
      ).then(() => {
        const count = countBookmarks(bookmarks);
        return { bookmarks, count };
      });
    });
  }

  public async syncBookmarks(user?: User | null) {
    if (!user?.uid) {
      return Promise.resolve({ bookmarks: [], count: 0 });
    }
    await chrome.runtime.sendMessage({
      service: false,
    });

    return getDoc(doc(db, "users", auth.currentUser?.uid as string))
      .then(async (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const bookmarks =
            data?.bookmarks as chrome.bookmarks.BookmarkTreeNode[];

          if (!bookmarks || bookmarks.length === 0) {
            return { bookmarks: [], count: 0 };
          }

          await cleanBookmarks();
          await addAllBookmarks(bookmarks);

          const bookmarksCount = countBookmarks(bookmarks);

          await chrome.runtime.sendMessage({
            bookmarksCount: bookmarksCount,
          });

          return { bookmarks, count: bookmarksCount };
        }
        return { bookmarks: [], count: 0 };
      })
      .catch((error) => {
        console.error(error);
        return { bookmarks: [], count: 0 };
      })
      .finally(async () => {
        await chrome.runtime.sendMessage({
          service: true,
        });
      });
  }
}

export default new Service();
