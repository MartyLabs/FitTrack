module.exports = {
  dependencies: {
    "react-native-vector-icons": {
      platforms: {
        android: null, // Désactive l'auto-linking pour Android
      },
    },
  },
  assets: [
    "./node_modules/react-native-vector-icons/Fonts",
    "./src/assets/fonts/",
  ],
};
