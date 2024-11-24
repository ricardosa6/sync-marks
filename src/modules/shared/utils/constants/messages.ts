export type Message =
  | "unlock"
  | "lock"
  | "syncBookmarks"
  | "saveBookmarks"
  | "compareSources";

export const UNLOCK: Message = "unlock";
export const LOCK: Message = "lock";
export const SYNC_BOOKMARKS: Message = "syncBookmarks";
export const SAVE_BOOKMARKS: Message = "saveBookmarks";
export const COMPARE_SOURCES: Message = "compareSources";
