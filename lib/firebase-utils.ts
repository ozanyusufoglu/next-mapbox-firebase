// lib/firebase-utils.ts
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  GeoPoint,
} from "firebase/firestore";
import { db } from "./firebase";
import { Photo, User, Comment, Tag } from "@/types";

// Photo operations
export const photosCollection = collection(db, "photos");

export const addPhoto = async (
  photoData: Omit<Photo, "id" | "dateUploaded">
) => {
  const photoWithTimestamp = {
    ...photoData,
    dateUploaded: Timestamp.now(),
  };

  const docRef = await addDoc(photosCollection, photoWithTimestamp);
  return { id: docRef.id, ...photoWithTimestamp };
};

export const getPhoto = async (id: string) => {
  const docRef = doc(db, "photos", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Photo;
  }
  return null;
};

export const getPhotosByLocation = async (
  latitude: number,
  longitude: number,
  radiusKm: number = 10
) => {
  // Note: Firestore doesn't support native geospatial queries
  // We'll implement a simple bounding box query for now
  // For production, consider using a geospatial library or Algolia

  const q = query(
    photosCollection,
    where("privacy", "==", "public"),
    orderBy("dateUploaded", "desc"),
    limit(50)
  );

  const querySnapshot = await getDocs(q);
  const photos: Photo[] = [];

  querySnapshot.forEach((doc) => {
    const photo = { id: doc.id, ...doc.data() } as Photo;

    // Filter by distance (simple calculation)
    const distance = calculateDistance(
      latitude,
      longitude,
      photo.location.latitude,
      photo.location.longitude
    );

    if (distance <= radiusKm) {
      photos.push(photo);
    }
  });

  return photos;
};

export const getPhotosByUser = async (userId: string) => {
  const q = query(
    photosCollection,
    where("userId", "==", userId),
    orderBy("dateUploaded", "desc")
  );

  const querySnapshot = await getDocs(q);
  const photos: Photo[] = [];

  querySnapshot.forEach((doc) => {
    photos.push({ id: doc.id, ...doc.data() } as Photo);
  });

  return photos;
};

// User operations
export const usersCollection = collection(db, "users");

export const createUser = async (userData: Omit<User, "id" | "createdAt">) => {
  const userWithTimestamp = {
    ...userData,
    createdAt: Timestamp.now(),
  };

  const docRef = await addDoc(usersCollection, userWithTimestamp);
  return { id: docRef.id, ...userWithTimestamp };
};

export const getUser = async (id: string) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as User;
  }
  return null;
};

// Utility function to calculate distance between two points
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
