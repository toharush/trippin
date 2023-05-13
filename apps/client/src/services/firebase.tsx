import auth from "../lib/firebase";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";

export const firebaseSignIn = async (email: string, password: string) => {
  return (await signInWithEmailAndPassword(auth, email, password)).user;
};

export const firebasecreateUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const getCurrentUserFromFireBase = async () => {
  return await auth.currentUser;
};

export const signOutFromFirebase = async () => {
  return await signOut(auth);
};

export const changePassword = async (user: User, password: string) => {
  return await updatePassword(user, password);
};
