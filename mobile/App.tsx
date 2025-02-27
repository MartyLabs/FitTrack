import AppNavigator from "./src/navigation/AppNavigator";
import { useEffect } from "react";
import { firebaseAuth, firebaseFirestore } from "./src/config/firebaseConfig";

export default function App() {
  return <AppNavigator />;
}
