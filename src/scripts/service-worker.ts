import { auth } from "@/lib/firebase/client";
import Service from "@/service/service";

chrome.bookmarks.onCreated.addListener((/* id, bookmark */) => {
  if (!auth.currentUser?.uid) {
    return;
  }

  Service.saveBookmarks(auth.currentUser);
});

chrome.bookmarks.onRemoved.addListener((/* id, removeInfo */) => {
  if (!auth.currentUser?.uid) {
    return;
  }

  Service.saveBookmarks(auth.currentUser);
});

chrome.bookmarks.onChanged.addListener((/* id, changeInfo */) => {
  if (!auth.currentUser?.uid) {
    return;
  }

  Service.saveBookmarks(auth.currentUser);
});
