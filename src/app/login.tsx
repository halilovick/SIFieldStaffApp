import Footer from '@/components/footer';
import Header from '@/components/header';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
          try {
            const response = await fetch('https://your-api-url.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                console.error('Login failed');
                return;
            }

            const data = await response.json();
            storeToken(data);
            console.log('Login successful:', data);
            navigation.navigate('Home', { username });
            
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <View className="flex flex-1">
            <Header />
            <Content
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}            
            />
            <Footer />
        </View>
    );
};

const Content = ({ username, setUsername, password, setPassword, handleLogin }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username or Phone Number"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const HomeScreen = ({ route }) => {
    const { username } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, {username}!</Text>
        </View>
    );
};

const App = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#eee',
        borderRadius: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#007bff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default App;