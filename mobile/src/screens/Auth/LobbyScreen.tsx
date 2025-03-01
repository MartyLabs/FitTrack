import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextCarousel from "../../components/lobbyScreen/TextCarousel";

const LobbyScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/lobby_img.jpg")}
      />
      <TextCarousel />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonFilled}>
          <Text style={[styles.buttonText, { color: "#fff" }]}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNotFilled}>
          <Text style={[styles.buttonText, { color: "#1C1D1C" }]}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  buttonFilled: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1D1C",
    paddingVertical: 20,
    width: "45%",
    borderRadius: 10,
  },
  buttonNotFilled: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1C1D1C",
    paddingVertical: 20,
    paddingHorizontal: 35,
    width: "45%",
    borderRadius: 10,
    color: "#1C1D1C",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  image: {
    width: "85%",
    height: undefined,
    aspectRatio: 3 / 4,
    borderRadius: 15,
  },
});

export default LobbyScreen;
