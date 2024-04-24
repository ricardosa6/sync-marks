import { auth } from "@/lib/firebase/client";

import Service from "@/service/service";

import { countBookmarks } from "@/utils/chrome";

chrome.bookmarks.onCreated.addListener(async (/* id, bookmark */) => {
  if (!auth.currentUser?.uid) {
    return;
  }

  await chrome.bookmarks.getTree().then((bookmarks) => {
    const count = countBookmarks(bookmarks);

    chrome.action.setBadgeText({
      text: count.toString(),
    });
    chrome.action.setBadgeBackgroundColor({ color: "#FFF" });
  });

  await Service.saveBookmarks(auth.currentUser);
});

chrome.bookmarks.onRemoved.addListener(async (/* id, removeInfo */) => {
  if (!auth.currentUser?.uid) {
    return;
  }

  await chrome.bookmarks.getTree().then((bookmarks) => {
    const count = countBookmarks(bookmarks);

    chrome.action.setBadgeText({
      text: count.toString(),
    });
    chrome.action.setBadgeBackgroundColor({ color: "#FFF" });
  });

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

  if (message.bookmarksCount) {
    chrome.action.setBadgeText({
      text: message.bookmarksCount.toString(),
    });

    chrome.action.setBadgeBackgroundColor({ color: "#FFF" });
  }
});

chrome.windows.onCreated.addListener(async () => {
  await chrome.bookmarks.getTree().then((bookmarks) => {
    const count = countBookmarks(bookmarks);

    chrome.action.setBadgeText({
      text: count.toString(),
    });
    chrome.action.setBadgeBackgroundColor({ color: "#FFF" });
  });
});
