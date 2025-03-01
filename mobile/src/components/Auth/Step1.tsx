import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "../UI/Input";

interface Step1Props {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  fullName: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  emailError: string;
  fullNameError: string;
}

const Step1: React.FC<Step1Props> = ({
  email,
  setEmail,
  fullName,
  setFullName,
  emailError,
  fullNameError,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.title]}>Comment t'appelles-tu ?</Text>
        <Text style={styles.subTitle}>Dis-nous en plus à propos de toi</Text>
      </View>
      <Input
        placeholder="Prénom + Nom"
        value={fullName}
        onChangeText={setFullName}
        keyboardType="default"
        autoCapitalize="words"
        isValid={fullNameError.length === 0}
        errorMessage={fullNameError}
      />
      <Input
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        isValid={emailError.length === 0}
        errorMessage={emailError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 15,
  },
  title: {
    fontSize: 22,
    color: "#333",
    fontFamily: "Poppins-Bold",
  },
  subTitle: {
    fontSize: 13,
    color: "#9B9B9B",
    fontFamily: "Poppins-Regular",
  },
});

export default Step1;
