// types/user.ts
import { Timestamp } from "firebase/firestore";

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Timestamp;
  profile: UserProfile;
  stats: UserStats;
  settings: UserSettings;
}

export interface UserProfile {
  bio?: string;
  location?: string;
  website?: string;
}

export interface UserStats {
  photosUploaded: number;
  totalLikes: number;
  totalComments: number;
}

export interface UserSettings {
  privacy: "public" | "private";
  notifications: boolean;
}
