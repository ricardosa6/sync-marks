import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

import { User } from "@/types/User";

export const userConverter = {
  toFirestore(user: User): DocumentData {
    return {
      uid: user.uid,
      email: user.email,
      bookmarks: user.bookmarks,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): User {
    const data = snapshot.data(options)!;
    return { uid: data.uid, email: data.email, bookmarks: data.bookmarks };
  },
};
