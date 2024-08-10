export type Message = "unlock" | "lock" | "syncBookmarks" | "saveBookmarks";

export const UNLOCK = "unlock" as Message;
export const LOCK = "lock" as Message;
export const SYNC_BOOKMARKS = "syncBookmarks" as Message;
export const SAVE_BOOKMARKS = "saveBookmarks" as Message;
