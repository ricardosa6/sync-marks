import { auth, db } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";

import Service from "@/service/service";

import { countBookmarks } from "@/utils/chrome";

chrome.bookmarks.onCreated.addListener(async (/* id, bookmark */) => {
  if (!auth.currentUser?.uid) {
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

  // await chrome.bookmarks.getTree().then((bookmarks) => {
  //   const count = countBookmarks(bookmarks);

  //   chrome.action.setBadgeText({
  //     text: count.toString(),
  //   });
  //   chrome.action.setBadgeBackgroundColor({ color: "#FFF" });
  // });

  await Service.saveBookmarks(auth.currentUser);
});

chrome.bookmarks.onChanged.addListener((/* id, changeInfo */) => {
  if (!auth.currentUser?.uid) {
    return;
  }

  Service.saveBookmarks(auth.currentUser);
});

chrome.runtime.onMessage.addListener((message /*, sender, sendResponse*/) => {
  if (message.service === false) {
    Service.lock();
    return;
  }

  if (message.service === true) {
    Service.unlock();
    return;
  }

  // TODO: Show badges with bookmarks count

  // if (message.bookmarksCount) {
  //   chrome.action.setBadgeText({
  //     text: message.bookmarksCount.toString(),
  //   });
  //   chrome.action.setBadgeBackgroundColor({ color: "#222222" });
  //   chrome.action.setBadgeTextColor({ color: "#FFF" });
  // }
});

chrome.windows.onCreated.addListener(async () => {
  if (!auth.currentUser?.uid) {
    return;
  }

  await chrome.bookmarks.getTree().then(async (bookmarks) => {
    return getDoc(doc(db, "users", auth.currentUser?.uid as string)).then(
      async (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const firestoreBookmarks =
            data?.bookmarks as chrome.bookmarks.BookmarkTreeNode[];

          if (!firestoreBookmarks || firestoreBookmarks.length === 0) {
            return;
          }

          const firestoreBookmarksCount = countBookmarks(firestoreBookmarks);
          const browserBookmarksCount = countBookmarks(bookmarks);

          if (firestoreBookmarksCount !== browserBookmarksCount) {
            // TODO: Show badges with alert for sync
            // chrome.action.setBadgeText({
            //   text: "!",
            // });
            // chrome.action.setBadgeBackgroundColor({ color: "#FF3333" });
            // chrome.action.setBadgeTextColor({ color: "#FFF" });
            Service.lock();
            await Service.syncBookmarks(auth.currentUser);
            Service.unlock();
          }
          // TODO: Show badges with bookmarks count
          // else {
          // chrome.action.setBadgeText({
          //   text: browserBookmarksCount.toString(),
          // });
          // chrome.action.setBadgeBackgroundColor({ color: "#FFF" });
          // }
        }
      },
    );
  });
});

setInterval(async () => {
  await chrome.bookmarks.getTree().then(async (bookmarks) => {
    return getDoc(doc(db, "users", auth.currentUser?.uid as string)).then(
      async (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const firestoreBookmarks =
            data?.bookmarks as chrome.bookmarks.BookmarkTreeNode[];

          if (!firestoreBookmarks || firestoreBookmarks.length === 0) {
            return;
          }

          const firestoreBookmarksCount = countBookmarks(firestoreBookmarks);
          const browserBookmarksCount = countBookmarks(bookmarks);

          if (firestoreBookmarksCount !== browserBookmarksCount) {
            // chrome.action.setBadgeText({
            //   text: "!",
            // });
            // chrome.action.setBadgeBackgroundColor({ color: "#FF3333" });
            // chrome.action.setBadgeTextColor({ color: "#FFF" });
            Service.lock();
            await Service.syncBookmarks(auth.currentUser);
            Service.unlock();
          }
        }
      },
    );
  });
}, 1000 * 5);
