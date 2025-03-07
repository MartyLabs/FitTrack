import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import GoogleIcon from "../../assets/google_icon.svg";
import FacebookIcon from "../../assets/facebook_icon.svg";
import AppleIcon from "../../assets/apple_icon.svg";

const SOCIAL_ICONS = {
  facebook: <FacebookIcon width={38} height={38} />,
  google: <GoogleIcon width={35} height={35} />,
  apple: <AppleIcon width={38} height={38} />,
};

interface SocialLoginButtonProps {
  socialNetwork: "facebook" | "google" | "apple";
  onPress?: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  socialNetwork,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>{SOCIAL_ICONS[socialNetwork]}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 8,
    width: 99,
    height: 59,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SocialLoginButton;
