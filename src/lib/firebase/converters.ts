import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

import { User } from "@/modules/shared/types";

export const userConverter = {
  toFirestore(user: User): DocumentData {
    return Object.fromEntries(
      Object.entries(user).filter(([_, value]) => value !== undefined)
    );
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options)!;
    return {
      uid: data.uid,
      email: data.email,
      bookmarks: data.bookmarks,
      lastUpdatedAt: data.lastUpdatedAt,
      browsers: data.browsers,
    };
  },
};
