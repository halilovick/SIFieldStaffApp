import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    logoutContainer: {
      paddingTop: 10,
    },
    logoutText: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#007BFF',
    },
    confirmationContainer: {
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
        borderRadius: 5,
        backgroundColor: "#007BFF",
        marginHorizontal: 5,
      },
      buttonText: {
        color: "white",
      }
  });

  export default styles;