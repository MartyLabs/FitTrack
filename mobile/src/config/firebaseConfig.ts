import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

// 🔹 Services Firebase
export const firebaseAuth = auth(); // Authentification Firebase
export const firebaseFirestore = firestore(); // Firestore (DB)
export const firebaseMessaging = messaging(); // Notifications Push

// 🔹 Références aux collections Firestore
export const usersCollection = firebaseFirestore.collection('users'); // Collection utilisateurs
export const workoutsCollection = firebaseFirestore.collection('workouts'); // Collection entraînements
export const foodScansCollection = firebaseFirestore.collection('food_scans'); // Collection scans OpenFoodFacts

// 🔹 Fonction pour récupérer le token Firebase Cloud Messaging (FCM)
export const getFCMToken = async () => {
  try {
    const token = await firebaseMessaging.getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Erreur lors de la récupération du token FCM:', error);
  }
};

export default {
  firebaseAuth,
  firebaseFirestore,
  firebaseMessaging,
};
