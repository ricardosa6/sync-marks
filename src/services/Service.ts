import { User as FirebaseUser } from "firebase/auth";

import {
  clearBookmarks,
  countBookmarks,
  addAllBookmarks,
} from "@/modules/shared/utils";

import { User } from "@/modules/shared/types";

import { getDoc, setDoc, userConverter } from "@/lib/firebase";

class Service {
  private locked: boolean;

  constructor() {
    this.locked = false;
  }

  lock() {
    this.locked = true;
  }

  unlock() {
    this.locked = false;
  }

  isLocked() {
    return this.locked;
  }

  /**
   * Save browser bookmarks to Firestore
   * @param user Firebase user
   * @returns Bookmarks and count
   * @throws Error
   * @async
   *
   * @example
   * const user = auth.currentUser;
   * const { bookmarks, count } = await Service.saveBookmarks(user);
   */
  public async saveBookmarks(user?: FirebaseUser | null): Promise<{
    bookmarks: chrome.bookmarks.BookmarkTreeNode[];
    count: number;
  }> {
    if (!user?.uid) {
      return { bookmarks: [], count: 0 };
    }

    const lastUpdatedAt = new Date().toISOString();

    return chrome.bookmarks.getTree().then(async (bookmarks) => {
      return setDoc<User>({
        collection: "users",
        docId: user.uid,
        data: {
          bookmarks,
          lastUpdatedAt,
        },
        converter: userConverter,
      }).then(() => {
        const count = countBookmarks(bookmarks);
        return { bookmarks, count };
      });
    });
  }

  /**
   * Get bookmarks from Firestore and sync with browser
   * @param user Firebase user
   * @returns Bookmarks and count
   * @throws Error
   * @async
   *
   * @example
   * const user = auth.currentUser;
   * const { bookmarks, count } = await Service.syncBookmarks(user);
   */
  public async syncBookmarks(user?: FirebaseUser | null): Promise<{
    bookmarks: chrome.bookmarks.BookmarkTreeNode[];
    count: number;
  }> {
    if (!user?.uid) {
      return { bookmarks: [], count: 0 };
    }

    return getDoc<User>({
      collection: "users",
      docId: user?.uid,
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

        await clearBookmarks();
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
    //   await chrome.runtime.sendMessage("unlock" as Message);
    // });
  }

  public async compareUpdates(user?: FirebaseUser | null) {
    if (!user?.uid) {
      return;
    }

    return getDoc<User>({
      collection: "users",
      docId: user.uid,
      converter: userConverter,
    }).then(async (storedUser) => {
      const firestoreBookmarks = storedUser?.bookmarks;

      const currentBookmarks = await chrome.bookmarks.getTree();

      const isFirestoreEmpty =
        !firestoreBookmarks || firestoreBookmarks.length === 0;

      const isBookmarksEmpty =
        !currentBookmarks || currentBookmarks.length === 0;

      if (isFirestoreEmpty && isBookmarksEmpty) {
        return;
      }

      if (isFirestoreEmpty && !isBookmarksEmpty) {
        await this.saveBookmarks.bind(this)(user);
        return;
      }

      if (!isFirestoreEmpty && isBookmarksEmpty) {
        await this.syncBookmarks.bind(this)(user);
        return;
      }

      // In case are not empty
      const now = new Date();

      const firestoreLastUpdateDate = storedUser?.lastUpdatedAt
        ? new Date(storedUser?.lastUpdatedAt)
        : now;

      const bookmarksBar = currentBookmarks[0].children?.[0];
      const bookmarksBarLastUpdate = bookmarksBar?.dateGroupModified;
      const bookmarksBarLastUpdateDate = bookmarksBarLastUpdate
        ? new Date(bookmarksBarLastUpdate)
        : now;

      const otherBookmarks = currentBookmarks[0].children?.[1];
      const otherBookmarksLastUpdate = otherBookmarks?.dateGroupModified;
      const otherBookmarksLastUpdateDate = otherBookmarksLastUpdate
        ? new Date(otherBookmarksLastUpdate)
        : now;

      if (
        !firestoreLastUpdateDate &&
        !bookmarksBarLastUpdateDate &&
        !otherBookmarksLastUpdateDate
      ) {
        return;
      }

      // Depending on the most recent update, we decide what to do
      // If the most recent update is from Firestore, we get bookmarks from Firestore and sync with browser
      // If the most recent update is from the browser, we save bookmarks to Firestore
      const action = [
        {
          date: firestoreLastUpdateDate,
          method: async () => {
            await this.syncBookmarks.bind(this)(user);
          },
        },
        {
          date: bookmarksBarLastUpdateDate,
          method: async () => {
            await this.saveBookmarks.bind(this)(user);
          },
        },
        {
          date: otherBookmarksLastUpdateDate,
          method: async () => {
            await this.saveBookmarks.bind(this)(user);
          },
        },
      ].sort((a, b) => b.date.getTime() - a.date.getTime())[0]?.method;

      await action();

      return;
    });
  }
}

export default new Service();
