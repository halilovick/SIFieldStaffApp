import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Modal } from "react-native";
import { getManualEntryKey } from "@/lib/2FAService"; // Import the function to fetch manual entry key

const TwoFactorAuthenticationPopup = ({ isVisible, onClose, onAuthenticate }) => {
    const [code, setCode] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [manualEntryKey, setManualEntryKey] = useState("Initial value");

    useEffect(() => {
        // Fetch the manual entry key when the component mounts
        fetchManualEntryKey();
    }, []);

    const fetchManualEntryKey = async () => {
        try {
            // Call the function to fetch the manual entry key
            const key = await getManualEntryKey("test", "test");
            setManualEntryKey(key);
        } catch (error) {
            console.error("Error fetching manual entry key:", error);
            // Handle error
        }
    };

    const handleAuthenticate = () => {
        // Call the onAuthenticate function with the entered code, username, and password
        onAuthenticate(code, username, password);
    };

    return (
        <Modal visible={isVisible} animationType="slide">
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, elevation: 5 }}>
                    <Text>Enter 2FA Code</Text>
                    <Text>Manual Entry Key: {manualEntryKey}</Text>
                    <TextInput
                        placeholder="Code"
                        value={code}
                        onChangeText={setCode}
                        keyboardType="numeric"
                    />
                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <Button title="Authenticate" onPress={handleAuthenticate} />
                    <Button title="Cancel" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );    
};

export default TwoFactorAuthenticationPopup;
