import React, { useState, useMemo } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { signUpWithEmail } from "../../services/firebaseAuth";
import Step1 from "../../components/Auth/Step1";
import Step2 from "../../components/Auth/Step2";
import { useNavigation } from "@react-navigation/native";

const SignupScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const isStep1Valid = useMemo(() => {
    return emailRegex.test(email) && fullName.length >= 3;
  }, [email, fullName]);

  const isStep2Valid = useMemo(() => {
    return passwordRegex.test(password) && password === passwordConf;
  }, [password, passwordConf]);

  const emailError =
    attemptedSubmit && !emailRegex.test(email)
      ? "Veuillez entrer un email valide."
      : "";
  const fullNameError =
    attemptedSubmit && fullName.length < 3
      ? "Le nom doit contenir au moins 3 caractères."
      : "";
  const passwordError =
    attemptedSubmit && !passwordRegex.test(password)
      ? "Mot de passe : min. 8 caractères, 1 lettre, 1 chiffre et 1 caractère spécial."
      : "";

  const passwordConfError =
    attemptedSubmit && password !== passwordConf
      ? "Les mots de passe ne correspondent pas."
      : "";

  const handleNext = () => {
    setAttemptedSubmit(true); // Active l'affichage des erreurs

    if (step === 1 && isStep1Valid) {
      setStep(2);
      setError("");
      setAttemptedSubmit(false);
    } else if (step === 2 && isStep2Valid) {
      handleSignUp();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(1);
      setError("");
      setAttemptedSubmit(false);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUpWithEmail(email, password, fullName);
      Alert.alert("Compte créé avec succès !");
      navigation.navigate("Signin");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/registration_step1.jpg")}
      />

      <View style={styles.stepContainer}>
        {step === 1 ? (
          <Animated.View
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}
            key="step1"
          >
            <Step1
              email={email}
              setEmail={setEmail}
              emailError={emailError}
              fullName={fullName}
              setFullName={setFullName}
              fullNameError={fullNameError}
            />
          </Animated.View>
        ) : (
          <Animated.View
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}
            key="step2"
          >
            <Step2
              password={password}
              setPassword={setPassword}
              passwordError={passwordError}
              passwordConf={passwordConf}
              setPasswordConf={setPasswordConf}
              passwordConfError={passwordConfError}
            />
          </Animated.View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonFilled, step === 1 && styles.buttonDisabled]}
          onPress={handleBack}
          disabled={step === 1}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonNotFilled,
            {
              opacity:
                step === 1 ? (isStep1Valid ? 1 : 0.5) : isStep2Valid ? 1 : 0.5,
            },
          ]}
          onPress={handleNext}
        >
          <Text style={[styles.buttonText, { color: "#1C1D1C" }]}>
            {step === 1 ? "Next" : "Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signupMethodContainer}>
        <Text style={styles.signupText}>Already have an account?</Text>
        <Text style={styles.signupLink}>Sign in</Text>
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
    gap: 20,
  },
  image: {
    width: "80%",
    height: undefined,
    aspectRatio: 3 / 4,
    borderRadius: 15,
    top: -20,
  },
  stepContainer: {
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF", // Ajout du texte en blanc pour le bouton rempli
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
});

export default SignupScreen;
