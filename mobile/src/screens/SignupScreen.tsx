import React, {useState} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import {
  signInWithEmail,
  signOut,
  signUpWithEmail,
} from '../services/firebaseAuth';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSignUp = async () => {
    try {
      await signUpWithEmail(email, password, fullName);
      setIsSignUp(false);
      Alert.alert('Compte créé avec succès !');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmail(email, password);
      Alert.alert('Connecté avec succès !');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleAuth = () => {
    if (isSignUp) {
      handleSignUp();
    } else {
      handleSignIn();
    }
  };

  return (
    <View style={{padding: 20}}>
      {isSignUp && (
        <TextInput
          placeholder="Nom complet"
          value={fullName}
          onChangeText={setFullName}
          style={{borderBottomWidth: 1, marginBottom: 10}}
        />
      )}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{borderBottomWidth: 1, marginBottom: 10}}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{borderBottomWidth: 1, marginBottom: 10}}
      />
      <Button
        title={isSignUp ? "S'inscrire" : 'Se connecter'}
        onPress={handleAuth}
      />
      <Button
        title={
          !isSignUp ? "Basculer sur l'inscription" : 'Basculer sur la connexion'
        }
        onPress={() => setIsSignUp(!isSignUp)}
      />
      <Button title="Déconnexion" onPress={signOut} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default SignupScreen;
