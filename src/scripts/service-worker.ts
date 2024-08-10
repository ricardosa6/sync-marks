import { auth } from "@/lib/firebase";
import { Message } from "@/modules/shared/utils";

import Service from "@/services/Service";

// 5 minutes interval in milliseconds
const INTERVAL = 10 * 60 * 1000;

console.log("pasa por aqui");
// TODO: usar localstorage para saber si es la primera vez que se ejecuta la extension

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

chrome.runtime.onMessage.addListener((message: Message) => {
  const actions: { [key in Message]: () => void } = {
    unlock: () => Service.unlock(),
    lock: () => Service.lock(),
    syncBookmarks: () => Service.syncBookmarks(auth.currentUser),
    saveBookmarks: () => Service.saveBookmarks(auth.currentUser),
  };

  if (actions[message]) {
    actions[message]();
  }

  return true;

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

  Service.lock();

  await Service.compareUpdates(auth.currentUser);

  // wait 1 second before unlock
  setTimeout(() => {
    Service.unlock();
  }, 1000);

  Service.unlock();

  return;
});

setInterval(async () => {
  if (!auth.currentUser?.uid) {
    return;
  }

  Service.lock();

  await Service.compareUpdates(auth.currentUser);

  // wait 1 second before unlock
  setTimeout(() => {
    Service.unlock();
  }, 1000);

  return;
}, INTERVAL);

(async () => await Service.compareUpdates(auth.currentUser))();
