import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { data } from "../data/datalogin";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    // Cek apakah input kosong
    if (!email || !password) {
      Alert.alert('Login Failed', 'Please enter both email and password');
      return;
    }

    try {
      // Cek login di data statis terlebih dahulu
      const localUser = data.find(user => user.email === email && user.first_name === password);
      if (localUser) {
        Alert.alert('Login Success!', `Welcome, CARAT!`);
        navigation.navigate('Main');
        return;
      }

      // Jika tidak ada kecocokan di data lokal, cek di API
      const response = await fetch('https://reqres.in/api/users');
      const result = await response.json();
      const apiUser = result.data.find(user => user.email === email && user.first_name === password);

      if (apiUser) {
        Alert.alert('Login Success!', `Welcome, CARAT!`);
        navigation.navigate('Main');
      } else {
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo-carat.png')} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100, 
    height: 100, 
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderColor: '#b3cee5',
    borderRadius: 24,
    paddingHorizontal: 10,
    marginBottom: 16,
    fontSize: 14,
    backgroundColor: '#fff',
  },  
  button: {
    backgroundColor: '#91a8d0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
