import React, { useState } from "react";
import {
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import FitnessIcon from "../../assets/fitness.svg";
import { signInWithEmail } from "../../services/firebaseAuth";
import DividerWithText from "../../components/UI/DividerWithText";
import SocialLoginButton from "../../components/UI/SocialLoginButton";
import PasswordInput from "../../components/UI/PasswordInput";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordConfError = "Mauvais mot de passe";
  const handlePasswordRecovery = () => {
    Alert.alert("Coming soon!");
  };

  const handleConnexion = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmail(email, password);
      Alert.alert("Success", "You are now connected!");
    } catch (error) {
      Alert.alert("Login Failed", "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <FitnessIcon width={275} height={275} fill="#FF5733" />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Ravis de vous revoir !</Text>
          <Text style={styles.subTitle}>
            Connectez vous avec vos informations
          </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View>
          <PasswordInput
            password={password}
            setPassword={setPassword}
            placeholder="Mot de passe"
            isValid={true}
            errorMessage={passwordConfError}
          />
          <TouchableOpacity onPress={handlePasswordRecovery}>
            <Text style={styles.recoveryText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleConnexion}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign in with your email</Text>
          )}
        </TouchableOpacity>
      </View>

      <DividerWithText text="or sign in with" />

      <View style={styles.socialButtonsContainer}>
        <SocialLoginButton socialNetwork="google" />
        <SocialLoginButton socialNetwork="apple" />
        <SocialLoginButton socialNetwork="facebook" />
      </View>

      <TouchableOpacity style={styles.signupMethodContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Text style={styles.signupLink}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 15,
    gap: 20,
  },
  titleContainer: { marginBottom: 15 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1C1D1C",
  },
  subTitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#1C1D1C",
  },
  inputContainer: {
    width: "100%",
    gap: 15,
  },
  input: {
    borderBottomWidth: 0,
    fontSize: 16,
    padding: 16,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#F2F3F2",
    color: "#333",
  },
  recoveryText: {
    color: "#9B9B9B",
    fontSize: 14,
    marginTop: 10,
    textAlign: "right",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#1C1D1C",
    paddingVertical: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  socialButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signupMethodContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    position: "absolute",
    bottom: 20,
  },
  signupText: {
    color: "#1C1D1C",
    fontSize: 14,
  },
  signupLink: {
    color: "#EF4040",
    fontSize: 14,
    fontWeight: "bold",
  },
  image: {
    width: "85%",
    height: undefined,
    aspectRatio: 3 / 4,
    borderRadius: 15,
  },
});

export default SignInScreen;
