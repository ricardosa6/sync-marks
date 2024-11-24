import { auth } from "@/lib/firebase";
import { Message } from "@/modules/shared/utils";
import i18n from "@/i18n";

import Service from "@/services/Service";

// 5 minutes interval in milliseconds
const INTERVAL = 10 * 60 * 1000;

chrome.bookmarks.onCreated.addListener(async (/* id, bookmark */) => {
  if (!auth.currentUser?.uid) {
    return;
  }

  if (Service.isLocked()) {
    return;
  }

  // await chrome.bookmarks.getTree().then((bookmarks) => {
  //   const count = countBookmarks(bookmarks);

  //   chrome.action.setBadgeText({
  //     text: count.toString(),
  //   });
  //   chrome.action.setBadgeBackgroundColor({ color: "#FFF" });
  // });

  await Service.saveBookmarks(auth.currentUser);
});

chrome.bookmarks.onRemoved.addListener(async (/* id, removeInfo */) => {
  if (!auth.currentUser?.uid) {
    return;
  }

  if (Service.isLocked()) {
    return;
  }

  // await chrome.bookmarks.getTree().then((bookmarks) => {
  //   const count = countBookmarks(bookmarks);

  //   chrome.action.setBadgeText({
  //     text: count.toString(),
  //   });
  //   chrome.action.setBadgeBackgroundColor({ color: "#FFF" });
  // });

  await Service.saveBookmarks(auth.currentUser);
});

chrome.bookmarks.onChanged.addListener(async (/* id, changeInfo */) => {
  if (!auth.currentUser?.uid) {
    return;
  }

  if (Service.isLocked()) {
    return;
  }

  await Service.saveBookmarks(auth.currentUser);
});

chrome.runtime.onMessage.addListener(
  async ({ message }: { message: Message }) => {
    const actions: { [key in Message]: () => Promise<any> } = {
      unlock: async () => Service.unlock(),
      lock: async () => Service.lock(),
      syncBookmarks: async () => Service.syncBookmarks(auth.currentUser),
      saveBookmarks: async () => Service.saveBookmarks(auth.currentUser),
      compareSources: async () => Service.compareSources(auth.currentUser),
    };

    if (actions[message]) {
      await actions[message]();
    }

    // TODO: Show badges with bookmarks count
    // if (message.bookmarksCount) {
    //   chrome.action.setBadgeText({
    //     text: message.bookmarksCount.toString(),
    //   });
    //   chrome.action.setBadgeBackgroundColor({ color: "#222222" });
    //   chrome.action.setBadgeTextColor({ color: "#FFF" });
    // }
  }
);

/**
 * Compare bookmarks from Firestore with browser bookmarks in startup
 */
chrome.runtime.onStartup.addListener(async () => {
  if (!auth.currentUser?.uid) {
    return;
  }

  Service.lock();

  await Service.compareSources(auth.currentUser);

  // wait 1 second before unlock
  setTimeout(() => {
    Service.unlock();
  }, 1000);
});

setInterval(async () => {
  if (!auth.currentUser?.uid) {
    return;
  }

  Service.lock();

  await Service.compareSources(auth.currentUser);

  // wait 1 second before unlock
  setTimeout(() => {
    Service.unlock();
  }, 1000);

  return;
}, INTERVAL);

chrome.runtime.onSuspend.addListener(() => {
  // When extension is uninstalled, clear local storage
  chrome.storage.local.clear();
});

chrome.runtime.onInstalled.addListener(async (details) => {
  if (!auth.currentUser?.uid) {
    return;
  }

  // First install
  if (details.reason === "install") {
    await chrome.storage.local.set({ SYNC_MARKS__FIRST_SYNC: true });

    // const browserId = uuidv4();
    // await setDoc<User>({
    //   collection: "users",
    //   docId: auth.currentUser.uid,
    //   data: {
    //     browserId,
    //   },
    //   converter: userConverter,
    // });
    // chrome.storage.local.set({ browserId });
  }
  // } else if (details.reason === "update") {
  //   const thisVersion = chrome.runtime.getManifest().version;
  //   console.log(
  //     "Updated from " + details.previousVersion + " to " + thisVersion + "!"
  //   );
  // }
});

auth.onAuthStateChanged(async (user) => {
  Service.lock();

  if (!user) {
    return;
  }

  const syncMarksLocalStorage = await chrome.storage.local.get();

  const isFirstSync = [undefined, true].includes(
    syncMarksLocalStorage.SYNC_MARKS__FIRST_SYNC
  );

  if (isFirstSync) {
    const bookmarkCreateArg: chrome.bookmarks.BookmarkCreateArg = {
      parentId: "1",
      index: 0,
      title: `SyncMarks - ${i18n.t("bookmarksBar.oldBookmarks")}`,
    };
    const otherBookmarkCreateArg: chrome.bookmarks.BookmarkCreateArg = {
      parentId: "2",
      index: 1,
      title: `SyncMarks - ${i18n.t("bookmarksBar.oldOtherBookmarks")}`,
    };
    const createdBookmark = await chrome.bookmarks.create(bookmarkCreateArg);
    const otherCreatedBookmark = await chrome.bookmarks.create(
      otherBookmarkCreateArg
    );

    const subTree = await chrome.bookmarks.getSubTree("1");
    const otherSubTree = await chrome.bookmarks.getSubTree("2");

    subTree[0].children?.forEach(async (node) => {
      await chrome.bookmarks.move(node.id, {
        parentId: createdBookmark.id,
      });
    });
    otherSubTree[0].children?.forEach(async (node) => {
      await chrome.bookmarks.move(node.id, {
        parentId: otherCreatedBookmark.id,
      });
    });

    await Service.saveBookmarks(user);
    await Service.syncBookmarks(user);
  }

  await chrome.storage.local.set({ SYNC_MARKS__FIRST_SYNC: false });

  setTimeout(() => {
    Service.unlock();
  }, 1000);
});
