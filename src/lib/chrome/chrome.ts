import { doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "../firebase/client";

class Chrome {
  static async saveBookmarks(user?: User | null) {
    if (!user?.uid) {
      return;
    }

    return chrome.bookmarks.getTree(async (bookmarks) => {
      return setDoc(
        doc(db, "users", user?.uid),
        {
          bookmarks,
        },
        { merge: true }
      );
    });
  }
}

export default Chrome;
