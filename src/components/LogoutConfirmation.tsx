import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const LogoutConfirmation = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.message}>Are you sure you want to log out?</Text>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={onCancel} style={styles.button}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.button}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
    backgroundColor: "#007BFF",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
  },
});

export default LogoutConfirmation;