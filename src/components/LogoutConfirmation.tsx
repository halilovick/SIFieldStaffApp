import React from "react";
import { View, Text, Modal, TouchableOpacity} from "react-native";
import styles from '@/styles/logoutstyle';

const LogoutConfirmation = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onCancel}
    >
      <View style={styles.confirmationContainer}>
        <View style={styles.modal}>
          <Text style={styles.message}>Are you sure you want to log out?</Text>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={onConfirm} style={styles.button}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={styles.button}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutConfirmation;