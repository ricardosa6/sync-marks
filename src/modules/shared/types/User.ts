export type User = {
  uid: string;
  email: string;
  bookmarks?: chrome.bookmarks.BookmarkTreeNode[];
  lastUpdatedAt?: string;
};
