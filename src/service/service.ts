import { User as FirebaseUser } from "firebase/auth";

import {
  cleanBookmarks,
  countBookmarks,
  addAllBookmarks,
} from "@/utils/chrome";

import { User } from "@/types/User";

import { auth, getDoc, setDoc } from "@/lib/firebase/client";
import { userConverter } from "@/lib/firebase/converters";

class Service {
  private isLocked: boolean;

  constructor() {
    this.isLocked = false;
  }

  public lock(): void {
    this.isLocked = true;
  }

  public unlock(): void {
    this.isLocked = false;
  }

  public async saveBookmarks(user?: FirebaseUser | null): Promise<{
    bookmarks: chrome.bookmarks.BookmarkTreeNode[];
    count: number;
  }> {
    if (!user?.uid || this.isLocked) {
      return { bookmarks: [], count: 0 };
    }

    return chrome.bookmarks.getTree().then(async (bookmarks) => {
      return setDoc<User>({
        collection: "users",
        docId: auth.currentUser?.uid as string,
        data: {
          bookmarks,
        },
        converter: userConverter,
      }).then(() => {
        const count = countBookmarks(bookmarks);
        return { bookmarks, count };
      });
    });
  }

  public async syncBookmarks(user?: FirebaseUser | null) {
    if (!user?.uid) {
      return { bookmarks: [], count: 0 };
    }

    // await chrome.runtime.sendMessage({
    //   service: false,
    // });

    return getDoc<User>({
      collection: "users",
      docId: auth.currentUser?.uid as string,
      converter: userConverter,
    })
      .then(async (data) => {
        if (!data) {
          return { bookmarks: [], count: 0 };
        }

        const bookmarks =
          data?.bookmarks as chrome.bookmarks.BookmarkTreeNode[];

        if (!bookmarks || bookmarks.length === 0) {
          return { bookmarks: [], count: 0 };
        }

        await cleanBookmarks();
        await addAllBookmarks(bookmarks);

        const bookmarksCount = countBookmarks(bookmarks);

        // await chrome.runtime.sendMessage({
        //   bookmarksCount: bookmarksCount,
        // });

        return { bookmarks, count: bookmarksCount };
      })
      .catch((error) => {
        console.error(error);
        return { bookmarks: [], count: 0 };
      });
    // .finally(async () => {
    //   await chrome.runtime.sendMessage({
    //     service: true,
    //   });
    // });
  }
}

export default new Service();
