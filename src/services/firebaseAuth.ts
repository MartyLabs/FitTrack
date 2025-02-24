import firebase from '@react-native-firebase/app';
import {firebaseAuth, firebaseFirestore} from '../config/firebaseConfig';

export const signUpWithEmail = async (
  email: string,
  password: string,
  fullName: string,
) => {
  try {
    const userCredential = await firebaseAuth.createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;

    // Ajout de l'utilisateur dans Firestore
    await firebaseFirestore.collection('users').doc(user.uid).set({
      uid: user.uid,
      fullName,
      email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(), // ✅ Correction ici
    });

    return user;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await firebaseAuth.signInWithEmailAndPassword(
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error("Erreur d'authentification", error);
  }
};

export const signOut = async () => {
  try {
    await firebaseAuth.signOut();
  } catch (error) {
    console.error('Erreur de déconnexion', error);
  }
};

// 🔹 Vérifier l'état de connexion
export const onAuthStateChanged = (callback: (user: any) => void) => {
  return firebaseAuth.onAuthStateChanged(callback);
};
