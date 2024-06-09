import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from '@/styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeToken } from '@/lib/AuthService';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://public-ip-address/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                alert("Incorrect username or password!")
                return;
            }

            const data = await response.json();
            await AsyncStorage.setItem('user', JSON.stringify(data));
            storeToken(data.token);

            navigation.navigate('2 Factor Authentication', { username });
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (

        <><Image source={require('assets/detailscampaign_header.jpg')} style={[styles.appImage]} /><Text style={styles.title}>Welcome back!</Text>
            <View style={[styles.inputContainer]}>
                <View style={styles.inputWrapper}>
                    <Icon name="user" size={30} color="#777" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Username or Phone Number"
                        placeholderTextColor="#777"
                        value={username}
                        onChangeText={setUsername} />
                </View>
                <View style={styles.inputWrapper}>
                    <Icon name="key" size={30} color="#777" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#777"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <View style={styles.loginButtonContainer}>
                    <TouchableOpacity testID="login-button" style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Log in</Text>
                    </TouchableOpacity>
                </View>

            </View></>

    );
};

export default LoginScreen;