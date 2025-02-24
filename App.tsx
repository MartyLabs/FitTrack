import AppNavigator from './src/navigation/AppNavigator';
import {useEffect} from 'react';
import {firebaseAuth, firebaseFirestore} from './src/config/firebaseConfig';

export default function App() {
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      console.log('Firebase Auth User:', user);
    });

    console.log('Firebase Firestore:', firebaseFirestore);
  }, []);

  return <AppNavigator />;
}
