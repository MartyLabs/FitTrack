import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PasswordInput from "../UI/PasswordInput";

interface Step2Props {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordError: string;
  passwordConf: string;
  setPasswordConf: React.Dispatch<React.SetStateAction<string>>;
  passwordConfError: string;
}

const Step2: React.FC<Step2Props> = ({
  password,
  setPassword,
  passwordError,
  passwordConf,
  setPasswordConf,
  passwordConfError,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.title]}>Protégez-vous bien !</Text>
        <Text style={styles.subTitle}>
          Une dernière étape avant de vous lancer !
        </Text>
      </View>
      <PasswordInput
        password={password}
        setPassword={setPassword}
        placeholder="Mot de passe"
        isValid={passwordError.length === 0}
        errorMessage={passwordError}
      />
      <PasswordInput
        password={passwordConf}
        setPassword={setPasswordConf}
        placeholder="Confirmation de mot de passe"
        isValid={passwordConfError.length === 0}
        errorMessage={passwordConfError}
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

export default Step2;
