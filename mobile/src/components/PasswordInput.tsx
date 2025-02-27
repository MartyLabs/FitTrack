import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface PasswordInputProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
}) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderRadius: 10,
        backgroundColor: "#F2F3F2",
        borderWidth: 0,
        borderBottomWidth: 0,
      }}
    >
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry={secureText}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={() => setSecureText(!secureText)}>
        <Icon
          name={secureText ? "eye-off" : "eye"} // Change l'icône selon l'état
          size={24}
          color="#666"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    padding: 16,
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#F2F3F2",
    color: "#9B9B9B",
    borderWidth: 0,
    borderBottomWidth: 0,
  },
});

export default PasswordInput;
